const client = require("../config/db");

//get 
const getBookings = async () => {
    const query = "SELECT mabooking, p.makh, tenkh, ngaydendukien, ngaydidukien, phuongthucdatcoc, tiendatcoc FROM PHIEUDAT p join khachhang k ON p.makh = k.makh";
    const result = await client.query(query);
    return result.rows;
  };


//create 
const createBooking = async (booking) => {
    const {mabooking, tiendatcoc, ngaydendukien, ngaydidukien, phuongthucdatcoc, makh} = booking;
    const query = `INSERT INTO phieudat (mabooking, tiendatcoc, ngaydendukien, ngaydidukien, phuongthucdatcoc, makh) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const value = [mabooking, tiendatcoc, ngaydendukien, ngaydidukien, phuongthucdatcoc, makh];
    const result = await client.query(query, value);
    return result.rows[0];
}
//Edit 
const editBooking = async (mabooking, booking) => {
    const { tiendatcoc, ngaydendukien, ngaydidukien, phuongthucdatcoc, makh} = booking;
    const query = `
      UPDATE phieudat
      SET tiendatcoc = $1, ngaydendukien = $2, ngaydidukien = $3, phuongthucdatcoc = $4, makh = $5
      WHERE mabooking = $6
      RETURNING *
    `;
    const values = [tiendatcoc, ngaydendukien, ngaydidukien, phuongthucdatcoc, makh, mabooking];
    const result = await client.query(query, values);
    return result.rows[0];
  };
  
  //Delete
  const deleteBooking = async (mabooking) =>{
    const query = `DELETE FROM phieudat WHERE mabooking = $1`;
    const values = [mabooking];
    const result = await client.query(query, values);
    return result.rows[0];
  };

module.exports = {
    getBookings,
    createBooking,
    editBooking,
    deleteBooking
}
