
import React, { useState } from 'react';
import { NewEmployeeData } from '../types';

interface AddEmployeeModalProps {
  onClose: () => void;
  onSubmit: (employeeData: NewEmployeeData) => void;
  managerTeam: string;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ onClose, onSubmit, managerTeam }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onSubmit({ name, email, password, team: managerTeam });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="employeeName" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
          </div>
           <div>
            <label htmlFor="employeeEmail" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="employeeEmail" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
          </div>
           <div>
            <label htmlFor="employeePassword" className="block text-sm font-medium text-gray-700">Initial Password</label>
            <input type="password" id="employeePassword" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
          </div>
           <div>
            <label htmlFor="employeeTeam" className="block text-sm font-medium text-gray-700">Team</label>
            <input type="text" id="employeeTeam" value={managerTeam} disabled className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover">Create Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
