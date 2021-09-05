import React, { useState } from "react";
import deleteTodo from "../../utils/deleteTodo";
import toggleTodoDone from "../../utils/toggleTodoDone";
import updateTodoTask from "../../utils/updateTodoTask";
import TodoItemEditMode from "../TodoItemEditMode/TodoItemEditMode";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.scss";

const TodoList = ({
  todoData,
  handleSetTodoData,
  isDisabled,
  handleEditMode,
  editMode,
}) => {
  const [editTodoInput, setEditTodoInput] = useState(null);

  const handleDeleteTodo = (itemIndexToRemoved) => {
    handleSetTodoData(deleteTodo(todoData, itemIndexToRemoved));
  };

  const editThisTodo = (index) => {
    handleEditMode(index);
  };

  const cancelEdit = () => {
    handleEditMode(false);
  };

  const handleToggleTodoDone = (item, index) => {
    handleSetTodoData(toggleTodoDone(todoData, item, index));
  };

  const handleEditTodo = (index, originalTask, event) => {
    event.preventDefault();
    setEditTodoInput(null);
    handleEditMode(false);
    handleSetTodoData((todoData) => {
      return updateTodoTask(editTodoInput, todoData, index, originalTask);
    });
  };

  return (
    <form>
      <fieldset>
        <legend>Your Todos</legend>
        {todoData.map((item, index) =>
          editMode === index ? (
            <TodoItemEditMode
              key={`editItem_${index}`}
              index={index}
              handleEditTodo={handleEditTodo}
              setEditTodoInput={setEditTodoInput}
              editTodoInput={editTodoInput}
              cancelEdit={cancelEdit}
              task={item.task}
            />
          ) : (
            <TodoItem
              key={`editItem_${index}`}
              item={item}
              handleToggleTodoDone={handleToggleTodoDone}
              isDisabled={isDisabled}
              index={index}
              editThisTodo={editThisTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          )
        )}
      </fieldset>
    </form>
  );
};

export default TodoList;
