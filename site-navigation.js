const navigationHeader = document.querySelector('.site-header');
const navigationToggle = navigationHeader?.querySelector('.navigation-toggle');
const siteNavigation = navigationHeader?.querySelector('#site-navigation');

if (navigationToggle && siteNavigation) {
  const compactNavigation = window.matchMedia('(max-width: 1100px)');
  function setNavigationOpen(open) {
    siteNavigation.hidden = compactNavigation.matches && !open;
    navigationToggle.setAttribute('aria-expanded', String(open));
  }
  function syncNavigationLayout() {
    setNavigationOpen(!compactNavigation.matches);
  }

  document.documentElement.classList.add('navigation-ready');
  navigationToggle.hidden = false;
  syncNavigationLayout();
  compactNavigation.addEventListener('change', syncNavigationLayout);
  navigationToggle.addEventListener('click', () => {
    setNavigationOpen(navigationToggle.getAttribute('aria-expanded') !== 'true');
  });
  navigationHeader.addEventListener('keydown', event => {
    if (event.key === 'Escape' && compactNavigation.matches && !siteNavigation.hidden) {
      setNavigationOpen(false);
      navigationToggle.focus();
    }
  });
  siteNavigation.addEventListener('click', event => {
    if (compactNavigation.matches && event.target.closest('a')) setNavigationOpen(false);
  });
}
