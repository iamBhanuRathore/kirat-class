const express = require("express");
const connectDB = require("./config/db");
const emailRoutes = require("./routes/emailRoutes");

require("dotenv").config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
