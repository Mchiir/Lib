import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Adjust the path if necessary
import BorrowedBooks from './components/BorrowedBooks'; // Import your components
import Student from './components/Student'; // Import additional components
import Dashboard from './components/Dashboard';
import History from './components/History';
import Returned from './components/Returned';
import Profile from './components/Profile';
import Landing from './components/Landing';
import Login from './components/Login';
import { useState } from 'react';
// Add other imports as needed

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <div className="flex min-h-screen font-fira">
      {loggedIn && <Sidebar />}
      <div className="flex-grow p-0">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/students" element={<Student />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/borrowed" element={<BorrowedBooks />} />
          <Route path="/returned" element={<Returned />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
      {/* <Login /> */}
    </div>
  );
};

export default App;
