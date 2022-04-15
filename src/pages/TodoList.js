import React, {useRef, useState} from 'react';
import DatePicker from 'react-date-picker'
import {v4 as uuidv4} from 'uuid';
import Todo from "../components/Todo";
import '../styles/TodoListStyle.scss';

import {LOCAL_STORAGE_TODOS_KEY} from "../App";


const TodoList = ({todos, setTodos}) => {
    const todoNameRef = useRef();
    const [pickedDate, setPickedDate] = useState();


    const handleAddTodo = () => {
        const newTodoName = todoNameRef.current.value;

        if (newTodoName === '') {
            return;
        }

        setTodos(prevTodos => {
            return [...prevTodos, {
                id: uuidv4(),
                name: newTodoName,
                complete: false,
                date: pickedDate ?? false,
                new: true,
            }];
        });

        // empty input fields
        todoNameRef.current.value = '';
        setPickedDate();
    }


    const handleClearAllTodos = () => {
        const response = window.confirm("Are you sure you want to clear all to-do's?");

        if (response) {
            localStorage.removeItem(LOCAL_STORAGE_TODOS_KEY);
            setTodos([]);
        }
    }


    const toggleTodo = (idOfTodoToToggle) => {
        const newTodos = [...todos];
        const todoToToggle = newTodos.find(
            todo => todo.id === idOfTodoToToggle
        );

        todoToToggle.complete = !todoToToggle.complete;
        setTodos(newTodos);
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


    const setNewToFalse = (todoId) => {
        const newTodos = [...todos];
        const todoToChange = newTodos.find(
            todo => todo.id === todoId
        );

        todoToChange.new = false;
        setTodos(newTodos);
    }


    const getTodoStatusString = () => {
        const numUncompletedTodos = todos.filter(
            todo => !todo.complete
        ).length;

        let message;

        if (!numUncompletedTodos) {
            message = 'all done!';
        } else if (numUncompletedTodos === 1) {
            message = '1 todo left';
        } else {
            message = numUncompletedTodos + ' todos left';
        }

        return (
            <div className="todo-app__todos-left">
                <p>{message}</p>
            </div>
        )
    }


    return (
        <>
            <h1 className="page-title">To-Do</h1>

            <div className="flex-wrapper todo-app">
                {todos.length > 0 &&
                    <>
                        {getTodoStatusString()}

                        <div className="todo-app__todo-list">
                            {todos.map(todo => {
                                return <Todo
                                    key={todo.id}
                                    todo={todo}
                                    toggleTodo={toggleTodo}
                                    editTodo={editTodo}
                                    setNewToFalse={setNewToFalse}
                                />
                            })}
                        </div>

                        <div className="button-row">
                            <button className="button-style-1"
                                    onClick={handleClearCompletedTodos}>
                                clear completed
                            </button>

                            <button
                                className="button-style-1 button-style-1--danger flex-initial"
                                onClick={handleClearAllTodos}>
                                clear all
                            </button>
                        </div>
                    </>
                }

                <p className="big-text">Add To-Do</p>

                <div className="input-wrapper">
                    <label className="input-wrapper__label"
                           htmlFor="todo">to-do</label>
                    <input className="input-wrapper__input" id="todo"
                           autoComplete="off"
                           ref={todoNameRef} onKeyDown={handleKeyDown}
                           type="text"/>
                </div>

                <div className="input-wrapper">
                    <label className="input-wrapper__label">
                        put to-do on calendar (optional)
                    </label>
                    <DatePicker onChange={setPickedDate}
                                value={pickedDate}/>
                </div>

                <button className="button-style-1"
                        onClick={handleAddTodo}>
                    add
                </button>
            </div>
        </>
    );
}

export default TodoList;