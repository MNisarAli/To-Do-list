import './style.css';
import Tasks from './__mocks__/taskUpdate.js';

const tasks = new Tasks();

// On Page Load Display Tasks From Local Storage.
window.addEventListener('DOMContentLoaded', () => tasks.displayList());
