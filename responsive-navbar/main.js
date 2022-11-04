window.addEventListener('DOMContentLoaded', () => {
  const itemsWithDropdown = document.querySelectorAll('.nav__item:has(.nav__dropdown)');

  itemsWithDropdown.forEach((item) => {
    const firstLink = item.querySelector('a');
    const links = item.querySelectorAll('.nav__dropdown a');

    firstLink.addEventListener('focus', (e) => {
      links.forEach((link) => link.setAttribute('tabindex', '0'));
    });

    links[links.length - 1].addEventListener('keydown', (e) => {
      if(e.key === 'Tab' && !e.shiftKey) {
        links.forEach(link => link.setAttribute('tabindex', '-1'));
      }
    });
  });
});