import UserActions from '../modules/userActions.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM('');
global.document = dom.window.document;

const userAction = new UserActions();

export default class Tasks {
  // Function displayTasks.
  displayList = () => {
    const newInput = document.querySelector('#new-input');
    if (newInput && newInput.addEventListener) {
      newInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && newInput.value) {
          this.addTask(newInput.value);
          newInput.value = '';
        }
      });
    }

    // Add New Task In List.
    const toDoContainer = document.querySelector('#todo-list');
    if (toDoContainer) {
      toDoContainer.innerHTML = '';
    }
    this.toDoList.forEach((item) => {
      const listItem = document.createElement('li');
      if (item.completed === true) {
        listItem.classList.add('checked');
      }
      listItem.innerHTML = `
        <div class="label-container">
          <label for="checkbox">
            <input type="checkbox" id="${item.index}" ${item.completed ? 'checked' : ''}>
          </label>
          <label for="to-do">
            <input class="to-do" type="text" value="${item.description}">
          </label>
        </div>
        <i class="fas fa-trash-can delete-task"></i>`;
      if (toDoContainer) {
        toDoContainer.appendChild(listItem);
      }
    });

    // Update Task.
    const updateTask = document.querySelectorAll('.to-do');
    updateTask.forEach((input, index) => {
      input.addEventListener('keypress', (ToDo) => {
        if (ToDo.key === 'Enter' && input.value) {
          this.updateTask(input.value, index);
        }
      });
      input.addEventListener('change', () => {
        if (input.value) {
          this.updateTask(input.value, index);
        }
      });
    });

    // Delete Task.
    const deleteBtn = document.querySelectorAll('.delete-task');
    deleteBtn.forEach((button, index) => {
      button.addEventListener('click', () => {
        this.removeTask(index);
      });
    });

    // Mark A Task As Completed
    userAction.completeTask(this.toDoList);

    // Clear All Completed Tasks
    userAction.clearAllCompleted(this.toDoList);
  }

  // Set Items To Local Storage
  setLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(this.toDoList));

  // Add Task In Local Storage.
  addTask = (value) => {
    const newTask = {
      description: value,
      completed: false,
      index: this.toDoList.length,
    };
    this.toDoList.push(newTask);
    this.setLocalStorage();
    this.displayList();
  }

  // Update Task In Local Storage.
  updateTask = (value, index) => {
    this.toDoList[index].description = value;
    this.setLocalStorage();
    this.displayList();
  }

  // Remove Task from Local Storage.
  removeTask = (index) => {
    this.toDoList.splice(index, 1);
    for (let i = 0; i < this.toDoList.length; i += 1) {
      this.toDoList[i].index = i;
    }
    this.setLocalStorage();
    this.displayList();
  }
}
const tasks = new Tasks();
module.exports = tasks;
