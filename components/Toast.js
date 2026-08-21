/**
 * ReelSense AI – components/Toast.js
 * Lightweight toast notification system.
 * Stacks multiple toasts at the bottom-right of the screen.
 */

let toastContainer = null;

function ensureContainer() {
  if (toastContainer) return toastContainer;
  toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.setAttribute('aria-live', 'polite');
  toastContainer.setAttribute('aria-atomic', 'false');
  document.body.appendChild(toastContainer);
  return toastContainer;
}

/**
 * Show a toast notification.
 * @param {string}  message        – toast text (HTML allowed)
 * @param {'success'|'error'|'info'|'warning'} type
 * @param {number}  duration       – auto-dismiss ms (default 3000)
 */
export function showToast(message, type = 'success', duration = 3000) {
  const container = ensureContainer();

  const icons = {
    success: '✅',
    error:   '❌',
    info:    '💡',
    warning: '⚠️',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || '📌'}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Dismiss">✕</button>
  `;

  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => dismiss(toast));

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => toast.classList.add('toast-show'));

  // Auto dismiss
  const timer = setTimeout(() => dismiss(toast), duration);
  toast._timer = timer;
}

function dismiss(toast) {
  clearTimeout(toast._timer);
  toast.classList.remove('toast-show');
  toast.classList.add('toast-hide');
  toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}

/**
 * Interaction weight toast helper – shows the weight delta for a reel action.
 * @param {string} action
 * @param {number} weight
 * @param {string} category
 */
export function showInteractionToast(action, weight, category) {
  const positive = weight >= 0;
  const sign = positive ? '+' : '';
  const labels = {
    LIKE:   '❤️ Liked',
    SAVE:   '🔖 Saved',
    SHARE:  '🔗 Shared',
    REPLAY: '🔁 Replayed',
    SKIP:   '⏭️ Skipped',
    WATCH:  '👁️ Watched',
  };
  const label = labels[action.toUpperCase()] || action;
  const type  = positive ? 'success' : 'warning';
  showToast(`${label} · ${category} &nbsp;<strong>${sign}${weight} pts</strong>`, type, 2500);
}
