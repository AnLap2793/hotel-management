const client = require("../config/db");

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Lấy danh sách khách hàng
const getCustomers = async () => {
  const query = "SELECT * FROM KHACHHANG";
  const result = await client.query(query);
  return result.rows;
};

// Tạo khách hàng mới
const createCustomer = async (customer) => {
  const { makh, tenkh, diachi, dienthoai, cccd, gioitinh, ngaysinh } = customer;
  const dateFomat = formatDate(ngaysinh);
  const query = `
    INSERT INTO KHACHHANG (MaKH, TenKH, Diachi, Dienthoai, CCCD, Gioitinh, NgaySinh)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [makh, tenkh, diachi, dienthoai, cccd, gioitinh, dateFomat];
  const result = await client.query(query, values);
  return result.rows[0];
};

//Edit customer
const editCustomer = async (makh, customer) => {
  const { tenkh, diachi, dienthoai, cccd, gioitinh, ngaysinh } = customer;
  const dateFomat = formatDate(ngaysinh);
  const query = `
    UPDATE KHACHHANG
    SET TenKH = $1, Diachi = $2, Dienthoai = $3, CCCD = $4, Gioitinh = $5, NgaySinh = $6
    WHERE MaKH = $7
    RETURNING *
  `;
  const values = [tenkh, diachi, dienthoai, cccd, gioitinh, dateFomat, makh];
  const result = await client.query(query, values);
  return result.rows[0];
};

//Delete
const deleteCustomer = async (makh) =>{
  const query = `DELETE FROM KHACHHANG WHERE MaKH = $1`;
  const values = [makh];
  const result = await client.query(query, values);
  return result.rows[0];
};


module.exports = {
  getCustomers,
  createCustomer,
  editCustomer,
  deleteCustomer
};