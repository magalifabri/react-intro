import React, {useRef, useState} from 'react';
import Todo from "../components/Todo";
import DatePicker from 'react-date-picker'


const TodoList = ({todos, setTodos, idCounter, setIdCounter}) => {
    const todoNameRef = useRef();
    const [pickedDate, setPickedDate] = useState();


    const handleAddTodo = () => {
        const newTodoName = todoNameRef.current.value;

        if (newTodoName === '') {
            return;
        }

        setTodos(prevTodos => {
            return [...prevTodos, {
                id: idCounter,
                name: newTodoName,
                complete: false,
                date: pickedDate ?? false,
            }];
        });

        setIdCounter(idCounter + 1);

        // empty input fields
        todoNameRef.current.value = '';
        setPickedDate();
    }


    const handleClearAllTodos = () => {
        localStorage.clear();
    }


    const toggleTodo = (idOfTodoToToggle) => {
        const newTodos = [...todos];
        const todoToToggle = newTodos.find(
            todo => todo.id === idOfTodoToToggle
        );

        todoToToggle.complete = !todoToToggle.complete;
        setTodos(newTodos);
    }


    const getTodoStatusString = () => {
        const numUncompletedTodos = todos.filter(
            todo => !todo.complete
        ).length;

        if (!numUncompletedTodos) {
            return 'all done!';
        } else if (numUncompletedTodos === 1) {
            return '1 todo left';
        } else {
            return numUncompletedTodos + ' todos left';
        }
    }


    const handleClearCompletedTodos = () => {
        const newTodos = todos.filter(
            todo => !todo.complete
        );

        setTodos(newTodos);
    }


    const handleKeyDown = ({key}) => {
        if (key === 'Enter') {
            handleAddTodo();
        }
    }


    const editTodo = (todoId, newTodoName) => {
        const newTodos = [...todos];
        const todoToRename = newTodos.find(
            todo => todo.id === todoId
        );

        todoToRename.name = newTodoName;
        setTodos(newTodos);
    }


    return (
        <>
            <h1>To-Do List</h1>

            <div className="todo-list">
                {todos.map(todo => {
                    return <Todo
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        editTodo={editTodo}
                    />
                })}
            </div>
            <input ref={todoNameRef} onKeyDown={handleKeyDown}
                   type="text" className="input-style-1"/>
            <br/>
            <br/>
            <DatePicker onChange={setPickedDate} value={pickedDate} />
            <br/>
            <br/>
            <button onClick={handleAddTodo} className="button-style-1">+</button>
            <br/>
            <br/>
            <button onClick={handleClearCompletedTodos} className="button-style-1">clear
                completed
            </button>
            <br/>
            <br/>
            <button onClick={handleClearAllTodos} className="button-style-1">clear all</button>
            <br/>
            <br/>
            <div>{getTodoStatusString()}</div>
        </>
    );
}

export default TodoList;