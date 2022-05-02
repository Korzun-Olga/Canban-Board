function changeTitle() {
  const titles = document.querySelectorAll('.title');
  titles.forEach((title) => {
    title.addEventListener('click', (e) => (e.target.textContent = ''));
  });
}
changeTitle();

let newTitle;
function saveTitle() {
  const titles = document.querySelectorAll('.title');
  titles.forEach((title) => {
    title.addEventListener('input', (event) => {
      newTitle = event.target.value;
      localStorage.setItem('newTitle', JSON.stringify(title));
    });
  });
}
saveTitle();

export { changeTitle };
