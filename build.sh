# Refresh dictionary
cd dictionary
php csvToJson.php
cd ..

# Build JavaScript
node r.js -o build.js

# Build zip file for Chrome
cd build
rm build.zip
zip build.zip *
cd ..

