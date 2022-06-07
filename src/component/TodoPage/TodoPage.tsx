import React, { useState, useEffect } from "react";
import { ITodo } from "./../../interfaces/interfaces";
import { Input } from "./../Input/Input";
import { TodoList } from "../TodoList/TodoList";

export const TodoPage: React.FC = () => {
  const [todos, setTodo] = useState<ITodo[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
    setTodo(data);
  },[]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos]);

  const addTodo = (title: string) => {
    const newTodo: ITodo = {
      id: Date.now(),
      title: title,
      checked: false
    }
    setTodo(prev => [newTodo, ...prev]);
  }

  const toggleCheck = (id: number) => {
    setTodo(prev => prev.map(todo =>{
      if(todo.id === id) todo.checked = !todo.checked;
      return todo;
    }))
  }
  
  const removeTodo = (id: number) => {
    const agreement = window.confirm("Вы уверены, что хотите узалить задачу?");
    if(agreement) {
      setTodo(prev => prev.filter(todo => todo.id !== id));
    }
  }

  const editTodo = (id: number) => {
    const edit = todos.filter(todo => todo.id === id);
    const newTitle = window.prompt("Исправьте задачу!", edit[0].title);
    const editTodoItem: ITodo = {
      id: Date.now(),
      title: newTitle || edit[0].title,
      checked: false
    }
    setTodo(prev => prev.map(todo =>{
      if(todo.id === id) todo = editTodoItem;
      return todo;
    }))
  }

  return(
    <div className="todoPage">
      <Input addTodo={ addTodo }/>
      <TodoList todos={ todos } toggleCheck={ toggleCheck } removeTodo={ removeTodo } editTodo={ editTodo }/>
    </div>
  )
}