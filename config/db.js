const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        mongoose
            .connect(process.env.DB_LINK, {
                serverSelectionTimeoutMS: 5000,
            })
            .then(async () => {
                console.log("DB connected");
            })
            .catch((err) => {
                console.log("DB connection error", err);
            });
    } catch (err) {
        console.error("DB connection error", err);
        process.exit(1); // Exit on DB failure
    }
};

module.exports = connectDB;
