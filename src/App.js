import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TodoList from "./pages/TodoList";
import Nav from "./components/Nav";
import Notes from "./pages/Notes";
import CalendarPage from "./pages/CalendarPage";
import {useEffect, useState} from "react";
import './styles/style.scss';

const LOCAL_STORAGE_TODOS_KEY = 'todos';


const App = () => {
    const [todos, setTodos] = useState([]);

    // load states from local storage
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS_KEY));

        if (storedTodos && storedTodos.length > 0) {
            setTodos(storedTodos);
        }
    }, []);


    // save states in local storage
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_TODOS_KEY, JSON.stringify(todos))
    }, [todos]);


    return (
        <Router>
            <Nav/>

            <Routes>
                <Route path="/" element={<TodoList
                    todos={todos}
                    setTodos={setTodos}
                />}/>
                <Route path="/calendar" element={<CalendarPage todos={todos}/>}/>
                <Route path="/notes" element={<Notes/>}/>
            </Routes>
        </Router>
    )
}

export default App;
