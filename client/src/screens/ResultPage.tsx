import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Calendar, DollarSign, Timer, Building2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ParsedStatementResponse } from "../types/resultType";

const CardResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result as ParsedStatementResponse;

  if (!result) {
    navigate("/");
    return null;
  }

  const extractedData = [
    { icon: <CreditCard className="text-blue-400" />, title: "Card Number", value: result.card_number },
    { icon: <Calendar className="text-blue-400" />, title: "Billing Cycle", value: result.billing_cycle },
    { icon: <Timer className="text-blue-400" />, title: "Payment Due Date", value: result.payment_due_date },
    { icon: <DollarSign className="text-blue-400" />, title: "Total Outstanding", value: result.total_amount_due },
    { icon: <DollarSign className="text-blue-400" />, title: "Available Cash Limit", value: result.available_cash_limit },
  ];

  return (
    <div className="min-h-screen bg-[#0B0E13] text-white flex flex-col items-center py-8 px-4 sm:px-6 lg:px-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-2 text-center"
      >
        ParseIQ Results
      </motion.h1>
      <p className="text-gray-400 mb-8 sm:mb-10 text-center text-sm sm:text-base">
        Here’s what we extracted from your uploaded statement.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#11161D] border border-gray-800 rounded-2xl p-4 sm:p-6 w-full max-w-2xl mb-6 sm:mb-8"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div>
            <h2 className="text-blue-400 font-semibold text-lg sm:text-xl">
              {result.bank_name || "Unknown Bank"}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">Credit Card Statement Summary</p>
          </div>
          <div className="p-2 sm:p-3 bg-blue-900/30 rounded-full mt-3 sm:mt-0 self-end sm:self-auto">
            <Building2 size={30} className="text-blue-400" />
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {extractedData.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-[#11161D] border border-gray-800 rounded-xl p-4 sm:p-5 flex items-center space-x-3 sm:space-x-4 shadow-md"
          >
            <div className="p-2 bg-blue-900/30 rounded-full">{item.icon}</div>
            <div>
              <h3 className="text-gray-300 text-xs sm:text-sm">{item.title}</h3>
              <p className="text-white font-semibold text-sm sm:text-base">{item.value || "—"}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 mt-8 sm:mt-10 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-medium shadow-lg shadow-blue-800/40"
      >
        Back to Upload
      </motion.button>
    </div>
  );
};

export default CardResultPage;
