import {
  Button, Card, Input, Typography, Form,
} from 'antd';
import Link from 'next/link';

import styles from '../styles/Login.module.css';

const Extra = (
  <Link href="/">
    <Typography.Link>Login</Typography.Link>
  </Link>
);

const Signup = () => {
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
        title={<Typography.Title>Sign Up</Typography.Title>}
        className={styles.login}
        extra={Extra}
      >
        <Form
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Please enter your name" type="text" size="large" />
          </Form.Item>
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
          <Form.Item
            name="confirm"
            rules={[{ required: true, message: 'Please enter a password' }]}
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
