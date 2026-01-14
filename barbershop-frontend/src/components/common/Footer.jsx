import { FiScissors, FiInstagram, FiFacebook, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FiScissors className="text-2xl text-primary-500" />
              <h3 className="text-xl font-bold">BarberShop</h3>
            </div>
            <p className="text-gray-400">
              A melhor barbearia da região. Estilo, qualidade e atendimento de excelência.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <FiPhone /> (85) 99999-9999
              </p>
              <p className="flex items-center gap-2">
                <FiMail /> contato@barbershop.com
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">
                <FiInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition">
                <FiFacebook className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2026 BarberShop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;