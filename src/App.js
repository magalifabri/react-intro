import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TodoList from "./TodoList";
import Nav from "./Nav";
import Calendar from "./Calendar";
import Notes from "./Notes";


const App = () => {
    return (
        <Router>
            <Nav/>

            <Routes>
                <Route path="/" element={<TodoList/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/notes" element={<Notes/>}/>
            </Routes>
        </Router>
    )
}

export default App;
