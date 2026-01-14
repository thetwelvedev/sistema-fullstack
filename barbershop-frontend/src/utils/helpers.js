import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Formatar data
export const formatDate = (date) => {
  if (!date) return '';
  try {
    return format(parseISO(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  } catch (error) {
    return '';
  }
};

// Formatar apenas data
export const formatDateOnly = (date) => {
  if (!date) return '';
  try {
    return format(parseISO(date), 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    return '';
  }
};

// Formatar preço
export const formatPrice = (price) => {
  if (!price && price !== 0) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// Formatar telefone
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Traduzir status
export const translateStatus = (status) => {
  const statusMap = {
    scheduled: 'Agendado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  };
  return statusMap[status] || status;
};

// Cor do status
export const getStatusColor = (status) => {
  const colorMap = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};