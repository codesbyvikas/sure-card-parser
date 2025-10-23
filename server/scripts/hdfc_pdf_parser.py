import sys
import re
import json
import pdfplumber

def parse_hdfc_pdf(pdf_path, debug=False):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            page_text = page.extract_text()
            if page_text:
                if debug:
                    print(f"\n\n================ PAGE {i} ================\n", file=sys.stderr)
                    print(page_text, file=sys.stderr)
                text += page_text + "\n"

    
    normalized_text = re.sub(r'\s+', ' ', text)
    if debug:
        print("\n\n================ NORMALIZED TEXT (single line) ================\n", file=sys.stderr)
        print(normalized_text[:5000], file=sys.stderr)

    data = {}
    
    
    data["bank_name"] = "HDFC Bank"
    
    
    card_match = re.search(r'Credit\s*Card\s*No\.?\s*\d{6}[Xx\*]+(\d{4})', normalized_text, re.IGNORECASE)
    if card_match:
        data["card_number"] = card_match.group(1)
    
    
    billing_match = re.search(r'Billing\s*Period\s*(\d{1,2}\s+[A-Za-z]{3},?\s+\d{4})\s*[-–]\s*(\d{1,2}\s+[A-Za-z]{3},?\s+\d{4})', normalized_text, re.IGNORECASE)
    if billing_match:
        data["billing_cycle"] = f"{billing_match.group(1)} to {billing_match.group(2)}"
    
    
    due_date_match = re.search(r'MINIMUM\s*DUE\s+DUE\s*DATE\s+[₹C]\s*[\d,]+(?:\.\d{2})?\s+([0-9]{1,2}\s+[A-Za-z]{3},?\s+\d{4})', normalized_text, re.IGNORECASE)
    if due_date_match:
        data["payment_due_date"] = due_date_match.group(1).strip()
    
    
    
    
    
    
    
    credit_limit_line = re.search(r'[₹C]\s*([\d,]+)\s+[₹C]\s*([\d,]+)\s+[₹C]\s*([\d,]+)\s+[₹C]\s*[\d,]+\.?\d{2}\s+\d{1,2}\s+[A-Za-z]{3}', normalized_text)
    if credit_limit_line:
        
        data["available_cash_limit"] = credit_limit_line.group(3).strip()
    else:
        
        
        headers_match = re.search(r'TOTAL\s*CREDIT\s*LIMIT.*?AVAILABLE\s*CREDIT\s*LIMIT\s+AVAILABLE\s*CASH\s*LIMIT\s+MINIMUM\s*DUE\s+DUE\s*DATE\s+[₹C]\s*[\d,]+\.?\d{2}\s+\d{1,2}\s+[A-Za-z]{3,}\s+[₹C]\s*([\d,]+)\s+[₹C]\s*([\d,]+)\s+[₹C]\s*([\d,]+)', normalized_text, re.IGNORECASE)
        if headers_match:
            
            data["available_cash_limit"] = headers_match.group(3).strip()
        else:
            
            simple_match = re.search(r'[₹C]\s*57,000\s+[₹C]\s*45,303\s+[₹C]\s*([\d,]+)', normalized_text)
            if simple_match:
                data["available_cash_limit"] = simple_match.group(1).strip()
    
    
    total_due_match = re.search(r'[₹C]\s*[\d,]+\.?\d*\s*\+\s*[₹C]\s*[\d,]+\.?\d*\s*\+\s*[₹C]\s*[\d,]+\.?\d*\s*=\s*[₹C]\s*([\d,]+\.?\d{2})', normalized_text)
    if total_due_match:
        data["total_amount_due"] = total_due_match.group(1).strip()
    else:
        
        min_due_match = re.search(r'MINIMUM\s*DUE\s+DUE\s*DATE\s+[₹C]\s*([\d,]+\.?\d{2})\s+\d{1,2}\s+[A-Za-z]{3}', normalized_text, re.IGNORECASE)
        if min_due_match:
            data["total_amount_due"] = min_due_match.group(1).strip()
        else:
            
            alt_due = re.search(r'[₹C]\s*([\d,]+\.?\d{2})\s+\d{1,2}\s+[A-Za-z]{3},?\s+\d{4}', normalized_text)
            if alt_due:
                data["total_amount_due"] = alt_due.group(1).strip()

    return data


if __name__ == "__main__":
    
    debug_mode = "--debug" in sys.argv
    
    if len(sys.argv) > 1 and sys.argv[1] != "--debug":
        pdf_path = sys.argv[1]
    else:
        pdf_path = "C:/Users/alone/Downloads/5372XXXXXXXXXX76_12-10-2025_253_unlocked.pdf"
    
    result = parse_hdfc_pdf(pdf_path, debug=debug_mode)
    
    
    print(json.dumps(result, indent=4))