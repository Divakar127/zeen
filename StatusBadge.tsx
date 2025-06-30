
import React from 'react';
import { LeaveStatus } from '../types';

interface StatusBadgeProps {
  status: LeaveStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const baseClasses = 'px-2.5 py-1 text-xs font-semibold rounded-full inline-block';
  
  const statusClasses: Record<LeaveStatus, string> = {
    [LeaveStatus.PENDING]: 'bg-yellow-100 text-pending',
    [LeaveStatus.APPROVED]: 'bg-green-100 text-approved',
    [LeaveStatus.REJECTED]: 'bg-red-100 text-rejected',
  };

  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
