const customerModel = require("../models/customerModel");

// Lấy danh sách khách hàng
const getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getCustomers();
    return res.status(200).json(customers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// Tạo khách hàng mới
const createCustomer = async (req, res) => {
  try {
    const newCustomer = await customerModel.createCustomer(req.body);
    return res.status(200).json(newCustomer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// Edit customer
const editCustomer = async (req, res) =>{
  const { makh } = req.params;
  try {
    const updatedCustomer = await customerModel.editCustomer(makh, req.body);
    return res.status(200).json(updatedCustomer);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
}

//Delete customer
const deleteCustomer = async (req, res) => {
  const { makh } = req.params;
  try {
    await customerModel.deleteCustomer(makh);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getCustomers,
  createCustomer,
  editCustomer,
  deleteCustomer
};