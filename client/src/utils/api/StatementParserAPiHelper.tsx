// src/helpers/statementApiHelper.ts
import axios from "axios";
import type { ParsedStatementResponse } from "../../types/resultType";


const API_URL = import.meta.env.VITE_BACKEND_URL;

const statementApiHelper = {
  parseStatement: async (
    file: File,
    bank: string
  ): Promise<ParsedStatementResponse> => {
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("bank", bank); // send selected bank

    try {
      const res = await axios.post(`${API_URL}/parse/parse-statement`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.error) {
        throw res.data;
      }

      return res.data as ParsedStatementResponse;
    } catch (err: any) {
      console.error("API Error:", err);
      throw {
        error: "Failed to parse statement",
        raw: err.message || JSON.stringify(err),
      };
    }
  },
};

export default statementApiHelper;
export type { ParsedStatementResponse };
