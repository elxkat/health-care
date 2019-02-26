
rm -rf ../public/
mkdir ../public/
yarn build
cp -r ./build/* ../public
firebase deploy --only hosting