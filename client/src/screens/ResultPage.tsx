import React from "react";
import { motion } from "framer-motion";
import { CreditCard, Calendar, DollarSign, FileText, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CardResultPage: React.FC = () => {
  const navigate = useNavigate();

  const cardInfo = {
    provider: "HDFC Bank Regalia Gold",
    cardNumber: "XXXX XXXX XXXX 8392",
    billingCycle: "01 Oct - 30 Oct 2025",
    dueDate: "12 Nov 2025",
    totalBalance: "₹48,750.00",
    lastPayment: "₹20,000 on 02 Oct 2025",
  };

  const extractedData = [
    { icon: <CreditCard className="text-blue-400" />, title: "Card Number", value: cardInfo.cardNumber },
    { icon: <FileText className="text-blue-400" />, title: "Card Variant", value: cardInfo.provider },
    { icon: <Calendar className="text-blue-400" />, title: "Billing Cycle", value: cardInfo.billingCycle },
    { icon: <Timer className="text-blue-400" />, title: "Payment Due Date", value: cardInfo.dueDate },
    { icon: <DollarSign className="text-blue-400" />, title: "Total Outstanding", value: cardInfo.totalBalance },
  ];

  return (
    <div className="min-h-screen bg-[#0B0E13] text-white flex flex-col items-center py-12 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-2 text-center"
      >
        ParseIQ Results
      </motion.h1>
      <p className="text-gray-400 mb-10 text-center">
        Here’s what we extracted from your uploaded statement.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#11161D] border border-gray-800 rounded-2xl p-6 w-full max-w-2xl mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-blue-400 font-semibold text-lg">{cardInfo.provider}</h2>
            <p className="text-gray-400 text-sm">Credit Card Statement Summary</p>
          </div>
          <div className="p-3 bg-blue-900/30 rounded-full">
            <CreditCard size={30} className="text-blue-400" />
          </div>
        </div>
        <p className="text-gray-300 text-sm">
          Last Payment: <span className="text-white">{cardInfo.lastPayment}</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl grid sm:grid-cols-2 gap-6"
      >
        {extractedData.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-[#11161D] border border-gray-800 rounded-xl p-5 flex items-center space-x-4 shadow-md"
          >
            <div className="p-2 bg-blue-900/30 rounded-full">{item.icon}</div>
            <div>
              <h3 className="text-gray-300 text-sm">{item.title}</h3>
              <p className="text-white font-semibold">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full text-white font-medium shadow-lg shadow-blue-800/40"
        >
          Back to Upload
        </motion.button>

        <p className="text-gray-500 text-sm mt-6 text-center">
          🔒 Your statement data is processed locally and never stored.
        </p>
      </div>
    </div>
  );
};

export default CardResultPage;
