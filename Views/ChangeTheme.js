class ChangeTheme {
  get SELECTORS() {
    return {
      btn: ".theme-btn"
    };
  }

  handleChangeTheme(handler) {
    document
      .querySelector(this.SELECTORS.btn)
      .addEventListener("click", (e) => {
        e.preventDefault();
        const theme = document.documentElement;
        theme.dataset.theme == 'dark' ? theme.dataset.theme = 'light' : theme.dataset.theme = 'dark';
      });
  }
}

export default new ChangeTheme();
