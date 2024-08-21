import React from 'react';

interface StatusBadgeProps {
  status: 'CHECKED OUT' | 'NOT CONFIRMED' | 'SEATED' | 'CONFIRMED' | 'OTHER';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'CHECKED OUT':
        return 'bg-red-500';
      case 'NOT CONFIRMED':
        return 'bg-orange-500';
      case 'SEATED':
        return 'bg-purple-500';
      case 'CONFIRMED':
        return 'bg-green-500';
      default:
        return 'bg-gray-500'; // Default color if status is not recognized
    }
  };

  return <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${getStatusClasses(status)}`}>{status}</span>;
};

export default StatusBadge;
