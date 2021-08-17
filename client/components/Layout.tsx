import { ReactNode, useState, useEffect } from 'react';
import {
  Button, Layout, Tooltip, Modal,
} from 'antd';
import { useRouter } from 'next/router';

import Share from './Share';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { logout, userDetails, shareUser, resetShare } from '../app/userSlice';

import styles from '../styles/Layout.module.css';

const { Header, Content } = Layout;

interface Props {
    children: ReactNode;
}

const LayoutComponent = (props: Props) => {
  const { children } = props;
  const router = useRouter();

  const dispatch = useAppDispatch();

  const authenticated = useAppSelector((state) => state.user.authenticated);
  const user = useAppSelector((state) => state.user.user);

  const [share, showShare] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const logoutUser = () => {
    dispatch(logout());
    router.replace('/');
  };

  const shareWithUser = () => {
    dispatch(shareUser({ name, email }));
    setEmail('');
    setName('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !authenticated) dispatch(userDetails());
    else router.replace(router.pathname);
  }, []);

  useEffect(() => {
    if (!share) dispatch(resetShare());
  }, [share])

  return (
    <Layout>
      <Modal visible={share} onOk={shareWithUser} onCancel={() => showShare(false)} title="Share" okText="Share">
        <Share
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />
      </Modal>
      <Header className={styles.header}>
        <Tooltip title="Go to home" placement="bottomLeft">
          <h1 onClick={() => router.push(authenticated ? '/home' : '/')}>Calorie Tracking</h1>
        </Tooltip>
        {authenticated && (
        <div>
          {user?.role === 'user'
            ? <Button type="primary" shape="round" onClick={() => router.push('/addmeal')}>Add Meal</Button>
            : <div />}
          <Button type="primary" shape="round" onClick={() => showShare(true)}>Share</Button>
          <Button id={styles.logout} shape="round" onClick={logoutUser}>Logout</Button>
        </div>
        )}
      </Header>
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
