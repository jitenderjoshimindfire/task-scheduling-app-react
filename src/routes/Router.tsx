import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "../pages/home/Home";
import Header from "../pages/Header";
import Footer from "../pages/Footer";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";

const MainLayout = () => {
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
      { path: "home", element: <Home /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
