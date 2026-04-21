import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-3 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
      <Link
        to="/"
        className="text-lg font-bold no-underline! text-pink-400! tracking-tight"
      >
        crochet counter
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">
              Hi,{" "}
              <span className="font-medium text-gray-800">{user.username}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-blue-500 transition-colors"
            >
              log in
            </Link>
            <Link
              to="/register"
              className="text-sm px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
