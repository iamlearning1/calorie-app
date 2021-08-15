import {
  Typography, Spin, Collapse, List, Tag, Alert,
} from 'antd';
import { useEffect } from 'react';
import moment from 'moment';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getReport } from '../app/userSlice';

import styles from '../styles/Report.module.css';

const Report = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.user.loading);
  const report = useAppSelector((state) => state.user.report);
  const error = useAppSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(getReport());
  }, []);

  if (loading) return <div className={styles.container}><Spin /></div>;

  const listItem = (item: any) => (
    <List.Item className={styles.meal}>
      <div>
        <span>
          Meal:
        </span>
        <span>
          {item.type}
        </span>
      </div>
      <div>
        <span>
          Name:
        </span>
        <span>
          {item.name}
        </span>
      </div>
      <div>
        <span>
          Calories:
        </span>
        <span>
          {item.calories}
        </span>
      </div>
      <div>
        <span>
          Time:
        </span>
        <span>
          {moment(item.date).format('hh:mm:ss')}
        </span>
      </div>
    </List.Item>
  );

  const countCalories = (a: any, b: any) => a + b.calories;

  return (
    <div className={styles.container}>
      <Typography.Title>Reports</Typography.Title>
      <Alert message={`${error} - Go back to home by clicking the title on the top left`} type="error" />
      <Collapse>
        {report.map((user: any) => (
          <Collapse.Panel
            header={`Name: ${user?.name}, Email: ${user?.email}`}
            key={user._id}
          >
            <List
              header={(
                <div className={styles.header}>
                  <span>Last 7 days including today</span>
                  <Tag color="blue">
                    Avg. Calories:
                    {(user.currentWeekMeals.reduce(countCalories, 0) / 7).toFixed(2)}
                  </Tag>
                </div>
            )}
              dataSource={user.currentWeekMeals}
              renderItem={(item: any) => listItem(item)}
            />
            <List
              header={(
                <div className={styles.header}>
                  <span>Week Before last 7 days</span>
                  <Tag color="blue">
                    Avg. Calories:
                    {(user.lastWeekMeals.reduce(countCalories, 0) / 7).toFixed(2)}
                  </Tag>
                </div>
          )}
              dataSource={user.lastWeekMeals}
              renderItem={(item: any) => listItem(item)}
            />
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Report;
