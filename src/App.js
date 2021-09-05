import "./foundations/main.scss";
import TodoList from "./components/TodoList/TodoList";
import React, { useState, useEffect, createRef } from "react";
import addNewTodo from "./utils/addNewTodo";
import NewTodoForm from "./components/NewTodoForm/NewTodoForm";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageUtils";

const starterData = [
  { task: "You can add more Todos by using input above", status: false },
  {
    task: "If you want to delete this Todo, you have to mark it first as done.",
    status: false,
  },
  { task: "I am done and you can delete me!", status: true },
];

export const TodoApp = () => {
  // Todo data as array of objects
  const [todoData, setTodoData] = useState([]);

  // Adding ref to input field, so we can
  const newTodoInput = createRef();

  //Editing Todo at spesific index
  const [editTodoByIndex, setEditTodoByIndex] = useState(false);

  useEffect(() => {
    // Fetch data from either LocalStorage or from a file
    const getTodoData = () => {
      if (loadFromLocalStorage() !== null) {
        setTodoData(loadFromLocalStorage());
      } else {
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
          })
          .catch((error) => {
            console.error("Error while fetching data:", error);
            setTodoData(starterData);
          });
      }
    };

    getTodoData();
  }, []);

  // Handler to set which Todo is being edited
  const handleEditTodoByIndex = (newMode) => {
    setEditTodoByIndex(newMode);
  };

  // Handler when user adds a new Todo
  const handleAddNewTodo = (event) => {
    // Append added Todo to existing list and update state
    handleSetTodoData(addNewTodo(todoData, newTodoInput.current.value));

    // Prevent form submit from reloading page
    event.preventDefault();

    // Reset input value
    newTodoInput.current.value = "";
  };

  // Handler for updating Todos from TodoList component
  const handleSetTodoData = (newData) => {
    saveToLocalStorage(newData);
    setTodoData(newData);
  };

  // Helper to add disabled attribute to other inputs and buttons while editing one Todo
  const isDisabled = () => {
    return editTodoByIndex === false ? false : true;
  };

  return (
    <section className="App">
      <h1 className="heading heading__h1">To Do</h1>
      <NewTodoForm
        handleAddNewTodo={handleAddNewTodo}
        isDisabled={isDisabled}
        newTodoInput={newTodoInput}
      />
      <TodoList
        handleEditTodoByIndex={handleEditTodoByIndex}
        editTodoByIndex={editTodoByIndex}
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

export default TodoApp;
