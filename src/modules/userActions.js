export default class UserActions {
  // Mark Task As Completed & Update Its Object's Value For Completed Key.
  completeTask = (items) => {
    const task = document.querySelectorAll('li');
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('click', () => {
        task[index].classList.toggle('checked');
        items[index].completed = !items[index].completed;
        localStorage.setItem('tasks', JSON.stringify(items));
      });
    });
  }

  // Clear All Completed Tasks
  clearAllCompleted = (toDoList) => {
    const clearAllBtn = document.querySelector('#clear-completed');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        const remainingItems = toDoList.filter((item) => !item.completed);
        const remainingTasks = [];
        remainingItems.forEach((task) => {
          const remainingTask = { ...task, index: (remainingTasks.length) };
          remainingTasks.push(remainingTask);
        });
        localStorage.setItem('tasks', JSON.stringify(remainingTasks));
        document.location.reload();
      });
    }
  }
}
