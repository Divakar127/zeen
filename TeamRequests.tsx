import React, { useState } from 'react';
import { LeaveRequest, User, LeaveStatus } from '../types';
import StatusBadge from './StatusBadge';
import RejectionReasonModal from './RejectionReasonModal';

interface TeamRequestsProps {
  requests: LeaveRequest[];
  users: User[];
  currentUserId: string;
  updateLeaveStatus: (requestId: string, status: LeaveStatus, reason?: string) => void;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TeamRequests: React.FC<TeamRequestsProps> = ({ requests, users, currentUserId, updateLeaveStatus }) => {
  const [rejectionModalRequest, setRejectionModalRequest] = useState<LeaveRequest | null>(null);

  const teamMemberIds = users
    .filter(u => u.team === users.find(cu => cu.id === currentUserId)?.team && u.id !== currentUserId)
    .map(u => u.id);
  
  const teamRequests = requests
    .filter(req => teamMemberIds.includes(req.userId))
    .sort((a,b) => {
        if (a.status === LeaveStatus.PENDING && b.status !== LeaveStatus.PENDING) return -1;
        if (a.status !== LeaveStatus.PENDING && b.status === LeaveStatus.PENDING) return 1;
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

  const getUserById = (id: string) => users.find(u => u.id === id);

  const handleReject = (reason: string) => {
    if (rejectionModalRequest) {
      updateLeaveStatus(rejectionModalRequest.id, LeaveStatus.REJECTED, reason);
      setRejectionModalRequest(null);
    }
  };

  return (
    <>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Team Leave Requests</h2>
      <div className="overflow-x-auto">
        {teamRequests.length > 0 ? (
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="text-xs text-medium uppercase border-b">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Days</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamRequests.map(req => {
                const user = getUserById(req.userId);
                return (
                  <tr key={req.id} className="border-b border-gray-100 hover:bg-light">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={user?.avatarUrl} alt={user?.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium text-gray-800">{user?.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{req.leaveType}</td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(req.startDate)} - {formatDate(req.endDate)}</td>
                    <td className="py-3 px-4 text-gray-600">{req.days}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-3 px-4">
                      {req.status === LeaveStatus.PENDING ? (
                        <div className="flex gap-2 justify-center">
                          <button onClick={() => updateLeaveStatus(req.id, LeaveStatus.APPROVED)} className="text-sm bg-approved text-white font-semibold py-1 px-3 rounded-md hover:opacity-80 transition-opacity">Approve</button>
                          <button onClick={() => setRejectionModalRequest(req)} className="text-sm bg-rejected text-white font-semibold py-1 px-3 rounded-md hover:opacity-80 transition-opacity">Reject</button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Actioned</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-medium py-8">No leave requests from your team.</p>
        )}
      </div>
    </div>
     {rejectionModalRequest && (
        <RejectionReasonModal
            onClose={() => setRejectionModalRequest(null)}
            onSubmit={handleReject}
        />
     )}
    </>
  );
};

export default TeamRequests;
