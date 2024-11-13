import { FaClock, FaCheckCircle } from "react-icons/fa";
import Students from "./Data";

const Table = ({ searchItem }) => {
  const filteredStudents = Students.filter((student) => {
    return student.book_name.toLowerCase().includes(searchItem.toLowerCase());
  });

  // Return "No book found" message if no students match the search
  if (filteredStudents.length === 0) {
    return (
      <div className="flex justify-center items-center w-[90%] m-auto pt-3">
        <p className="text-center text-[#021428] text-lg font-semibold">No book found</p>
      </div>
    );
  }

  let returned = false;
  
  // Render the table if books are found
  return (
    <div className="flex justify-center items-center w-[90%] m-auto pt-3">
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-[#021428] text-white border border-gray-300">
            <th className="py-3 px-1">Stud-Id</th>
            <th className="py-3 px-1">Stud-Name</th>
            <th className="py-3 px-1">Class</th>
            <th className="py-3 px-1">Book-No</th>
            <th className="py-3 px-1">Book-Name</th>
            <th className="py-3 px-1">Borrowing-Date</th>
            <th className="py-3 px-1">Return-Date</th>
            <th className="py-3 px-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => {
            return (
              <tr
                key={index}
                className="border border-gray-300 text-[#021428] font-[400] hover:bg-[#e1e8f0] transition-all duration-700 cursor-pointer"
              >
                <td className="py-3 px-4 text-start">{student.id}</td>
                <td className="py-3 px-4 text-start">{student.name}</td>
                <td className="py-3 px-4 text-start">{student.class}</td>
                <td className="py-3 px-4 text-start">{student.book_no}</td>
                <td className="py-3 px-4 text-start">{student.book_name}</td>
                <td className="py-3 px-4 text-start">{student.borrowing}</td>
                <td className="py-3 px-4 text-start">{student.returning}</td>
                <td>
                  {returned ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaClock className="text-[#FA8701]" />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
