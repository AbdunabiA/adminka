import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
const Registration = lazy(() => import("pages/auth/registration"));
const SignIn = lazy(() => import("pages/auth/signIn"));
const Banners = lazy(() => import("pages/banner"));
const CreateBanner = lazy(()=>import('pages/banner/create'))
const UpdateBanner = lazy(()=>import('pages/banner/update'))
const Posts = lazy(()=>import("pages/posts"));
const CreatePost = lazy(()=>import('pages/posts/create'));
const UpdatePost = lazy(() => import("pages/posts/update"));
const Pages = lazy(() => import("pages/pages"));
const CreatePage = lazy(() => import("pages/pages/create"));
const UpdatePage = lazy(() => import("pages/pages/update"));
const Menus = lazy(() => import("pages/menu"));
const MenuItems = lazy(()=>import('pages/menu-items'))


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
    element: <Banners />,
  },
  {
    path: "/banner/create",
    element: <CreateBanner />,
  },
  {
    path: "banner/update/:id",
    element: <UpdateBanner />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/post/create",
    element: <CreatePost />,
  },
  {
    path: "/post/update/:id",
    element: <UpdatePost />,
  },
  {
    path: "/pages",
    element: <Pages />,
  },
  {
    path: "/page/update/:id",
    element: <UpdatePage />,
  },
  {
    path: "/page/create",
    element: <CreatePage />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/menu-items/:id",
    element: <MenuItems />,
  },
];

export { authRoutes, privateRoutes };
