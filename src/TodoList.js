import React from 'react';
import Todo from "./Todo";

const TodoList = ({todos, toggleTodo, editTodo}) => {
    return (
        <div className="todo-list">
            {todos.map(todo => {
                return <Todo
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    editTodo={editTodo}
                />
            })}
        </div>
    );
}

export default TodoList;