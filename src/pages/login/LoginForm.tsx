import React, { useState } from "react";
import { validateLoginForm } from "./loginFormValidation";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onSubmit(email, password);
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
      noValidate
    >
      <h1 className="text-2xl mb-6 font-bold text-center">Login</h1>

      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          className={`block w-full border rounded px-3 py-2 ${
            errors.email ? "border-red-600" : "border-gray-800"
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p className="text-red-600 mt-1 text-sm" id="email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-4 relative">
        <label className="block mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className={`block w-full border rounded px-3 py-2 ${
            errors.password ? "border-red-600" : "border-gray-800"
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        <button
          type="button"
          className="absolute right-3 top-9 text-gray-600"
          onClick={() => setShowPassword((show) => !show)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        {errors.password && (
          <p className="text-red-600 mt-1 text-sm" id="password-error">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
