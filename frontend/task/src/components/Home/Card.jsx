import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faThumbtack,
  faCheckCircle,
  faCircle as faCircleOutline
} from "@fortawesome/free-solid-svg-icons";

const Card = ({ task, onEdit, onDelete, onPin, onComplete }) => {
  return (
    <div
      className={`relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 flex flex-col max-w-sm mx-auto h-full
        ${task.pinned ? "border-yellow-500" : ""} 
        ${task.completed ? "border-green-500" : ""}`}
    >
      {task.pinned && (
        <div className="absolute right-0 left-0 w-2 bg-yellow-500 h-full"></div>
      )}
      {task.completed && (
        <div className="absolute bottom-0 right-0 w-2 bg-green-500 h-full"></div>
      )}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{task.task}</h2>
        <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
      </div>
      
      <div className="flex justify-between items-center border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
            onClick={() => onEdit(task._id)}
            aria-label="Edit Task"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="text-red-500 hover:text-red-700 transition-colors duration-200"
            onClick={() => onDelete(task._id)}
            aria-label="Delete Task"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
          <button
            className={`transition-colors duration-200 ${task.pinned ? "text-yellow-700" : "text-yellow-500"}`}
            onClick={() => onPin(task._id, task.pinned)}
            aria-label="Pin Task"
          >
            <FontAwesomeIcon icon={task.pinned ? faThumbtack : faCircleOutline} />
          </button>
          <button
            className={`transition-colors duration-200 ${task.completed ? "text-green-700" : "text-green-500"}`}
            onClick={() => onComplete(task._id, task.completed)}
            aria-label="Complete Task"
          >
            <FontAwesomeIcon icon={task.completed ? faCheckCircle : faCircleOutline} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
