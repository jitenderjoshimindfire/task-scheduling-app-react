import React from "react";

interface SignupFormProps {
  username: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  errors: { [key: string]: string };
  onUsernameChange: (val: string) => void;
  onPasswordChange: (val: string) => void;
  onConfirmPasswordChange: (val: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  username,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  errors,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onSubmit,
}) => {
  return (
    <form
      className="container max-w-md mx-auto p-6"
      onSubmit={onSubmit}
      noValidate
    >
      <h1 className="text-2xl mb-6">Signup</h1>

      <div className="mb-4">
        <label className="block mb-1">User name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          className={`block w-full border rounded px-3 py-2 ${
            errors.username ? "border-red-500" : "border-black"
          }`}
          aria-invalid={!!errors.username}
          aria-describedby="username-error"
        />
        {errors.username && (
          <p className="text-red-600 mt-1 text-sm" id="username-error">
            {errors.username}
          </p>
        )}
      </div>

      <div className="mb-4 relative">
        <label className="block mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className={`block w-full border rounded px-3 py-2 ${
            errors.password ? "border-red-500" : "border-black"
          }`}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-9 text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        {errors.password && (
          <p className="text-red-600 mt-1 text-sm" id="password-error">
            {errors.password}
          </p>
        )}
      </div>

      <div className="mb-4 relative">
        <label className="block mb-1">Confirm Password</label>
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          className={`block w-full border rounded px-3 py-2 ${
            errors.confirmPassword ? "border-red-500" : "border-black"
          }`}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="confirm-password-error"
        />
        <button
          type="button"
          onClick={onToggleConfirmPassword}
          className="absolute right-3 top-9 text-gray-600"
          aria-label={
            showConfirmPassword
              ? "Hide confirm password"
              : "Show confirm password"
          }
        >
          {showConfirmPassword ? "🙈" : "👁️"}
        </button>
        {errors.confirmPassword && (
          <p className="text-red-600 mt-1 text-sm" id="confirm-password-error">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
