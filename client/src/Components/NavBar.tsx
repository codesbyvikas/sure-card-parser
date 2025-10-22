import React from "react";
import {User} from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-8 border-b border-gray-800 bg-[#0B0E13]">
      <div className="flex items-center space-x-2">
        <span className="material-symbols-outlined text-2xl font-bold text-blue-500">ParseIQ</span>
        <h1 className="text-white font-semibold text-lg">PDF Parser</h1>
      </div>
      <div className="flex items-center space-x-6 text-gray-300">
        <button className="hover:text-white transition">Help</button>
        <button className="hover:text-white transition">FAQ</button>
        <div className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
          <User size={18} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
