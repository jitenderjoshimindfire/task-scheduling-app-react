import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../redux-toolkit/authSlice";
import { AppDispatch, RootState } from "../redux-toolkit/store";

const Header: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!auth.user && !!auth.accessToken;

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {isLoggedIn ? (
        <div
          className="font-bold text-xl cursor-pointer min-w-[180px]"
          onClick={() => navigate("/home")}
        >
          TaskSchedulingApp
        </div>
      ) : (
        <div className="min-w-[180px]" />
      )}

      <div className="space-x-4 flex items-center">
        {isLoggedIn && (
          <Link to="/home" className="hover:text-gray-300 transition">
            Tasks
          </Link>
        )}

        {!user && (
          <>
            <Link to="/register" className="hover:text-gray-300 transition">
              Signup
            </Link>
            <Link to="/login" className="hover:text-gray-300 transition">
              Login
            </Link>
          </>
        )}

        {user && (
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 transition"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
