const express = require("express");
const cors = require("cors");
require("dotenv").config();
const client = require("./config/db"); // Import client từ db.js
const customerRoutes = require("./routes/customerRoutes");
const roomRoutes = require("./routes/roomRoutes");
const staffRoutes = require("./routes/staffRoutes");
const bookingRoutes = require("./routes/bookingRoutes")

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {
  res.send("Hotel Management System Backend is running!");
});

// Sử dụng customerRoutes
app.use("/api/customers", customerRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/staffs", staffRoutes);
app.use("/api/bookings", bookingRoutes);

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Đóng kết nối khi ứng dụng tắt
process.on("SIGINT", () => {
  client.end()
    .then(() => {
      console.log("PostgreSQL client disconnected");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error disconnecting client", err.stack);
      process.exit(1);
    });
});