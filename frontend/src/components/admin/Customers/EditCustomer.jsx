import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

const EditCustomer = ({ visible, onCancel, onEdit, editingCustomer }) => {
    const [form] = Form.useForm();

    // Điền dữ liệu vào form khi editingCustomer thay đổi
    useEffect(() => {
        if (editingCustomer) {
            form.setFieldsValue(editingCustomer);
        }
    }, [editingCustomer, form]);

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
            title='Sửa thông tin khách hàng'
            open={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    label='Mã KH'
                    name='makh'
                    rules={[{ required: true, message: 'Vui lòng nhập mã KH' }]}
                >
                    <Input /> {/* Không cho phép sửa mã KH */}
                </Form.Item>
                <Form.Item
                    label='Tên KH'
                    name='tenkh'
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên KH' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label='Địa chỉ' name='diachi'>
                    <Input />
                </Form.Item>
                <Form.Item label='Điện thoại' name='dienthoai'>
                    <Input />
                </Form.Item>
                <Form.Item label='CCCD' name='cccd'>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Giới tính'
                    name='gioitinh'
                    rules={[
                        { required: true, message: 'Vui lòng chọn giới tính' }
                    ]}
                >
                    <div>
                        <Radio.Group>
                            <Radio value={true}>Nam</Radio>
                            <Radio value={false}>Nữ</Radio>
                        </Radio.Group>
                    </div>
                </Form.Item>
                <Form.Item label='Ngày sinh' name='ngaysinh'>
                    <Input type='date' />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditCustomer;
