import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between py-4 px-4 sm:px-8 border-b border-gray-800 bg-[#0B0E13]">
      <button onClick={() => navigate("/")} className="flex items-center space-x-2 mb-2 sm:mb-0">
        <span className="material-symbols-outlined text-2xl font-bold text-blue-500">
          ParseIQ
        </span>
        <h1 className="text-white font-semibold text-lg">PDF Parser</h1>
      </button>

      <div className="flex items-center space-x-6 text-gray-300">
        <button
          className="hover:text-white transition text-sm sm:text-base"
          onClick={() => navigate("/contact")}
        >
          Contact
        </button>
        <button
          className="hover:text-white transition text-sm sm:text-base"
          onClick={() => navigate("/faq")}
        >
          FAQ
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
