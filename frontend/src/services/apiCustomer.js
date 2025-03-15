import axios from './axios.customize';

// Lấy danh sách khách hàng
const getCustomers = () => axios.get('/api/customers');

// Tạo khách hàng mới
const createCustomer = (customer) => {
    console.log(customer)
    return axios.post('/api/customers/create', customer);
}

//Edit customer
const editCustomer =(makh, customer) =>{
    return axios.post(`/api/customers/edit/${makh}`, customer);
}

//Delete customer 
const deleteCustomer = (makh) => {
    return axios.delete(`/api/customers/delete/${makh}`);
}

export {
    getCustomers,
    createCustomer,
    editCustomer,
    deleteCustomer
}
