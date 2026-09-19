document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  const footer = document.querySelector('.footer');

  if (footer) {
    const text = footer.querySelector('h2');
    if (text) {
      text.setAttribute('data-year', year);
    }
  }
});
