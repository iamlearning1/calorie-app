import { useEffect } from 'react';
import {
  Button, Card, Input, Typography, Form, message
} from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { userLogin } from '../app/userSlice';

import styles from '../styles/Login.module.css';

const Extra = (
  <Link href="/signup">
    <Typography.Link>Sign Up</Typography.Link>
  </Link>
);

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.user.loading);
  const authenticated = useAppSelector(state => state.user.authenticated);
  const error = useAppSelector(state => state.user.error);

  const onFinish = async (values :any) => {
    dispatch(userLogin({email: values.Email, password: values.Password}));
  };

  useEffect(() => {
    if (authenticated) router.replace('/home');
  }, [authenticated])

  useEffect(() => {
    if (error) message.error(error);
  }, [error])

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
            name="Email"
            rules={[{ type: 'email' }]}
          >
            <Input placeholder="Please enter your email" type="email" size="large" />
          </Form.Item>
          <Form.Item
            name="Password"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please enter your password" type="password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" disabled={loading} loading={loading}>Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
