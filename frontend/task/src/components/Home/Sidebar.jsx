import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faThumbtack, faCheckCircle, faTrashAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = ({ user, handleLogout }) => {
  const [showHeader, setShowHeader] = useState(false);

  const data = [
    { id: 1, name: 'Home', path: '/', icon: faHome },
    { id: 2, name: 'Pinned Task', path: '/pinned', icon: faThumbtack },
    { id: 3, name: 'Completed Task', path: '/completed', icon: faCheckCircle },
    { id: 4, name: 'Deleted Task', path: '/deleted', icon: faTrashAlt },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen w-20 hover:w-64 transition-all duration-300 p-4 flex flex-col relative">
      <div className="flex flex-col items-center flex-grow">
        <div
          className={`flex items-center mb-4 px-2 py-2 rounded relative w-full transition-all duration-500 ${showHeader ? 'transform translate-x-0 opacity-100' : 'transform translate-x-[-100%] opacity-0'}`}
          onMouseEnter={() => setShowHeader(true)}
          onMouseLeave={() => setShowHeader(false)}
        >
          <div className="ml-4 whitespace-nowrap overflow-hidden flex items-center">
            <div className="z-10 absolute top-5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform translate-y-[-50%]">
              <h1 className="font-bold text-xl">{user.name}</h1>
              <h4 className="text-gray-200">{user.email}</h4>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col w-full">
          {data.map((item) => (
            <Link
              to={item.path}
              key={item.id}
              className="my-2 mx-4 px-2 py-2 rounded hover:bg-gray-800 transition-all duration-300 flex items-center group"
            >
              <div className="p-2 transform transition-transform duration-300 group-hover:scale-110">
                <FontAwesomeIcon icon={item.icon} className="mr-2" />
              </div>
              <span className="ml-4 whitespace-nowrap overflow-hidden font-bold transform transition-transform duration-300 group-hover:translate-x-2">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto w-full">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 mb-10 px-4 w-full rounded flex items-center justify-center transition-all duration-300 group"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 transform transition-transform duration-300 group-hover:rotate-90" />
          <span className="whitespace-nowrap overflow-hidden transform transition-transform duration-300 group-hover:translate-x-2">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
