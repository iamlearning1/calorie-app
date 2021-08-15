import { Space, Typography } from 'antd';

import Meals from '../components/Meals';
import Users from '../components/Users';

import { useAppSelector } from '../app/hooks';

import styles from '../styles/Home.module.css';

const Home = () => {
  const user = useAppSelector((state) => state.user.user);
  const authenticated = useAppSelector((state) => state.user.authenticated);

  return (
    <div className={styles.container}>
      <Typography.Title>
        Welcome
        {' '}
        {user?.name}
      </Typography.Title>
      <Space />
      {authenticated && user?.role === 'user' && <Meals />}
      {authenticated && user?.role === 'admin' && <Users />}
    </div>
  );
};

export default Home;
