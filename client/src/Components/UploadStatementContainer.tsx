import React, { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { UploadedFile } from "../types/uploadedFile";
import type { ParsedStatementResponse } from "../types/resultType";
import statementApiHelper from "../utils/api/StatementParserAPiHelper";

const banks = ["Kotak Mahindra Bank", "Flipkart Axis Bank", "HDFC Bank"];

const UploadContainer: React.FC = () => {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [bank, setBank] = useState<string>(banks[0]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile({
        name: selectedFile.name,
        size: selectedFile.size / (1024 * 1024),
        progress: 0,
        file: selectedFile,
      });
    }
  };

  const handleRemove = () => {
    setFile(null);
  };

  const handleParse = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const result: ParsedStatementResponse = await statementApiHelper.parseStatement(
        file.file as File,
        bank
      );

      navigate("/result", { state: { result } });
    } catch (err) {
      console.error("Parsing failed:", err);
      alert(
        "Parsing failed. Please ensure your PDF is unlocked and in a supported format."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <h1 className="text-3xl font-bold text-white text-center mb-2">
        Securely Parse Your Credit Card Statements
      </h1>
      <p className="text-gray-400 text-center mb-2">
        Upload your PDF statements to extract key data points in seconds.
      </p>

      <p className="text-yellow-400 text-sm font-medium mb-4 text-center">
        ⚠️ Please upload only unlocked PDFs. Locked PDFs are not supported.
      </p>

      <select
        className="mb-6 px-4 py-2 rounded-md bg-[#1A1F26] text-white border border-gray-600"
        value={bank}
        onChange={(e) => setBank(e.target.value)}
      >
        {banks.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <motion.div
        className="border-2 border-dashed border-blue-600 rounded-2xl w-[600px] h-[200px] flex flex-col items-center justify-center bg-[#11161D] cursor-pointer"
        whileHover={{ scale: 1.03, borderColor: "#3B82F6" }}
        whileTap={{ scale: 0.97 }}
      >
        <Upload size={40} className="text-blue-500 mb-2" />
        <p className="text-gray-300 font-medium mb-2">
          Drag & Drop Your Statement Here
        </p>
        <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer">
          Click to Browse File
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </motion.div>

      {file && (
        <motion.div
          key={file.name}
          className="flex items-center justify-between bg-[#1A1F26] p-3 rounded-lg w-[600px] mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3">
            <File className="text-gray-400" size={20} />
            <div>
              <p className="text-gray-200 text-sm">{file.name}</p>
              <p className="text-gray-500 text-xs">{file.size.toFixed(1)} MB</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}

      {file && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleParse}
          disabled={loading}
          className={`mt-6 px-8 py-3 rounded-full font-medium shadow-lg shadow-blue-800/40 ${
            loading
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Parsing..." : "Parse Statement"}
        </motion.button>
      )}

      <p className="text-gray-500 text-sm mt-10">
        🔒 Your data is processed securely and never stored on our servers.
      </p>
    </div>
  );
};

export default UploadContainer;
