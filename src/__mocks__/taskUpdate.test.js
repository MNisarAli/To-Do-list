import tasks from './taskUpdate.js';

// const { removeTask, toDoList } = tasks;

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
});