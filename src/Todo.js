import React from 'react';

const Todo = ({todo, toggleTodo}) => {

    const handleChecking = () => {
        toggleTodo(todo.id);
    }

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    defaultChecked={todo.complete}
                    onChange={handleChecking}
                />
                {todo.name}
            </label>
        </div>
    );
}

export default Todo;