(() => {
  const figure = document.querySelector('[data-value-reaction]');
  const button = document.querySelector('[data-replay-value-reaction]');
  if (!figure || !button) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer = null;
  const reset = () => {
    window.clearTimeout(timer);
    figure.classList.remove('vp-running');
    button.disabled = preference.matches;
    button.querySelector('span').textContent = preference.matches ? 'Static illustration' : 'Replay reaction';
  };
  const play = () => {
    if (preference.matches || document.hidden) return reset();
    figure.classList.add('vp-running');
    button.disabled = true;
    button.querySelector('span').textContent = 'Reaction playing';
    timer = window.setTimeout(reset, 4600);
  };
  button.addEventListener('click', play);
  if (preference.addEventListener) preference.addEventListener('change', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  reset();
  if ('IntersectionObserver' in window && !preference.matches) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); play(); }
    }, {threshold: .55});
    observer.observe(figure);
  }
})();
