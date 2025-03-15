import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Typography,
    Row,
    Col,
    Popconfirm,
    notification,
    Input
} from 'antd';
import {
    getCustomers,
    createCustomer,
    editCustomer,
    deleteCustomer
} from '../../../services/apiCustomer';
import CreateCustomer from './CreateCustomer';
import EditCustomer from './EditCustomer';
const { Search } = Input;
const { Title } = Typography;

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false); //Loading
    const [isModalVisible, setIsModalVisible] = useState(false); //Đóng mở modal
    const [editingCustomer, setEditingCustomer] = useState(null); // Lưu thông tin khách hàng đang sửa
    //const [form] = Form.useForm(); // Form instance để reset và set giá trị
    const [searchKeyword, setSearchKeyword] = useState('');

    // Get customer
    useEffect(() => {
        // Khai báo hàm callback để lấy danh sách khách hàng
        const fetchCustomers = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                const response = await getCustomers(); // Gọi API
                setCustomers(response.data); // Cập nhật state với dữ liệu nhận được
            } catch (error) {
                console.error('Error fetching customers:', error); // Xử lý lỗi
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };
        // Gọi hàm callback
        fetchCustomers();
    }, []);

    // Create customer
    const handleCreate = async (values) => {
        try {
            setLoading(true); // Bắt đầu loading
            // Gọi API để tạo khách hàng
            const response = await createCustomer(values);
            console.log('Khách hàng đã được tạo:', response.data);

            // Đóng modal
            setIsModalVisible(false);

            // Làm mới danh sách khách hàng
            const customersResponse = await getCustomers();
            setCustomers(customersResponse.data);
        } catch (error) {
            console.error('Error creating customer:', error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    //Edit customer
    const handleEdit = async (values) => {
        try {
            setLoading(true); // Bắt đầu loading
            //Goi API
            const response = await editCustomer(editingCustomer.makh, values);
            console.log('Khách hàng đã được sửa:', response.data);
            // Đóng modal
            setIsModalVisible(false);
            // Làm mới danh sách khách hàng
            const customersResponse = await getCustomers();
            setCustomers(customersResponse.data);
        } catch (err) {
            console.error('Error edit customer:', err);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // xóa
    const handleDelete = async (customer) => {
        try {
            //Gọi API
            const response = await deleteCustomer(customer.makh);
            console.log(response);

            // Kiểm tra nếu có lỗi từ backend
            if (response === 'Server error') {
                throw new Error(response.error);
            }
            // Hiển thị thông báo thành công
            notification.success({
                message: 'Thành công',
                description: 'Khách hàng đã được xóa thành công.',
                placement: 'topRight'
            });
            // Làm mới danh sách khách hàng
            const customersResponse = await getCustomers();
            // Đóng modal
            setCustomers(customersResponse.data);
        } catch (err) {
            console.error('Error delete customer:', err);
            // Hiển thị thông báo lỗi
            notification.error({
                message: 'Lỗi',
                description: err.message || 'Đã xảy ra lỗi khi xóa khách hàng.',
                placement: 'topRight'
            });
        }
    };

    // Mở modal
    const handleOpen = () => {
        setIsModalVisible(true);
    };
    //Open handle edit
    const handleOpenEdit = (customer) => {
        //console.log(customer);
        setEditingCustomer(customer); //Lưu thông tin khách hàng đang sửa
        //form.setFieldsValue(customer);
        setIsModalVisible(true);
    };
    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Hàm tìm kiếm
    const onSearch = (value) => {
        setSearchKeyword(value); // Lưu từ khóa tìm kiếm
    };
    const onSearchChange = (e) => {
        setSearchKeyword(e.target.value); // Cập nhật từ khóa tìm kiếm ngay khi nhập
    };

    // Lọc dữ liệu dựa trên từ khóa
    const filteredCustomer = customers.filter((customer) => {
        return (
            customer.makh.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            customer.tenkh.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    });

    // Cột cho bảng
    const columns = [
        {
            title: 'Mã KH',
            dataIndex: 'makh',
            key: 'makh'
        },
        {
            title: 'Tên KH',
            dataIndex: 'tenkh',
            key: 'tenkh'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'diachi',
            key: 'diachi'
        },
        {
            title: 'Điện thoại',
            dataIndex: 'dienthoai',
            key: 'dienthoai'
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd'
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioitinh',
            key: 'gioitinh',
            render: (gioitinh) => (gioitinh ? 'Nam' : 'Nữ')
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaysinh',
            key: 'ngaysinh'
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button
                        type='primary'
                        variant='outlined'
                        onClick={() => handleOpenEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title='Xóa'
                        description='Bạn có muốn xóa không?'
                        okText='Có'
                        cancelText='Không'
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button danger style={{ left: '20px' }}>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            )
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Row
                justify='space-between'
                align='middle'
                style={{ marginBottom: '16px' }}
            >
                <Col>
                    <Title level={2}>Danh sách khách hàng</Title>
                </Col>
                <Col>
                    <Search
                        placeholder='Nhập từ khóa tìm kiếm'
                        allowClear
                        enterButton='Tìm kiếm'
                        size='medium'
                        onChange={onSearchChange} // Tìm kiếm ngay khi nhập
                        onSearch={onSearch} // Tìm kiếm khi nhấn nút
                    />
                </Col>
                <Col>
                    <Button type='primary' onClick={handleOpen}>
                        Tạo khách hàng
                    </Button>
                </Col>
            </Row>

            <Table
                dataSource={filteredCustomer}
                columns={columns}
                rowKey='makh'
                loading={loading}
                bordered
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />

            {/* Modal tạo khách hàng */}
            <CreateCustomer
                visible={isModalVisible}
                onCancel={handleCancel}
                onCreate={handleCreate}
            />

            {/* Modal sửa khách hàng */}
            <EditCustomer
                visible={isModalVisible}
                onCancel={handleCancel}
                onEdit={handleEdit}
                editingCustomer={editingCustomer}
            />
        </div>
    );
};

export default CustomerList;
