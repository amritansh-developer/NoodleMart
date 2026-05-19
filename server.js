const express = require("express");
require("dotenv").config();
require("./config/db");

const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NoodleMart Backend is Running 🚀");
});

app.use("/api", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
