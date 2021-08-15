import { Spin, Typography } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMeals } from '../app/mealSlice';

import styles from '../styles/Meals.module.css';

const Meals = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.meal.loading);
  const meals: any = useAppSelector((state) => state.meal.meals);

  useEffect(() => {
    dispatch(getMeals());
  }, []);

  if (loading) return <div className={styles.container}><Spin /></div>;

  return (
    <div className={styles.container}>
      {
        Object.keys(meals).map((date: string) => (
          <div key={date}>
            <span className={styles.title}>
              <Typography.Text>
                Date:
                {date}
              </Typography.Text>
              <Typography.Text>
                Calories:
                {meals[date].reduce((a: number, b: any) => a + b.calories, 0)}
              </Typography.Text>
            </span>
            <div className={styles.meals}>
              {meals[date].map((meal: any) => (
                <div key={meal._id} className={styles.meal}>
                  <Typography.Text>
                    Meal:
                    {meal.type}
                  </Typography.Text>
                  <Typography.Text>
                    Name:
                    {meal.name}
                  </Typography.Text>
                  <Typography.Text>
                    Calories:
                    {meal.calories}
                  </Typography.Text>
                  <Typography.Text>
                    Time:
                    {moment(meal.date).format('hh:mm:ss')}
                  </Typography.Text>
                </div>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Meals;
