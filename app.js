import { REELS_DATA, generateProceduralReels } from './reelsData.js';
import { InteractionEngine } from './interactionEngine.js';
import { AIRecommendationEngine } from './aiRecommendationEngine.js';
import { DynamicCanvasPlayer } from './canvasPlayer.js';

class ReelSenseApp {
  constructor() {
    this.reels = [...REELS_DATA];
    this.interactionEngine = new InteractionEngine();
    this.aiEngine = new AIRecommendationEngine(this.interactionEngine);
    this.canvasPlayer = new DynamicCanvasPlayer();
    this.currentReelId = this.reels[0].id;
    this.radarChart = null;
    this.isLoadingMore = false;

    this.init();
  }

  init() {
    this.setupNavigation();
    this.renderFeed();
    this.setupInfiniteScroll();
    this.renderExploreGrid();
    this.renderSavedGrid();
    this.updateDashboardViews();
    this.setupSearchAndFilters();
    this.setupMainTestCaseTrigger();
    this.setupIntersectionObserver();

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Navigation tab switcher
  setupNavigation() {
    const tabs = document.querySelectorAll('[data-view]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const viewId = tab.getAttribute('data-view');
        this.switchView(viewId);
      });
    });

    // Drawer close button
    const btnCloseDrawer = document.getElementById('btn-close-drawer');
    if (btnCloseDrawer) {
      btnCloseDrawer.addEventListener('click', () => {
        this.toggleDrawer(false);
      });
    }
  }

  switchView(viewId) {
    // Update active nav buttons
    document.querySelectorAll('[data-view]').forEach(t => {
      if (t.getAttribute('data-view') === viewId) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    // Update active view section
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSec = document.getElementById(`${viewId}-view`);
    if (targetSec) {
      targetSec.classList.add('active');
    }

    if (viewId === 'interests') {
      this.renderInterestCharts();
    } else if (viewId === 'ai') {
      this.updateAIViewDetails();
    } else if (viewId === 'saved') {
      this.renderSavedGrid();
    }

    // Refresh icons
    if (window.lucide) window.lucide.createIcons();
  }

  // Render vertical Reel Feed
  renderFeed() {
    const feedContainer = document.getElementById('reel-feed-container');
    if (!feedContainer) return;

    feedContainer.innerHTML = '';

    this.reels.forEach(reel => {
      feedContainer.appendChild(this.createReelCardElement(reel));
    });

    this.bindFeedActionEvents();
  }

  getEduScoreBadgeHtml(score = 85) {
    const levelClass = score >= 80 ? 'high' : score >= 50 ? 'medium' : 'low';
    return `<span class="badge-edu-score ${levelClass}"><i data-lucide="graduation-cap" style="width:13px; display:inline-block;"></i> Edu Score: ${score}/100</span>`;
  }

  createReelCardElement(reel) {
    const isSaved = this.interactionEngine.isSaved(reel.id);
    const card = document.createElement('div');
    card.className = 'reel-card';
    card.setAttribute('data-reel-id', reel.id);

    card.innerHTML = `
      <div class="reel-canvas-wrapper">
        <canvas class="reel-canvas" id="canvas-${reel.id}"></canvas>
      </div>

      <div class="reel-top-bar">
        <span class="badge-source ${reel.source}">
          <i data-lucide="${reel.source === 'youtube' ? 'youtube' : 'instagram'}"></i>
          ${reel.source === 'youtube' ? 'YouTube Short' : 'Instagram Reel'}
        </span>
        <div style="display: flex; gap: 0.4rem; align-items: center;">
          ${this.getEduScoreBadgeHtml(reel.eduScore || 85)}
          ${reel.isHypeOrMeme ? 
            `<span class="badge-noise-warning">⚠️ Meme / Hype</span>` : 
            `<span class="badge-core-tech">✨ ${reel.category}</span>`}
        </div>
      </div>

      <div class="reel-actions-sidebar">
        <button class="action-btn btn-like" data-reel-id="${reel.id}">
          <div class="action-icon-circle">
            <i data-lucide="heart"></i>
          </div>
          <span class="action-label count-like">${this.formatNumber(reel.stats.likes)}</span>
        </button>

        <button class="action-btn btn-save" data-reel-id="${reel.id}">
          <div class="action-icon-circle ${isSaved ? 'active-save' : ''}">
            <i data-lucide="bookmark"></i>
          </div>
          <span class="action-label">${isSaved ? 'Saved' : 'Save'}</span>
        </button>

        <button class="action-btn btn-share" data-reel-id="${reel.id}">
          <div class="action-icon-circle">
            <i data-lucide="send"></i>
          </div>
          <span class="action-label">${this.formatNumber(reel.stats.shares)}</span>
        </button>

        <button class="action-btn btn-replay" data-reel-id="${reel.id}">
          <div class="action-icon-circle">
            <i data-lucide="rotate-cw"></i>
          </div>
          <span class="action-label">Replay</span>
        </button>

        <button class="action-btn btn-skip" data-reel-id="${reel.id}">
          <div class="action-icon-circle">
            <i data-lucide="arrow-down-circle"></i>
          </div>
          <span class="action-label">Skip</span>
        </button>

        <button class="action-btn btn-ai-insight" data-reel-id="${reel.id}">
          <div class="action-icon-circle ai-insight-glow">
            <i data-lucide="sparkles"></i>
          </div>
          <span class="action-label" style="color: var(--accent-cyan);">AI Insight</span>
        </button>
      </div>

      <div class="reel-bottom-info">
        <div class="author-row">
          <div class="author-avatar">${reel.authorAvatar}</div>
          <span class="author-handle">${reel.author}</span>
        </div>
        <h3 class="reel-title">${reel.title}</h3>
        <p class="reel-description">${reel.description}</p>
        <div class="tags-row">
          ${reel.tags.map(t => `<span class="tag-pill">#${t}</span>`).join('')}
        </div>
      </div>
    `;

    return card;
  }

  // Endless Infinite Scroll Engine
  setupInfiniteScroll() {
    const feedContainer = document.getElementById('reel-feed-container');
    if (!feedContainer) return;

    feedContainer.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = feedContainer;
      if (scrollTop + clientHeight >= scrollHeight - 600 && !this.isLoadingMore) {
        this.isLoadingMore = true;
        this.appendMoreReels();
      }
    });
  }

  appendMoreReels(count = 5) {
    const feedContainer = document.getElementById('reel-feed-container');
    if (!feedContainer) return;

    const newReels = generateProceduralReels(count, this.reels.length + 1);
    this.reels.push(...newReels);

    newReels.forEach(reel => {
      const cardEl = this.createReelCardElement(reel);
      feedContainer.appendChild(cardEl);
      if (this.observer) this.observer.observe(cardEl);
    });

    this.bindFeedActionEvents();
    if (window.lucide) window.lucide.createIcons();

    this.showToast(`✨ ReelSense AI loaded ${count} unlimited tech Reels!`);
    setTimeout(() => {
      this.isLoadingMore = false;
    }, 500);
  }

  bindFeedActionEvents() {
    // Like button click
    document.querySelectorAll('.btn-like').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const reelId = btn.getAttribute('data-reel-id');
        this.interactionEngine.recordInteraction(reelId, 'LIKE');
        const circle = btn.querySelector('.action-icon-circle');
        circle.classList.add('active-like');
        this.showToast('❤️ Like (+3 weight to interest matrix)');
        this.updateDashboardViews();
      });
    });

    // Save button click
    document.querySelectorAll('.btn-save').forEach(btn => {
      btn.addEventListener('click', () => {
        const reelId = btn.getAttribute('data-reel-id');
        const isSaved = this.interactionEngine.toggleSave(reelId);
        const circle = btn.querySelector('.action-icon-circle');
        const label = btn.querySelector('.action-label');
        if (isSaved) {
          circle.classList.add('active-save');
          label.textContent = 'Saved';
          this.showToast('📑 Saved (+5 weight to interest matrix)');
        } else {
          circle.classList.remove('active-save');
          label.textContent = 'Save';
          this.showToast('Removed from Saved');
        }
        this.updateDashboardViews();
        this.renderSavedGrid();
      });
    });

    // Share button click
    document.querySelectorAll('.btn-share').forEach(btn => {
      btn.addEventListener('click', () => {
        const reelId = btn.getAttribute('data-reel-id');
        this.interactionEngine.recordInteraction(reelId, 'SHARE');
        this.showToast('🚀 Shared (+5 weight to interest matrix)');
        this.updateDashboardViews();
      });
    });

    // Replay button click
    document.querySelectorAll('.btn-replay').forEach(btn => {
      btn.addEventListener('click', () => {
        const reelId = btn.getAttribute('data-reel-id');
        this.interactionEngine.recordInteraction(reelId, 'REPLAY');
        const canvas = document.getElementById(`canvas-${reelId}`);
        const reel = this.reels.find(r => r.id === reelId);
        if (canvas && reel) {
          this.canvasPlayer.attachCanvas(canvas, reel);
        }
        this.showToast('🔄 Replay (+4 weight to interest matrix)');
        this.updateDashboardViews();
      });
    });

    // Skip button click
    document.querySelectorAll('.btn-skip').forEach(btn => {
      btn.addEventListener('click', () => {
        const reelId = btn.getAttribute('data-reel-id');
        this.interactionEngine.recordInteraction(reelId, 'SKIP');
        this.showToast('⏭️ Skipped (-2 penalty score)');
        this.updateDashboardViews();

        // Scroll to next reel card
        const feedContainer = document.getElementById('reel-feed-container');
        const currentCard = document.querySelector(`.reel-card[data-reel-id="${reelId}"]`);
        if (currentCard && currentCard.nextElementSibling) {
          currentCard.nextElementSibling.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // AI Insight button click
    document.querySelectorAll('.btn-ai-insight').forEach(btn => {
      btn.addEventListener('click', () => {
        const reelId = btn.getAttribute('data-reel-id');
        this.openDrawerForReel(reelId);
      });
    });
  }

  // IntersectionObserver to auto-play active canvas
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const reelId = entry.target.getAttribute('data-reel-id');
          this.currentReelId = reelId;
          const reel = this.reels.find(r => r.id === reelId);
          const canvas = entry.target.querySelector('.reel-canvas');
          if (canvas && reel) {
            this.canvasPlayer.attachCanvas(canvas, reel);
          }
          // Record watch interaction
          this.interactionEngine.recordInteraction(reelId, 'WATCH');
          this.updateDashboardViews();
        } else {
          const canvas = entry.target.querySelector('.reel-canvas');
          if (canvas) {
            this.canvasPlayer.detachCanvas(canvas);
          }
        }
      });
    }, { threshold: 0.6 });

    document.querySelectorAll('.reel-card').forEach(card => observer.observe(card));
  }

  // Open drawer and populate AI Insight Card
  openDrawerForReel(reelId) {
    const reel = this.reels.find(r => r.id === reelId) || this.reels[0];
    const recData = this.aiEngine.getRecommendation(reelId);
    const context = this.aiEngine.analyzeSemanticContext();

    document.getElementById('drawer-current-reel-title').textContent = reel.title;
    document.getElementById('drawer-current-reel-source').textContent = reel.source === 'youtube' ? 'YouTube Short' : 'Instagram Reel';
    
    const eduScore = reel.eduScore || 85;
    const eduScoreEl = document.getElementById('drawer-edu-score');
    const eduScoreDescEl = document.getElementById('drawer-edu-score-desc');
    if (eduScoreEl) {
      eduScoreEl.textContent = `${eduScore} / 100`;
      eduScoreEl.style.color = eduScore >= 80 ? 'var(--accent-emerald)' : eduScore >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)';
    }
    if (eduScoreDescEl) {
      eduScoreDescEl.textContent = eduScore >= 80 ? 
        `High Educational Impact (${eduScore}/100): Core CS concepts, practical algorithms, system design architecture, and placement interview utility.` :
        eduScore >= 50 ?
        `Moderate Educational Impact (${eduScore}/100): Developer workflow, setup productivity, or high-level career overview.` :
        `Low Educational Impact (${eduScore}/100): Surface entertainment, meme, or job-hype content discounted by ReelSense AI.`;
    }

    document.getElementById('drawer-interest-detected').textContent = context.primaryInterest;
    document.getElementById('drawer-confidence').innerHTML = `<i data-lucide="check-circle"></i> ${context.confidence}% Match`;
    document.getElementById('drawer-difficulty').innerHTML = `<i data-lucide="award"></i> Level: ${recData.difficulty}`;
    
    document.getElementById('drawer-why-text').textContent = context.reasoning;

    document.getElementById('drawer-rec-title').textContent = recData.recommendedReel.title;
    document.getElementById('drawer-rec-category').textContent = recData.category;
    document.getElementById('drawer-why-rec').textContent = recData.whyThisRecommendation;

    this.toggleDrawer(true);
    if (window.lucide) window.lucide.createIcons();
  }

  toggleDrawer(isOpen) {
    const drawer = document.getElementById('ai-insight-drawer');
    if (drawer) {
      if (isOpen) {
        drawer.classList.add('open');
      } else {
        drawer.classList.remove('open');
      }
    }
  }

  // Main Test Case Trigger
  setupMainTestCaseTrigger() {
    const btnRun = document.getElementById('btn-run-testcase');
    if (!btnRun) return;

    btnRun.addEventListener('click', () => {
      this.showToast('🚀 Running Main Test Case Sequence...');
      this.interactionEngine.runMainTestCase();
      this.updateDashboardViews();

      setTimeout(() => {
        this.showToast('✅ Detected Interest: Software Engineering / Technical Interviews');
        this.openDrawerForReel('reel-1');
        this.switchView('ai');
      }, 1000);
    });
  }

  updateDashboardViews() {
    this.updateAIViewDetails();
    this.renderSkillBars();
    if (document.getElementById('interests-view').classList.contains('active')) {
      this.renderInterestCharts();
    }
  }

  updateAIViewDetails() {
    const context = this.aiEngine.analyzeSemanticContext();
    const recData = this.aiEngine.getRecommendation(this.currentReelId);

    const elInterest = document.getElementById('ai-view-primary-interest');
    if (elInterest) elInterest.textContent = context.primaryInterest;

    const elConf = document.getElementById('ai-view-confidence');
    if (elConf) elConf.innerHTML = `<i data-lucide="check-circle"></i> ${context.confidence}% Confidence`;

    const elReasoning = document.getElementById('ai-view-reasoning');
    if (elReasoning) elReasoning.textContent = context.reasoning;

    const elRecBox = document.getElementById('ai-view-recommendation-box');
    if (elRecBox) {
      elRecBox.innerHTML = `
        <div class="rec-title">${recData.recommendedReel.title}</div>
        <p class="insight-reasoning-text">${recData.whyThisRecommendation}</p>
      `;
    }
  }

  // Render Skill Affinity Radar Chart & Bars
  renderInterestCharts() {
    const scores = this.interactionEngine.getCategoryScores();
    const labels = Object.keys(scores);
    const values = Object.values(scores);

    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    if (this.radarChart) {
      this.radarChart.destroy();
    }

    this.radarChart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Detected Skill Affinity (%)',
          data: values,
          backgroundColor: 'rgba(99, 102, 241, 0.25)',
          borderColor: '#6366f1',
          borderWidth: 2,
          pointBackgroundColor: '#06b6d4',
          pointBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: { color: '#cbd5e1', font: { size: 11, family: 'Inter' } },
            ticks: { display: false, max: 100, min: 0 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    this.renderSkillBars();
  }

  renderSkillBars() {
    const container = document.getElementById('skill-bars-container');
    if (!container) return;

    const scores = this.interactionEngine.getCategoryScores();
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    container.innerHTML = sorted.map(([category, score]) => `
      <div class="skill-bar-item">
        <div class="skill-info-row">
          <span>${category}</span>
          <span style="color: var(--accent-cyan);">${score}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width: ${score}%;"></div>
        </div>
      </div>
    `).join('');
  }

  // Render Explore grid view
  renderExploreGrid(filterCat = 'all', filterSource = 'all', searchQuery = '') {
    const grid = document.getElementById('explore-reels-grid');
    if (!grid) return;

    const query = searchQuery.toLowerCase().trim();
    const filtered = this.reels.filter(r => {
      const matchCat = filterCat === 'all' || r.category === filterCat;
      const matchSource = filterSource === 'all' || r.source === filterSource;
      const matchQuery = !query || 
        r.title.toLowerCase().includes(query) || 
        r.description.toLowerCase().includes(query) || 
        r.tags.some(t => t.toLowerCase().includes(query)) ||
        r.category.toLowerCase().includes(query);
      return matchCat && matchSource && matchQuery;
    });

    grid.innerHTML = filtered.map(reel => `
      <div class="grid-reel-card">
        <div class="grid-reel-media">
          <canvas class="reel-canvas" id="explore-canvas-${reel.id}"></canvas>
        </div>
        <div class="grid-reel-content">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="badge-source ${reel.source}">${reel.source === 'youtube' ? 'YouTube' : 'Instagram'}</span>
            ${this.getEduScoreBadgeHtml(reel.eduScore || 85)}
          </div>
          <h4 class="grid-reel-title">${reel.title}</h4>
          <p class="reel-description">${reel.description}</p>
          <div class="grid-reel-footer">
            <span><i data-lucide="heart" style="width:14px;"></i> ${this.formatNumber(reel.stats.likes)}</span>
            <span><i data-lucide="bookmark" style="width:14px;"></i> ${this.formatNumber(reel.stats.saves)}</span>
            <button class="nav-tab" style="padding:0.3rem 0.6rem; font-size:0.75rem;" data-open-feed="${reel.id}">Watch</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach canvases in explore grid
    filtered.forEach(reel => {
      const c = document.getElementById(`explore-canvas-${reel.id}`);
      if (c) this.canvasPlayer.attachCanvas(c, reel);
    });

    // Watch click binding
    grid.querySelectorAll('[data-open-feed]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-open-feed');
        this.switchView('feed');
        const targetCard = document.querySelector(`.reel-card[data-reel-id="${id}"]`);
        if (targetCard) targetCard.scrollIntoView({ behavior: 'smooth' });
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  // Render Saved Reels grid
  renderSavedGrid() {
    const grid = document.getElementById('saved-reels-grid');
    const label = document.getElementById('saved-count-label');
    if (!grid) return;

    const savedReels = this.interactionEngine.getSavedReels();
    if (label) label.textContent = `${savedReels.length} Reels Saved`;

    if (savedReels.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">No saved Reels yet. Click the Bookmark icon on any Reel to save it!</div>`;
      return;
    }

    grid.innerHTML = savedReels.map(reel => `
      <div class="grid-reel-card">
        <div class="grid-reel-media">
          <canvas class="reel-canvas" id="saved-canvas-${reel.id}"></canvas>
        </div>
        <div class="grid-reel-content">
          <h4 class="grid-reel-title">${reel.title}</h4>
          <p class="reel-description">${reel.description}</p>
          <div class="grid-reel-footer">
            <span class="tag-pill">${reel.category}</span>
            <button class="filter-pill" style="padding: 0.3rem 0.6rem;" data-unsave-id="${reel.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    savedReels.forEach(reel => {
      const c = document.getElementById(`saved-canvas-${reel.id}`);
      if (c) this.canvasPlayer.attachCanvas(c, reel);
    });

    grid.querySelectorAll('[data-unsave-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-unsave-id');
        this.interactionEngine.toggleSave(id);
        this.renderSavedGrid();
        this.renderFeed();
        this.showToast('Removed from Saved');
      });
    });

    if (window.lucide) window.lucide.createIcons();
  }

  setupSearchAndFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryPills = document.querySelectorAll('#category-filters .filter-pill');
    const sourcePills = document.querySelectorAll('#source-filters .filter-pill');

    let currentCat = 'all';
    let currentSource = 'all';

    const applyExploreFilters = () => {
      const query = searchInput ? searchInput.value : '';
      this.renderExploreGrid(currentCat, currentSource, query);
    };

    if (searchInput) {
      searchInput.addEventListener('input', applyExploreFilters);
    }

    categoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCat = pill.getAttribute('data-category');
        applyExploreFilters();
      });
    });

    sourcePills.forEach(pill => {
      pill.addEventListener('click', () => {
        sourcePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentSource = pill.getAttribute('data-source');
        applyExploreFilters();
      });
    });

    // Unlimited Reels Extractor Form Handler
    const form = document.getElementById('unlimited-reels-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const topic = document.getElementById('extract-topic').value;
        const source = document.getElementById('extract-source').value;
        const filter = document.getElementById('extract-filter').value;
        const count = parseInt(document.getElementById('extract-count').value, 10) || 5;

        this.extractCustomUnlimitedReels(topic, source, filter, count);
      });
    }
  }

  extractCustomUnlimitedReels(topic, source, filter, count) {
    const newReels = generateProceduralReels(count, this.reels.length + 1);
    
    newReels.forEach(r => {
      if (topic !== 'all') {
        r.category = topic;
        r.topic = topic;
        r.tags = [topic, "Software Engineering", "Tech Skill"];
      }
      if (source !== 'all') {
        r.source = source;
      }
      if (filter === 'core') {
        r.isHypeOrMeme = false;
        r.visualType = r.visualType === 'meme' ? 'code' : r.visualType;
      }
    });

    this.reels.unshift(...newReels);
    this.renderFeed();
    this.renderExploreGrid();

    this.showToast(`⚡ Extracted ${count} Unlimited Reels for ${topic === 'all' ? 'CSE Topics' : topic}!`);
  }

  showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }
}

// Instantiate App when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new ReelSenseApp();
});
