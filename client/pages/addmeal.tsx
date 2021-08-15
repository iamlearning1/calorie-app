import {
  Form, Select, Typography, Input, DatePicker, Button, message,
} from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { addMeal } from '../app/mealSlice';

import styles from '../styles/AddMeal.module.css';

const { Option } = Select;
const { Item } = Form;

const AddMeal = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.meal.loading);
  const response = useAppSelector((state) => state.meal.message);

  const [form] = Form.useForm();

  useEffect(() => {
    if (response) message.info(response);
  }, [response]);

  const onFinish = (values: any) => {
    if (values.calories <= 0) {
      message.info('Please provide a valid calorie value');
      return;
    }
    dispatch(addMeal(values));
  };

  return (
    <div className={styles.container}>
      <Typography.Title>Add a new meal</Typography.Title>
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
            Add
          </Button>
          <Button onClick={() => form.resetFields()} style={{ marginLeft: '20px' }}>Reset</Button>
        </Item>
      </Form>
    </div>
  );
};

export default AddMeal;
