// Save Todos to LocalStorage
export const saveToLocalStorage = (todoData) => {
  const data = {
    todos: todoData,
    date: Date.now(),
  };

  localStorage.setItem("localTodos", JSON.stringify(data));
};

// Load Todos from LocalStorage
export const loadFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("localTodos"));
  return data;
};
