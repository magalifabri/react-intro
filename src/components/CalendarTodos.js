import React from 'react';


const CalendarTodos = ({selectedDate, todos, isSameDay}) => {

    const getTodosOnThisDate = () => {
        const todosOnThisDay = todos.filter(todo => isSameDay(selectedDate, todo.date));

        if (todosOnThisDay.length) {
            let i = 0;

            return (
                <div className="calendar__todos-list">
                    <ul>
                        {
                            todosOnThisDay.map(todo =>
                                <li key={i++}>
                                    {todo.name}
                                </li>)
                        }
                    </ul>
                </div>
            )
        } else {
            return <p>No to-do's on this day</p>
        }
    }

    return (
        <div className="calendar__todos">
            <p className="big-text">To-Do's</p>
            <p className="subtitle">{selectedDate.toDateString()}</p>

            {getTodosOnThisDate()}
        </div>
    );
};

export default CalendarTodos;
