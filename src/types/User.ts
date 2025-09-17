export interface User {
  _id: string;
  email: string;
  password: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User | null;
  accessToken: string;
  status: string;
}
