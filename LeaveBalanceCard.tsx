
import React from 'react';

interface LeaveBalanceCardProps {
  leaveType: string;
  days: number;
}

const Icon: React.FC<{ type: string }> = ({ type }) => {
  const iconClasses = "w-8 h-8";
  switch (type) {
    case 'Annual':
      return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
    case 'Sick':
      return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case 'Unpaid':
      return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5.92.92 18.08"></path><path d="M21 12H3"></path></svg>;
    default:
      return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
  }
};

const colors: Record<string, string> = {
    'Annual': 'text-blue-500 bg-blue-50',
    'Sick': 'text-yellow-500 bg-yellow-50',
    'Unpaid': 'text-gray-500 bg-gray-50',
    'Maternity': 'text-pink-500 bg-pink-50',
}

const LeaveBalanceCard: React.FC<LeaveBalanceCardProps> = ({ leaveType, days }) => {
  const colorClass = colors[leaveType] || colors['Unpaid'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-full ${colorClass}`}>
        <Icon type={leaveType} />
      </div>
      <div>
        <p className="text-medium text-sm">{leaveType} Leave</p>
        <p className="text-2xl font-bold text-gray-900">{days} <span className="text-base font-medium text-gray-500">Days</span></p>
      </div>
    </div>
  );
};

export default LeaveBalanceCard;
