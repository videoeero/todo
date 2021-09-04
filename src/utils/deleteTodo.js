const deleteTodo = (todoData, itemIndexToRemoved) => {
  const filteredTodoList = todoData.filter((value, index) => {
    return index !== itemIndexToRemoved;
  });

  return filteredTodoList;
};

export default deleteTodo;
