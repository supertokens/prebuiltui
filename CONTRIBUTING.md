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
- Run `./release.sh`: This will build, create and push a tag with the format of `vX.Y.Z` that corresponds to the supertokens-auth-react version in `package.json`
- Create a new release on GitHub