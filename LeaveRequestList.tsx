import React from 'react';
import { LeaveRequest, LeaveStatus } from '../types';
import StatusBadge from './StatusBadge';

interface LeaveRequestListProps {
  requests: LeaveRequest[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const LeaveRequestList: React.FC<LeaveRequestListProps> = ({ requests }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">My Leave Requests</h2>
      <div className="overflow-x-auto">
        {requests.length > 0 ? (
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-xs text-medium uppercase border-b">
                <th className="py-3 px-4">Leave Type</th>
                <th className="py-3 px-4">Dates</th>
                <th className="py-3 px-4">Days</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <React.Fragment key={req.id}>
                    <tr className="border-b border-gray-100 hover:bg-light">
                      <td className="py-3 px-4 font-medium text-gray-800">{req.leaveType}</td>
                      <td className="py-3 px-4 text-gray-600">{formatDate(req.startDate)} - {formatDate(req.endDate)}</td>
                      <td className="py-3 px-4 text-gray-600">{req.days}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={req.status} />
                      </td>
                    </tr>
                    {req.status === LeaveStatus.REJECTED && req.rejectionReason && (
                         <tr className="bg-red-50">
                            <td colSpan={4} className="px-4 py-2 text-sm text-red-800 italic">
                                <strong>Reason:</strong> {req.rejectionReason}
                            </td>
                         </tr>
                    )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-medium py-8">You have not made any leave requests yet.</p>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestList;
