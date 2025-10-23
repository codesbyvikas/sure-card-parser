import sys
import re
import json
import pdfplumber


def parse_axis_pdf(pdf_path, debug=False):
    """Extract Axis Bank credit card summary fields and optionally print entire parsed text."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            page_text = page.extract_text()
            if page_text:
                if debug:
                    print(f"\n\n================ PAGE {i} ================\n")
                    print(page_text)
                text += page_text + "\n"

    original_text = text
    
    
    normalized_text = re.sub(r'\s+', ' ', text)

    if debug:
        print("\n\n================ NORMALIZED TEXT (single line) ================\n")
        print(normalized_text[:2000])  
        print("\n================ END OF NORMALIZED TEXT ================\n")

    data = {"bank_name": "Axis Bank"}

    
    card_patterns = [
        r'(?:Credit\s*Card\s*Number|Card\s*No[.:]?)\s*(\d{6}\*+\d{4})',
        r'Card\s*No[.:]?\s*(\d{6}\*+\d{4})',
        r'(\d{6}\*{6,}\d{4})',  
    ]
    for pattern in card_patterns:
        card_match = re.search(pattern, normalized_text, re.IGNORECASE)
        if card_match:
            data["card_number"] = card_match.group(1).strip()
            break

    
    billing_patterns = [
        r'Statement\s*Period\s*(\d{2}[/-]\d{2}[/-]\d{4})\s*[-–]\s*(\d{2}[/-]\d{2}[/-]\d{4})',
        r'Statement\s*Period\s*[:\s]*(\d{2}[/-]\d{2}[/-]\d{4})\s*[-–to]\s*(\d{2}[/-]\d{2}[/-]\d{4})',
        r'Billing\s*(?:Period|Cycle)\s*[:\s]*(\d{2}[/-]\d{2}[/-]\d{4})\s*[-–to]\s*(\d{2}[/-]\d{2}[/-]\d{4})',
    ]
    for pattern in billing_patterns:
        billing_match = re.search(pattern, normalized_text, re.IGNORECASE)
        if billing_match:
            data["billing_cycle"] = f"{billing_match.group(1)} - {billing_match.group(2)}"
            if debug:
                print(f"Found billing cycle with pattern: {pattern}")
            break

    
    
    due_date_patterns = [
        r'Payment\s*Due\s*Date\s+(\d{2}[/-]\d{2}[/-]\d{4})(?!\s*[-–])',  
        r'Payment\s*Due\s*Date\s+Statement\s+Generation\s+Date\s+(\d{2}[/-]\d{2}[/-]\d{4})',  
        r'Minimum\s*Payment\s*Due.*?Payment\s*Due\s*Date\s+(\d{2}[/-]\d{2}[/-]\d{4})',  
    ]
    
    
    text_header = normalized_text[:2000]
    
    for pattern in due_date_patterns:
        due_date_match = re.search(pattern, text_header, re.IGNORECASE)
        if due_date_match:
            date_found = due_date_match.group(1).strip()
            
            if not data.get("billing_cycle") or date_found not in data.get("billing_cycle", ""):
                data["payment_due_date"] = date_found
                if debug:
                    print(f"Found due date with pattern: {pattern} -> {date_found}")
                break
    
    
    if not data.get("payment_due_date"):
        
        
        date_row_match = re.search(
            r'Statement\s*Period\s*Payment\s*Due\s*Date.*?(\d{2}[/-]\d{2}[/-]\d{4})\s*[-–]\s*(\d{2}[/-]\d{2}[/-]\d{4})\s+(\d{2}[/-]\d{2}[/-]\d{4})',
            text_header,
            re.IGNORECASE
        )
        if date_row_match:
            data["payment_due_date"] = date_row_match.group(3).strip()
            if debug:
                print(f"Found due date from date row: {date_row_match.group(3)}")

   
    
    text_before_account = normalized_text.split('Account Summary')[0] if 'Account Summary' in normalized_text else normalized_text[:3000]
    
    total_due_patterns = [
        r'Total\s*Payment\s*Due\s*Minimum\s*Payment\s*Due.*?([\d,]+\.?\d*)\s*Dr\s*([\d,]+\.?\d*)\s*Dr',
        r'PAYMENT\s*SUMMARY.*?Total\s*Payment\s*Due\s*([\d,]+\.?\d*)\s*Dr',
        r'Statement\s*Period\s*Payment\s*Due\s*Date.*?Total\s*Payment\s*Due.*?([\d,]+\.?\d*)\s*Dr',
        r'Total\s*Payment\s*Due\s*([\d,]+\.?\d*)\s*Dr',
    ]
    
    for pattern in total_due_patterns:
        total_due_match = re.search(pattern, text_before_account, re.IGNORECASE | re.DOTALL)
        if total_due_match:
            amount = total_due_match.group(1).replace(',', '').replace('₹', '').strip()
            try:
                amt_float = float(amount)
                if amt_float > 1000: 
                    data["total_amount_due"] = amount
                    if debug:
                        print(f"Found total due with pattern: {pattern} -> {amount}")
                    break
            except:
                continue
    
    if not data.get("total_amount_due"):
        all_matches = re.findall(r'Total\s*Payment\s*Due\s*([\d,]+\.?\d*)\s*Dr', text_before_account, re.IGNORECASE)
        if all_matches:
            amounts = [(m, float(m.replace(',', ''))) for m in all_matches]
            largest = max(amounts, key=lambda x: x[1])
            data["total_amount_due"] = largest[0].replace(',', '')
            if debug:
                print(f"Found total due by taking largest amount: {largest[0]}")

    cash_limit_patterns = [
        r'Available\s*Cash\s*Limit\s*([\d,]+\.?\d*)',
        r'Available\s*Cash\s*Limit\s*For.*?([\d,]+\.?\d*)',  
        r'Cash\s*Limit\s*([\d,]+\.?\d*)',
        r'Available\s*Cash.*?([\d,]+\.?\d*)',
    ]
    
    text_header = normalized_text[:2000]
    
    for pattern in cash_limit_patterns:
        available_cash_match = re.search(pattern, text_header, re.IGNORECASE)
        if available_cash_match:
            amount = available_cash_match.group(1).replace(',', '').replace('₹', '').strip()
            try:
                amt_float = float(amount)
                if 100 < amt_float < 100000: 
                    data["available_cash_limit"] = amount
                    if debug:
                        print(f"Found cash limit with pattern: {pattern} -> {amount}")
                    break
            except:
                continue
    
    
    if not data.get("available_cash_limit"):
        limit_row_match = re.search(
            r'Credit\s*Limit\s*Available\s*Credit\s*Limit\s*Available\s*Cash\s*Limit.*?([\d,]+\.?\d*)\s+([\d,]+\.?\d*)\s+([\d,]+\.?\d*)',
            text_header,
            re.IGNORECASE
        )
        if limit_row_match:
            
            amount = limit_row_match.group(3).replace(',', '')
            data["available_cash_limit"] = amount
            if debug:
                print(f"Found cash limit from limit row: {amount}")

    
    if not data.get("billing_cycle") or not data.get("payment_due_date"):
        lines = original_text.split('\n')
        for i, line in enumerate(lines):
            
            if 'statement period' in line.lower() and not data.get("billing_cycle"):
                
                context = ' '.join(lines[i:i+3])
                date_match = re.search(r'(\d{2}[/-]\d{2}[/-]\d{4})\s*[-–]\s*(\d{2}[/-]\d{2}[/-]\d{4})', context, re.IGNORECASE)
                if date_match:
                    data["billing_cycle"] = f"{date_match.group(1)} - {date_match.group(2)}"
                    if debug:
                        print(f"Found billing cycle in line: {line}")
            
            
            if 'payment due date' in line.lower() and not data.get("payment_due_date"):
                date_match = re.search(r'(\d{2}[/-]\d{2}[/-]\d{4})', line)
                if date_match:
                    data["payment_due_date"] = date_match.group(1)
                    if debug:
                        print(f"Found due date in line: {line}")

    if debug:
        print("\n\n================ EXTRACTED DATA ================\n")
        print(json.dumps(data, indent=4))
        print("\n================ END OF DEBUG OUTPUT ================\n")

    return data


if __name__ == "__main__":
    debug_mode = "--debug" in sys.argv

    if len(sys.argv) > 1 and sys.argv[1] != "--debug":
        pdf_path = sys.argv[1]
    else:
        pdf_path = "C:/Users/alone/Downloads/Credit Card Statement_unlocked.pdf"

    result = parse_axis_pdf(pdf_path, debug=debug_mode)

    print(json.dumps(result, indent=4))