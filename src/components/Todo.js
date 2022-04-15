import React, {useState, useRef} from 'react';
import '../styles/TodoStyle.scss';


const Todo = ({todo, toggleTodo, editTodo, setNewToFalse}) => {
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


    const handleAnimationEnd = () => {
        setNewToFalse(todo.id);
    }


    return (
        <div className={todo.new ? "todo todo--new" : "todo"}
             onAnimationEnd={handleAnimationEnd}>

            <label className="todo__label">
                <input className="todo__checkbox"
                       type="checkbox"
                       defaultChecked={todo.complete}
                       onChange={handleChecking}
                />

                {
                    editable ?
                        <input className="todo__input"
                               type="text"
                               ref={editInputRef}
                               defaultValue={todo.name}
                               onKeyDown={handleKeyDown}
                               onBlur={() => setEditable(false)}
                        /> :
                        todo.name
                }
            </label>

            <button className="todo__edit-button"
                    onClick={handleEdit}>
                ✎
            </button>
        </div>
    );
}

export default Todo;