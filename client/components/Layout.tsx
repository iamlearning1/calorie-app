import { ReactNode, useState } from 'react';
import {
  Button, Layout, Tooltip, Modal,
} from 'antd';
import { useRouter } from 'next/router';

import styles from '../styles/Layout.module.css';
import Share from './Share';

const { Header, Content } = Layout;

interface Props {
    children: ReactNode;
}

const LayoutComponent = (props: Props) => {
  const { children } = props;
  const router = useRouter();

  const [share, showShare] = useState(false);

  const logout = () => {
    router.replace('/');
  };

  const shareWithUser = () => {

  };

  return (
    <Layout>
      <Modal visible={share} onOk={shareWithUser} onCancel={() => showShare(false)} title="Share">
        <Share />
      </Modal>
      <Header className={styles.header}>
        <Tooltip title="Go to home" placement="bottomLeft">
          <h1 onClick={() => router.push('/')}>Calorie Tracking</h1>

        </Tooltip>
        <div>
          <Button id={styles.share} type="primary" shape="round" onClick={() => showShare(true)}>Share</Button>
          <Button id={styles.logout} shape="round" onClick={logout}>Logout</Button>
        </div>
      </Header>
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
