import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
const Registration = lazy(() => import("pages/auth/registration"));
const SignIn = lazy(() => import("pages/auth/signIn"));
const Banner = lazy(() => import("pages/banner"));
const CreateBanner = lazy(()=>import('pages/banner/create'))
const UpdateBanner = lazy(()=>import('pages/banner/update'))
const Posts = lazy(()=>import("pages/posts"));
const Pages = lazy(() => import("pages/pages"));
const CreatePage = lazy(() => import("pages/pages/CreatePage"));
const UpdatePage = lazy(() => import("pages/pages/UpdatePage"));
const UpdatePosts = lazy(()=>import('pages/posts/update'))

const authRoutes = [
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
    path: "/banners",
    element: <Banner />,
  },
  {
    path: "/banner/create",
    element: <CreateBanner />,
  },
  {
    path:'banner/update/:id',
    element:<UpdateBanner/>,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/posts/update/:id",
    element: <UpdatePosts />,
  },
  {
    path: "/pages",
    element: <Pages />,
  },
  {
    path: "/pages/update/:id",
    element: <UpdatePage />,
  },
  {
    path: "/pages/create",
    element: <CreatePage />,
  },
];

export { authRoutes, privateRoutes };
