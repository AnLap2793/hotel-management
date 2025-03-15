const express = require("express");
const staffController = require("../controllers/staffController");

const router = express.Router();

// Định nghĩa các route
router.get("/", staffController.getStaff);
router.post("/create", staffController.createStaff);
router.post("/edit/:manv", staffController.editStaff);
router.delete("/delete/:manv", staffController.deleteStaff)

module.exports = router;