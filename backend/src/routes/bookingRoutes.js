const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// Định nghĩa các route
router.get("/",bookingController.getBookings);
router.post("/create", bookingController.createBooking);
router.post("/edit/:mabooking", bookingController.editBooking);
router.delete("/delete/:mabooking", bookingController.deleteBooking)

module.exports = router;