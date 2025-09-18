export interface SignupFormValues {
  username: string; // treated as email now
  password: string;
  confirmPassword: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateSignup = (values: SignupFormValues): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Email validation (username as email)
  if (!values.username.trim()) {
    errors.username = "Email is required";
  } else {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.username)) {
      errors.username = "Invalid email address";
    }
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else {
    if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    // Check for at least one number and one special character
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!numberRegex.test(values.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!specialCharRegex.test(values.password)) {
      errors.password = "Password must contain at least one special character";
    }
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
