import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { getCustomers } from '../../../services/apiCustomer';

const EditBooking = ({ visible, onCancel, onEdit, edittingBooking }) => {
    const [form] = Form.useForm();
    const [customers, setCustomers] = useState([]);

    // Điền dữ liệu vào form khi edittingBooking thay đổi
    useEffect(() => {
        if (edittingBooking) {
            form.setFieldsValue(edittingBooking);
        }
    }, [edittingBooking, form]);

    //get makh
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
        fetchCustomers();
    }, []);

    const options = customers.map((item) => ({
        value: item.makh,
        label: item.tenkh,
        disabled: item.disabled || false
    }));

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleSubmit = (values) => {
        onEdit(values);
        form.resetFields();
    };

    const handleCancel = () => {
        onCancel();
        form.resetFields();
    };

    return (
        <Modal
            title='Sửa thông tin'
            open={visible}
            onCancel={handleCancel}
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
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditBooking;
