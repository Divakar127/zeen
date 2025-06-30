import React, { useState, useMemo } from 'react';
import { User, UseLeaveDataReturn, LeaveStatus, CompanyHoliday } from '../types';

interface TeamCalendarProps {
  currentUser: User;
  leaveData: UseLeaveDataReturn;
}

interface CalendarEvent {
  type: 'leave' | 'holiday';
  id: string;
  name: string;
  avatarUrl?: string;
  status?: LeaveStatus;
}

const TeamCalendar: React.FC<TeamCalendarProps> = ({ currentUser, leaveData }) => {
  const { users, leaveRequests, companyHolidays } = leaveData;
  const [currentDate, setCurrentDate] = useState(new Date());

  const teamMemberIds = useMemo(() => {
    return users.filter(u => u.team === currentUser.team).map(u => u.id);
  }, [users, currentUser.team]);

  const teamLeaves = useMemo(() => {
    return leaveRequests.filter(req => teamMemberIds.includes(req.userId) && req.status !== LeaveStatus.REJECTED);
  }, [leaveRequests, teamMemberIds]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
        daysArray.push({ key: `prev-${i}`, date: null, isCurrentMonth: false });
    }
    for (let i = 1; i <= totalDays; i++) {
        const dayDate = new Date(year, month, i);
        daysArray.push({ key: `current-${i}`, date: dayDate, isCurrentMonth: true });
    }
    const remaining = (7 - (daysArray.length % 7)) % 7;
    for (let i = 0; i < remaining; i++) {
        daysArray.push({ key: `next-${i}`, date: null, isCurrentMonth: false });
    }
    return daysArray;
  };

  const calendarDays = getDaysInMonth(currentDate);

  const getEventsForDay = (date: Date): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    const dateString = date.toISOString().split('T')[0];

    // Check for holidays
    const holiday = companyHolidays.find(h => h.date === dateString);
    if (holiday) {
      events.push({ type: 'holiday', id: holiday.date, name: holiday.name });
    }

    // Check for leaves
    teamLeaves.forEach(leave => {
        const startDate = new Date(leave.startDate);
        const endDate = new Date(leave.endDate);
        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);
        
        if (date >= startDate && date <= endDate) {
            const employee = users.find(u => u.id === leave.userId);
            events.push({
                type: 'leave',
                id: leave.id,
                name: employee?.name || 'Unknown',
                avatarUrl: employee?.avatarUrl,
                status: leave.status,
            });
        }
    });

    return events;
  };

  const changeMonth = (offset: number) => {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };
  
  const isToday = (date: Date | null) => {
      if (!date) return false;
      const today = new Date();
      return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h1>
        <div className="flex gap-2">
            <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg hover:bg-light" aria-label="Previous month"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <button onClick={() => changeMonth(1)} className="p-2 rounded-lg hover:bg-light" aria-label="Next month"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-semibold text-xs text-medium py-2">{day}</div>
        ))}
        {calendarDays.map(day => {
            const events = day.date ? getEventsForDay(day.date) : [];
            const todayClass = isToday(day.date) ? 'bg-primary text-white' : 'text-gray-800';
            
            return (
                <div key={day.key} className={`h-24 sm:h-32 md:h-40 p-1 sm:p-2 border border-gray-100 rounded-lg ${day.isCurrentMonth ? 'bg-white' : 'bg-light'}`}>
                    {day.date && (
                        <>
                            <div className={`text-sm font-semibold w-6 h-6 flex items-center justify-center rounded-full ${todayClass}`}>
                                {day.date.getDate()}
                            </div>
                            <div className="mt-1 space-y-1 overflow-y-auto max-h-full">
                                {events.map(event => {
                                    if (event.type === 'holiday') {
                                        return (
                                            <div key={event.id} className="text-xs p-1 bg-purple-100 text-purple-800 rounded-md font-semibold truncate">
                                                {event.name}
                                            </div>
                                        );
                                    }
                                    const bgColor = event.status === LeaveStatus.APPROVED ? 'bg-green-100' : 'bg-yellow-100';
                                    const textColor = event.status === LeaveStatus.APPROVED ? 'text-green-800' : 'text-yellow-800';
                                    return (
                                        <div key={event.id} className={`flex items-center gap-1 text-xs p-1 rounded-md ${bgColor}`}>
                                            <img src={event.avatarUrl} alt={event.name} className="w-4 h-4 rounded-full shrink-0"/>
                                            <span className={`truncate font-medium ${textColor}`}>{`${event.name.split(' ')[0]}`}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default TeamCalendar;
