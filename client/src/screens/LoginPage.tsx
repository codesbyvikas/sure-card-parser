import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Sparkles } from "lucide-react";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleGoogleSignIn = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const handleGuestMode = async () => {
    try {
    //   const res = await fetch(`${BACKEND_URL}/auth/guest`, { method: "POST" });
    //   const data = await res.json();
    //   localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      console.error("Guest login failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E13] flex flex-col items-center justify-center text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Sparkles size={32} className="text-blue-400" />
          <h1 className="text-4xl font-bold">ParseIQ</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Smart Credit Card Statement Parser
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#11161D] border border-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Welcome to ParseIQ
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Continue as a guest or sign in to save your statement history securely.
        </p>

        <div className="flex flex-col gap-4">
          {/* Google Sign-In with Google “G” logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full text-white font-medium shadow-lg shadow-blue-800/40"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google G logo"
              className="w-6 h-6"
            />
            Continue with Google
          </motion.button>

          {/* Guest Mode */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGuestMode}
            className="flex items-center justify-center gap-3 bg-[#1A1F29] hover:bg-[#222835] transition px-6 py-3 rounded-full text-gray-300 font-medium border border-gray-700"
          >
            <User size={20} />
            Continue as Guest
          </motion.button>
        </div>
      </motion.div>

      <p className="text-gray-500 text-xs mt-8 text-center">
        🔒 We never store your credit card details or share data externally.
      </p>
    </div>
  );
};

export default SignInPage;
