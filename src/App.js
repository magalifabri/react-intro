import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TodoList from "./TodoList";
import Nav from "./Nav";
import Calendar from "./Calendar";


const App = () => {
    return (
        <Router>
            <Nav/>

            <Routes>
                <Route path="/" element={<TodoList/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
            </Routes>
        </Router>
    )
}

export default App;
