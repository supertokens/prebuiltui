#!/bin/bash

# npm run build

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
# Check if README.md has been updated
if ! grep -q "cdn.jsdelivr.net/gh/supertokens/prebuiltui@v${version}/build/${new_file_name}" README.md; then
    # If not updated, perform the sed command
    sed -i '' "s|https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v[0-9.]+/build/static/js/[^.]+\.js|https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v${version}/build/${new_file_name}|g" README.md
else
    echo "README.md already contains the correct version and file name"
fi

# # Commit the changes
# git add README.md build
# git commit -m "Update to version ${version}"

# # Create and push the new tag
# git tag "v${version}"
# git push origin "v${version}"

# echo "Successfully created and pushed tag v${version}"