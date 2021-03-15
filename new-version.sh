curr_version=$1
new_version=$2

echo "Updating to $new_version..."

find ./packages -type f -name package.json -exec sed -i "s/$curr_version/$new_version/g" {} \;

echo "Bulding..."

yarn build --force

echo "Tagging..."

git tag "v$new_version"

echo "Publishing..."

yarn workspace @saitonakamura/presa publish -y
yarn workspace @saitonakamura/presa-blocks publish -y