import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import routesPaths from "@routes/routes";

const ReloadHandler = () => {
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("reload")) {
      params.delete("reload");
      const newUrl = location.pathname + (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState(null, "", newUrl);
      window.location.reload();
    }
  }, [location]);
  return null;
};

const Router = () => {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <ReloadHandler />
      <Routes>
        {routesPaths.map(({ path, privateRoute, routes }) =>
          routes.map(([itemPath, element]) => (
            <Route
              key={path + itemPath}
              path={path + itemPath}
              element={privateRoute && token == null ? <Navigate to="/signin" /> : element}
            />
          ))
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
