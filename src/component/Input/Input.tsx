import React, { useState, FC } from "react";
import "./Input.sass";

interface TodoInputProps {
  addTodo(stateInput: string): void
}

export const Input: FC<TodoInputProps> = ({ addTodo }) => {
  const [stateInput, setStateInput] = useState<string>('');

  const chengeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStateInput(e.target.value)
  }

  const keyDownInput = (e: React.KeyboardEvent) => {
    if( e.key === "Enter") {
      addTodo(stateInput);
      setStateInput("");
    }
  }

  return(
    <div className="input-container">
      <input type="text" 
        value={ stateInput } 
        onChange={chengeInput} 
        onKeyDown={ keyDownInput }/>
      <label className={stateInput === '' ? "label" : "label label--active"}>Введите задачу</label>
    </div>
  )
}