# Contributing guide

## Setup dev env
```
npm i --dev
```

## Start server for local testing
```
npm run start
```

This will start the server on `http://localhost:3000`, and the bundle can be accessed on `http://localhost:3000/static/js/bundle.js`

## Build
```
npm run build
```

## Release a new version
- Make sure to modify the `supertokens-auth-react` version in `package.json` to an exact version
- Run `./release.sh`: This will build, create and push a tag with the format of `vX.Y.Z` that corresponds to the supertokens-auth-react version in `package.json`
- Create a new release on GitHub.

## Modifying an existing version
- JSDelivery does not remove older URLs, so we can safely modify existing tags
- Remove existing tag in remote: `git push origin --delete vX.Y.Z`
- Remove existing tag locally: `git tag -d vX.Y.Z`
- Run `./release.sh`
- Modify the release on GitHub.