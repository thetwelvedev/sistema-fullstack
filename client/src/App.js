import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

// Componente simples de Dashboard para teste de rota
const Dashboard = () => (
  <div style={{ padding: '20px' }}>
    <h1>Dashboard</h1>
    <p>Bem-vindo ao sistema Full Stack!</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        {/* Aqui você pode adicionar um componente de Navbar fixo se desejar */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Rota para 404 */}
          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;