import React, { useState } from 'react';
import { User, UserRole, UseLeaveDataReturn } from '../types';
import LeaveBalanceCard from './LeaveBalanceCard';
import LeaveRequestList from './LeaveRequestList';
import TeamRequests from './TeamRequests';
import RequestLeaveModal from './RequestLeaveModal';
import AddEmployeeModal from './AddEmployeeModal';
import LoginHistory from './LoginHistory';

interface DashboardProps {
  currentUser: User;
  leaveData: UseLeaveDataReturn;
}

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const Dashboard: React.FC<DashboardProps> = ({ currentUser, leaveData }) => {
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

  const { users, leaveBalances, leaveRequests, addLeaveRequest, updateLeaveStatus, addEmployee } = leaveData;
  
  const userBalance = leaveBalances[currentUser.id];
  const userRequests = leaveRequests.filter(req => req.userId === currentUser.id).sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-medium mt-1">Welcome back, {currentUser.name}.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
            {currentUser.role === UserRole.MANAGER && (
                 <button onClick={() => setAddEmployeeModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 bg-secondary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                    <PlusIcon />
                    Add Employee
                </button>
            )}
            {currentUser.role === UserRole.EMPLOYEE && (
                <button onClick={() => setRequestModalOpen(true)} className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-primary-hover transition-colors">
                    <PlusIcon />
                    Request Leave
                </button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(userBalance).map(([type, days]) => (
          <LeaveBalanceCard key={type} leaveType={type} days={days} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
            {currentUser.role === UserRole.EMPLOYEE && (
                <LeaveRequestList requests={userRequests} />
            )}

            {currentUser.role === UserRole.MANAGER && (
                <TeamRequests 
                    requests={leaveRequests} 
                    users={users} 
                    currentUserId={currentUser.id}
                    updateLeaveStatus={updateLeaveStatus}
                />
            )}
        </div>
        <div className="xl:col-span-1">
             <LoginHistory history={currentUser.loginHistory} />
        </div>
      </div>
      
      {isRequestModalOpen && (
        <RequestLeaveModal
          onClose={() => setRequestModalOpen(false)}
          onSubmit={addLeaveRequest}
          userId={currentUser.id}
        />
      )}
      {isAddEmployeeModalOpen && (
        <AddEmployeeModal
            onClose={() => setAddEmployeeModalOpen(false)}
            onSubmit={addEmployee}
            managerTeam={currentUser.team}
        />
      )}
    </div>
  );
};

export default Dashboard;
