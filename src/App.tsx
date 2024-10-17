import { Layout } from 'antd';
import './App.css';
import generateKey from './utils/keygen';

const { Content } = Layout;

function App() {
  return (
    <Layout
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Content
        style={{
          width: '85%',
          height: '90vh', // Используем единицы viewport height
          backgroundColor: '#1890ff', // Голубой цвет
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button onClick={generateKey}>Generate Key</button>
      </Content>
    </Layout>
  );
}

export default App;
