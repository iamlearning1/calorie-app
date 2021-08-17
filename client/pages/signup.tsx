import {
  Button, Card, Input, Typography, Form, message,
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import api from '../utils/api';

import styles from '../styles/Login.module.css';

const Extra = (
  <Link href="/">
    <Typography.Link>Login</Typography.Link>
  </Link>
);

const Signup = () => {
  const router = useRouter();

  const validateMessages = {
    types: {
      email: 'Not a valid email!',
    },
  };

  const onFinish = async (values :any) => {
    try {
      const { data } = await api.post('/user/signup', {
        name: values.Name,
        email: values.Email,
        password: values.Password,
      });

      message.success(data.message);
      message.info('Please login with your newely created account');
      router.push('/');
    } catch (error) {
      message.error(error.message.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <Card
        title={<Typography.Title>Sign Up</Typography.Title>}
        className={styles.login}
        extra={Extra}
      >
        <Form
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="Name"
            rules={[{ required: true, min: 2, type: 'string' }]}
          >
            <Input placeholder="Please enter your name" type="text" size="large" />
          </Form.Item>
          <Form.Item
            name="Email"
            rules={[{ type: 'email' }]}
          >
            <Input placeholder="Please enter your email" type="email" size="large" />
          </Form.Item>
          <Form.Item
            name="Password"
            rules={[{ required: true, min: 8, type: 'string' }]}
          >
            <Input placeholder="Please enter your password" type="password" size="large" />
          </Form.Item>
          <Form.Item
            name="Confirm Password"
            dependencies={['Password']}
            rules={[{ required: true, type: 'string' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('Password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input placeholder="Please confirm your password" type="password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">Sign me up</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
