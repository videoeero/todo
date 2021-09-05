import React from "react";
import "./Button.scss";
import {
  IconAddTodo,
  IconDelete,
  IconEdit,
  IconEditOk,
  IconEditCancel,
} from "../Icon/Icon";

export const Button = (props) => {
  const { icon } = props;

  const selectIconToDisplay = (name) => {
    if (name === "add") {
      return <IconAddTodo />;
    }
    if (name === "delete") {
      return <IconDelete />;
    }
    if (name === "edit") {
      return <IconEdit />;
    }
    if (name === "editOk") {
      return <IconEditOk />;
    }
    if (name === "editCancel") {
      return <IconEditCancel />;
    }
  };

  return (
    <button {...props} className="button">
      {selectIconToDisplay(icon)}
    </button>
  );
};
