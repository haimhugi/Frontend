import React from 'react';
import 'antd/dist/antd.css';
import { Button, Form, Input } from 'antd';



const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const AddUser = () => {
    const onFinish = async values => {
        try {
            const response = await fetch('http://localhost:5000/api/users/add-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: values.user.name,
                    ID: values.user.id,
                    Phone: values.user.phone,
                    Email: values.user.email,
                    IP: values.user.Ip
                })
            });
            const data = await response.json();
            console.log(data);

        } catch (err) {
            console.log(err);
        }


    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'name']}
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name={['user', 'id']}
                label="ID"
                rules={[
                    {
                        required: true,
                        min: 0
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={['user', 'phone']}
                label="Phone"
                rules={[
                    {
                        required: true,
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={['user', 'Ip']}
                label="IP"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddUser;