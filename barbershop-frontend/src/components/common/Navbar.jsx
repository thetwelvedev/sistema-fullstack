import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiScissors, FiLogOut, FiUser, FiCalendar, FiHome } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <FiScissors className="text-2xl" />
            BarberShop
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition">
              <FiHome />
              <span>Início</span>
            </Link>
            
            <Link to="/services" className="text-gray-700 hover:text-primary-600 transition">
              Serviços
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/appointments" className="flex items-center gap-1 text-gray-700 hover:text-primary-600 transition">
                  <FiCalendar />
                  <span>Agendamentos</span>
                </Link>

                {isAdmin() && (
                  <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition">
                    Dashboard
                  </Link>
                )}

                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-300">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-gray-600" />
                    <span className="text-sm text-gray-700">{user?.name}</span>
                    {isAdmin() && (
                      <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition"
                  >
                    <FiLogOut />
                    <span>Sair</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">
                  Entrar
                </Link>
                <Link to="/register" className="btn-primary">
                  Cadastrar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;