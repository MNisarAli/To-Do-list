import './style.css';

const todoContainer = document.querySelector('#todo-list');
const toDoList = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 1,
  },
];
toDoList.forEach((item) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <label for="checkbox">
      <input class="checkbox" type="checkbox" id="${item.index}"> ${item.description}
    </label>
    <i class="fa-solid fa-ellipsis-vertical"></i>`;
  todoContainer.appendChild(listItem);
});
