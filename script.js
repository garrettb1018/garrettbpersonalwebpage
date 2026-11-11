/* Theme starts from the saved choice; otherwise follow the visitor's system setting. */
(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = toggle?.querySelector('.theme-label');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const storedTheme = (() => {
    try { return localStorage.getItem('garrett-blake-theme'); }
    catch { return null; }
  })();

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (toggle && label) {
      const isDark = theme === 'dark';
      toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
      toggle.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
      label.textContent = isDark ? 'Light mode' : 'Dark mode';
    }
  };

  applyTheme(storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : (preference.matches ? 'dark' : 'light'));

  toggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('garrett-blake-theme', nextTheme); }
    catch { /* Theme still works for this visit if storage is unavailable. */ }
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: preference.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      target.focus({ preventScroll: true });
    });
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
