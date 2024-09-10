# Pre built UI bundle for SuperTokens

To integrate it with your project, you will need to add the following script tags to the HEAD of your HTML (on the `/auth/*` route of your application), and also modify the body to add a `<div id="supertokensui"></div>`:

```html
<html>

<head>
    <script defer="defer">
        window.addEventListener('supertokensScriptLoaded', (e) => {
            window.supertokensUIInit('supertokensui', {
                appInfo: {
                    websiteDomain: 'http://localhost:3000',
                    apiDomain: 'http://localhost:3001',
                    appName: 'My Demo App',
                    websiteBasePath: "/auth"
                },
                recipeList: [
                    window.supertokensUIEmailPassword.init(),
                    window.supertokensUIThirdParty.init({
                        signInAndUpFeature: {
                            providers: [
                                window.supertokensUIThirdParty.Github.init(),
                                window.supertokensUIThirdParty.Google.init(),
                            ]
                        }
                    }),
                    window.supertokensUISession.init(),
                ],
            });
        });
    </script>
    <script defer="defer"
        src="https://cdn.jsdelivr.net/gh/supertokens/prebuiltui@v0.47.0/build/static/js/main.8f01ace8.js"></script>
</head>

<body>
    <div id="supertokensui"></div>
</body>

</html>
```

The above initialization code is for a pre-built UI bundle for SuperTokens:
- We assume that you are serving this HTML on `/auth` and `/auth/*` routes on `http://localhost:3000` in the above config, but if not, please feel free to change the contents of the `appInfo` config.
- The above also assumes that you are running your API (that integrates with our backend SDK) on `http://localhost:3001`.
- We init the email password, the third party recipe (with google and github login), and the session recipe, but you have several other options too. For more information, please visit the [SuperTokens website](https://supertokens.com/docs/guides).