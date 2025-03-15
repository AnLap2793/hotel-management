import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, Row, Col, Tag, Input } from 'antd';
import { getTypeRoom } from '../../../services/apiRoom';
const { Title } = Typography;
const { Search } = Input;

const TypeRoom = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false); //Loading
    const [searchKeyword, setSearchKeyword] = useState(''); // State để lưu từ khóa tìm kiếm

    useEffect(() => {
        const fetchRoom = async () => {
            setLoading(true);
            try {
                const response = await getTypeRoom();
                setRooms(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, []);

    const columns = [
        {
            title: 'Mã loại phòng',
            dataIndex: 'malp',
            key: 'malp'
        },
        {
            title: 'Kiểu phòng',
            dataIndex: 'kieuphong',
            key: 'kieuphong'
        },
        {
            title: 'Diện tích',
            dataIndex: 'dientich',
            key: 'dientich'
        },
        {
            title: 'Đơn giá',
            dataIndex: 'dongiaphong',
            key: 'dongiaphong'
        }
    ];

    const onChange = (pagination, sorter, extra) => {
        console.log('params', pagination, sorter, extra);
    };

    // Hàm tìm kiếm
    const onSearch = (value) => {
        setSearchKeyword(value); // Lưu từ khóa tìm kiếm
    };
    const onSearchChange = (e) => {
        setSearchKeyword(e.target.value); // Cập nhật từ khóa tìm kiếm ngay khi nhập
    };

    // Lọc dữ liệu dựa trên từ khóa
    const filteredRooms = rooms.filter((room) => {
        return (
            room.malp.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            room.kieuphong.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    });

    return (
        <div style={{ padding: '24px' }}>
            <Row
                justify='space-between'
                align='middle'
                style={{ marginBottom: '16px' }}
            >
                <Col>
                    <Title level={2}>Loại phòng</Title>
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
            </Row>

            <Table
                columns={columns}
                rowKey='malp'
                dataSource={rooms}
                loading={loading}
                onChange={onChange}
                showSorterTooltip={{
                    target: 'sorter-icon'
                }}
                pagination={{ pageSize: 10, position: ['bottomCenter'] }}
                locale={{
                    emptyText: searchKeyword
                        ? 'Không tìm thấy kết quả phù hợp'
                        : 'Không có dữ liệu'
                }}
            />
        </div>
    );
};

export default TypeRoom;
