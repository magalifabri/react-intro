import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TodoList from "./TodoList";


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<TodoList/>} />
            </Routes>
        </Router>
    )
}

export default App;
