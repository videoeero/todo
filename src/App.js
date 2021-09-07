import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList/TodoList";
import NewTodoForm from "./components/NewTodoForm/NewTodoForm";
import { Header } from "./components/Header/Header";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageUtils";
import "./foundations/main.scss";

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

  //Editing Todo at spesific index
  const [editTodoByIndex, setEditTodoByIndex] = useState(false);

  // State to store what value is in textinput while editing
  const [editTodoInputValue, setEditTodoInputValue] = useState(undefined);

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
  const handleEditTodoByIndex = (todoAtIndexToEdit, taskBeforeEditing) => {
    setEditTodoInputValue(taskBeforeEditing);
    setEditTodoByIndex(todoAtIndexToEdit);
  };

  // Handler to track user input in Todo edit field
  const handleEditTodoInputValue = (inputValue) => {
    setEditTodoInputValue(inputValue);
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
    <>
      <Header />
      <section className="todo__main">
        <NewTodoForm
          handleSetTodoData={handleSetTodoData}
          isDisabled={isDisabled}
          todoData={todoData}
        />
        <TodoList
          handleEditTodoByIndex={handleEditTodoByIndex}
          editTodoByIndex={editTodoByIndex}
          isDisabled={isDisabled}
          todoData={todoData}
          handleSetTodoData={handleSetTodoData}
          handleEditTodoInputValue={handleEditTodoInputValue}
          editTodoInputValue={editTodoInputValue}
        />

        {process.env.NODE_ENV !== "production" ? (
          <button
            onClick={() => {
              localStorage.clear();
            }}
          >
            Clear Local Storage
          </button>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default TodoApp;
