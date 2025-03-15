import axios from './axios.customize';

// Lấy danh sách nhân viên
const getStaffs = () => axios.get('/api/staffs');

// Tạo nhân viên
const createStaff = (staff) => {
    console.log(staff)
    return axios.post('/api/staffs/create', staff);
}

//Edit nhân viên
const editStaff =(manv, staff) =>{
    return axios.post(`/api/staffs/edit/${manv}`, staff);
}

//Delete nhân viên 
const deleteStaff = (manv) => {
    return axios.delete(`/api/staffs/delete/${manv}`);
}

export {
    getStaffs,
    createStaff,
    editStaff,
    deleteStaff
}
