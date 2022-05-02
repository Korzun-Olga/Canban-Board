import { changeTitle } from './changeTitle.js';
import { dragNdrop } from './dragNdrop.js';

function addBoard() {
  const boards = document.querySelector('.boards');
  let board = document.createElement('div');
  board.classList.add('boards_item');
  board.innerHTML = `  <span class="title" contenteditable="true">Введите название</span>
    <div class="list"> </div>`;
  boards.append(board);
  window.localStorage.setItem('addBoard', JSON.stringify(boards));
  changeTitle();
  dragNdrop();
  board.addEventListener('dblclick', () => {
    board.remove();
  });
}

let boardItem = [];
if (localStorage.getItem('addBoard')) {
  boardItem = JSON.parse(localStorage.getItem('addBoard'));
  addBoard();
  //console.log(boardItem);
}

export { addBoard };
