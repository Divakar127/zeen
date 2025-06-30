import React, { useState } from 'react';
import { User } from '../types';
import { AVATAR_OPTIONS } from '../constants';

interface SettingsPageProps {
  currentUser: User;
  onUpdatePassword: (userId: string, oldPass: string, newPass: string) => boolean;
  onUpdateAvatar: (userId: string, avatarUrl: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentUser, onUpdatePassword, onUpdateAvatar }) => {
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Avatar state
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatarUrl);
  const [avatarSuccess, setAvatarSuccess] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    const result = onUpdatePassword(currentUser.id, currentPassword, newPassword);

    if (result) {
      setPasswordSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError('Incorrect current password.');
    }
  };

  const handleAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAvatar(currentUser.id, selectedAvatar);
    setAvatarSuccess('Profile picture updated!');
    setTimeout(() => setAvatarSuccess(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-medium mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Profile Picture</h2>
         <form onSubmit={handleAvatarSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
                <img src={selectedAvatar} alt="Selected Avatar" className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20"/>
                <div>
                    <h3 className="font-semibold text-gray-800">Choose your avatar</h3>
                    <p className="text-sm text-gray-500">Click an image below to select it.</p>
                </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {AVATAR_OPTIONS.map((url) => (
                    <button type="button" key={url} onClick={() => setSelectedAvatar(url)} className={`rounded-full focus:outline-none focus:ring-4 focus:ring-primary transition-transform hover:scale-110 ${selectedAvatar === url ? 'ring-4 ring-primary' : 'ring-2 ring-transparent'}`}>
                        <img src={url} alt="Avatar option" className="w-14 h-14 rounded-full object-cover" />
                    </button>
                ))}
            </div>
            {avatarSuccess && <p className="text-sm text-green-600">{avatarSuccess}</p>}
            <div className="flex justify-end pt-4">
                 <button type="submit" className="py-2 px-6 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
                    Update Picture
                 </button>
            </div>
         </form>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="newPassword"className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword"className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>

          {passwordError && <p className="text-sm text-red-600">{passwordError}</p>}
          {passwordSuccess && <p className="text-sm text-green-600">{passwordSuccess}</p>}

          <div className="flex justify-end pt-4">
            <button type="submit" className="py-2 px-6 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-hover">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
