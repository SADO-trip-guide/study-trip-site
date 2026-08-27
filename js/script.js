/**
 * Switch active tab content and button state based on selected day
 * @param {string} dayId - Target tab content element ID ('day1', 'day2', 'day3')
 * @param {HTMLElement} btnElement - Clicked tab button element
 */
function switchTab(dayId, btnElement) {
  // Select all tab content blocks
  const contents = document.querySelectorAll('.tab-content');
  // Hide all tab content blocks
  contents.forEach(content => content.classList.remove('active'));

  // Select all tab buttons
  const buttons = document.querySelectorAll('.tab-btn');
  // Remove active highlight from all tab buttons
  buttons.forEach(btn => btn.classList.remove('active'));

  // Find target tab content by ID
  const targetContent = document.getElementById(dayId);
  // Show target tab content if it exists
  if (targetContent) {
    targetContent.classList.add('active');
  }

  // Highlight clicked tab button if element is provided
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // Scroll smoothly to top of the tab container area
  window.scrollTo({
    top: 100,
    behavior: 'smooth'
  });
}

/**
 * Scroll smoothly to a specific spot card when clicked on timeline
 * @param {string} targetId - ID of the target spot card element
 */
function scrollToSpot(targetId) {
  // Find element by target ID
  const targetElement = document.getElementById(targetId);
  // Execute scroll if target element exists
  if (targetElement) {
    // Height offset in pixels to account for fixed header and tabs
    const headerOffset = 70;
    // Get element top position relative to viewport
    const elementPosition = targetElement.getBoundingClientRect().top;
    // Calculate final absolute scroll position
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    // Perform smooth window scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Navigate to internal detail HTML pages
 * @param {string} pagePath - Relative path to internal detail page
 */
function openInternalPage(pagePath) {
  // Change window URL to target page path
  if (pagePath) {
    window.location.href = pagePath;
  }
}

/**
 * Register Service Worker for PWA / Offline capabilities
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        console.log('[PWA] Service Worker registered successfully:', reg.scope);
      })
      .catch((err) => {
        console.error('[PWA] Service Worker registration failed:', err);
      });
  });
}