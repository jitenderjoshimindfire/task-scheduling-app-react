import React, { useState } from "react";
import { registerUser } from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateSignup } from "./signupFormValidation";
import SignupForm from "./SignupForm";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = { username, password, confirmPassword };
    const validationErrors = validateSignup(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const data = { email: username, password, roles: ["user"] };
      await registerUser(data);
      toast.success("Signup successful! Please login.");
      setUsername("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <SignupForm
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        errors={errors}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onConfirmPasswordChange={setConfirmPassword}
        onTogglePassword={() => setShowPassword((show) => !show)}
        onToggleConfirmPassword={() => setShowConfirmPassword((show) => !show)}
        onSubmit={handleSignup}
      />
    </>
  );
};

export default Signup;
