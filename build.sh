version=$(grep -o '"version": "[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*"' build/manifest.json)
version=${VERSION:12:-1}
tag=
server="d3.apache"

function verifyUnitTests {
    # Testing with mocha-phantomjs
    TEST=`mocha-phantomjs $1 -R min`
    [[ $TEST =~ ([0-9][0-9]* of [0-9][0-9]) ]]
    echo "${BASH_REMATCH[1]}"
}

function replaceVersionTags {
    sed -i "s/v$1/v$2/" index.html
    sed -i "s/v$1/v$2/" build/popup.html
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
    node r.js -o build.js
    echo "JavaScript rebuilt"
}

function buildChromeExtensionZip {
    cd build
    rm build.zip
    zip build.zip *
    cd ..
    echo "Zip for Chrome rebuilt"
}


doTag=0
doEchoVersion=0
doUnitTest=0
while test $# -gt 0; do
    case "$1" in
        -tag)
            shift
            doTag=1
            tag=$1
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
    if [ -z "$tag" ]; then
        echo "no tag specified."
        exit 1
    fi

    failures=$(verifyUnitTests $url)
    if test ${#failures} -gt 4; then
        echo "test errors: $failures"
        exit 1
    fi
    echo "Tests are ok."

    replaceVersionTags version $1

    updateDictionary

    buildJs

    buildChromeExtensionZip
fi


if test $doEchoVersion -gt 0; then
    echo "version found: $version"
fi


if test $doUnitTest -gt 0; then
    mocha-phantomjs $url
fi