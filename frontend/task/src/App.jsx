import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PinnedTask from './pages/PinnedTask';
import AllTask from './pages/AllTask';
import DeletedTask from './pages/DeletedTask';
import CompletedTask from './pages/CompletedTask';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="bg-background text-white h-screen p-3">
        <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route index element={<AllTask />} />
            <Route path="pinned" element={<PinnedTask />} />
            <Route path="completed" element={<CompletedTask />} />
            <Route path="deleted" element={<DeletedTask />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import VerifyPage from './pages/Verify';
// import RegisterPage from './pages/Register';
// import LoginPage from './pages/Login';


// const App = () => {
//   return (
//     <Router>
//       <div className="bg-background text-white h-screen p-3">
//         <Routes>
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/verify/:token" element={<VerifyPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/" element={<HomePage />} />
//           {/* Add other routes here */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;







