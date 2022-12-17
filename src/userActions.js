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
  clearAllCompleted = (items) => {
    const clearAllBtn = document.querySelector('#clear-completed');
    clearAllBtn.addEventListener('click', () => {
      const remainingItems = items.filter((item) => !item.completed);
      localStorage.setItem('tasks', JSON.stringify(remainingItems));
      document.location.reload();
    });
  }
}
