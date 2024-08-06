// import Sidebar from '../components/Home/Sidebar';
// import { Outlet, useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-[98vh] gap-5 overflow-hidden bg-background">
//       <div className="rounded w-1/6 h-full overflow-hidden">
//         <Sidebar handleLogout={handleLogout} />
//       </div>
//       <div className="rounded w-5/6 h-full overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Sidebar from "../components/Home/Sidebar";

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await axios.get(
          "http://localhost:7007/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        setError("Failed to fetch user profile.");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    // localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-[98vh] gap-5 overflow-hidden bg-background">
      <div className="rounded w-1/6 h-full overflow-hidden">
        <Sidebar user={user} handleLogout={handleLogout} />
      </div>
      <div className="rounded w-5/6 h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
