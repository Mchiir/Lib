import { FaHome, FaBook, FaHistory, FaUser } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#021428] text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="flex items-center p-2 hover:bg-green-700 rounded">
            <FaHome className="mr-3" /> Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/students" className="flex items-center p-2 hover:bg-green-700 rounded">
            <FaUser className="mr-3" /> Students
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/borrowed" className="flex items-center p-2 hover:bg-green-700 rounded">
            <FiBookOpen className="mr-3" /> Borrowed
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/returned" className="flex items-center p-2 hover:bg-green-700 rounded">
            <FaBook className="mr-3" /> Returned
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/history" className="flex items-center p-2 hover:bg-green-700 rounded">
            <FaHistory className="mr-3" /> History
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/profile" className="flex items-center p-2 hover:bg-green-700 rounded">
            <FaUser className="mr-3" /> Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
