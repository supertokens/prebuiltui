import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification"
import MFA from "supertokens-auth-react/recipe/multifactorauth"
import TOTP from "supertokens-auth-react/recipe/totp"
import OAuth2Provider from "supertokens-auth-react/recipe/oauth2provider"
import UserRoles from "supertokens-auth-react/recipe/userroles"
import MultiTenancy from "supertokens-auth-react/recipe/multitenancy"

import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { PasswordlessPreBuiltUI } from "supertokens-auth-react/recipe/passwordless/prebuiltui";
import { SessionPreBuiltUI } from "supertokens-auth-react/recipe/session/prebuiltui";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui"
import { MultiFactorAuthPreBuiltUI } from "supertokens-auth-react/recipe/multifactorauth/prebuiltui"
import { TOTPPreBuiltUI } from "supertokens-auth-react/recipe/totp/prebuiltui"
import { OAuth2ProviderPreBuiltUI } from "supertokens-auth-react/recipe/oauth2provider/prebuiltui"

export let PreBuiltUIList: any[] = [];

// we call this supertokensUI and not supertokens cause if someone is using web-js via a script, then it would 
// clash for them.

(window as any).supertokensUI = SuperTokens;
(window as any).supertokensUIEmailPassword = {
    ...EmailPassword,
    init: (input: any) => {
        PreBuiltUIList.push(EmailPasswordPreBuiltUI);
        return EmailPassword.init(input);
    }
};
(window as any).supertokensUIThirdParty = {
    ...ThirdParty,
    init: (input: any) => {
        PreBuiltUIList.push(ThirdPartyPreBuiltUI);
        return ThirdParty.init(input);
    }
};
(window as any).supertokensUIPasswordless = {
    ...Passwordless,
    init: (input: any) => {
        PreBuiltUIList.push(PasswordlessPreBuiltUI);
        return Passwordless.init(input);
    }
};
(window as any).supertokensUIEmailVerification = {
    ...EmailVerification,
    init: (input: any) => {
        PreBuiltUIList.push(EmailVerificationPreBuiltUI);
        return EmailVerification.init(input);
    }
};
(window as any).supertokensUISession = {
    ...Session,
    init: (input: any) => {
        PreBuiltUIList.push(SessionPreBuiltUI);
        return Session.init(input);
    }
};
(window as any).supertokensUIMultiFactorAuth = {
    ...MFA,
    init: (input: any) => {
        PreBuiltUIList.push(MultiFactorAuthPreBuiltUI);
        return MFA.init(input);
    }
};
(window as any).supertokensUITOTP = {
    ...TOTP,
    init: (input: any) => {
        PreBuiltUIList.push(TOTPPreBuiltUI);
        return TOTP.init(input);
    }
};
(window as any).supertokensUIOAuth2Provider = {
    ...OAuth2Provider,
    init: (input: any) => {
        PreBuiltUIList.push(OAuth2ProviderPreBuiltUI);
        return OAuth2Provider.init(input);
    }
};

(window as any).supertokensUIMultitenancy = MultiTenancy;
(window as any).supertokensUIUserRoles = UserRoles;

function supertokensUIInit(divId: string, customConfig: any) {
    SuperTokens.init(customConfig);

    let element = document.getElementById(divId);
    if (element !== null) {
        const root = ReactDOM.createRoot(element as HTMLElement);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    }
}

(window as any).supertokensUIInit = supertokensUIInit;

window.dispatchEvent(new Event("supertokensScriptLoaded"));