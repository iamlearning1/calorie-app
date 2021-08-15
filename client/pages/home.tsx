import { Space, Typography } from 'antd';

import Meals from '../components/Meals';
import Users from '../components/Users';

import { useAppSelector } from '../app/hooks';

import styles from '../styles/Home.module.css';

const Home = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className={styles.container}>
      <Typography.Title>
        Welcome
        {' '}
        {user?.name}
      </Typography.Title>
      <Space />
      {user?.role === 'user' ? <Meals /> : <Users />}
    </div>
  );
};

export default Home;
