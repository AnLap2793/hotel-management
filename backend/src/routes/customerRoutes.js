const express = require("express");
const customerController = require("../controllers/customerController");

const router = express.Router();

// Định nghĩa các route
router.get("/", customerController.getCustomers);
router.post("/create", customerController.createCustomer);
router.post("/edit/:makh", customerController.editCustomer);
router.delete("/delete/:makh", customerController.deleteCustomer)

module.exports = router;