import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todoData, setTodoData] = useState([]);

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

  return (
    <ul>
      {todoData.map((item, index) => (
        <li>
          {item.task}
          <button>Edit</button>
          <button>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
