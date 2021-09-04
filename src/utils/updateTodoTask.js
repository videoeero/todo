const updateTodoTask = (editTodoInput, todoData, index, originalTask) => {
  const task = editTodoInput !== null ? editTodoInput : originalTask;
  const updatedTask = { task, status: false };
  const newList = todoData.map((originalItem, i) => {
    return i === index ? updatedTask : originalItem;
  });

  return newList;
};

export default updateTodoTask;
