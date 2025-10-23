import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-background-dark min-h-screen font-display px-4 py-10 sm:px-6 md:px-10 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8">
        Contact Me
      </h1>

      <div className="bg-[#1A1F26] p-6 sm:p-8 rounded-2xl max-w-md w-full space-y-6 shadow-md">
        <div className="flex items-center space-x-3">
          <Mail className="text-yellow-400" size={20} />
          <a
            href="mailto:vikaskewat025@gmail.com"
            className="text-white hover:text-yellow-400 transition-colors text-sm sm:text-base"
          >
            vikaskewat025@gmail.com
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Linkedin className="text-blue-500" size={20} />
          <a
            href="https://linkedin.com/in/vikaskewat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition-colors text-sm sm:text-base break-all"
          >
            linkedin.com/in/vikaskewat
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Github className="text-gray-400" size={20} />
          <a
            href="https://github.com/codesbyvikas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors text-sm sm:text-base break-all"
          >
            github.com/codesbyvikas
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
