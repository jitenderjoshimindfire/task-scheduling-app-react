import React, { useState, useEffect } from "react";
import { Task } from "../../types/Task";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    task: Omit<Task, "_id" | "createdAt" | "creator" | "dueSoon" | "isOverdue">,
    taskId?: string,
  ) => void;
  initialData?: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<"inprogress" | "complete">("inprogress");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setDescription(initialData.description);
        setDueDate(initialData.dueDate.split("T")[0]);
        setStatus(
          initialData.status === "complete" ? "complete" : "inprogress",
        );
      } else {
        resetForm();
      }
    }
  }, [isOpen, initialData]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("inprogress");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, dueDate, status }, initialData?._id);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "inprogress" | "complete")
            }
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="inprogress">In Progress</option>
            <option value="complete">Completed</option>
          </select>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
