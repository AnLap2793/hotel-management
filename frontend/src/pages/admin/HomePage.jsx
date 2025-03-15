import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const HomePage = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Trang chủ</Title>
            <p>Chào mừng bạn đến với hệ thống quản lý khách sạn!</p>
        </div>
    );
};

export default HomePage;
