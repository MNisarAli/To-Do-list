export default class UserActions {
  // Mark Task As Completed & Update Its Object's Value For Completed Key.
  completeTask = (items) => {
    const task = document.querySelectorAll('.label-container');
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    const toDo = document.querySelectorAll('.to-do');
    checkboxes.forEach((checkbox, index) => {
      checkbox.addEventListener('click', () => {
        task[index].classList.toggle('opacity');
        toDo[index].classList.toggle('decoration');
      });
    });
  }
}
