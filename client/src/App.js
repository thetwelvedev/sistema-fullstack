import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Por enquanto, criaremos componentes simples para teste
const Login = () => <h2>Tela de Login</h2>;
const Dashboard = () => <h2>Dashboard (Privado)</h2>;

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;