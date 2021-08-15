import { Space, Typography } from 'antd';
import Meals from '../components/Meals';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout } from '../app/userSlice';

import styles from '../styles/Home.module.css';

const Home = () => {
  const dispatch = useAppDispatch();

  
  const user = useAppSelector(state => state.user.user);
  console.log(user)

  return (
  <div className={styles.container}>
    <Typography.Title>
      Welcome {user?.name}
    </Typography.Title>
    <Space />
    <Meals />
  </div>
)
  };

export default Home;
