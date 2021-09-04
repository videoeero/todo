const addNewTodo = (todoData, newTodo) => {
  const appendedTodolist = [...todoData, { task: newTodo, status: false }];

  return appendedTodolist;
};

export default addNewTodo;
