require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { connect } = require("http2");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(
    cors(
        {
            origin: process.env.CORS_ORIGIN,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }
    )
);

// Connect to MongoDB
connectDB();

// Middleware xử lý JSON
//Cho phép Express tự động parse các request có content-type application/json.
//Tức là bạn có thể nhận req.body trong các route như /register.
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// upload ảnh, file sẽ được lưu vào thư mục uploads.
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
        res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    }
}));

//Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});