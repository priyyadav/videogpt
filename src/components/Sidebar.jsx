import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/AppSlice";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
    const dispatch=useDispatch()
  // Early return pattern if the menu is closed
  const onClose=()=>
  {
    dispatch(toggleMenu())
  }
  if (!isMenuOpen) return null;

  return (
    <div className={`p-5 shadow-lg w-400 ${isMenuOpen ? "open" : ""}`}>
      <div >
        {/* Close button */}
        <button className="text-gray-500 close" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Optional: You can add a title/header here if needed */}
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/demo">Demo</Link>
        </li>
        <li>Shorts</li>
        <li>Videos</li>
        <li>Live</li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
      <h1 className="font-bold pt-5">Watch Later</h1>
      <ul>
        <li>Music</li>
        <li>Sports</li>
        <li>Gaming</li>
        <li>Movies</li>
      </ul>
    </div>
  );
};

export default Sidebar;
