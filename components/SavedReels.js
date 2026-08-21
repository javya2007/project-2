/**
 * ReelSense AI – components/SavedReels.js
 * Renders the Saved Reels grid view with edu-score badges
 * and quick-remove (unsave) functionality.
 */

/**
 * Render saved reels into a grid container.
 * @param {HTMLElement} containerEl  – mount point
 * @param {Array}       savedReels   – array of reel objects
 * @param {Function}    onUnsave     – callback(reelId) when user removes a saved reel
 */
export function renderSavedReels(containerEl, savedReels, onUnsave) {
  if (!containerEl) return;

  if (!savedReels.length) {
    containerEl.innerHTML = `
      <div class="saved-empty-state">
        <span class="saved-empty-icon">🔖</span>
        <h3>No saved reels yet</h3>
        <p>Tap the <strong>Save</strong> button on any reel to bookmark it here.</p>
      </div>`;
    return;
  }

  const scoreClass = score => score >= 85 ? 'edu-high' : score >= 60 ? 'edu-mid' : 'edu-low';

  containerEl.innerHTML = `
    <div class="saved-grid">
      ${savedReels.map(reel => `
        <div class="saved-card" data-reel-id="${reel.id}">

          <!-- Canvas / preview placeholder -->
          <div class="saved-card-preview" style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);">
            <span class="saved-card-avatar">${reel.authorAvatar}</span>
          </div>

          <!-- Edu Score -->
          <div class="edu-score-badge ${scoreClass(reel.eduScore)} saved-edu-badge">
            🎓 ${reel.eduScore}
          </div>

          <!-- Metadata -->
          <div class="saved-card-meta">
            <span class="saved-card-category">${reel.category}</span>
            <h4 class="saved-card-title">${reel.title}</h4>
            <p class="saved-card-author">${reel.author}</p>
            <div class="saved-card-tags">
              ${reel.tags.slice(0, 2).map(t => `<span class="reel-tag">#${t}</span>`).join('')}
            </div>
            <div class="saved-card-stats">
              <span>❤️ ${(reel.stats.likes / 1000).toFixed(1)}k</span>
              <span>👁️ ${(reel.stats.views / 1000).toFixed(0)}k</span>
            </div>
          </div>

          <!-- Remove button -->
          <button
            class="saved-unsave-btn"
            data-reel-id="${reel.id}"
            title="Remove from saved"
            aria-label="Unsave ${reel.title}"
          >🗑️ Remove</button>
        </div>
      `).join('')}
    </div>
  `;

  // Wire up unsave buttons
  containerEl.querySelectorAll('.saved-unsave-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const reelId = e.currentTarget.dataset.reelId;
      if (typeof onUnsave === 'function') onUnsave(reelId);
    });
  });
}
