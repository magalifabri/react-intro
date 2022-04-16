import React, {useState, useRef} from 'react';
import '../styles/TodoStyle.scss';


const Todo = ({todo, toggleTodo, editTodo, setNewToFalse}) => {
    const editInputRef = useRef();
    const [editable, setEditable] = useState(false);


    const handleChecking = () => {
        toggleTodo(todo.id);
    }


    // input field lost focus
    // check if it lost focus because the edit button of the related input field was clicked
    // if so, do nothing, because handleEdit() will handle it
    // if not, toggle edit mode as 'click-away'

    const handleBlur = (e) => {
        const clickedOnEditButton = e?.relatedTarget?.className === 'button-style-2';

        if (clickedOnEditButton) {
            const editButtonId = e?.relatedTarget?.parentElement?.id;
            const todoId = e?.nativeEvent?.path[2]?.id;

            if (editButtonId === todoId) {
                return;
            }
        }

        setEditable(!editable);
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
             id={todo.id}
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
                               onBlur={handleBlur}
                        /> :
                        todo.name
                }
            </label>

            <button className="button-style-2 todo__button"
                    onClick={handleEdit}
            >
                ✎
            </button>
        </div>
    );
}

export default Todo;