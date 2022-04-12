import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TodoList from "./TodoList";
import Nav from "./Nav";


const App = () => {

    return (
        <Router>
            <Nav />

            <Routes>
                <Route path="/" element={<TodoList/>} />
            </Routes>
        </Router>
    )
}

export default App;
