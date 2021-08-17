import { Spin } from 'antd';

const Loader = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Spin />
        </div>
    )
}

export default Loader;