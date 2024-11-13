import { useState } from "react";
import { FaSearch, FaBell, FaCheckCircle, FaTimesCircle, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const Student = () => {
  const books = [
    { id: 211, name: "Irasubiza Saly Nelson", class: "S3B", bookNo: 236, bookName: "Mathematics MK", borrowingDate: "23-07-2024", returnDate: "23-07-2024", status: "Returned" },
    { id: 212, name: "Alice Doe", class: "S3A", bookNo: 237, bookName: "Physics Fundamentals", borrowingDate: "20-07-2024", returnDate: "21-07-2024", status: "Returned" },
    { id: 213, name: "John Smith", class: "S3B", bookNo: 238, bookName: "Chemistry Basics", borrowingDate: "22-07-2024", returnDate: "23-07-2024", status: "Not returned" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // For filtering by class
  const [sortOrder, setSortOrder] = useState("asc"); // For sorting by name

  // Filter the books based on search term and selected class
  const filteredBooks = books
    .filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((book) => (selectedClass === "" ? true : book.class === selectedClass));

  // Sort the filtered books by name
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Toggle the sort order between ascending and descending
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 p-2">
        <h1 className="text-2xl font-bold">Student</h1>
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

      {/* Filter and Sort Section */}
      <div className="mb-4 flex justify-between items-center">
        {/* Class Filter */}
        <div>
          <label htmlFor="classFilter" className="mr-2 font-semibold pl-4">
            Filter by Class:
          </label>
          <select
            id="classFilter"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded"
          >
            <option value="">All Classes</option>
            <option value="S3A">S3A</option>
            <option value="S3B">S3B</option>
            {/* Add more classes if needed */}
          </select>
        </div>

        {/* Sort Button */}
        <button
          onClick={toggleSortOrder}
          className="flex items-center bg-gray-800 text-white px-4 py-2 mx-4 rounded"
        >
          {sortOrder === "asc" ? (
            <>
              <FaSortAlphaDown className="mr-2" /> Sort A-Z
            </>
          ) : (
            <>
              <FaSortAlphaUp className="mr-2" /> Sort Z-A
            </>
          )}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow-lg p-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#021428] text-white">
              <th className="py-4 px-2 text-left">Stud_id</th>
              <th className="py-4 px-2 text-left">Stud_name</th>
              <th className="py-4 px-2 text-left">Class</th>
              {/* <th className="py-4 px-2 text-left">Book No</th>
              <th className="py-4 px-2 text-left">Book Name</th>
              <th className="py-4 px-2 text-left">Borrowing Date</th>
              <th className="py-4 px-2 text-left">Return Date</th>
              <th className="py-4 px-2 text-left">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-2">{book.id}</td>
                <td className="py-3 px-2">{book.name}</td>
                <td className="py-3 px-2">{book.class}</td>
                {/* <td className="py-3 px-2">{book.bookNo}</td>
                <td className="py-3 px-2">{book.bookName}</td>
                <td className="py-3 px-2">{book.borrowingDate}</td>
                <td className="py-3 px-2">{book.returnDate}</td>
                <td className="py-3 px-2">
                  {book.status === "Returned" ? (
                    <FaCheckCircle className="text-green-600" />
                  ) : (
                    <FaTimesCircle className="text-orange-600" />
                  )}
                </td> */}
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

export default Student;
