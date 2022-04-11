// useState Hook lets us keep local state in a function component
import React, {useState, useRef} from "react";
import TodoList from "./TodoList";

function App() {
    const todoNameRef = useRef();
    // useState() takes one argument: the initial state
    // useState() returns two variables: the current state and a function to update the state
    const [todos, setTodos] = useState([]);

    const [idCounter, setIdCounter] = useState(1);

    const getTodosWithNewTodoAdded = (newTodoName, prevTodos) => {
        const id = idCounter;
        setIdCounter(idCounter + 1);

        return [...prevTodos, {
            id: id,
            name: newTodoName,
            complete: false,
        }];
    }

    const handleAddTodo = (event) => {
        const name = todoNameRef.current.value;
        // console.log(name);

        if (name === '') {
            return;
        }

        setTodos(prevTodos => getTodosWithNewTodoAdded(name, prevTodos));

        todoNameRef.current.value = '';
    }

    return (
        <>
            <TodoList todos={todos}/>
            <input ref={todoNameRef} type="text"/>
            <button onClick={handleAddTodo}>Add Todo</button>
            <button>Clear completed</button>
            <div>0 left Todos</div>
        </>
    )
}

export default App;
