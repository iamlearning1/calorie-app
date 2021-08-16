import {
  Button, Space, Tag, Typography,
} from 'antd';
import { useRouter } from 'next/router';

import Meals from '../components/Meals';
import Users from '../components/Users';

import { useAppSelector } from '../app/hooks';

import styles from '../styles/Home.module.css';

const Home = () => {
  const router = useRouter();

  const user = useAppSelector((state) => state.user.user);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Typography.Title>
          Welcome
          {' '}
          {user?.name}
        </Typography.Title>
        {user?.role === 'admin' && <Tag color="success">Admin</Tag>}
        {user?.role === 'admin' && (
        <Button
          onClick={() => router.push('/report')}
          type="primary"
        >
          Weekly Reports
        </Button>
        )}
      </div>
      <Space />
      {user?.role === 'user' && <Meals />}
      {user?.role === 'admin' && <Users />}
    </div>
  );
};

export default Home;
