import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {differenceInCalendarDays, parseISO} from 'date-fns';
import './CalendarStyle.css';


const CalendarPage = ({todos}) => {
    const isSameDay = (calendarDate, todoDate) => {
        if (typeof todoDate === 'string') {
            return differenceInCalendarDays(parseISO(todoDate), calendarDate) === 0;
        } else {
            return differenceInCalendarDays(todoDate, calendarDate) === 0;
        }
    }


    // add pop-up div to days with associated todos for styling (month-view only)
    function tileContent(e) {
        const date = e.date;
        const view = e.view;

        if (view === 'month') {
            const todosOnThisDay = todos.filter(todo => isSameDay(date, todo.date));

            if (todosOnThisDay.length) {
                let i = 0;

                return (
                    <div className="todo-popup">
                        <ul>
                            {todosOnThisDay.map(todo => <li
                                key={i++}>{todo.name}</li>)}
                        </ul>
                    </div>
                )
            }
        }
    }


    // add className to days with associated todos for styling (month-view only)
    function tileClassName({date, view}) {
        if (view === 'month') {
            if (todos.find(todo => isSameDay(date, todo.date))) {
                return 'has-todo'
            }
        }
    }


    return (
        <div>
            <h1>Calendar</h1>

            <Calendar
                tileContent={tileContent}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default CalendarPage;
