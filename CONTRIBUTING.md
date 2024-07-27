# Contributing guide

## Setup dev env
```
npm i --dev
```

## Build
```
npm run build
```

## Release a new version
- Make sure to modify the `supertokens-auth-react` version in `package.json` to an exact version
- Run `npm run build`
- Change the README.md to use the new version for the jsDelivery link
- Commit and push the changes
- Run `./release.sh`: This will create and push a tag with the format of `vX.Y.Z` that corresponds to the supertokens-auth-react version in `package.json`
- Create a new release on GitHub