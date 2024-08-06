// const PinnedTask = () => {
//   return (
//     <div>
//       PinnedTask
//     </div>
//   )
// }

// export default PinnedTask

import React, { useEffect, useState } from "react";
import Card from "../components/Home/Card";
import axios from "axios";

const PinnedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:7007/api/task/tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await response.json();
      setTasks(data.filter((task) => task.pinned)); // Filter for pinned tasks that are not completed
      setFilteredTasks(data.filter((task) => task.pinned && !task.completed)); // Filter for pinned tasks that are not completed
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.task.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tasks]);

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
  return (
    <div className="p-6 bg-opacity-75 min-h-screen relative">
      {/* Search Bar */}
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

      {/* Task Cards */}
      <div className="flex flex-wrap gap-6 justify-center">
        {filteredTasks.map((task) => (
          <div key={task._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <Card
              task={task}
              onEdit={() => console.log(`Edit task ${task._id}`)}
              onDelete={async () => {
                await fetch(
                  `http://localhost:7007/api/task/tasks/${task._id}`,
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );
                setTasks(tasks.filter((t) => t._id !== task._id));
              }}
              onPin={() => handlePin(task._id, task.pinned)}
              onComplete={() => handleComplete(task._id, task.completed)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedTask;
