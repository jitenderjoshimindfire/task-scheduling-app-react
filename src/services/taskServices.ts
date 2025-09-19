import { TASK_API } from "../constants/apiEndpoints";
import axios from "axios";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  TasksResponse,
} from "../types/Task";

// Create Task
export const createTask = async (
  data: CreateTaskRequest,
): Promise<TaskResponse> => {
  const response = await axios.post<TaskResponse>(`${TASK_API}`, data);
  return response.data;
};

// Get All Tasks
export const getAllTasks = async (): Promise<TasksResponse> => {
  const response = await axios.get<TasksResponse>(`${TASK_API}`);
  return response.data;
};

// Get Task by ID
export const getTaskById = async (id: string): Promise<TaskResponse> => {
  const response = await axios.get<TaskResponse>(`${TASK_API}/${id}`);
  return response.data;
};

// Update Task
export const updateTask = async (
  id: string,
  data: UpdateTaskRequest,
): Promise<TaskResponse> => {
  const response = await axios.put<TaskResponse>(`${TASK_API}/${id}`, data);
  return response.data;
};

// Delete Task
export const deleteTask = async (id: string): Promise<TaskResponse> => {
  const response = await axios.delete<TaskResponse>(`${TASK_API}/${id}`);
  return response.data;
};
