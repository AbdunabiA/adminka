import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
const Registration = lazy(() => import("pages/auth/registration"));
const SignIn = lazy(() => import("pages/auth/signIn"));
const Banner = lazy(() => import("pages/banner"));
const Posts = lazy(()=>import("pages/posts"));
const Pages = lazy(() => import("pages/pages"));

const authRoutes = [
  // {
  //   path: "/auth/login",
  //   element: <Login />,
  // },
  {
    path: "/auth/registration",
    element: <Registration />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/banner",
    element: <Banner />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/pages",
    element: <Pages />,
  }
];

export { authRoutes, privateRoutes };
