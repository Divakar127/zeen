
import React from 'react';
import { LoginEntry } from '../types';

interface LoginHistoryProps {
  history: LoginEntry[];
}

const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
};

const TimeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

const LoginHistory: React.FC<LoginHistoryProps> = ({ history }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Login History</h2>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.slice(0, 5).map((entry, index) => (
            <li key={index} className="flex items-center gap-4">
                <div className="p-2 bg-light rounded-full">
                    <TimeIcon />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-700">Logged in</p>
                    <p className="text-xs text-medium">{formatTimestamp(entry.timestamp)}</p>
                </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-medium py-8">No login history available.</p>
      )}
    </div>
  );
};

export default LoginHistory;
