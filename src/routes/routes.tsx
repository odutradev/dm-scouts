import Main from "@pages/main";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";

const routes = [
    {
        path: "/",
        privateRoute: false,
        routes: [
            ['/', <Main />],
            ['*', <Main />],
            ['/signin', <SignIn />],
            ['/signup', <SignUp />],
        ]
    },
];

export default routes;