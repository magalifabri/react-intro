import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";

const LOCAL_STORAGE_TODOS_KEY = 'todos';
const LOCAL_STORAGE_ID_COUNTER_KEY = 'idCounter';


const App = () => {
    const todoNameRef = useRef();
    const [todos, setTodos] = useState([]);
    const [idCounter, setIdCounter] = useState(0);


    // load states from local storage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY));
        const storedIdCounter = Number(localStorage.getItem(LOCAL_STORAGE_ID_COUNTER_KEY));

        if (storedTodos && storedTodos.length > 0) {
            setTodos(storedTodos);
        }

        if (storedIdCounter) {
            setIdCounter(storedIdCounter);
        }
    }, []);


    // save states in local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos))
        localStorage.setItem(LOCAL_STORAGE_ID_COUNTER_KEY, String(idCounter));
    }, [todos, idCounter]);


    const getTodosWithNewTodoAdded = (newTodoName, prevTodos) => {
        setIdCounter(idCounter + 1);

        return [...prevTodos, {
            id: idCounter,
            name: newTodoName,
            complete: false,
        }];
    }


    const handleAddTodo = () => {
        const newTodoName = todoNameRef.current.value;

        if (newTodoName === '') {
            return;
        }

        setTodos(prevTodos => getTodosWithNewTodoAdded(newTodoName, prevTodos));

        // empty input field
        todoNameRef.current.value = '';
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
            <TodoList todos={todos} toggleTodo={toggleTodo} editTodo={editTodo}/>
            <input ref={todoNameRef} onKeyDown={handleKeyDown} type="text"/>
            <button onClick={handleAddTodo}>+</button>
            <button onClick={handleClearCompletedTodos}>clear completed</button>
            <button onClick={handleClearAllTodos}>clear all</button>
            <div>{getTodoStatusString()}</div>
        </>
    )
}

export default App;
