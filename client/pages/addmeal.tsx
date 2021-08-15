import { useEffect } from 'react';
import {
  Form, Select, Typography, Input, DatePicker, Button, message,
} from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  addMeal, getMeal, updateMeal, resetMessage,
} from '../app/mealSlice';

import styles from '../styles/AddMeal.module.css';

const { Option } = Select;
const { Item } = Form;

const AddMeal = () => {
  const router = useRouter();

  const { query } = router;
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.meal.loading);
  const meal = useAppSelector((state) => state.meal.meal);
  const response = useAppSelector((state) => state.meal.message);

  const [form] = Form.useForm();

  useEffect(() => {
    if (query?.mealId) dispatch(getMeal(query.mealId as string));
  }, [query]);

  const onFinish = (values: any) => {
    if (values.calories <= 0) {
      message.info('Please provide a valid calorie value');
      return;
    }

    if (query?.mealId) {
      dispatch(updateMeal({ ...values, id: query.mealId }));
    } else if (query.userId) {
      dispatch(addMeal({ ...values, user: query.userId }));
    } else dispatch(addMeal(values));
  };

  useEffect(() => {
    if (meal && query?.mealId) {
      form.setFieldsValue({
        name: meal?.name,
        type: meal?.type,
        date: moment(meal?.date),
        calories: meal?.calories,
      });
    }
  }, [meal]);

  useEffect(() => {
    if (response) message.info(response);
  }, [response]);

  useEffect(() => () => {
    dispatch(resetMessage());
  }, []);

  return (
    <div className={styles.container}>
      {query.mealId && <Typography.Title>Update meal</Typography.Title>}
      {query.userId && (
      <Typography.Title>
        Add a new meal for
        {query.email}
      </Typography.Title>
      )}
      {!query.userId && !query.mealId && <Typography.Title>Add a new meal</Typography.Title>}
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
      >
        <Item
          label="Meal:"
          name="type"
          rules={[{ required: true, message: 'Please select meal category' }]}
        >
          <Select placeholder="Please Select a meal category">
            <Option value="breakfast">Breakfast</Option>
            <Option value="lunch">Lunch</Option>
            <Option value="dinner">Dinner</Option>
          </Select>
        </Item>
        <Item
          label="Name:"
          name="name"
          rules={[{ required: true, message: 'Please enter your meal name' }]}
        >
          <Input placeholder="Enter name of food or product" />
        </Item>
        <Item
          label="Calories:"
          name="calories"
          rules={[{ required: true, message: 'Please select number of calories' }]}
        >
          <Input placeholder="Enter number of calories" type="number" />
        </Item>
        <Item
          label="Date/Time:"
          name="date"
          rules={[{ required: true, message: 'Please select date and time' }]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          />
        </Item>
        <Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {query?.mealId ? 'Update' : 'Add'}
          </Button>
          <Button onClick={() => form.resetFields()} style={{ marginLeft: '20px' }}>Reset</Button>
        </Item>
      </Form>
    </div>
  );
};

export default AddMeal;
