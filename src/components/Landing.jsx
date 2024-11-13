import { FaBook, FaUsers, FaCogs } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-[#021428] text-white py-4 fixed top-0 left-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Library System</h1>
          <ul className="flex space-x-6">
            <li>
              <a href="#home" className="hover:text-green-400 transition">Home</a>
            </li>
            <li>
              <a href="#features" className="hover:text-green-400 transition">Features</a>
            </li>
            <li>
              <a href="#cta" className="hover:text-green-400 transition">Free Trial</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-green-400 transition">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex flex-col justify-center items-center h-[100vh] bg-cover bg-center bg-no-repeat text-center p-6"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2')" }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white animate-fadeIn">
          Welcome to <span className="text-green-500">Library Management System</span>
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-white animate-fadeIn">
          Manage books, track borrowers, and streamline your library effortlessly.
        </p>
        <Link to="/login">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-gray-100 text-black">
        <h2 className="text-center text-4xl font-semibold mb-10">Key Features</h2>
        <div className="flex flex-col md:flex-row justify-evenly items-center px-4 space-y-8 md:space-y-0 md:space-x-6">
          
          {/* Feature Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <FaBook className="text-5xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Book Management</h3>
            <p className="text-center">Organize and track your library’s collection of books easily.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <FaUsers className="text-5xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">User Management</h3>
            <p className="text-center">Efficiently manage library members and track borrow history.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <IoStatsChart className="text-5xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Analytics & Reports</h3>
            <p className="text-center">Generate insightful reports to understand library usage.</p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <FaCogs className="text-5xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-center">Customizable Settings</h3>
            <p className="text-center">Tailor the system settings to suit your library&apos;s needs.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-[#021428] py-16 text-center">
        <h2 className="text-4xl font-semibold mb-6 text-white">Start Your Free Trial Today</h2>
        <p className="text-lg mb-6 text-white">
          Experience the full power of our Library Management System with a free trial. No credit card required.
        </p>
   
        <Link to="/login" className="bg-green-500  hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-500 ease-in-out transform hover:scale-105">
            Sign Up for Free
        </Link>
        
      </section>

      {/* Footer Section */}
      <footer id="contact" className="bg-gray-900 py-8 text-center text-gray-400">
        <div>
          <p>&copy; {new Date().getFullYear()} Library Management System. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="hover:text-white mx-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white mx-4">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
