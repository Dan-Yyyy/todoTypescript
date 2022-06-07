import React, {FC} from "react";
import { ITodo } from "../../interfaces/interfaces";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./TodoList.sass";

type TodoListProps = {
  todos: ITodo[];
  toggleCheck(id: number): void,
  removeTodo(id:number): void,
  editTodo(id: number): void
}

export const TodoList: FC<TodoListProps> = ({ todos, toggleCheck, removeTodo, editTodo }) => {
  if(todos.length === 0) {
    return (
      <p className="todoList_empty">Задач пока нет!</p>
    )
  }
  const removeCheck = (e: React.MouseEvent, id:number) => {
    e.preventDefault();
    removeTodo(id);
  }
  return(
    <ul className="todoList">
      { todos.map(todo => {
        const classesName = ['todo'];
        if(todo.checked) classesName.push('checked');
        return(
          <li key={ todo.id } className={ classesName.join(" ")}>
            <label>
              <input type="checkbox" 
                checked={ todo.checked } 
                onChange={ toggleCheck.bind(null, todo.id)}/>
              <span>{ todo.title }</span>
            </label>
            <div>
              { todo.checked 
                ? null 
                : <AiOutlineEdit size={18} 
                  className="todoList_edit" 
                  onClick={ editTodo.bind(null, todo.id) }/>
              }
              <AiOutlineDelete 
                onClick={ (e) => removeCheck(e, todo.id)} 
                size={18} 
                className="todoList_delete"/>
            </div>
          </li>
        )
      })}
    </ul>
  )
}