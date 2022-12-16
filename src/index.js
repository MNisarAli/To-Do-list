import './style.css';
import Tasks from './taskUpdate.js';

const tasks = new Tasks();

// Add New Task In List.
const newInput = document.querySelector('#new-input');
newInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && newInput.value) {
    tasks.addTask(newInput.value);
    newInput.value = '';
  }
});

// On Page Load Display Tasks From Local Storage.
window.addEventListener('DOMContentLoaded', () => tasks.displayList());
