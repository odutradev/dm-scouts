import Main from "@pages/main";
import NotFound from "@pages/notFound";
import SignIn from "@pages/signin";
import SignUp from "@pages/signup";

const routes = [
    {
        path: "/",
        privateRoute: false,
        routes: [
            ['/signin', <SignIn />],
            ['/signup', <SignUp />],
            ['*', <NotFound />],
            ['/', <Main />],
        ]
    },
];

export default routes;