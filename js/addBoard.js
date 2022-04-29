import { changeTitle } from './changeTitle.js';
import { dragNdrop } from './dragNdrop.js';
// тут прописан функционал как добавить новую доску
function addBoard() {
  const boards = document.querySelector('.boards');
  const board = document.createElement('div');
  board.classList.add('boards_item');
  board.innerHTML = `  <span class="title" contenteditable="true">Введите название</span>
    <div class="list"> </div>`;
  boards.append(board);
  changeTitle();
  dragNdrop(); // когда добавляем доску эту функцию тоже надо перевызывать
  board.addEventListener('dblclick', () => {
    board.remove();
  });
}
export { addBoard };
