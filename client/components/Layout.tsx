import { ReactNode } from 'react';
import { Button, Layout, Tooltip } from 'antd';
import { useRouter } from 'next/router';

import styles from '../styles/Layout.module.css';

const { Header, Content } = Layout;

interface Props {
    children: ReactNode;
}

const LayoutComponent = (props: Props) => {
  const { children } = props;
  const router = useRouter();

  return (
    <Layout>
      <Header className={styles.header}>
        <Tooltip title="Go to home" placement="bottomLeft">
          <h1 onClick={() => router.push('/')}>Calorie Tracking</h1>

        </Tooltip>
        <div>
          <Button id={styles.share} type="primary" shape="round">Share</Button>
          <Button id={styles.logout} shape="round">Logout</Button>
        </div>
      </Header>
      <Content className={styles.content}>
        {children}
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
