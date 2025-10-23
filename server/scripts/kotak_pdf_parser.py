import sys, re, json
import pdfplumber

def parse_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"

    data = {}

    data["bank_name"] = "Kotak Mahindra Bank"

    patterns = {
        "card_number": r"(?:Card\s*Number|Primary\s*Card\s*Number)\s*[:\-]?\s*([0-9]{4}\s*[Xx]{4}\s*[Xx]{4}\s*[0-9]{4}|[0-9]{4}[Xx]{8}[0-9]{4})",
        "billing_cycle": r"(?i)(?:Billing\s*Cycle|Transaction\s*details\s*from)\s*[:\-]?\s*([0-9]{1,2}[-/][A-Za-z]{3}[-/][0-9]{4})\s*(?:to|-|–)\s*([0-9]{1,2}[-/][A-Za-z]{3}[-/][0-9]{4})",
        "payment_due_date": r"(?i)(?:Payment\s*Due\s*Date|Remember\s*to\s*pay\s*by)[:\-]?\s*([0-9]{1,2}[-\s]?[A-Za-z]{3,9}[-\s]?[0-9]{4})",
        "total_amount_due": r"(?i)(?:Total\s*(?:Amount\s*Due|Outstanding|Payable))[^\d₹]*₹?\s*([\d,]+\.\d{2})",
        "available_cash_limit": r"(?i)Available\s*Cash\s*Limit[^\d₹]*₹?\s*([\d,]+\.\d{2})",
    }

    for key, pattern in patterns.items():
        match = re.search(pattern, text)
        if match:
            if key == "billing_cycle" and len(match.groups()) >= 2:
                data[key] = f"{match.group(1)} to {match.group(2)}"
            else:
                data[key] = "₹" + match.group(1).replace(",", "") if "amount" in key else match.group(1).strip()

    if "total_amount_due" in data:
        data["total_amount_due"] = "₹" + re.sub(r"[^\d\.]", "", data["total_amount_due"])
    if "available_cash_limit" in data:
        data["available_cash_limit"] = "₹" + re.sub(r"[^\d\.]", "", data["available_cash_limit"])

    return data


if __name__ == "__main__":
    pdf_path = sys.argv[1]
    result = parse_pdf(pdf_path)
    print(json.dumps(result, indent=4))
