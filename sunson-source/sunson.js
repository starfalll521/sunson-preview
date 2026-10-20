(() => {
  const menu = document.querySelector('.source-menu');
  const nav = document.getElementById('source-navigation');
  const header = document.querySelector('.source-header');
  if (!menu || !nav) return;
  const marker = document.createComment('mobile-menu-home');
  menu.before(marker);
  let isOpen = false;
  let previousOverflow = '';
  let inertBefore = [];
  const controls = () => [...new Set([menu, ...nav.querySelectorAll('summary,a[href],button')])]
    .filter(element => element.getClientRects().length && !element.closest('details:not([open])>div'));

  function close(restore = true) {
    if (!isOpen) return;
    isOpen = false;
    nav.classList.remove('is-open');
    nav.removeAttribute('role');
    nav.removeAttribute('aria-modal');
    marker.parentNode.insertBefore(menu, marker.nextSibling);
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = 'Menu';
    document.body.style.overflow = previousOverflow;
    inertBefore.forEach(([element, value]) => element.inert = value);
    inertBefore = [];
    if (restore) menu.focus();
  }

  function open() {
    isOpen = true;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    nav.prepend(menu);
    const outside = new Set(document.querySelectorAll(
      'body>main,body>footer,body>.source-skip,.source-utility,.source-nav>a'
    ));
    outside.forEach(element => {
      inertBefore.push([element, element.inert]);
      element.inert = true;
    });
    nav.classList.add('is-open');
    nav.setAttribute('role', 'dialog');
    nav.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-expanded', 'true');
    menu.textContent = 'Close';
    menu.focus();
  }

  menu.addEventListener('click', () => isOpen ? close() : open());
  const groups = [...nav.querySelectorAll('details')];
  groups.forEach(group => group.addEventListener('toggle', () => {
    if (group.open) groups.forEach(other => { if (other !== group) other.open = false; });
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      groups.forEach(group => group.open = false);
      if (isOpen) { event.preventDefault(); close(); }
    }
    if (isOpen && event.key === 'Tab') {
      const elements = controls();
      const index = elements.indexOf(document.activeElement);
      if (event.shiftKey && (index === 0 || index < 0)) {
        event.preventDefault(); elements.at(-1)?.focus();
      } else if (!event.shiftKey && (index === elements.length - 1 || index < 0)) {
        event.preventDefault(); elements[0]?.focus();
      }
    }
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) groups.forEach(group => group.open = false);
  });
  matchMedia('(max-width:1023px)').addEventListener('change', event => {
    if (!event.matches) close(false);
  });
  document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => event.preventDefault()));
})();
