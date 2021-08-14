import { List } from 'antd';

const { Item } = List;

const Meals = (props: any) => {
  const { data = [] } = props;

  return (
    <List
      dataSource={data}
      renderItem={() => (
        <Item>
          <Item.Meta />
        </Item>
      )}
    />
  );
};

export default Meals;
