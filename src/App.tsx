import { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { Routes, BrowserRouter as Router } from "react-router-dom";
import { PreBuiltUIList } from "./index";


function App() {
    return (
        <SuperTokensWrapper>
            <Router>
                <Routes>
                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), PreBuiltUIList)}
                </Routes>
            </Router>
        </SuperTokensWrapper>
    );
}

export default App;
