const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const app = express();

// Middleware set up
app.use(express.json());
app.use("/api", require("./routes/index"));

// Database connection set up
connectDB();

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
