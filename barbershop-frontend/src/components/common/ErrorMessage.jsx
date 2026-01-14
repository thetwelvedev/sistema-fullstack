import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
      <FiAlertCircle className="text-xl flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;