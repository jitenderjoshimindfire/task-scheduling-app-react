export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;    
  createdAt: string;    
  creator: string;     
  isOverdue: boolean;
  dueSoon: boolean;
  status: "complete" | "inprogress";
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  dueDate: string; 
  creator: string;
  status?: "complete" | "inprogress";  // optional on create, defaults to "inprogress"
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  dueDate?: string;
  status?: "complete" | "inprogress";  // optional on update
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
