import { useEffect, useState } from "react";
import Card from "../components/Home/Card";
import axios from "axios";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ task: "", description: "" });
  const [editTask, setEditTask] = useState({
    id: "",
    task: "",
    description: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7007/api/task/tasks",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setTasks(response.data);
          console.log(response.data);
        } else {
          console.error("Data is not an array:", response.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch tasks:",
          error.response ? error.response.data : error.message
        );
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (task) => {
    setEditTask({
      id: task._id,
      task: task.task,
      description: task.description,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7007/api/task/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(
        "Failed to delete task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePin = async (id, currentPinStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:7007/api/task/tasks/${id}`,
        { pinned: !currentPinStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, pinned: response.data.pinned } : task
        )
      );
    } catch (error) {
      console.error(
        "Failed to pin/unpin task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleComplete = async (id, currentCompleteStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:7007/api/task/tasks/${id}`,
        { completed: !currentCompleteStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === id
            ? { ...task, completed: response.data.completed }
            : task
        )
      );
    } catch (error) {
      console.error(
        "Failed to complete/uncomplete task:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const handleAddTask = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTask({ task: "", description: "" });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditTask({ id: "", task: "", description: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7007/api/task/tasks",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTasks([response.data, ...tasks]);
      handleCloseModal();
    } catch (error) {
      console.error(
        "Failed to add task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:7007/api/task/tasks/${editTask.id}`,
        { task: editTask.task, description: editTask.description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === editTask.id
            ? {
                ...task,
                task: response.data.task,
                description: response.data.description,
              }
            : task
        )
      );
      handleCloseEditModal();
    } catch (error) {
      console.error(
        "Failed to edit task:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="p-6 bg-opacity-75 min-h-screen relative">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-12 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4a7 7 0 014.953 11.902l4.178 4.177a1 1 0 01-1.414 1.414l-4.177-4.178A7 7 0 1111 4z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {tasks
          .filter((task) =>
            task.task.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((task) => (
            <div key={task._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <Card
                task={task}
                onEdit={() => handleEdit(task)}
                onDelete={() => handleDelete(task._id)}
                onPin={() => handlePin(task._id, task.pinned)}
                onComplete={() => handleComplete(task._id, task.completed)}
              />
            </div>
          ))}
      </div>

      <button
        className="h-20 w-20 fixed bottom-8 right-8 transform -translate-x-1/2 bg-green-500 hover:bg-green-700 text-white font-bold text-4xl py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center"
        onClick={handleAddTask}
      >
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Add New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="task"
                >
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={newTask.task}
                  onChange={(e) =>
                    setNewTask({ ...newTask, task: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Edit Task</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="task"
                >
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={editTask.task}
                  onChange={(e) =>
                    setEditTask({ ...editTask, task: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editTask.description}
                  onChange={(e) =>
                    setEditTask({ ...editTask, description: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleCloseEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTask;
