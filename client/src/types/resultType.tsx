// src/types/statement.ts

// Represents the parsed output from the Python parser
export interface ParsedStatementResponse {
  bank_name?: string;
  card_number?: string;
  billing_cycle?: string;
  payment_due_date?: string;
  total_amount_due?: string;
  available_cash_limit?: string;
}

// Represents an error response
export interface StatementErrorResponse {
  error: string;
  raw?: string;
}
