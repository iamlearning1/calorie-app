import { useEffect } from 'react';
import {
  Tag, Collapse, Button,
} from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';

import Loader from './Loader';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getMeals } from '../app/mealSlice';

import styles from '../styles/Meals.module.css';

const Meals = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.meal.loading);
  const meals: any = useAppSelector((state) => state.meal.meals);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getMeals());
  }, []);

  if (loading) return <Loader />;

  return (
    <Collapse className={styles.list}>
      {
        Object.keys(meals).map((date: string) => {
          const calories = meals[date].reduce((a: number, b: any) => a + b.calories, 0);
          return (
            <Collapse.Panel
              key={date}
              header={date}
              extra={(
                <>
                  <Tag color="blue" className={styles.calories}>
                    Calories:
                    {calories}
                  </Tag>
                  <Tag color="red" className={styles.calories}>
                    Limit:
                    {user?.calorieLimit}
                  </Tag>
                </>
              )}
              className={styles.panel}
            >
              <div className={styles.meals}>
                {meals[date].map((meal: any) => (
                  <div key={meal._id} className={styles.meal}>
                    <div>
                      <span>
                        Meal:
                      </span>
                      <span>
                        <Tag color="orange">{meal.type}</Tag>
                      </span>
                    </div>
                    <div>
                      <span>
                        Name:
                      </span>
                      <span>
                        <Tag color="green">{meal.name}</Tag>
                      </span>
                    </div>
                    <div>
                      <span>
                        Calories:
                      </span>
                      <span>
                        <Tag color="blue">{meal.calories}</Tag>
                      </span>
                    </div>
                    <div>
                      <span>
                        Time:
                      </span>
                      <span>
                        <Tag color="cyan">
                          {moment(meal.date).format('hh:mm:ss')}
                        </Tag>
                      </span>
                    </div>
                    <Button
                      type="link"
                      size="small"
                      onClick={() => router.push(`/addmeal?mealId=${meal._id}`)}
                    >
                      Update
                    </Button>
                  </div>
                ))}
              </div>
            </Collapse.Panel>
          );
        })
      }
    </Collapse>
  );
};

export default Meals;
