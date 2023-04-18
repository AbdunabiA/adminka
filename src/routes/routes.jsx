import React, { Suspense, lazy } from "react";
import { Layout } from "components";
import { Route, Routes } from "react-router-dom";
import { authRoutes, privateRoutes } from "./index";
import { useSelector } from "react-redux";
import { get } from "lodash";

const PostPage = lazy(() => import("pages/pages/postPage"));

const appRoutes = (routes) => {
  return routes.map((route, key) => (
    <React.Fragment key={key}>
      <Route
        path={route.path}
        element={<Suspense fallback="LOADING...">{route.element}</Suspense>}
      />
      {route.children && appRoutes(route.children)}
    </React.Fragment>
  ));
};

const routesWrapper = () => {
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));
  return (
    <Routes>
      <Route path="*" element={<h2>Not Fonund</h2>} />
      {isAuthenticated ? (
        <Route>
          <Route path="/" element={<Layout />}>
            {appRoutes(privateRoutes)}
          </Route>
          <Route
            path="/pages/postPage"
            element={
              <Suspense fallback="LOADING...">
                <PostPage />
              </Suspense>
            }
          />
        </Route>
      ) : (
        appRoutes(authRoutes)
      )}
    </Routes>
  );
  // return <Routes>{appRoutes(privateRoutes)}</Routes>;
};

export default routesWrapper;
