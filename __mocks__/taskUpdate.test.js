import tasks from './taskUpdate.js';

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
});