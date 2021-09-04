import React, { useState, useEffect, createRef } from "react";
import addNewTodo from "../../utils/addNewTodo";
import deleteTodo from "../../utils/deleteTodo";
import toggleTodoDone from "../../utils/toggleTodoDone";
import updateTodoTask from "../../utils/updateTodoTask";

import TodoItemEditMode from "../TodoItemEditMode/TodoItemEditMode";
import TodoItem from "../TodoItem/TodoItem";
import NewTodoInput from "../NewTodoInput/NewTodoInput";

import "./TodoList.scss";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const newTodoInput = createRef();

  const [editTodoInput, setEditTodoInput] = useState(null);

  useEffect(() => {
    console.log("App was rendered!");
    getTodoData();
  }, []);

  const getTodoData = () => {
    fetch("/data/todos.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (resultData) {
        setTodoData(resultData.todos);
      });
  };

  const handleAddNewTodo = () => {
    setTodoData(addNewTodo(todoData, newTodoInput.current.value));
    newTodoInput.current.value = "";
  };

  const handleDeleteTodo = (itemIndexToRemoved) => {
    setTodoData(deleteTodo(todoData, itemIndexToRemoved));
  };

  const editThisTodo = (index) => {
    setEditMode(index);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  const handleToggleTodoDone = (item, index) => {
    setTodoData(toggleTodoDone(todoData, item, index));
  };

  const handleEditTodo = (index, originalTask) => {
    setEditTodoInput(null);
    setEditMode(false);
    setTodoData((todoData) => {
      return updateTodoTask(editTodoInput, todoData, index, originalTask);
    });
  };

  const isDisabled = () => {
    return editMode === false ? false : true;
  };

  return (
    <>
      <NewTodoInput
        handleAddNewTodo={handleAddNewTodo}
        isDisabled={isDisabled}
        newTodoInput={newTodoInput}
      />

      <ul>
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
              item={item}
              handleToggleTodoDone={handleToggleTodoDone}
              isDisabled={isDisabled}
              index={index}
              editThisTodo={editThisTodo}
              handleDeleteTodo={handleDeleteTodo}
              editMode={editMode}
            />
          )
        )}
      </ul>
    </>
  );
};

export default TodoList;
