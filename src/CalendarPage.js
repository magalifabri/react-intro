import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {differenceInCalendarDays, parseISO} from 'date-fns';


const CalendarPage = ({todos}) => {
    function tileContent({date, view}) {
        // Add to-do indication in month view only
        if (view === 'month') {
            if (todos.find(todo => differenceInCalendarDays(parseISO(todo.date), date) === 0)) {
                return ' todo';
            }
        }
    }


    return (
        <div>
            <h1>Calendar</h1>

            <Calendar
                tileContent={tileContent}
            />
        </div>
    );
};

export default CalendarPage;
