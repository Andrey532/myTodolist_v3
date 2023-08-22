import React from "react";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  oldTitle: string;
  onChange: (title: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [edit, setEdit] = useState(false);
  let [newTitle, setNewTitle] = useState<string>(props.oldTitle);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const addTask = () => {
    props.onChange(newTitle);
  };

  const editHandler = () => {
    setEdit(!edit);
    addTask();
  };
  return <>
      {edit ? (
        <input
          value={newTitle}
          onBlur={editHandler}
          autoFocus
          onChange={onChangeHandler}
        />
      ) : (
        <span onDoubleClick={editHandler}>
            {props.oldTitle}</span>
      )}
    </>
})
