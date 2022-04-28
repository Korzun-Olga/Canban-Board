const lists = document.querySelectorAll('.list');
const btn = document.querySelector('.add_btn');
const addBtn = document.querySelector('.add_item-btn');
const cancelBtn = document.querySelector('.cancel_item-btn');
const textarea = document.querySelector('.textarea');
const form = document.querySelector('.form');
let value;
const button = document.querySelector('.button');

/*function addTask() {}
addTask();*/

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
  });
});

function clearForm() {
  textarea.value = '';
  value = '';
  form.style.display = 'none';
  btn.style.display = 'block';
}

cancelBtn.addEventListener('click', clearForm);

addBtn.addEventListener('click', () => {
  //тут делаем новую карточку по клику
  const newItem = document.createElement('div');
  newItem.classList.add('list_item');
  newItem.draggable = true;
  newItem.textContent = value;
  lists[0].append(newItem);
  //теперь надо скрыть форму стартовую
  clearForm();
  dragNdrop(); //вызываем эту функцию чтобы можно было удалять карточки не только первую
});

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

//пишем функцию которая убирает кастомное название "Введите название"
function changeTitle() {
  const titles = document.querySelectorAll('.title');

  titles.forEach((title) => {
    title.addEventListener('click', (e) => (e.target.textContent = ''));
  });
}
changeTitle();

/*у нас будет много досок, и это уже массив, поэтому прописываем цикл который будет их всех обрабатывать
из-за того что у нас title" contenteditable="true" вот тут стоит уже true мы можем кликать на поле и вводить свои данные, но не стирается строчка кастомная
тут мы берем title и при клике мы убираем кастомный текст. чтобы функция работала ее надо вызвать в двух местах, addboard (чтобы это работало во вновь создаваемых карточках) и сразу после фукнции (потому, что при открытии странички у нас уже есть карточка)*/

button.addEventListener('click', addBoard);

//cоздаем DragNDropб для этого нам нужны все списки и все элементы списков
let draggetItem = null;

function dragNdrop() {
  const listItems = document.querySelectorAll('.list_item');
  const lists = document.querySelectorAll('.list');
  //реализуем чтобы можно было взять и перетащить элемент
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];
    // берем из массива нужный нам элемент, перебирая циклом for и вешаем на него слушателя, item - это наше поле со значением Стартовая карточка
    item.addEventListener('dragstart', () => {
      draggetItem = item;
      setTimeout(() => {
        item.style.display = 'none';
      }, 0);
    });
    //когда перетаскиваем и отпускаем карточка исчезает (display = 'none') пишем событие чтобы она оставалась на старом месте
    item.addEventListener('dragend', () => {
      setTimeout(() => {
        item.style.display = 'block';
        draggetItem = null; // переменную мы отпустили и надо ее обновить
      }, 0);
      //теперь карточка не исчезает, мы ее берем перетаскиваем и она снова возвращается на место, прилипает к старту
    });
    //тут по двойному клику карточка удаляется
    item.addEventListener('dblclick', () => {
      item.remove();
    });
    //чтобы карточки становились на новую доску, внутри цикла for делаем еще один цикл
    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];
      list.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
      list.addEventListener('dragenter', function (e) {
        e.preventDefault(); //-это убирает стандартное поведение браузера
        this.style.backgroundColor = 'rgba(0,0,0,.3)'; //добавляем тень над тем местом куда поставим карточку
      });
      //эта штука убирает тень когда мы убираем карточку из борда
      list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0,0)';
      });
      //тут тень вообще исчезает из борда когда мы карточку куда-то в другое место поставили и + закрепляем append карточку в новом борде
      list.addEventListener('drop', function (e) {
        this.style.backgroundColor = 'rgba(0,0,0,0)';
        this.append(draggetItem);
        //в draggedItem у нас лежит белая стартовая карточка, this - это борд. вот куда перетянем тот и будет this
      });
    }
  }
}
dragNdrop();
