import React, {useState, useRef, useEffect} from "react";
import TodoList from "./TodoList";
const LOCAL_STORAGE_TODOS_KEY = 'todos';
const LOCAL_STORAGE_ID_COUNTER_KEY = 'idCounter';


function App() {
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


    const handleAddTodo = (event) => {
        const newTodoName = todoNameRef.current.value;

        if (newTodoName === '') {
            return;
        }

        setTodos(prevTodos => getTodosWithNewTodoAdded(newTodoName, prevTodos));

        // empty input field
        todoNameRef.current.value = '';
    }


    const clearAllTodos = () => {
        localStorage.clear();
    }


    return (
        <>
            <TodoList todos={todos}/>
            <input ref={todoNameRef} type="text"/>
            <button onClick={handleAddTodo}>Add Todo</button>
            <button>Clear completed</button>
            <button onClick={clearAllTodos}>Clear all todos</button>
            <div>0 left Todos</div>
        </>
    )
}

export default App;
