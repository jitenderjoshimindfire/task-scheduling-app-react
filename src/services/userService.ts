import { USER_API } from "../constants/apiEndpoints";
import axios from "axios";
import { User, LoginRequest, LoginResponse } from "../types/User";

export const registerUser = async (data: Omit<User, "_id">): Promise<User> => {
  const response = await axios.post<User>(`${USER_API}/register`, data);
  return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${USER_API}/login`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const refreshToken = async (): Promise<{ accessToken: string }> => {
  const response = await axios.post(
    `${USER_API}/refresh`,
    {},
    { withCredentials: true },
  );

  return response.data;
};

export const logoutUser = async () => {
  await axios.post(`${USER_API}/logout`, {}, { withCredentials: true });
};
