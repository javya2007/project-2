/**
 * ReelSense AI – components/SearchFilter.js
 * Search bar + category pill filters for the Explore tab.
 * Emits a filtered list of reels whenever the user types or selects a filter.
 */

const CATEGORIES = [
  'All', 'AI', 'DSA', 'Java', 'Web Development',
  'HLD/System Design', 'Cybersecurity', 'Cloud',
  'Hardware', 'DBMS', 'OS', 'Git/GitHub', 'Career/Placements'
];

const SOURCES = ['All', 'YouTube', 'Instagram'];

/**
 * Render the search bar and filter pills into a container element.
 * @param {HTMLElement} containerEl   – target mount element
 * @param {Array}       allReels      – full reel data array
 * @param {Function}    onFilterChange – callback(filteredReels)
 */
export function renderSearchFilter(containerEl, allReels, onFilterChange) {
  if (!containerEl) return;

  containerEl.innerHTML = `
    <div class="search-filter-root">
      <!-- Search Input -->
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input
          id="explore-search-input"
          type="text"
          class="search-input"
          placeholder="Search reels by title, tag, or topic…"
          autocomplete="off"
          spellcheck="false"
        />
        <button class="search-clear-btn" id="search-clear-btn" aria-label="Clear search">✕</button>
      </div>

      <!-- Source Tabs -->
      <div class="source-tabs" role="tablist" aria-label="Source filter">
        ${SOURCES.map((s, i) => `
          <button
            class="source-tab ${i === 0 ? 'active' : ''}"
            data-source="${s.toLowerCase()}"
            role="tab"
            aria-selected="${i === 0}"
          >${s}</button>
        `).join('')}
      </div>

      <!-- Category Pills -->
      <div class="category-pills" role="group" aria-label="Category filter">
        ${CATEGORIES.map((cat, i) => `
          <button
            class="category-pill ${i === 0 ? 'active' : ''}"
            data-category="${cat}"
          >${cat}</button>
        `).join('')}
      </div>

      <!-- Results count -->
      <p class="search-results-count" id="search-results-count"></p>
    </div>
  `;

  // State
  let query       = '';
  let activeSource = 'all';
  let activeCat    = 'All';

  const input      = containerEl.querySelector('#explore-search-input');
  const clearBtn   = containerEl.querySelector('#search-clear-btn');
  const countEl    = containerEl.querySelector('#search-results-count');
  const sourceTabs = containerEl.querySelectorAll('.source-tab');
  const catPills   = containerEl.querySelectorAll('.category-pill');

  function applyFilters() {
    const q = query.toLowerCase().trim();

    const filtered = allReels.filter(reel => {
      const matchSource = activeSource === 'all' || reel.source === activeSource;
      const matchCat    = activeCat === 'All' ||
        reel.category === activeCat ||
        reel.topic === activeCat ||
        reel.tags.includes(activeCat);
      const matchQuery  = !q ||
        reel.title.toLowerCase().includes(q) ||
        reel.description.toLowerCase().includes(q) ||
        reel.tags.some(t => t.toLowerCase().includes(q)) ||
        reel.author.toLowerCase().includes(q);

      return matchSource && matchCat && matchQuery;
    });

    countEl.textContent = `${filtered.length} reel${filtered.length !== 1 ? 's' : ''} found`;
    onFilterChange(filtered);
  }

  // Search input
  input.addEventListener('input', e => {
    query = e.target.value;
    clearBtn.style.display = query ? 'flex' : 'none';
    applyFilters();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    query = '';
    clearBtn.style.display = 'none';
    applyFilters();
  });

  // Source tabs
  sourceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sourceTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeSource = tab.dataset.source;
      applyFilters();
    });
  });

  // Category pills
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.dataset.category;
      applyFilters();
    });
  });

  // Initial render
  applyFilters();
}
