import React, { useState, useEffect, createRef } from "react";

import "./TodoList.scss";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);

  const newTodoInput = createRef();

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
  };

  const toggleTodoDone = (item, index) => {
    console.log("toggling!");

    const updatedItemStatus = { ...item, status: !item.status };

    const newList = todoData.map((x, i) => {
      return i == index ? updatedItemStatus : x;
    });

    setTodoData(newList);
  };

  return (
    <>
      <div>
        <input ref={newTodoInput} type="text" />
        <button onClick={addNewTodo}>Add new todo</button>
      </div>

      <ul>
        {console.log(todoData)}
        {todoData.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => {
                toggleTodoDone(item, index);
              }}
            >
              Check
            </button>
            <span className={!item.status ? "item_false" : "item_true"}>
              {item.task}
            </span>
            <button
              onClick={() => {
                editTodo(index);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteTodo(index);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
