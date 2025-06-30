import { User, LeaveBalance, LeaveRequest, LeaveType, LeaveStatus, UserRole, CompanyHoliday } from './types';

export const USERS: User[] = [
  { id: 'USR-MGR-001', name: 'Catherine Grant', email: 'c.grant@zenith.corp', avatarUrl: 'https://i.pravatar.cc/150?u=USR-MGR-001', role: UserRole.MANAGER, team: 'Engineering', loginHistory: [], password: '1234' },
  { id: 'USR-EMP-002', name: 'David Chen', email: 'd.chen@zenith.corp', avatarUrl: 'https://i.pravatar.cc/150?u=USR-EMP-002', role: UserRole.EMPLOYEE, team: 'Engineering', loginHistory: [], password: '1234' },
  { id: 'USR-EMP-003', name: 'Maria Rodriguez', email: 'm.rodriguez@zenith.corp', avatarUrl: 'https://i.pravatar.cc/150?u=USR-EMP-003', role: UserRole.EMPLOYEE, team: 'Engineering', loginHistory: [], password: '1234' },
  { id: 'USR-EMP-004', name: 'Kenji Tanaka', email: 'k.tanaka@zenith.corp', avatarUrl: 'https://i.pravatar.cc/150?u=USR-EMP-004', role: UserRole.EMPLOYEE, team: 'Design', loginHistory: [], password: '1234' },
];

export const LEAVE_BALANCES: Record<string, LeaveBalance> = {
  'USR-MGR-001': { [LeaveType.ANNUAL]: 18, [LeaveType.SICK]: 10, [LeaveType.UNPAID]: 0, [LeaveType.MATERNITY]: 0 },
  'USR-EMP-002': { [LeaveType.ANNUAL]: 12, [LeaveType.SICK]: 5, [LeaveType.UNPAID]: 2, [LeaveType.MATERNITY]: 0 },
  'USR-EMP-003': { [LeaveType.ANNUAL]: 5, [LeaveType.SICK]: 8, [LeaveType.UNPAID]: 0, [LeaveType.MATERNITY]: 0 },
  'USR-EMP-004': { [LeaveType.ANNUAL]: 20, [LeaveType.SICK]: 10, [LeaveType.UNPAID]: 1, [LeaveType.MATERNITY]: 0 },
};

export const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'LR-001',
    userId: 'USR-EMP-002',
    leaveType: LeaveType.ANNUAL,
    startDate: '2024-08-15',
    endDate: '2024-08-16',
    days: 2,
    reason: 'Family vacation to the Grand Canyon.',
    status: LeaveStatus.APPROVED,
  },
  {
    id: 'LR-002',
    userId: 'USR-EMP-003',
    leaveType: LeaveType.SICK,
    startDate: '2024-07-22',
    endDate: '2024-07-22',
    days: 1,
    reason: 'Feeling unwell, doctor\'s appointment scheduled.',
    status: LeaveStatus.APPROVED,
  },
  {
    id: 'LR-003',
    userId: 'USR-EMP-002',
    leaveType: LeaveType.UNPAID,
    startDate: '2024-09-01',
    endDate: '2024-09-01',
    days: 1,
    reason: 'Personal appointment that cannot be rescheduled.',
    status: LeaveStatus.PENDING,
  },
  {
    id: 'LR-004',
    userId: 'USR-EMP-003',
    leaveType: LeaveType.ANNUAL,
    startDate: '2024-09-10',
    endDate: '2024-09-15',
    days: 6,
    reason: 'Attending a friend\'s wedding overseas and taking a short break.',
    status: LeaveStatus.PENDING,
  },
  {
    id: 'LR-005',
    userId: 'USR-EMP-004',
    leaveType: LeaveType.ANNUAL,
    startDate: '2024-08-20',
    endDate: '2024-08-22',
    days: 3,
    reason: 'Short trip for a long weekend.',
    status: LeaveStatus.REJECTED,
    rejectionReason: 'Project deadline on Aug 21st requires all hands on deck.'
  },
];

export const COMPANY_HOLIDAYS: CompanyHoliday[] = [
    { date: '2024-01-01', name: 'New Year\'s Day' },
    { date: '2024-07-04', name: 'Independence Day' },
    { date: '2024-11-28', name: 'Thanksgiving Day' },
    { date: '2024-12-25', name: 'Christmas Day' },
];

export const COMPANY_LEAVE_POLICY = `
Zenith Corp Leave Policy:

1. Annual Leave:
   - All full-time employees are entitled to 20 days of paid annual leave per calendar year.
   - Leave is accrued monthly.
   - New employees get a pro-rated amount in their first year.
   - A maximum of 5 unused annual leave days can be carried over to the next year. Carry-over days must be used by March 31st.
   - Leave requests should be submitted at least 2 weeks in advance.

2. Sick Leave:
   - Employees are entitled to 10 days of paid sick leave per year.
   - For absences of 3 or more consecutive days, a doctor's certificate is required.
   - Unused sick leave does not carry over to the next year.

3. Unpaid Leave:
   - Unpaid leave may be granted at the manager's discretion for exceptional circumstances.
   - Requests must be discussed with your manager and HR.

4. Maternity Leave:
   - Eligible employees are entitled to 16 weeks of paid maternity leave.
   - Please contact HR at least 3 months prior to your expected due date to make arrangements.
`;

export const AVATAR_OPTIONS: string[] = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=7',
    'https://i.pravatar.cc/150?img=11',
    'https://i.pravatar.cc/150?img=14',
    'https://i.pravatar.cc/150?img=18',
    'https://i.pravatar.cc/150?img=25',
    'https://i.pravatar.cc/150?img=32',
    'https://i.pravatar.cc/150?img=35',
    'https://i.pravatar.cc/150?img=41',
    'https://i.pravatar.cc/150?img=56',
    'https://i.pravatar.cc/150?img=60',
];
