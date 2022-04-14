import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {differenceInCalendarDays, parseISO} from 'date-fns';
import CalendarTodos from "../components/CalendarTodos";
import '../styles/CalendarStyle.scss';


const CalendarPage = ({todos}) => {
    const [selectedDate, setSelectedDate] = useState(new Date())


    const isSameDay = (calendarDate, todoDate) => {
        if (typeof todoDate === 'string') {
            return differenceInCalendarDays(parseISO(todoDate), calendarDate) === 0;
        } else {
            return differenceInCalendarDays(todoDate, calendarDate) === 0;
        }
    }


    const selectDay = (value) => {
        setSelectedDate(value);
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
        <>
            <h1>Calendar</h1>

            <Calendar
                tileClassName={tileClassName}
                onClickDay={selectDay}
            />

            <CalendarTodos selectedDate={selectedDate}
                           todos={todos}
                           isSameDay={isSameDay}/>
        </>
    );
};

export default CalendarPage;
