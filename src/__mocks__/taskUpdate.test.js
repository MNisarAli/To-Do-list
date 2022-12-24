import tasks from './taskUpdate.js';
import UserActions from '../modules/userActions.js';

// const { completeTask } = UserActions;

global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

it('should call the setItem function of the localStorage object', () => {
  tasks.toDoList = [{ description: 'Task 1', completed: false, index: 0 }];
  global.localStorage.setItem = jest.fn();
  tasks.setLocalStorage();
  expect(global.localStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(tasks.toDoList));
});

describe('tasks', () => {
  describe('addTask', () => {
    it('should add a new object to the toDolist array', () => {
      tasks.toDoList = [];
      const value = 'Task 1';
      tasks.addTask(value);
      expect(tasks.toDoList).toHaveLength(1);
    });
    it('should add a new object with the correct properties to the toDolist array', () => {
      tasks.toDoList = [];
      const value = 'Task 1';
      tasks.addTask(value);
      expect(tasks.toDoList[0]).toHaveProperty('description', value);
      expect(tasks.toDoList[0]).toHaveProperty('completed', false);
      expect(tasks.toDoList[0]).toHaveProperty('index', 0);
    });
    it('should call the localStorage function', () => {
      tasks.toDoList = [];
      const value = 'Task 1';
      tasks.setLocalStorage = jest.fn();
      tasks.addTask(value);
      expect(tasks.setLocalStorage).toHaveBeenCalled();
    });
    it('should call the displayList function', () => {
      tasks.toDoList = [];
      const value = 'Task 1';
      tasks.displayList = jest.fn();
      tasks.addTask(value);
      expect(tasks.displayList).toHaveBeenCalled();
    });
  });
  describe('removeTask', () => {
    it('should remove the task at the specified index and update the local storage and display', () => {
      const toDoList = [{ text: 'item 1', index: 0 }, { text: 'item 2', index: 1 }, { text: 'item 3', index: 2 }];
      const setLocalStorageMock = jest.fn();
      const displayListMock = jest.fn();
      const instance = {
        toDoList,
        setLocalStorage: setLocalStorageMock,
        displayList: displayListMock,
        removeTask: (index) => {
          toDoList.splice(index, 1);
          for (let i = 0; i < toDoList.length; i += 1) {
            toDoList[i].index = i;
          }
          setLocalStorageMock();
          displayListMock();
        },
      };
      instance.removeTask(1);
      expect(instance.toDoList).toEqual([
        { text: 'item 1', index: 0 },
        { text: 'item 3', index: 1 },
      ]);
      expect(setLocalStorageMock).toHaveBeenCalled();
      expect(displayListMock).toHaveBeenCalled();
    });
    it('should update the indices of the tasks after the task at the specified index has been removed', () => {
      const toDoList = [{ text: 'item 1', index: 0 }, { text: 'item 2', index: 1 }, { text: 'item 3', index: 2 }];
      const setLocalStorageMock = jest.fn();
      const displayListMock = jest.fn();
      const instance = {
        toDoList,
        setLocalStorage: setLocalStorageMock,
        displayList: displayListMock,
        removeTask: (index) => {
          toDoList.splice(index, 1);
          for (let i = 0; i < toDoList.length; i += 1) {
            toDoList[i].index = i;
          }
          setLocalStorageMock();
          displayListMock();
        },
      };
      instance.removeTask(1);
      expect(instance.toDoList[1].index).toEqual(1);
    });
  });
  describe('completeTask', () => {
    it('toggles the completed status of the items and updates the DOM', () => {
      const items = [
        { name: 'Task 1', completed: false },
        { name: 'Task 2', completed: false },
      ];
      const tasks = document.createElement('ul');
      items.forEach(() => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox);
        tasks.appendChild(li);
      });
      document.body.appendChild(tasks);
      const completeTask = (items) => {
        const task = document.querySelectorAll('li');
        const checkboxes = document.querySelectorAll('input[type=checkbox]');
        checkboxes.forEach((checkbox, index) => {
          checkbox.addEventListener('click', () => {
            task[index].classList.toggle('checked');
            items[index].completed = !items[index].completed;
            localStorage.setItem('tasks', JSON.stringify(items));
          });
        });
      };

      completeTask(items);
      const checkboxes = document.querySelectorAll('input[type=checkbox]');
      checkboxes[0].click();
      expect(items[0].completed).toBe(true);
      expect(tasks.children[0].classList.contains('checked')).toBe(true);
      checkboxes[1].click();
      expect(items[1].completed).toBe(true);
      expect(tasks.children[1].classList.contains('checked')).toBe(true);
    });
  });
  describe('clearAllCompleted', () => {
    it('should remove all completed tasks from the to-do list', () => {
      const toDoList = [
        { task: 'Task 1', completed: true },
        { task: 'Task 2', completed: false },
        { task: 'Task 3', completed: true },
      ];
      localStorage.setItem('tasks', JSON.stringify(toDoList));
      clearAllCompleted(toDoList);
      document.querySelector('#clear-completed').click();
      const remainingTasks = JSON.parse(localStorage.getItem('tasks'));
      expect(remainingTasks).toEqual([{ task: 'Task 2', completed: false }]);
    });
  });
});