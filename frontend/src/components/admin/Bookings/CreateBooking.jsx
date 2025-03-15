import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { getCustomers } from '../../../services/apiCustomer';

const CreateBooking = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();
    const [customers, setCustomers] = useState([]);

    //get makh
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error); // Xử lý lỗi
            }
        };
        fetchCustomers();
    }, []);

    const options = customers.map((item) => ({
        value: item.makh,
        label: item.tenkh,
        disabled: item.disabled || false
    }));

    const handleSubmit = (values) => {
        onCreate(values);
        form.resetFields();
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Modal
            title='Tạo phiếu thuê mới'
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
            >
                <Form.Item
                    label='Mã phiếu thuê'
                    name='mabooking'
                    rules={[
                        { required: true, message: 'Vui lòng nhập mã booking' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label='Mã KH' name='makh'>
                    <Select
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={options}
                    />
                </Form.Item>
                <Form.Item label='Ngày đến dự kiến' name='ngaydendukien'>
                    <Input type='date' />
                </Form.Item>
                <Form.Item label='Ngày đi dự kiến' name='ngaydidukien'>
                    <Input type='date' />
                </Form.Item>
                <Form.Item label='Phương thức đặt cọc' name='phuongthucdatcoc'>
                    <Select
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={[
                            { value: 'Online', label: 'Online' },
                            { value: 'Offline', label: 'Offline' }
                        ]}
                    />
                </Form.Item>
                <Form.Item label='Tiền đặt cọc' name='tiendatcoc'>
                    <Input />
                </Form.Item>
                <Form.Item
                    //wrapperCol={{ span: 24 }}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Button type='primary' htmlType='submit'>
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateBooking;
