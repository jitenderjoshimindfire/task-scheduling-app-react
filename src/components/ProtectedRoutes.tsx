import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../redux-toolkit/authSlice";

const ProtectedRoute: React.FC = () => {
  const auth = useSelector(selectAuth);

  // Only consider user as logged in if user object and accessToken exist
  if (!auth.user || !auth.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
