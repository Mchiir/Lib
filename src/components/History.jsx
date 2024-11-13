import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const History = () => {
  const books = [
    { id: 211, name: "Irasubiza Saly Nelson", class: "S3B", bookNo: 236, bookName: "Mathematics MK", borrowingDate: "23-07-2024", returnDate: "23-07-2024", status: "Returned" },
    { id: 233, name: "Will Smith", class: "S3A", bookNo: 236, bookName: "Mathematics MK", borrowingDate: "23-07-2024", returnDate: "23-07-2024", status: "Not returned" },
    { id: 456, name: "Mike Tyson", class: "S3B", bookNo: 236, bookName: "Mathematics MK", borrowingDate: "23-07-2024", returnDate: "23-07-2024", status: "Not returned" },
    { id: 462, name: "John Doe", class: "S3B", bookNo: 236, bookName: "Longhorn Chemistry", borrowingDate: "23-07-2024", returnDate: "23-07-2024", status: "Returned" },
    { id: 563, name: "Kim Huang", class: "S3A", bookNo: 236, bookName: "Longhorm Biology", borrowingDate: "23-07-2024", returnDate: "23-07-2024", status: "Not returned" },
    { id: 574, name: "James Harden", class: "S3B", bookNo: 236, bookName: "English Textbook", borrowingDate: "23-07-2024", returnDate: "23-07-2024", status: "Returned" },
    // Add more entries as needed
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 p-2">
        <h1 className="text-2xl font-bold">History</h1>
        <div className="relative flex items-center">
          <div className="h-6">
            <input
              type="text"
              placeholder="Search for anything"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-l-md px-4 py-2 w-64"
            />
            <button className="bg-gray-800 text-white px-4 py-3 rounded-r-md">
              <FaSearch />
            </button>
          </div>
          <button className="ml-4 bg-gray-800 text-white p-2 rounded">
            <FaBell />
          </button>
        </div>
      </div>

      {/* Table */}
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
              <th className="py-4 px-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">{book.id}</td>
                <td className="py-3 px-2">{book.name}</td>
                <td className="py-3 px-2">{book.class}</td>
                <td className="py-3 px-2">{book.bookNo}</td>
                <td className="py-3 px-2">{book.bookName}</td>
                <td className="py-3 px-2">{book.borrowingDate}</td>
                <td className="py-3 px-2">{book.returnDate}</td>
                <td className="py-3 px-2">
                  {book.status === "Returned" ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-orange-600" />
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

export default History;
