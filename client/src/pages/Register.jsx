import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'UsuarioComum' // Valor padrão conforme requisito 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Aqui entrará a chamada para o seu backend via Axios/Fetch [cite: 23]
      console.log("Enviando dados:", formData);
      
      // Simulação de sucesso
      setTimeout(() => {
        setLoading(false);
        navigate('/'); // Redireciona para login após cadastro
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError('Erro ao realizar cadastro. Tente novamente.'); [cite: 28]
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Nome:</label>
          <input 
            type="text" 
            required 
            style={{ width: '100%' }}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            required 
            style={{ width: '100%' }}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Senha:</label>
          <input 
            type="password" 
            required 
            style={{ width: '100%' }}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Tipo de Usuário:</label>
          <select 
            style={{ width: '100%' }}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="UsuarioComum">Usuário Comum</option>
            <option value="Admin">Administrador</option>
          </select>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>} [cite: 28]
        
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px' }}>
          {loading ? 'Carregando...' : 'Cadastrar'} [cite: 29]
        </button>
      </form>
      <p>Já tem conta? <Link to="/">Faça Login</Link></p>
    </div>
  );
};

export default Register;