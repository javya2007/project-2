/**
 * ReelSense AI – components/ReelCard.js
 * Renders a single full-screen Reel card with canvas preview,
 * metadata overlay, action sidebar, and edu-score badge.
 */

import { DynamicCanvasPlayer } from '../canvasPlayer.js';

const player = new DynamicCanvasPlayer();

/**
 * Build the source badge icon HTML
 * @param {'youtube'|'instagram'} source
 */
function sourceBadge(source) {
  if (source === 'youtube') {
    return `<span class="source-badge youtube" title="YouTube">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    </span>`;
  }
  return `<span class="source-badge instagram" title="Instagram">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  </span>`;
}

/**
 * Edu-score color class
 * @param {number} score
 */
function scoreClass(score) {
  if (score >= 85) return 'edu-high';
  if (score >= 60) return 'edu-mid';
  return 'edu-low';
}

/**
 * Create and return a Reel card DOM element.
 * @param {Object} reel  – reel data object from REELS_DATA
 * @param {Object} opts
 * @param {boolean} opts.isLiked   – initial liked state
 * @param {boolean} opts.isSaved   – initial saved state
 * @returns {HTMLElement}
 */
export function createReelCard(reel, { isLiked = false, isSaved = false } = {}) {
  const card = document.createElement('div');
  card.className = 'reel-card';
  card.dataset.reelId = reel.id;

  card.innerHTML = `
    <!-- Canvas Preview -->
    <canvas class="reel-canvas" width="400" height="710"></canvas>

    <!-- Gradient Overlay -->
    <div class="reel-gradient-overlay"></div>

    <!-- EDU Score Badge -->
    <div class="edu-score-badge ${scoreClass(reel.eduScore)}" title="Educational Score">
      <span class="edu-score-icon">🎓</span>
      <span class="edu-score-value">${reel.eduScore}</span>
      <span class="edu-score-label">/100</span>
    </div>

    <!-- Source Badge -->
    ${sourceBadge(reel.source)}

    <!-- Bottom Metadata -->
    <div class="reel-meta">
      <div class="reel-author-row">
        <span class="reel-avatar">${reel.authorAvatar}</span>
        <div class="reel-author-info">
          <span class="reel-author-name">${reel.author}</span>
          <span class="reel-category-tag">${reel.category}</span>
        </div>
      </div>
      <h3 class="reel-title">${reel.title}</h3>
      <p class="reel-description">${reel.description}</p>
      <div class="reel-tags-row">
        ${reel.tags.slice(0, 3).map(t => `<span class="reel-tag">#${t}</span>`).join('')}
        <span class="reel-difficulty difficulty-${reel.difficulty.toLowerCase()}">${reel.difficulty}</span>
      </div>
      <div class="reel-stats-row">
        <span>❤️ ${(reel.stats.likes / 1000).toFixed(1)}k</span>
        <span>👁️ ${(reel.stats.views / 1000).toFixed(0)}k</span>
        <span>🔖 ${(reel.stats.saves / 1000).toFixed(1)}k</span>
      </div>
    </div>

    <!-- Action Sidebar -->
    <div class="reel-actions">
      <button class="action-btn btn-like ${isLiked ? 'active' : ''}" data-action="like" title="Like (+3)">
        <span class="action-icon">❤️</span>
        <span class="action-label">Like</span>
      </button>
      <button class="action-btn btn-save ${isSaved ? 'active' : ''}" data-action="save" title="Save (+5)">
        <span class="action-icon">${isSaved ? '🔖' : '🔖'}</span>
        <span class="action-label">Save</span>
      </button>
      <button class="action-btn btn-share" data-action="share" title="Share (+5)">
        <span class="action-icon">🔗</span>
        <span class="action-label">Share</span>
      </button>
      <button class="action-btn btn-replay" data-action="replay" title="Replay (+4)">
        <span class="action-icon">🔁</span>
        <span class="action-label">Replay</span>
      </button>
      <button class="action-btn btn-skip" data-action="skip" title="Skip (-2)">
        <span class="action-icon">⏭️</span>
        <span class="action-label">Skip</span>
      </button>
      <button class="action-btn btn-ai-insight" data-action="ai-insight" title="AI Insight">
        <span class="action-icon">🧠</span>
        <span class="action-label">AI</span>
      </button>
    </div>
  `;

  // Attach canvas animation
  const canvas = card.querySelector('.reel-canvas');
  player.attachCanvas(canvas, reel);

  return card;
}

/**
 * Detach canvas animation when a card leaves viewport.
 * @param {HTMLElement} card
 */
export function detachReelCard(card) {
  const canvas = card.querySelector('.reel-canvas');
  if (canvas) player.detachCanvas(canvas);
}
