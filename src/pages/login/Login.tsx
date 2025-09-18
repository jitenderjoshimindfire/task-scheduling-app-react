// Login.tsx (component)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  login,
  selectAuth,
  selectAuthLoading,
} from "../../redux-toolkit/authSlice";
import { AppDispatch } from "../../redux-toolkit/store";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authState = useSelector(selectAuth);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (authState.user && authState.accessToken) {
      navigate("/home");
    }
  }, [authState.user, authState.accessToken, navigate]);

  useEffect(() => {
    console.log(authState);
    if (authState.error) {
      toast.error(authState.error);
    }
  }, [authState.error]);

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className="container max-w-md mx-auto py-10">
      <ToastContainer />
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

export default Login;
