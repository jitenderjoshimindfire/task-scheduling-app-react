import axios from "axios";
import { TASK_API } from "../constants/apiEndpoints";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  TasksResponse,
} from "../types/Task";

const authConfig = (token?: string | null) =>
  token ? { headers: { Authorization: `Bearer ${token}` } } : {};

// Create Task
export const createTask = async (
  data: CreateTaskRequest,
  token?: string | null,
): Promise<TaskResponse> => {
  const response = await axios.post<TaskResponse>(
    `${TASK_API}/tasks`,
    data,
    authConfig(token),
  );
  return response.data;
};

export const getAllTasks = async (
  token?: string | null,
): Promise<TasksResponse> => {
  const response = await axios.get<TasksResponse>(
    `${TASK_API}/tasks`,
    authConfig(token),
  );
  return response.data;
};

export const getTaskById = async (
  id: string,
  token?: string | null,
): Promise<TaskResponse> => {
  const response = await axios.get<TaskResponse>(
    `${TASK_API}/tasks/${id}`,
    authConfig(token),
  );
  return response.data;
};

export const updateTask = async (
  id: string,
  data: UpdateTaskRequest,
  token?: string | null,
): Promise<TaskResponse> => {
  const response = await axios.put<TaskResponse>(
    `${TASK_API}/tasks/${id}`,
    data,
    authConfig(token),
  );
  return response.data;
};

export const deleteTask = async (
  id: string,
  token?: string | null,
): Promise<TaskResponse> => {
  const response = await axios.delete<TaskResponse>(
    `${TASK_API}/tasks/${id}`,
    authConfig(token),
  );
  return response.data;
};
