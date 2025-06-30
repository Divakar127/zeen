import { useState, useCallback } from 'react';
import { LeaveRequest, LeaveStatus, LeaveData, UseLeaveDataReturn, User, NewEmployeeData, LeaveType, UserRole, LeaveBalance } from '../types';
import { USERS, LEAVE_BALANCES, LEAVE_REQUESTS, COMPANY_HOLIDAYS } from '../constants';

const dateDiffInDays = (a: Date, b: Date): number => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
};

export const useLeaveData = (): UseLeaveDataReturn => {
  const [data, setData] = useState<LeaveData>({
    users: USERS,
    leaveBalances: LEAVE_BALANCES,
    leaveRequests: LEAVE_REQUESTS,
    companyHolidays: COMPANY_HOLIDAYS,
  });

  const addLeaveRequest = useCallback((request: Omit<LeaveRequest, 'id' | 'days'>) => {
    setData(prevData => {
      const newId = `LR-${String(prevData.leaveRequests.length + 1).padStart(3, '0')}`;
      const days = dateDiffInDays(new Date(request.startDate), new Date(request.endDate));
      
      const newRequest: LeaveRequest = {
        ...request,
        id: newId,
        days: days > 0 ? days : 1,
        status: LeaveStatus.PENDING,
      };

      return {
        ...prevData,
        leaveRequests: [...prevData.leaveRequests, newRequest],
      };
    });
  }, []);

  const updateLeaveStatus = useCallback((requestId: string, status: LeaveStatus, reason?: string) => {
    setData(prevData => {
      const updatedRequests = prevData.leaveRequests.map(req => {
        if (req.id === requestId) {
          const updatedReq = { ...req, status };
          if (status === LeaveStatus.REJECTED) {
            updatedReq.rejectionReason = reason;
          }
          return updatedReq;
        }
        return req;
      });
      
      return {
        ...prevData,
        leaveRequests: updatedRequests,
      };
    });
  }, []);
  
  const addLoginTimestamp = useCallback((userId: string) => {
    setData(prevData => {
      const updatedUsers = prevData.users.map(user => {
        if (user.id === userId) {
          const newHistory = [{ timestamp: new Date().toISOString() }, ...user.loginHistory];
          return { ...user, loginHistory: newHistory };
        }
        return user;
      });
      return { ...prevData, users: updatedUsers };
    });
  }, []);

  const addEmployee = useCallback((employeeData: NewEmployeeData) => {
    setData(prevData => {
      const newId = `USR-EMP-${String(prevData.users.length + 1).padStart(3, '0')}`;
      const newUser: User = {
        id: newId,
        avatarUrl: `https://i.pravatar.cc/150?u=${newId}`,
        loginHistory: [],
        role: UserRole.EMPLOYEE,
        ...employeeData
      };

      const newLeaveBalance: LeaveBalance = {
        [LeaveType.ANNUAL]: 15, // Default balance
        [LeaveType.SICK]: 10,
        [LeaveType.UNPAID]: 0,
        [LeaveType.MATERNITY]: 0
      };

      return {
        ...prevData,
        users: [...prevData.users, newUser],
        leaveBalances: {
          ...prevData.leaveBalances,
          [newId]: newLeaveBalance
        }
      };
    });
  }, []);

  const updateUserPassword = useCallback((userId: string, oldPass: string, newPass: string): boolean => {
    let success = false;
    setData(prevData => {
        const user = prevData.users.find(u => u.id === userId);
        if (user && user.password === oldPass) {
            success = true;
            const updatedUsers = prevData.users.map(u => 
                u.id === userId ? { ...u, password: newPass } : u
            );
            return { ...prevData, users: updatedUsers };
        }
        return prevData;
    });
    return success;
  }, []);

  const updateUserAvatar = useCallback((userId: string, avatarUrl: string) => {
    setData(prevData => {
        const updatedUsers = prevData.users.map(u => 
            u.id === userId ? { ...u, avatarUrl: avatarUrl } : u
        );
        return { ...prevData, users: updatedUsers };
    });
  }, []);

  return { ...data, addLeaveRequest, updateLeaveStatus, addLoginTimestamp, addEmployee, updateUserPassword, updateUserAvatar };
};
