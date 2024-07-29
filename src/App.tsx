import { useState, useEffect } from "react";
import { SuperTokensWrapper, redirectToAuth } from "supertokens-auth-react";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";
import { PreBuiltUIList } from "./index";

function App() {
    const [showUi, setShowUi] = useState(false);

    useEffect(() => {
        if (canHandleRoute(PreBuiltUIList)) {
            setShowUi(true);
        } else {
            redirectToAuth({
                redirectBack: false
            });
        }
    }, []);

    if (showUi) {
        return (
            <SuperTokensWrapper>
                {getRoutingComponent(PreBuiltUIList)}
            </SuperTokensWrapper>
        );
    }

    return null;
}

export default App;
