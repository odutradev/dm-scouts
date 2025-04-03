import { Navigate } from "react-router-dom";

import NotFound from "@pages/notFound";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";
import Logout from "@pages/logout";
import Dashboard from "@pages/dashboard";
import AdminConfig from "@pages/adminConfig";

const InitialRoute = () => localStorage.getItem("token") != null ? <Navigate to="/dashboard" replace/> : <Navigate to="/signin" />;

const routes = [
    {
        path: "/",
        privateRoute: false,
        routes: [
            ["*", <Navigate to="/not-found" replace/>],
            ['/not-found', <NotFound />],
            ['/logout', <Logout />],
            ['/signin', <SignIn />],
            ['/signup', <SignUp />],
            ['', <InitialRoute />],

        ]
    },
    {
        path: "/dashboard",
        privateRoute: true,
        routes: [
            ['/', <Dashboard />],

        ]
    },
    {
        path: "/admin",
        privateRoute: true,
        routes: [
            ['/config', <AdminConfig />],

        ]
    },
];

export default routes;