const staffModel = require("../models/staffModel");

// Lấy danh sách nhân viên
const getStaff = async (req, res) => {
  try {
    const staffs = await staffModel.getStaff();
    return res.status(200).json(staffs);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// Tạo nhân viên
const createStaff = async (req, res) => {
  try {
    const newStaff = await staffModel.createStaff(req.body);
    return res.status(200).json(newStaff);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
};

// Edit nhân viên
const editStaff = async (req, res) =>{
  const { manv } = req.params;
  try {
    const updatedStaff = await staffModel.editStaff(manv, req.body);
    return res.status(200).json(updatedStaff);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
}

//Delete nhân viên
const deleteStaff = async (req, res) => {
  const { manv } = req.params;
  try {
    await staffModel.deleteStaff(manv);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

module.exports = {
  getStaff,
  createStaff,
  editStaff,
  deleteStaff
};