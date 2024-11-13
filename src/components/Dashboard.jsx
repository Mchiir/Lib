import { FaBell, FaSearch } from "react-icons/fa";
import Table from "./Table";
import { useState } from "react";

const Dashboard = () => {
  const [searchItem, setSearchItem] = useState("");

  return (
    <div>
      {/* Main container with full height */}
      <div className="min-h-screen w-full bg-white p-4">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center px-3 py-2">
          <h1 className="text-[#021428] text-lg font-semibold mb-4 md:mb-0">
            Dashboard
          </h1>
          
          {/* Search bar */}
          <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search for anything..."
              className="placeholder:text-gray-400 bg-white border-2 border-[#021428] h-11 px-5 rounded-l-md w-full md:w-80"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button className="bg-[#021428] text-white px-4 py-[14px] rounded-r-md">
              <FaSearch />
            </button>
          </div>

          {/* Notification bell */}
          <FaBell className="w-8 h-8 bg-[#021428] p-2 text-white rounded-md" />
        </div>

        {/* Table section */}
        <div className="overflow-x-auto">
          <Table searchItem={searchItem} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
