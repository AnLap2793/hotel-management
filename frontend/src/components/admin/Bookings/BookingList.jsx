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
    getBookings,
    createBooking,
    editBooking,
    deleteBooking
} from '../../../services/apiBooking';

import CreateBooking from './CreateBooking';
import EditBooking from './EditBooking';
const { Search } = Input;
const { Title } = Typography;

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false); //Loading
    const [isModalVisible, setIsModalVisible] = useState(false); //Đóng mở modal
    const [editingBooking, setEditingBooking] = useState(null); // Lưu thông tin  đang sửa
    const [searchKeyword, setSearchKeyword] = useState('');

    // Get
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                const response = await getBookings(); // Gọi API
                setBookings(response.data); // Cập nhật state với dữ liệu nhận được
            } catch (error) {
                console.error('Error fetching bookings:', error); // Xử lý lỗi
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };
        // Gọi hàm callback
        fetchBookings();
    }, []);

    // Create bookings
    const handleCreate = async (values) => {
        try {
            setLoading(true); // Bắt đầu loading
            // Gọi API
            const response = await createBooking(values);
            // Đóng modal
            setIsModalVisible(false);
            // Làm mới danh sách
            const bookingsResponse = await getBookings();
            setBookings(bookingsResponse.data);
        } catch (error) {
            console.error('Error creating bookings:', error);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    //Edit
    const handleEdit = async (values) => {
        try {
            setLoading(true); // Bắt đầu loading
            //Goi API
            const response = await editBooking(editBooking.mabooking, values);
            console.log('Phiếu thuê đã được sửa:', response.data);
            // Đóng modal
            setIsModalVisible(false);
            // Làm mới danh sách khách hàng
            const bookingsResponse = await getBookings();
            setCustomers(bookingsResponse.data);
        } catch (err) {
            console.error('Error edit:', err);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    // xóa
    const handleDelete = async (booking) => {
        try {
            //Gọi API
            const response = await deleteBooking(booking.mabooking);
            // Kiểm tra nếu có lỗi từ backend
            if (response === 'Server error') {
                throw new Error(response.error);
            }
            // Hiển thị thông báo thành công
            notification.success({
                message: 'Thành công',
                description: 'Phiếu đặt đã được xóa thành công.',
                placement: 'topRight'
            });
            // Làm mới danh sách khách hàng
            const bookingsResponse = await getBookings();
            // Đóng modal
            setBookings(bookingsResponse.data);
        } catch (err) {
            console.error('Error delete booking:', err);
            // Hiển thị thông báo lỗi
            notification.error({
                message: 'Lỗi',
                description: err.message || 'Đã xảy ra lỗi khi xóa.',
                placement: 'topRight'
            });
        }
    };

    // Mở modal
    const handleOpen = () => {
        setIsModalVisible(true);
    };
    //Open handle edit
    const handleOpenEdit = (booking) => {
        setEditingBooking(booking);
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
    const filteredBooking = bookings.filter((booking) => {
        return (
            booking.mabooking
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
            booking.makh.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            booking.phuongthucdatcoc
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
            booking.tenkh.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    });

    // Cột cho bảng
    const columns = [
        {
            title: 'Mã booking',
            dataIndex: 'mabooking',
            key: 'mabooking'
        },
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
            title: 'Ngày đến dự kiến',
            dataIndex: 'ngaydendukien',
            key: 'ngaydendukien'
        },
        {
            title: 'Ngày đi dự kiến',
            dataIndex: 'ngaydidukien',
            key: 'ngaydidukien'
        },
        {
            title: 'Phương thức đặt cọc',
            dataIndex: 'phuongthucdatcoc',
            key: 'phuongthucdatcoc'
        },
        {
            title: 'Tiền đặt cọc',
            dataIndex: 'tiendatcoc',
            key: 'tiendatcoc'
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
                    <Title level={2}>Danh sách phiếu đặt phòng</Title>
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
                        Tạo phiếu thuê
                    </Button>
                </Col>
            </Row>

            <Table
                dataSource={filteredBooking}
                columns={columns}
                rowKey='mabooking'
                loading={loading}
                bordered
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
            />

            <CreateBooking
                visible={isModalVisible}
                onCancel={handleCancel}
                onCreate={handleCreate}
            />

            {/* Modal sửa */}
            <EditBooking
                visible={isModalVisible}
                onCancel={handleCancel}
                onEdit={handleEdit}
                edittingBooking={editingBooking}
            />
        </div>
    );
};

export default BookingList;
