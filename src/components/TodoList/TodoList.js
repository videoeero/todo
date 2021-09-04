import React, { useState, useEffect, createRef } from "react";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);

  const newTodoInput = createRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
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
    const filteredTodoList = todoData.filter(function (value, index, arr) {
      return index != itemIndexToRemoved;
    });

    setTodoData(filteredTodoList);
  };

  const editTodo = (index) => {
    console.log(todoData[index]);
  };

  return (
    <>
      <div>
        <input ref={newTodoInput} type="text" />
        <button onClick={addNewTodo}>Add new todo</button>
      </div>

      <ul>
        {todoData.map((item, index) => (
          <li key={index}>
            {item.task}
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
