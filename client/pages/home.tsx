import { Space, Typography } from 'antd';
import Meals from '../components/Meals';

import styles from '../styles/Home.module.css';

const Home = () => (
  <div className={styles.container}>
    <Typography.Title>
      Welcome
      name
    </Typography.Title>
    <Space />
    <Meals />
  </div>
);

export default Home;
