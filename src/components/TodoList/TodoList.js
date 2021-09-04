import React, { useState, useEffect, createRef } from "react";

import "./TodoList.scss";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const newTodoInput = createRef();

  const [editTodoInput, setEditTodoInput] = useState(null);

  useEffect(() => {
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
        console.log(response);
        return response.json();
      })
      .then(function (resultData) {
        console.log(resultData.todos);
        setTodoData(resultData.todos);
      });
  };

  const addNewTodo = () => {
    const newTodolist = [
      ...todoData,
      { task: newTodoInput.current.value, status: false },
    ];

    setTodoData(newTodolist);
    newTodoInput.current.value = "";
  };

  const deleteTodo = (itemIndexToRemoved) => {
    const filteredTodoList = todoData.filter((value, index) => {
      return index !== itemIndexToRemoved;
    });

    setTodoData(filteredTodoList);
  };

  const editTodo = (index) => {
    console.log(todoData[index]);
    setEditMode(index);
  };

  const toggleTodoDone = (item, index) => {
    console.log("toggling!");

    const updatedItemStatus = { ...item, status: !item.status };

    const newList = todoData.map((originalItem, i) => {
      return i === index ? updatedItemStatus : originalItem;
    });
    setTodoData(newList);
  };

  const updateTodoTask = (index, originalTask) => {
    const task = editTodoInput !== null ? editTodoInput : originalTask;

    const updatedTask = { task, status: false };
    console.log(updatedTask);

    const newList = todoData.map((originalItem, i) => {
      return i === index ? updatedTask : originalItem;
    });

    setEditTodoInput(null);

    setEditMode(false);
    setTodoData(newList);
  };

  const isDisabled = () => {
    return editMode === false ? false : true;
  };

  return (
    <>
      <div>
        <input ref={newTodoInput} type="text" disabled={isDisabled()} />
        <button onClick={addNewTodo} disabled={isDisabled()}>
          Add new todo
        </button>
      </div>

      <ul>
        {todoData.map((item, index) =>
          editMode === index ? (
            <li key={index}>
              <input
                type="text"
                value={editTodoInput === null ? item.task : editTodoInput}
                onChange={(e) => setEditTodoInput(e.target.value)}
              />
              <button
                onClick={() => {
                  updateTodoTask(index, item.task);
                }}
              >
                OK
              </button>
              <button>Cancel</button>
            </li>
          ) : (
            <li key={index}>
              <span
                onClick={() => {
                  toggleTodoDone(item, index);
                }}
              >
                <button disabled={isDisabled()}>Check</button>
                <span className={!item.status ? "item_false" : "item_true"}>
                  {item.task}
                </span>
              </span>

              <button
                onClick={() => {
                  editTodo(index);
                }}
                disabled={isDisabled() | item.status}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteTodo(index);
                }}
                disabled={isDisabled() | !item.status}
              >
                Delete
              </button>
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default TodoList;
