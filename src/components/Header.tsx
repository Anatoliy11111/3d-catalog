import { Layout, Typography, Avatar } from 'antd';
const { Header: AntHeader } = Layout;
const { Title } = Typography;

export const Header = () => {

  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="header-brand">
          <Avatar src={'/images/logo36.png'} size={36}/>
          <Title level={5} className="header-title">
            3-Д Мастерская Черепановых
          </Title>
        </div>
      </div>
    </AntHeader>
  );
};
