import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../../redux-toolkit/authSlice";
import { Task } from "../../types/Task";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../../services/taskServices";
import TaskModal from "./TaskModal";
import { RootState } from "../../redux-toolkit/store";
import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_BASE_URL);

const Home: React.FC = () => {
  const user = useSelector(selectUser);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await getAllTasks(token);
      const userTasks = response.data?.filter(
        (task: Task) => task.creator === user?._id,
      );
      if (userTasks) setTasks(userTasks);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !user) return;

    fetchTasks();

    socket.on("taskUpdate", (updatedTasks: Task[]) => {
      const userTasks = updatedTasks.filter(
        (task: Task) => task.creator === user._id,
      );
      setTasks(userTasks);
      userTasks.forEach((task) => {
        if (task.isOverdue) {
          toast.error(`Task "${task.title}" is overdue!`);
        } else if (task.dueSoon) {
          toast.warn(`Task "${task.title}" is due within 24 hours`);
        }
      });
    });

    return () => {
      socket.off("taskUpdate");
    };
  }, [token, user]);

  const handleSubmit = async (
    taskData: Omit<
      Task,
      "_id" | "createdAt" | "creator" | "dueSoon" | "isOverdue"
    >,
    taskId?: string,
  ) => {
    if (!token) return;
    try {
      const dueDateWithTime = new Date(taskData.dueDate).toISOString();

      const payload = {
        ...taskData,
        dueDate: dueDateWithTime,
        creator: user?._id || "",
      };

      if (taskId) {
        await updateTask(taskId, payload, token);
        toast.success("Task updated successfully");
      } else {
        await createTask(payload, token);
        toast.success("Task created successfully");
      }
      fetchTasks();
    } catch {
      toast.error("Failed to save task");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteTask(id, token);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={() => {
            setEditTask(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Add one!</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`flex flex-col md:flex-row justify-between items-start md:items-center border rounded p-4 shadow-sm ${
                task.isOverdue
                  ? "border-red-500 bg-red-50"
                  : task.dueSoon
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-gray-200"
              }`}
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Created: {new Date(task.dueDate).toISOString().substring(0, 10)} |{" "}
                  Due: {new Date(task.dueDate).toISOString().substring(0, 10)}

                </p>
              </div>
              <div className="flex space-x-2 mt-3 md:mt-0">
                <button
                  onClick={() => {
                    setEditTask(task);
                    setModalOpen(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editTask}
      />
    </div>
  );
};

export default Home;
