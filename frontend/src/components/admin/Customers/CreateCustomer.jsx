import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

const CreateCustomer = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        onCreate(values);
        form.resetFields();
    };

    return (
        <Modal
            title='Tạo khách hàng mới'
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    label='Mã KH'
                    name='makh'
                    rules={[{ required: true, message: 'Vui lòng nhập mã KH' }]}
                >
                    <Input />
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
                        Tạo
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateCustomer;
