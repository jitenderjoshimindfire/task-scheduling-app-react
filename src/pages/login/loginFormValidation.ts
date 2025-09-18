export interface LoginFormValues {
  email: string;
  password: string;
}

export const validateLoginForm = (values: LoginFormValues) => {
  const errors: { [key: string]: string } = {};

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = " Password is required";
  }

  return errors;
};
