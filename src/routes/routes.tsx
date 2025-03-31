import Main from "@pages/main";
import SignIn from "@pages/signin";

const routes = [
    {
        path: "/",
        privateRoute: false,
        routes: [
            ['/', <Main />],
            ['/signin', <SignIn />],
        ]
    },
];

export default routes;