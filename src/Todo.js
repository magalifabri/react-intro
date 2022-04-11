import React, {useState, useRef} from 'react';


const Todo = ({todo, toggleTodo, editTodo}) => {
    const valueRef = useRef();
    const [edit, setEdit] = useState(false);


    const handleChecking = () => {
        toggleTodo(todo.id);
    }


    const handleEdit = () => {
        setEdit(!edit);

        if (edit) {
            const newTodoName = valueRef.current.value;

            editTodo(todo.id, newTodoName);
        }
    }


    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    defaultChecked={todo.complete}
                    onChange={handleChecking}
                />

                {edit ? <input ref={valueRef} /> : todo.name}
            </label>

            <button onClick={handleEdit}>✎</button>
        </div>
    );
}

export default Todo;