import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, Row, Col, Tag, Input } from 'antd';
import { getRoom } from '../../../services/apiRoom';
const { Title } = Typography;
const { Search } = Input;

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false); //Loading
    //const [malp, setMalp] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState(''); // State để lưu từ khóa tìm kiếm

    //getRoom
    useEffect(() => {
        const fetchRoom = async () => {
            setLoading(true);
            try {
                const response = await getRoom();
                //console.log(response.data);
                setRooms(response.data);
                //setMalp();
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
            title: 'Mã phòng',
            dataIndex: 'maphong',
            key: 'maphong'
        },
        {
            title: 'Mã loại phòng',
            dataIndex: 'malp',
            key: 'malp'
        },
        {
            title: 'Số ngày thuê',
            dataIndex: 'songaythue',
            key: 'songaythue',
            showSorterTooltip: {
                target: 'full-header'
            },
            sorter: (a, b) => a.songaythue - b.songaythue,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Tình trạng',
            dataIndex: 'tinhtrang',
            key: 'tinhtrang',
            render: (tinhtrang) => {
                if (tinhtrang === 'active') {
                    return (
                        <Tag bordered={false} color='success'>
                            active
                        </Tag>
                    );
                } else {
                    return (
                        <Tag bordered={false} color='error'>
                            non-active
                        </Tag>
                    );
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <Button
                        type='primary'
                        variant='outlined'
                        //onClick={() => handleOpenEdit(record)}
                    >
                        Sửa
                    </Button>
                </div>
            )
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
            room.maphong.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            room.malp.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            room.tinhtrang
                .toLowerCase()
                .includes(searchKeyword.toLowerCase()) ||
            String(room.songaythue)
                .toLowerCase()
                .includes(searchKeyword.toLowerCase())
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
                    <Title level={2}>Danh sách phòng</Title>
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
                rowKey='maphong'
                dataSource={filteredRooms}
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

export default RoomList;
