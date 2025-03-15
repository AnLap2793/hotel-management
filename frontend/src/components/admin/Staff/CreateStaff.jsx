import React from 'react';
import { Button, Modal, Form, Input, Radio, Select } from 'antd';

const CreateStaff = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        onCreate(values);
        form.resetFields();
    };

    return (
        <Modal
            title='Thêm nhân viên'
            open={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    label='Mã NV'
                    name='manv'
                    rules={[{ required: true, message: 'Vui lòng nhập mã NV' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Tên NV'
                    name='tennv'
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên NV' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='CCCD'
                    name='socccd'
                    rules={[{ required: true, message: 'Vui lòng nhập CCCD' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label='Điện thoại' name='sdt'>
                    <Input />
                </Form.Item>
                <Form.Item label='Ngày sinh' name='ngaysinh'>
                    <Input type='date' />
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
                <Form.Item label='Chức vụ' name='chucvu'>
                    <Select
                        showSearch
                        placeholder='Chọn chức vụ'
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            { value: 'Nhân viên', label: 'Nhân viên' },
                            { value: 'Bảo vệ', label: 'Bảo vệ' },
                            { value: 'Quản lý', label: 'Quản lý' }
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateStaff;
