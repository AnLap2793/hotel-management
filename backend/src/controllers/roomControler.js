const roomModel =  require("../models/roomModel");

//getRoom
const getRoom = async (req, res) => {
    try {
        const room = await roomModel.getRoom();
        return res.status(200).json(room);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
}

//create room
const createRoom = async (req, res) => {
    try {
        const newRoom = await roomModel.createRoom(req.body)
        return res.status(200).json(newRoom);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
}

//edit room
const editRoom = async (req, res) => {
    const { maphong } = req.params;
    try {
        const editRoom = await roomModel.editRoom(maphong, req.body);
        return res.status(200).json(editRoom);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
}

//delete room
const deleteRoom = async (req, res) => {
    const { maphong } = req.params;
    try {
        const deleteRoom = await roomModel.deleteRoom(maphong);
        return res.status(200).json(deleteRoom);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server error");
    }
}

//getTypeRoom
const getTypeRoom = async (req, res) => {
    try {
        const typeRoom = await roomModel.getTypeRoom();
        return res.status(200).json(typeRoom);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
}


module.exports = {
    getRoom,
    getTypeRoom,
    createRoom,
    editRoom,
    deleteRoom
}