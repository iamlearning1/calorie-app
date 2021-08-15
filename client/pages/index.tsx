import {
  Button, Card, Input, Typography, Form,
} from 'antd';
import Link from 'next/link';

import styles from '../styles/Login.module.css';

const Extra = (
  <Link href="/signup">
    <Typography.Link>Sign Up</Typography.Link>
  </Link>
);

const Login = () => {
  const onFinish = (values :any) => {
    console.log(values);
  };

  const validateMessages = {
    types: {
      email: 'Not a valid email!',
    },
  };

  return (
    <div className={styles.container}>
      <Card
        title={<Typography.Title>Login</Typography.Title>}
        className={styles.login}
        extra={Extra}
      >
        <Form
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="email"
            rules={[{ type: 'email' }]}
          >
            <Input placeholder="Please enter your email" type="email" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter a password' }]}
          >
            <Input placeholder="Please enter your password" type="password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
