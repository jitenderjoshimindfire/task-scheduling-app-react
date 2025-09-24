import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "../pages/home/Home";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import { useTokenExpiryTimer } from "../utils/useTokenExpiryTimer";
import RefreshTokenModal from "../components/RefreshTokenModal";
import ProtectedRoute from "../components/ProtectedRoutes";

const MainLayout = () => {
  useTokenExpiryTimer();
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white  shadow-sm sticky top-0 z-50">
        <Header />
      </header>

      <main className="flex-grow">
        <Suspense fallback={<div>Loading.......</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="bg-grey-100  border-t border-gray-200 dark:border-gray-800">
        <Footer />
        <RefreshTokenModal />
      </footer>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "home", element: <Home /> }],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
