VERSION=$(grep -o '"version": "[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*"' build/manifest.json)
VERSION=${VERSION:12:-1}

# Tagging, hints:
# http://stackoverflow.com/a/7069755
while test $# -gt 0; do
        case "$1" in
                -t)
                        shift
                        if test $# -gt 0; then
                                sed -i "s/v$VERSION/v$1/" index.html
                                sed -i "s/v$VERSION/v$1/" build/popup.html
                                sed -i "s/$VERSION/$1/" build/manifest.json
                        else
                                echo "no tag specified"
                                exit 1
                        fi
                        echo "version change: $1 --> $VERSION"

                        # Refresh dictionary
                        cd dictionary
                        php csvToJson.php
                        cd ..
                        echo "Dictionary refreshed"

                        # Build JavaScript
                        node r.js -o build.js
                        echo "JavaScript rebuilt"

                        # Build zip file for Chrome
                        cd build
                        rm build.zip
                        zip build.zip *
                        cd ..
                        echo "Zip for Chrome rebuilt"

                        shift
                        ;;

                -v)
                        shift

                        echo "version found: $VERSION"

                        shift
                        ;;
        esac
done
