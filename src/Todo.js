import React from 'react';

function Todo({todo}) {
    return (
        <div>
            <label>
                <input type="checkbox" defaultChecked={todo.complete}/>
                {todo.name}
            </label>
        </div>
    );
}

export default Todo;