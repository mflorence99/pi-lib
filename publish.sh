pushd client/app/lib
gulp
pushd dist
npm publish
popd
rm -rf /usr/src/app/pi-led/node_modules/pi-lib
mkdir -p /usr/src/app/pi-led/node_modules/pi-lib
cp -r ./dist/. /usr/src/app/pi-led/node_modules/pi-lib
popd
