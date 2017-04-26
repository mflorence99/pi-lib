version=${1:-patch}

set -e

mversion -m "Updated to version %s" "$version"
git push origin master --tags

pushd client/app/lib
gulp
pushd dist
npm publish
popd
# rm -rf /usr/src/app/pi-led/node_modules/pi-lib
# mkdir -p /usr/src/app/pi-led/node_modules/pi-lib
# cp -r ./dist/. /usr/src/app/pi-led/node_modules/pi-lib
popd
