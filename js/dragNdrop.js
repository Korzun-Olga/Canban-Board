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

export { dragNdrop };
