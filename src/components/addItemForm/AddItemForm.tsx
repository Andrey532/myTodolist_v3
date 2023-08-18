import React from "react";
import style from "./AddItemForm.module.css"
import { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
}

export const AddItemForm = (props:AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const addTask = () => {
    title.trim() !== ""
      ? props.addItem(title.trim())
      : setError("Ttile is required!");
    setTitle("");
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") {
      addTask();
    }
  };
  
  return (
    <div>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? style.error : ""}/>

      <button onClick={addTask}>+</button>

      {error && <div className={style.error_message}>{error}</div>}
    </div>
  );
};
