import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import Students from "./Data";

const BorrowedBooks = () => {
  const [actionMenuVisible, setActionMenuVisible] = useState(null);

  const toggleActionMenu = (index) => {
    setActionMenuVisible(actionMenuVisible === index ? null : index);
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6 p-2">
        <h1 className="text-2xl font-bold">Borrowed Books</h1>
        <button className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 p-2">Update</button>
      </div>


      <div className="bg-white rounded shadow-lg p-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#021428] text-white">
              <th className="py-4 px-2 text-left">Stud_id</th>
              <th className="py-4 px-2 text-left">Stud_name</th>
              <th className="py-4 px-2 text-left">Class</th>
              <th className="py-4 px-2 text-left">Book_no</th>
              <th className="py-4 px-2 text-left">Book_name</th>
              <th className="py-4 px-2 text-left">Borrowing_date</th>
              <th className="py-4 px-2 text-left">Return_Date</th>
              <th className="py-4 px-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {Students.map((book, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">{book.id}</td>
                <td className="py-3 px-2">{book.name}</td>
                <td className="py-3 px-2">{book.class}</td>
                <td className="py-3 px-2">{book.book_no}</td>
                <td className="py-3 px-2">{book.book_name}</td>
                <td className="py-3 px-2">{book.borrowing}</td>
                <td className="py-3 px-2">{book.returning}</td>
                <td className="py-3 px-2 text-center relative">
                  <button
                    className="focus:outline-none"
                    onClick={() => toggleActionMenu(index)}
                  >
                    <FaEllipsisV className="text-gray-500" />
                  </button>
                  {actionMenuVisible === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
                      <ul className="text-left">
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Remove</li>
                        <li className="p-2 hover:bg-gray-100 cursor-pointer">Edit</li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <a href="/more" className="text-blue-500">View more &gt;</a>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBooks;
