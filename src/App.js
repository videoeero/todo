import "./App.scss";
import TodoList from "./components/TodoList/TodoList";

import React, { useState, useEffect, createRef } from "react";
import addNewTodo from "./utils/addNewTodo";
import NewTodoInput from "./components/NewTodoInput/NewTodoInput";

export const App = () => {
  // Todo data as array of objects
  const [todoData, setTodoData] = useState([]);

  // Adding ref to input field, so we can
  const newTodoInput = createRef();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    console.log("App was rendered!");
    getTodoData();
  }, []);

  const getTodoData = () => {
    if (loadFromLocalStorage()) {
      setTodoData(loadFromLocalStorage());
      return;
    }

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

  const handleEditMode = (newMode) => {
    setEditMode(newMode);
  };

  const handleAddNewTodo = (event) => {
    setTodoData(addNewTodo(todoData, newTodoInput.current.value));
    saveToLocalStorage(addNewTodo(todoData, newTodoInput.current.value));
    event.preventDefault();
    newTodoInput.current.value = "";
  };

  const handleSetTodoData = (newData) => {
    setTodoData(newData);
  };

  const isDisabled = () => {
    return editMode === false ? false : true;
  };

  const saveToLocalStorage = (todoData) => {
    localStorage.setItem("localTodos", JSON.stringify(todoData));
  };

  const loadFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("localTodos"));
    return data;
  };

  return (
    <section className="App">
      <h1>To Do</h1>
      <NewTodoInput
        handleAddNewTodo={handleAddNewTodo}
        isDisabled={isDisabled}
        newTodoInput={newTodoInput}
      />
      <TodoList
        handleEditMode={handleEditMode}
        editMode={editMode}
        isDisabled={isDisabled}
        todoData={todoData}
        handleSetTodoData={handleSetTodoData}
      />

      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        Clear Local Storage
      </button>
    </section>
  );
};

export default App;
