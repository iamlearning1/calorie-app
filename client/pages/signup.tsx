import {
  Button, Card, Input, Typography,
} from 'antd';
import Link from 'next/link';

import styles from '../styles/Login.module.css';

const Extra = (
  <Link href="/">
    <Typography.Link>Login</Typography.Link>
  </Link>
);

const Signup = () => (
  <div className={styles.container}>
    <Card
      title={<Typography.Title>Sign Up</Typography.Title>}
      className={styles.login}
      extra={Extra}
    >
      <Input placeholder="Please enter your name" type="text" size="large" />
      <Input placeholder="Please enter your email" type="text" size="large" />
      <Input placeholder="Please enter your password" type="password" size="large" />
      <Input placeholder="Please confirm your password" type="password" size="large" />
      <Button type="primary" size="large">Sign me up</Button>
    </Card>
  </div>
);

export default Signup;
