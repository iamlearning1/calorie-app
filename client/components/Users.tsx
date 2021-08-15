import { useEffect } from 'react';
import {
  Spin, Typography, Collapse, List, Button,
} from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getUsers } from '../app/userSlice';
import { deleteMeal } from '../app/mealSlice';

import styles from '../styles/Users.module.css';

const Users = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.user.loading);
  const users: any = useAppSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const removeMeal = (id: string) => {
    dispatch(deleteMeal(id));
    dispatch(getUsers());
  };

  if (loading) return <div className={styles.container}><Spin /></div>;

  return (
    <Collapse className={styles.list}>
      {users.map((user: any) => (
        <Collapse.Panel
          header={`Name: ${user?.name}, Email: ${user?.email}`}
          key={user._id}
          extra={(
            <Button
              type="primary"
              onClick={() => router.push(`/addmeal/?userId=${user._id}&email=${user.email}`)}
            >
              Add meal
            </Button>
)}
        >
          <List
            dataSource={user.meals}
            renderItem={(item: any) => (
              <List.Item className={styles.item}>
                <Typography.Text>
                  Type:
                  {item.type}
                </Typography.Text>
                <Typography.Text>
                  Name:
                  {item.name}
                </Typography.Text>
                <Typography.Text>
                  Calories:
                  {item.calories}
                </Typography.Text>
                <Typography.Text>
                  Date:
                  {moment(item.date).format('DD-MMM-YY, hh:mm:ss')}
                </Typography.Text>
                <Button onClick={() => router.push(`/addmeal/?mealId=${item._id}`)}>Update</Button>
                {/* @ts-ignore */}
                <Button type="danger" onClick={() => removeMeal(item._id)}>Delete</Button>
              </List.Item>
            )}
          />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default Users;
