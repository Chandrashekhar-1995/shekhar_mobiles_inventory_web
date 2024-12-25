import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/logout";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout(dispatch, navigate);
  };

  return (
    <header className="header">
      <nav>
        <ul className="flex space-x-4">
          <li><a href="/">Home</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li>
            <button
              onClick={onLogoutClick}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
