const client = require("../config/db");

//getRoom
const getRoom = async () => {
    const query = 'SELECT * FROM PHONG';
    const result = await client.query(query);
    return result.rows;
}

//Create room
const createRoom = async (room) => {
    const {maphong, malp, tinhtrang, songaythue} = room;
    const query = `INSERT INTO PHONG (MAPHONG, MALP, TINHTRANG, SONGAYTHUE) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [maphong, malp, tinhtrang, songaythue]
    const result = await client.query(query, values);
    return result.rows[0];
}

//Edit room
const editRoom = async (maphong, room) => {
    const {malp, tinhtrang, songaythue} = room;
    const query = `
        UPDATE PHONG 
        SET MALP = $1, TINHTRANG = $2, SONGAYTHUE = $3 
        WHERE MAPHONG = $4 
        RETURNING *
    `;
    const values = [malp, tinhtrang, songaythue, maphong];
    const result = await client.query(query, values);
    return result.rows[0];
}

//Delete room
const deleteRoom = async (maphong) => {
    const query = 'DELETE FROM PHONG WHERE MAPHONG = $1 RETURNING *';
    const values = [maphong];
    const result = await client.query(query, values);
    return result.rows[0];
}


//gettypeRoom
const getTypeRoom = async () => {
    const query = 'SELECT * FROM LOAIPHONG';
    const result = await client.query(query);
    return result.rows;
}


module.exports = {
    getRoom,
    getTypeRoom,
    createRoom,
    editRoom,
    deleteRoom
}