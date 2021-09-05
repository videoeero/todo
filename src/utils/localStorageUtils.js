// Save Todos to LocalStorage
export const saveToLocalStorage = (todoData) => {
  localStorage.setItem("localTodos", JSON.stringify(todoData));
};

// Load Todos from LocalStorage
export const loadFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("localTodos"));
  console.log(data);
  return data;
};
