import {
  Form, Select, Typography, Input, DatePicker, Button,
} from 'antd';
import moment from 'moment';

import styles from '../styles/AddMeal.module.css';

const { Option } = Select;
const { Item } = Form;

const AddMeal = () => {
  const onFinish = (values :any) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <Typography.Title>Add a new meal</Typography.Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
      >
        <Item
          label="Meal:"
          name="meal"
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
          name="date/time"
          rules={[{ required: true, message: 'Please select date and time' }]}
        >
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
          />
        </Item>
        <Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default AddMeal;
