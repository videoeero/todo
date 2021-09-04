const toggleTodoDone = (todoData, item, index) => {
  const updatedItemStatus = { ...item, status: !item.status };
  const newList = todoData.map((originalItem, i) => {
    return i === index ? updatedItemStatus : originalItem;
  });
  return newList;
};

export default toggleTodoDone;
