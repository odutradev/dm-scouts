import { Navigate } from "react-router-dom";

import NotFound from "@pages/notFound";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";
import Logout from "@pages/logout";
import Dashboard from "@pages/dashboard";
import AdminConfig from "@pages/adminConfig";
import ProfileEdit from "@pages/profile";
import Users from "@pages/users";
import UserEdit from "@pages/user";
import Bases from "@pages/bases";
import EditBasePage from "@pages/base";
import Teams from "@pages/teams";
import EditTeamPage from "@pages/team";

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
            ['/profile', <ProfileEdit />],

        ]
    },
    {
        path: "/admin",
        privateRoute: true,
        routes: [
            ['/config', <AdminConfig />],
            ['/user/:id', <UserEdit />],
            ['/base/:id', <EditBasePage />],
            ['/team/:id', <EditTeamPage/>],
            ['/users', <Users />],
            ['/bases', <Bases />],
            ['/teams', <Teams />],

        ]
    },
];

export default routes;