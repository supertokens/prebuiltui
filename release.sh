#!/bin/bash

npm run build

# Get the version of supertokens-auth-react from package.json
version=$(grep -o '"supertokens-auth-react": "[^"]*"' package.json | sed -E 's/.*: "([^"]+)".*/\1/')

if [ -z "$version" ]; then
    echo "Error: supertokens-auth-react version not found in package.json"
    exit 1
fi

# Get the new file name from the build folder
new_file_name=$(grep -o '"main.js": "[^"]*"' build/asset-manifest.json | sed -E 's/.*: "([^"]+)".*/\1/')

if [ -z "$new_file_name" ]; then
    echo "Error: main.js file not found in build/asset-manifest.json"
    exit 1
fi

# Remove the leading slash from the file name
new_file_name=${new_file_name#/}

# Update the README.md file
old_pattern="https://cdn.jsdelivr.net/gh/supertokens/prebuiltui.*\""
new_pattern="https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v${version}/build/${new_file_name}\""

if grep -q "$old_pattern" README.md; then
    sed -i.bak "s|$old_pattern|$new_pattern|g" README.md
    if [ $? -eq 0 ]; then
        rm README.md.bak
        echo "README.md has been updated with the new version and file name"
    else
        echo "Error: Failed to update README.md"
        exit 1
    fi
else
    echo "Error: Old pattern not found in README.md"
    exit 1
fi

# Commit the changes
git add --all
git commit -m "Release prep"

# Create and push the new tag
git tag "v${version}"
git push origin "v${version}"

git push

# set $SUPERTOKENS_API_KEY based on reading ./releasePassword file
SUPERTOKENS_API_KEY=$(cat ./releasePassword)

responseStatus=$(curl -o /dev/null -s -w "%{http_code}" -X PUT \
    https://api.supertokens.io/0/frontend/auth-react \
    -H 'Content-Type: application/json' \
    -H 'api-version: 0' \
    -d "{
        \"uri\": \"https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v${version}/build/${new_file_name}\",
        \"password\": \"$SUPERTOKENS_API_KEY\"
    }")
if [ "$responseStatus" -ne 200 ]
then
    echo "failed PUT API to update js deliver uri on server with status code: $responseStatus. You need to manually call this API with the right url!"
    exit 1
fi

echo "Successfully created and pushed tag v${version}"
