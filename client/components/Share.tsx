import { Alert, Input } from 'antd';

import { useAppSelector } from '../app/hooks';

interface Props {
  name: string;
  setName: Function;
  email: string;
  setEmail: Function;
}

const Share = (props: Props) => {
  const {
    name, setName, email, setEmail,
  } = props;

  const shareDetails = useAppSelector((state) => state.user.shareDetails);
  const error = useAppSelector((state) => state.user.shareError);

  return (
    <div>
      <Input
        placeholder="Name"
        type="text"
        style={{ marginBottom: '20px' }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      {shareDetails && <Alert message={`Password: ${shareDetails.password}`} type="info" closable />}
      {shareDetails && <Alert message={`Token: ${shareDetails.token}`} type="info" closable />}

      {error && <Alert type="error" message={error} closable />}
    </div>
  );
};

export default Share;
