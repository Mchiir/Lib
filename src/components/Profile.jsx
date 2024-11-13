import { FaUserCircle, FaBell, FaEdit } from "react-icons/fa";

const Profile = () => {
  // Randomly generated librarian details
  const librarianName = "John Doe"; // You can replace this with dynamic data
  const librarianUsername = "librarian123";
  const librarianEmail = "johndoe@library.com";
  const role = "Librarian";

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 p-2">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="relative flex items-center">
          <button className="bg-gray-800 text-white p-2 rounded">
            <FaBell />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start">
        {/* Profile Picture and Info */}
        <div className="flex flex-col items-center md:items-start md:mr-8 mb-6 md:mb-0">
          {/* User Icon */}
          <FaUserCircle className="text-gray-400" size={120} />

          {/* Edit Profile Button */}
          <button className="flex items-center mt-4 bg-gray-800 text-white px-4 py-2 rounded">
            <FaEdit className="mr-2" /> Edit Profile
          </button>
        </div>

        {/* Profile Details */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold text-[#021428] mb-4">Profile Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Librarian Name */}
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-sm font-semibold text-gray-600">Full Name</h3>
              <p className="text-lg">{librarianName}</p>
            </div>

            {/* Username */}
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-sm font-semibold text-gray-600">Username</h3>
              <p className="text-lg">@{librarianUsername}</p>
            </div>

            {/* Email */}
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-sm font-semibold text-gray-600">Email</h3>
              <p className="text-lg">{librarianEmail}</p>
            </div>

            {/* Role */}
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-sm font-semibold text-gray-600">Role</h3>
              <p className="text-lg">{role}</p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-[#021428] mb-4">Other Information</h2>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-md">
                You are logged in as a librarian responsible for managing student book borrowings and returns. 
                Make sure to keep the system up to date with accurate information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
