import React from "react";
import "./Checkbox.scss";

export const Checkbox = ({
  status,
  isDisabled,
  handleToggleTodoDone,
  item,
  index,
}) => {
  return (
    <span className="todo__checkbox__container">
      <input
        className="todo__checkbox"
        checked={!status ? false : true}
        type="checkbox"
        id={`todo_${index}`}
        disabled={isDisabled()}
        onChange={() => {
          handleToggleTodoDone(item, index);
        }}
      />
      <label
        className={
          !status
            ? "todo__label todo__label--notdone"
            : "todo__label todo__label--done"
        }
        htmlFor={`todo_${index}`}
      >
        {item.task}
      </label>
    </span>
  );
};
