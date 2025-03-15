const client = require("../config/db");

// Lấy danh sách nhân viên
const getStaff = async () => {
  const query = "SELECT * FROM NHANVIEN";
  const result = await client.query(query);
  return result.rows;
};

// Tạo nhân viên mới
const createStaff = async (staff) => {
  const { manv, tennv, socccd, sdt, ngaysinh , gioitinh, chucvu } = staff;
  const query = `
    INSERT INTO NHANVIEN (manv, tennv, socccd, sdt, ngaysinh, gioitinh, chucvu)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [ manv, tennv, socccd, sdt, ngaysinh , gioitinh, chucvu ];
  const result = await client.query(query, values);
  return result.rows[0];
};

//Edit Staff
const editStaff = async (manv, staff) => {
  const { tennv, socccd, sdt, ngaysinh , gioitinh, chucvu  } = staff;
  const query = `
    UPDATE NHANVIEN
    SET tennv = $1, socccd = $2, sdt = $3, ngaysinh = $4, gioitinh = $5, chucvu = $6
    WHERE manv = $7
    RETURNING *
  `;
  const values = [tennv, socccd, sdt, ngaysinh , gioitinh, chucvu, manv];
  const result = await client.query(query, values);
  return result.rows[0];
};

//Delete
const deleteStaff = async (manv) =>{
  const query = `DELETE FROM NHANVIEN WHERE manv = $1`;
  const values = [manv];
  const result = await client.query(query, values);
  return result.rows[0];
};


module.exports = {
  getStaff,
  createStaff,
  editStaff,
  deleteStaff
};