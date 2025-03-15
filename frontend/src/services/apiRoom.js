import axios from './axios.customize';

// Lấy danh sách room
const getRoom = () => axios.get('/api/rooms');

// Tạo room mới
const createRoom = (room) => {
    console.log(room)
    return axios.post('/api/rooms/create', room);
}

//Edit room
const editRoom =(maphong, room) =>{
    return axios.post(`/api/rooms/edit/${maphong}`, room);
}

//Delete room 
const deleteRoom = (maphong) => {
    return axios.delete(`/api/rooms/delete/${maphong}`);
}

//Type room
const getTypeRoom = () => {
    return axios.get('/api/rooms/typeRoom');
}

export {
    getRoom,
    createRoom,
    editRoom,
    deleteRoom,
    getTypeRoom
}
