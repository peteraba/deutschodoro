oldVersion=$(grep -o '"version": "[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*"' build/manifest.json)
oldVersion=${oldVersion:12:-1}
server="d3.apache"

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
    sed -i "s/v$1/v$2/" build/popup.html
    sed -i "s/v$1/v$2/" build/options.html
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
    node r.js -o rOptions.js
    echo "JavaScript rebuilt"
}

function buildChromeExtensionZip {
    cd build
    rm build.zip
    zip build.zip *
    cd ..
    echo "Zip for Chrome rebuilt"
}

function gitTag {
    command="git tag -a v$1 -m 'version $1'"
    `command`
}


doTag=0
doZip=0
doEchoVersion=0
doUnitTest=0
while test $# -gt 0; do
    case "$1" in
        -tag)
            shift
            doTag=1
            newVersion=$1
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
            server=$1
            shift
            ;;
    esac
done

url="http://$server/test/unit/index.html"


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

    updateDictionary

    buildJs

    gitTag $newVersion
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