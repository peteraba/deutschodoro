oldVersion=$(grep -o '"version": "[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*"' build/manifest.json)
oldVersion=${oldVersion:12:-1}
url="http://d3.apache/test/unit/index.html"

if [ -z "$oldVersion" ]; then
    echo "Old version is not found."
    exit 1
fi

function verifyUnitTests {
    # Testing with mocha-phantomjs
    TEST=`mocha-phantomjs $1 -R min`
    [[ $TEST =~ ([0-9][0-9]* of [0-9][0-9]) ]]
    echo "${BASH_REMATCH[1]}"
}

function replaceVersionTags {
    sed -i "s/v$1/v$2/" index.html
    sed -i "s/v$1/v$2/" settings.html
    sed -i "s/v$1/v$2/" build/index.html
    sed -i "s/v$1/v$2/" build/settings.html
    sed -i "s/$1/$2/" build/manifest.json
    echo "Version change: $1 --> $2"
}

function updateDictionary {
    cd dictionary
    php csvToJson.php
    cd ..
    echo "Dictionary refreshed"
}

function buildJs {
    node r.js -o rIndex.js
    node r.js -o rSettings.js
    echo "JavaScript rebuilt"
}

function buildChromeExtensionZip {
    cd build
    rm build.zip
    zip -r build.zip *
    cd ..
    echo "Zip for Chrome rebuilt"
}

function gitTag {
    git tag -a v$1 -m 'version $1'
    echo "Git tag created"
}

doTag=0
doRebuild=0
doZip=0
doEchoVersion=0
doUnitTest=0
while test $# -gt 0; do
    case "$1" in
        -tag)
            shift
            doTag=1
            newVersion=$1
            doRebuild=1
            shift
            ;;
        -rebuild)
            shift
            doRebuild=1
            shift
            ;;
        -zip)
            shift
            doZip=1
            shift
            ;;
        -v)
            shift
            doEchoVersion=1
            shift
            ;;
        -test)
            shift
            doUnitTest=1
            shift
            ;;
        -server)
            shift
            url="http://$1/test/unit/index.html"
            shift
            ;;
    esac
done


if test $doRebuild -gt 0; then
    updateDictionary

    buildJs
fi


if test $doTag -gt 0; then
    if [ -z "$newVersion" ]; then
        echo "New version is not specified."
        exit 1
    fi

    failures=$(verifyUnitTests $url)
    if test ${#failures} -gt 4; then
        echo "test errors: $failures"
        exit 1
    fi
    echo "Tests are ok."

    replaceVersionTags $oldVersion $newVersion

    if [ "$newVersion" != "$oldVersion" ]; then
        gitTag $newVersion
    else
        echo "Git tagging skipped."
    fi
fi


if test $doZip -gt 0; then
    buildChromeExtensionZip
fi


if test $doEchoVersion -gt 0; then
    echo "version found: $oldVersion"
fi


if test $doUnitTest -gt 0; then
    mocha-phantomjs $url
fi