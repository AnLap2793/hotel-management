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
    getStaffs,
    createStaff,
    editStaff,
    deleteStaff
} from '../../../services/apiStaff';
import CreateStaff from './CreateStaff';
import EditStaff from './EditStaff';
const { Search } = Input;
const { Title } = Typography;

const CustomerList = () => {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(false); //Loading
    const [isModalVisible, setIsModalVisible] = useState(false); //Đóng mở modal
    const [editingStaff, setEditingStaff] = useState(null); // Lưu thông tin đang sửa
    //const [form] = Form.useForm(); // Form instance để reset và set giá trị
    const [searchKeyword, setSearchKeyword] = useState('');

    // Get staff
    useEffect(() => {
        // Khai báo hàm callback để lấy danh sách khách hàng
        const fetchStaffs = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                const response = await getStaffs(); // Gọi API
                setStaffs(response.data); // Cập nhật state với dữ liệu nhận được
            } catch (error) {
                console.error('Error fetching staffs:', error); // Xử lý lỗi
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };
        // Gọi hàm callback
        fetchStaffs();
    }, []);

    // Create staff
    const handleCreate = async (values) => {
        try {
            setLoading(true); // Bắt đầu loading
            // Gọi API để tạo khách hàng
            const response = await createStaff(values);
            // Đóng modal
            setIsModalVisible(false);
            // Làm mới danh sách khách hàng
            const staffsResponse = await getStaffs();
            setStaffs(staffsResponse.data);
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
            const response = await editStaff(editingStaff.manv, values);
            console.log('Nhân viên đã được sửa:', response.data);
            // Đóng modal
            setIsModalVisible(false);
            // Làm mới danh sách khách hàng
            const staffsResponse = await getStaffs();
            setStaffs(staffsResponse.data);
        } catch (err) {
            console.error('Error edit staff:', err);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // xóa
    const handleDelete = async (staff) => {
        try {
            //Gọi API
            const response = await deleteStaff(staff.manv);
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
            const customersResponse = await getStaffs();
            // Đóng modal
            setStaffs(customersResponse.data);
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
    const handleOpenEdit = (staff) => {
        setEditingStaff(staff); //Lưu thông tin đang sửa
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
    const filteredStaff = staffs.filter((staff) => {
        return (
            staff.manv.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            staff.tennv.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    });

    // Cột cho bảng
    const columns = [
        {
            title: 'Mã NV',
            dataIndex: 'manv',
            key: 'manv'
        },
        {
            title: 'Tên KH',
            dataIndex: 'tennv',
            key: 'tennv'
        },
        {
            title: 'CCCD',
            dataIndex: 'socccd',
            key: 'socccd'
        },
        {
            title: 'Điện thoại',
            dataIndex: 'sdt',
            key: 'sdt'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaysinh',
            key: 'ngaysinh'
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioitinh',
            key: 'gioitinh',
            render: (gioitinh) => (gioitinh ? 'Nam' : 'Nữ')
        },
        {
            title: 'Chức vụ',
            dataIndex: 'chucvu',
            key: 'chucvu'
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
                    <Title level={2}>Danh sách nhân viên</Title>
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
                        Thêm nhân viên
                    </Button>
                </Col>
            </Row>

            <Table
                dataSource={filteredStaff}
                columns={columns}
                rowKey='manv'
                loading={loading}
                bordered
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />

            {/* Modal create */}
            <CreateStaff
                visible={isModalVisible}
                onCancel={handleCancel}
                onCreate={handleCreate}
            />

            {/* Modal edit */}
            <EditStaff
                visible={isModalVisible}
                onCancel={handleCancel}
                onEdit={handleEdit}
                editingStaff={editingStaff}
            />
        </div>
    );
};

export default CustomerList;
