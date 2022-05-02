import {
  form,
  btn,
  textarea,
  lists,
  addBtn,
  cancelBtn,
  button,
} from './const.js';
import { addBoard } from './addBoard.js';
import { dragNdrop } from './dragNdrop.js';
import { applyTheme } from './switch_theme.js';
let value;

btn.addEventListener('click', () => {
  form.style.display = 'block';
  btn.style.display = 'none';
  addBtn.style.display = 'none';
  textarea.addEventListener('input', (event) => {
    value = event.target.value;
    if (value) {
      addBtn.style.display = 'block';
    } else {
      addBtn.style.display = 'none';
    }
    localStorage.setItem('inputValue', value.toString());
  });
});

addBtn.addEventListener('click', () => {
  const newItem = document.createElement('div');
  newItem.classList.add('list_item');
  newItem.draggable = true;
  newItem.textContent = value;
  //тут есть value тогда почему массив пустой
  lists[0].append(newItem);
  localStorage.setItem('list', JSON.stringify(newItem));
  clearForm();
  dragNdrop();
});

cancelBtn.addEventListener('click', clearForm);

function clearForm() {
  textarea.value = '';
  value = '';
  form.style.display = 'none';
  btn.style.display = 'block';
}

button.addEventListener('click', addBoard);

let activeTheme = localStorage.getItem('theme');
if (activeTheme === null) {
  applyTheme('beach');
} else {
  applyTheme(activeTheme);
}
