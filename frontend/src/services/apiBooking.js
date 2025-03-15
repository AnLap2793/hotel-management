import axios from './axios.customize';


const getBookings = () => axios.get('/api/bookings');

// Tạo phiếu đặt mới
const createBooking = (booking) => {
    console.log(booking)
    return axios.post('/api/bookings/create', booking);
}

//Edit 
const editBooking =(mabooking, booking) =>{
    return axios.post(`/api/bookings/edit/${mabooking}`, booking);
}

//Delete  
const deleteBooking = (mabooking) => {
    return axios.delete(`/api/bookings/delete/${mabooking}`);
}

export {
    getBookings,
    createBooking,
    editBooking,
    deleteBooking
}
