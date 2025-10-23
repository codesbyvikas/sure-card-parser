const express = require("express");
const cors = require("cors");
const parseRoutes = require("./routes/parser");



const app = express();


app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://sure-card-parser.vercel.app/",
    credentials: true,
  })
);

app.use("/parse", parseRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
