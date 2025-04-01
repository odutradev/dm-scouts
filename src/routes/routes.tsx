import { Navigate } from "react-router-dom";

import NotFound from "@pages/notFound";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";
import Main from "@pages/main";

const InitialRoute = () => localStorage.getItem("token") != null ? <Navigate to="/dashboard" replace/> : <Navigate to="/signin" />;

const routes = [
    {
        path: "/",
        privateRoute: false,
        routes: [
            ["*", <Navigate to="/not-found" replace/>],
            ['not-found', <NotFound />],
            ['/dashboard', <Main />],
            ['/signin', <SignIn />],
            ['/signup', <SignUp />],
            ['', <InitialRoute />],

        ]
    },
];

export default routes;