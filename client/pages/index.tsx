import {
  Button, Card, Input, Typography,
} from 'antd';
import Link from 'next/link';

import styles from '../styles/Login.module.css';

const Extra = <Link href="/signup"><Typography.Link>Sign Up</Typography.Link></Link>;

const Login = () => (
  <div className={styles.container}>
    <Card title={<Typography.Title>Login</Typography.Title>} className={styles.login} extra={Extra}>
      <Input placeholder="Please enter your email" type="text" size="large" />
      <Input placeholder="Please enter your password" type="password" size="large" />
      <Button type="primary" size="large">Login</Button>
    </Card>
  </div>
);

export default Login;
