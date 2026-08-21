/**
 * ReelSense AI – components/AIInsightPanel.js
 * Renders the sliding AI Insight drawer with:
 *  - Detected primary interest
 *  - Semantic reasoning explanation
 *  - Confidence score
 *  - Next recommended reel preview
 */

/**
 * Render and open the AI Insight side panel.
 * @param {Object} insight – result from AIRecommendationEngine.getInsight()
 * @param {Object} nextReel – result from AIRecommendationEngine.getNextRecommendation()
 * @param {HTMLElement} drawerEl – the panel container DOM element
 */
export function renderAIInsightPanel(insight, nextReel, drawerEl) {
  if (!drawerEl) return;

  const confidenceColor = insight.confidence >= 85
    ? '#10b981'
    : insight.confidence >= 65
      ? '#f59e0b'
      : '#ef4444';

  drawerEl.innerHTML = `
    <div class="ai-panel-header">
      <div class="ai-panel-title-row">
        <span class="ai-panel-icon">🧠</span>
        <div>
          <h2 class="ai-panel-title">AI Interest Analysis</h2>
          <p class="ai-panel-subtitle">Semantic context engine · ReelSense AI</p>
        </div>
      </div>
      <button class="ai-panel-close" id="ai-panel-close-btn" aria-label="Close AI Insight">✕</button>
    </div>

    <div class="ai-panel-body">

      <!-- Detected Interest -->
      <section class="ai-section">
        <h3 class="ai-section-label">🎯 Detected Interest</h3>
        <div class="ai-interest-chip">${insight.primaryInterest}</div>
      </section>

      <!-- Confidence -->
      <section class="ai-section">
        <h3 class="ai-section-label">📊 Confidence Score</h3>
        <div class="ai-confidence-bar-wrapper">
          <div class="ai-confidence-bar">
            <div class="ai-confidence-fill" style="width:${insight.confidence}%; background:${confidenceColor};"></div>
          </div>
          <span class="ai-confidence-value" style="color:${confidenceColor};">${insight.confidence}%</span>
        </div>
      </section>

      <!-- Reasoning -->
      <section class="ai-section">
        <h3 class="ai-section-label">💡 Why This Interest?</h3>
        <p class="ai-reasoning-text">${insight.reasoning}</p>
      </section>

      <!-- Interaction Signals -->
      <section class="ai-section">
        <h3 class="ai-section-label">📡 Interaction Signals Detected</h3>
        <ul class="ai-signals-list">
          ${insight.signals.map(s => `
            <li class="ai-signal-item">
              <span class="ai-signal-icon">${s.icon}</span>
              <span class="ai-signal-text">${s.text}</span>
              <span class="ai-signal-weight ${s.weight >= 0 ? 'pos' : 'neg'}">${s.weight >= 0 ? '+' : ''}${s.weight}</span>
            </li>`).join('')}
        </ul>
      </section>

      <!-- Next Recommendation -->
      ${nextReel ? `
      <section class="ai-section ai-recommendation-section">
        <h3 class="ai-section-label">🚀 Recommended Next Reel</h3>
        <div class="ai-rec-card">
          <div class="ai-rec-avatar">${nextReel.authorAvatar}</div>
          <div class="ai-rec-info">
            <span class="ai-rec-title">${nextReel.title}</span>
            <span class="ai-rec-meta">${nextReel.author} · ${nextReel.category}</span>
            <div class="ai-rec-edu-score">🎓 Edu Score: <strong>${nextReel.eduScore}/100</strong></div>
            <p class="ai-rec-reason">${nextReel.aiRecommendationInfo?.whyRecommended || ''}</p>
          </div>
        </div>
      </section>` : ''}

      <!-- Disclaimer -->
      <p class="ai-panel-disclaimer">
        ⚠️ ReelSense AI does not stop you from scrolling. It makes your scroll count.
      </p>
    </div>
  `;

  // Close button
  drawerEl.querySelector('#ai-panel-close-btn')?.addEventListener('click', () => {
    drawerEl.classList.remove('open');
  });

  // Open drawer
  drawerEl.classList.add('open');
}

/**
 * Build interaction signals array from engine history.
 * @param {Array} interactions
 * @returns {Array<{icon, text, weight}>}
 */
export function buildSignals(interactions) {
  const actionMeta = {
    SAVE:   { icon: '🔖', label: 'Saved',   weight: 5 },
    SHARE:  { icon: '🔗', label: 'Shared',  weight: 5 },
    REPLAY: { icon: '🔁', label: 'Replayed', weight: 4 },
    LIKE:   { icon: '❤️', label: 'Liked',   weight: 3 },
    WATCH:  { icon: '👁️', label: 'Watched', weight: 2 },
    SKIP:   { icon: '⏭️', label: 'Skipped', weight: -2 },
  };

  return interactions.slice(-10).map(i => {
    const meta = actionMeta[i.action] || { icon: '📌', label: i.action, weight: 0 };
    return {
      icon: meta.icon,
      text: `${meta.label}: ${i.category || 'Unknown'}`,
      weight: meta.weight,
    };
  });
}
