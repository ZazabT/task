// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:7007/api/user/login', { email, password });
//       setMessage(res.data.msg);

//       // Store the access token and user info
//       localStorage.setItem('accessToken', res.data.accessToken);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       // Navigate to the home page
//       navigate("/");  // Make sure to have a route set up for '/home'
//     } catch (err) {
//       setMessage(err.response.data.msg);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-background bg-opacity-75">
//       <div className="w-full max-w-md bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Welcome Back</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               id="email"
//               placeholder="Enter your email"
//               className="w-full p-3 border border-white rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               placeholder="Enter your password"
//               className="w-full p-3 border border-white rounded-lg text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
//           >
//             Sign In
//           </button>
//           <p className="mt-4 text-center text-white">
//             New here? <a href="/register" className="text-blue-500 hover:text-blue-700">Join the Club</a>
//           </p>
//         </form>
//         {message && <p className="mt-4 text-center text-white">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Login;

// src/components/LoginPage.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7007/api/user/login", {
        email,
        password,
      });
      setMessage("Login successful");

      // Store the access token and user info
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate to the home page
      setEmail("");
      setPassword("");
      setMessage("");
      navigate("/");
    } catch (err) {
      setMessage(err.response.data.error);
    }
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background bg-opacity-75">
      <div className="w-full max-w-md bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-white rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 border bg-white text-black rounded-lg  bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-400 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Sign In
          </button>
          <p className="mt-4 text-center text-white">
            New here?{" "}
            <a href="/register" className="text-blue-500 hover:text-blue-700">
              Join the Club
            </a>
          </p>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${message === "Registration successful! Please check your email to verify your account" ? "text-green-900" : "text-red-700"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
