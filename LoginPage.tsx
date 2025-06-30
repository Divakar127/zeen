
import React, { useState } from 'react';
import { User } from '../types';

interface LoginPageProps {
  users: User[];
  onLogin: (userId: string, password: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ users, onLogin }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || '');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId && password) {
      const success = onLogin(selectedUserId, password);
      if (!success) {
        setError('Invalid username or password.');
      }
    } else {
      setError('Please select a profile and enter your password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-3 rounded-xl text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                </div>
                <h1 className="text-4xl font-bold text-secondary">Zenith</h1>
            </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-center text-medium mb-6">Select your profile to continue.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="user-select" className="sr-only">Select a user</label>
              <select
                id="user-select"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full p-3 bg-light text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
            </div>
            <div>
                 <label htmlFor="password-input" className="sr-only">Password</label>
                 <input
                    type="password"
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 bg-light text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                 />
            </div>

            {error && <p className="text-center text-sm text-red-600">{error}</p>}
            
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 transform hover:scale-105"
            >
              Log In
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} Zenith Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
