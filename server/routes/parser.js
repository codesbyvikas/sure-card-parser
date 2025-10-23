const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const bankScriptMap = {
  "HDFC Bank": "scripts/hdfc_pdf_parser.py",
  "Kotak Mahindra Bank": "scripts/kotak_pdf_parser.py",
  "Flipkart Axis Bank": "scripts/axis_pdf_parser.py",
};

router.post("/parse-statement", upload.single("pdf"), (req, res) => {
  const pdfPath = req.file.path;
  const bank = req.body.bank;
  console.log("Selected bank:", bank);

  const scriptRelative = bankScriptMap[bank];
  if (!scriptRelative) {
    // Clean up uploaded file
    fs.unlink(pdfPath, () => {});
    return res.status(400).json({ error: "Unsupported bank" });
  }

  const scriptPath = path.join(__dirname, "..", scriptRelative);

  const python = spawn("python3", [scriptPath, pdfPath]);

  let output = "";

  python.stdout.on("data", (data) => (output += data.toString()));
  python.stderr.on("data", (err) => console.error("Python error:", err.toString()));

  python.on("close", () => {
    // Cleanup uploaded file
    fs.unlink(pdfPath, (err) => {
      if (err) console.error("Failed to delete file:", pdfPath, err);
    });

    try {
      res.json(JSON.parse(output));
    } catch {
      res.json({ error: "Parsing failed", raw: output });
    }
  });
});

module.exports = router;
