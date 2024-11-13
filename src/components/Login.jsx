import { Link } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-[#021428] w-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md">
        {/* Logo or Title */}
        <h1 className="text-3xl font-bold text-center mb-6 text-[#021428]">
          Library Login
        </h1>

        {/* Login Form */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#021428]"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-[#021428]"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <Link to="/forgot-password" className="text-sm text-green-500 hover:text-green-700">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Link to="/dashboard">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 w-40 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
                onClick={() => setLoggedIn(true)}
              >
                Log In
              </button>
            </Link>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">Don&apos; t have an account?
            <Link to="/signup" className="text-green-500 hover:text-green-700 ml-2">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
