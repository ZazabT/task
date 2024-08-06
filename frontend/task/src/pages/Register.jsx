import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:7007/api/user/signup", {
        name,
        email,
        password,
      });
      setMessage(
        "Registration successful! Please check your email to verify your account."
      );
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setMessage("");
      }, 7000);
    } catch (err) {
      setMessage(err.response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background bg-opacity-75">
      <div className="w-full max-w-md bg-white bg-opacity-25 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Join the Club
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 border border-white rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-white rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm-password"
              className="block text-white text-sm font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full p-3 border border-white rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Join Now
          </button>
          <p className="mt-4 text-center text-white">
            Already a member?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Sign In
            </a>
          </p>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message ===
              "Registration successful! Please check your email to verify your account."
                ? "text-lime-500"
                : "text-red-900"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;
