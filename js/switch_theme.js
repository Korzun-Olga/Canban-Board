const themeSwitchers = document.querySelectorAll('.fa-solid');

themeSwitchers.forEach((switcher) => {
  switcher.addEventListener('click', function () {
    applyTheme(this.dataset.theme);
    localStorage.setItem('theme', this.dataset.theme);
  });
});

function applyTheme(themeName) {
  let themeUrl = `css/theme_${themeName}.css`;
  document.querySelector('[title="theme"]').setAttribute('href', themeUrl);
}

export { applyTheme };
