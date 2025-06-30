export enum LeaveType {
  ANNUAL = 'Annual',
  SICK = 'Sick',
  UNPAID = 'Unpaid',
  MATERNITY = 'Maternity',
}

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum UserRole {
  EMPLOYEE = 'Employee',
  MANAGER = 'Manager',
}

export type AppView = 'dashboard' | 'calendar' | 'team' | 'reports' | 'settings';

export interface LoginEntry {
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  team: string;
  loginHistory: LoginEntry[];
  password?: string;
}

export interface LeaveBalance {
  [LeaveType.ANNUAL]: number;
  [LeaveType.SICK]: number;
  [LeaveType.UNPAID]: number;
  [LeaveType.MATERNITY]: number;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: LeaveStatus;
  rejectionReason?: string;
}

export interface CompanyHoliday {
  date: string;
  name: string;
}

export interface LeaveData {
  users: User[];
  leaveBalances: Record<string, LeaveBalance>;
  leaveRequests: LeaveRequest[];
  companyHolidays: CompanyHoliday[];
}

export type NewEmployeeData = Omit<User, 'id' | 'avatarUrl' | 'loginHistory' | 'role'> & { role?: UserRole };

export interface UseLeaveDataReturn extends LeaveData {
    addLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'days' | 'status'>) => void;
    updateLeaveStatus: (requestId: string, status: LeaveStatus, reason?: string) => void;
    addLoginTimestamp: (userId: string) => void;
    addEmployee: (employeeData: NewEmployeeData) => void;
    updateUserPassword: (userId: string, oldPass: string, newPass: string) => boolean;
    updateUserAvatar: (userId: string, avatarUrl: string) => void;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}
