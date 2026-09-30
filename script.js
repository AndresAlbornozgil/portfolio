document.addEventListener('DOMContentLoaded', () => {
  const projectGrid = document.querySelector('.project-grid');
  const previousButton = document.querySelector('[data-project-previous]');
  const nextButton = document.querySelector('[data-project-next]');
  const swipeCue = document.querySelector('.project-swipe-cue');

  if (!projectGrid || !previousButton || !nextButton) {
    return;
  }

  const getProjectMetrics = () => {
    const maximumScrollLeft = projectGrid.scrollWidth - projectGrid.clientWidth;
    const pageCount = Math.max(1, Math.round(maximumScrollLeft / projectGrid.clientWidth) + 1);

    return { maximumScrollLeft, pageCount };
  };

  const updateProjectNavigation = () => {
    const { pageCount } = getProjectMetrics();
    const activePage = Math.min(pageCount - 1, Math.round(projectGrid.scrollLeft / projectGrid.clientWidth));

    previousButton.disabled = activePage === 0;
    nextButton.disabled = activePage >= pageCount - 1;
    swipeCue?.classList.toggle('can-go-previous', activePage > 0);
    swipeCue?.classList.toggle('can-go-next', activePage < pageCount - 1);
  };

  const showProjectPage = (page) => {
    const { maximumScrollLeft, pageCount } = getProjectMetrics();
    const targetPage = Math.max(0, Math.min(page, pageCount - 1));

    projectGrid.scrollTo({
      left: Math.min(targetPage * projectGrid.clientWidth, maximumScrollLeft),
      behavior: 'smooth',
    });
  };

  previousButton.addEventListener('click', () => {
    const activePage = Math.round(projectGrid.scrollLeft / projectGrid.clientWidth);
    showProjectPage(activePage - 1);
  });

  nextButton.addEventListener('click', () => {
    const activePage = Math.round(projectGrid.scrollLeft / projectGrid.clientWidth);
    showProjectPage(activePage + 1);
  });

  projectGrid.addEventListener('scroll', updateProjectNavigation, { passive: true });
  window.addEventListener('resize', updateProjectNavigation);
  updateProjectNavigation();
});
