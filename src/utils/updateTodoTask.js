const updateTodoTask = (editTodoInput, todoData, index) => {
  const task = editTodoInput;
  const updatedTask = { task, status: false };
  const newList = todoData.map((originalItem, i) => {
    return i === index ? updatedTask : originalItem;
  });

  return newList;
};

export default updateTodoTask;
