import React, {useState, useRef} from 'react';


const Todo = ({todo, toggleTodo, editTodo}) => {
    const editInputRef = useRef();
    const [editable, setEditable] = useState(false);


    const handleChecking = () => {
        toggleTodo(todo.id);
    }


    const handleEdit = () => {
        setEditable(!editable);

        if (editable) {
            const newTodoName = editInputRef.current.value;

            editTodo(todo.id, newTodoName);
        } else {
            setTimeout(() => {
                editInputRef.current.focus();
            }, 10);
        }
    }


    const handleKeyDown = ({key}) => {
        if (key === 'Enter') {
            handleEdit();
        } else if (key === 'Escape') {
            setEditable(false);
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

                {editable ? <input ref={editInputRef} defaultValue={todo.name}
                                   onKeyDown={handleKeyDown}/> : todo.name}
            </label>

            <button onClick={handleEdit}>✎</button>
        </div>
    );
}

export default Todo;