import React, { Children } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';

// Admin pages
import HomePage from './pages/admin/HomePage';
import CustomerPage from './pages/admin/CustomerPage';
import StaffPage from './pages/admin/StaffPage';
import NotFoundPage from './pages/admin/NotFoundPage';
import RoomPage from './pages/admin/RoomPage';

// User pages
import Home from './pages/users/home/Home';
import Hotel from './pages/users/hotel/Hotel';
import List from './pages/users/list/List';
import TypeRoom from './components/admin/Rooms/TypeRoom';
import BookingPage from './pages/admin/BookingPage';

const { Header, Content, Footer } = Layout;

// Menu items for admin layout
const items = [
    {
        label: <Link to={'/admin'}>Trang chủ</Link>,
        key: 'home'
    },
    {
        label: <Link to={'/admin/customers'}>Quản lý khách hàng</Link>,
        key: 'customer'
    },
    {
        label: <Link to={'/admin/staffs'}>Quản lý nhân viên</Link>,
        key: 'staff'
    },
    {
        label: 'Quản lý phòng',
        key: 'room',
        children: [
            {
                label: <Link to={'/admin/rooms'}>Phòng</Link>,
                key: 'rooms'
            },
            {
                label: <Link to={'/admin/rooms/typeRoom'}>Loại Phòng</Link>,
                key: 'typeroom'
            }
        ]
    },
    {
        label: <Link to={'/admin/bookings'}>Thông tin phiếu đặt phòng</Link>,
        key: 'booking'
    }
];

// Admin layout component
const AdminLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Header với menu điều hướng */}
            <Header>
                <div className='logo' />
                <Menu
                    theme='dark'
                    mode='horizontal'
                    defaultSelectedKeys={['home']}
                    items={items}
                />
            </Header>

            {/* Nội dung chính */}
            <Content style={{ padding: '24px' }}>
                <Outlet /> {/* Nơi hiển thị các component con */}
            </Content>

            {/* Footer */}
            <Footer style={{ textAlign: 'center' }}>
                Hệ thống quản lý khách sạn ©2025
            </Footer>
        </Layout>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                {/* User*/}
                <Route path='/' element={<Home />} />
                <Route path='/hotels' element={<List />} />
                <Route path='/hotels/:id' element={<Hotel />} />

                {/* Admin*/}
                <Route path='/admin' element={<AdminLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path='customers' element={<CustomerPage />} />
                    <Route path='staffs' element={<StaffPage />} />
                    <Route path='rooms' element={<RoomPage />} />
                    <Route path='rooms/typeRoom' element={<TypeRoom />} />
                    <Route path='bookings' element={<BookingPage />} />
                    <Route path='*' element={<NotFoundPage />} />{' '}
                    {/* Trang 404 cho admin */}
                </Route>

                {/* Trang 404 */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
