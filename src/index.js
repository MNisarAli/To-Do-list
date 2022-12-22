import './style.css';
import Tasks from './modules/taskUpdate';

const tasks = new Tasks();

// On Page Load Display Tasks From Local Storage.
window.addEventListener('DOMContentLoaded', () => tasks.displayList());
