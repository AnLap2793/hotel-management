const bookingModel = require('../models/bookingModel');

//get booking
const getBookings = async (req, res) => {
  try {
    const customers = await bookingModel.getBookings();
    return res.status(200).json(customers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// Tạo khách hàng mới
const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingModel.createBooking(req.body);
    return res.status(200).json(newBooking);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// Edit 
const editBooking = async (req, res) =>{
  const { mabooking } = req.params;
  try {
    const updatedBooking = await bookingModel.editBooking(mabooking, req.body);
    return res.status(200).json(updatedBooking);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
}

//Delete 
const deleteBooking = async (req, res) => {
  const { mabooking } = req.params;
  try {
    await bookingModel.deleteBooking(mabooking);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
    getBookings,
    createBooking,
    editBooking,
    deleteBooking
}