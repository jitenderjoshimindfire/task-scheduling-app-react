export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;    
  createdAt: string;    
  creator: string;      
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string; 
  creator: string
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  dueDate?: string;
}

export interface TaskResponse {
  status: "success" | "error";
  message: string;
  data?: Task;
}

export interface TasksResponse {
  status: "success" | "error";
  message: string;
  data?: Task[];
}
