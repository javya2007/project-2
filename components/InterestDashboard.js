/**
 * ReelSense AI – components/InterestDashboard.js
 * Renders the radar/bar chart interest analytics dashboard
 * using Chart.js, showing category-level engagement scores.
 */

let radarChart = null;
let barChart = null;

/**
 * Initialize or update the Radar Chart for category interest scores.
 * @param {HTMLCanvasElement} canvasEl
 * @param {Object} scores  – { "DSA": 88, "AI": 72, ... }
 */
export function renderRadarChart(canvasEl, scores) {
  if (!canvasEl || !window.Chart) return;

  const labels = Object.keys(scores);
  const data   = Object.values(scores);

  const chartData = {
    labels,
    datasets: [{
      label: 'Interest Score',
      data,
      backgroundColor: 'rgba(99, 102, 241, 0.25)',
      borderColor: 'rgba(99, 102, 241, 0.9)',
      pointBackgroundColor: '#818cf8',
      pointBorderColor: '#fff',
      pointRadius: 4,
      borderWidth: 2,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.raw} pts`
        }
      }
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 25,
          color: '#94a3b8',
          font: { size: 10 },
          backdropColor: 'transparent'
        },
        grid:        { color: 'rgba(148,163,184,0.15)' },
        angleLines:  { color: 'rgba(148,163,184,0.15)' },
        pointLabels: {
          color: '#cbd5e1',
          font: { size: 11, weight: '600' }
        }
      }
    }
  };

  if (radarChart) {
    radarChart.data = chartData;
    radarChart.update('active');
    return;
  }

  radarChart = new window.Chart(canvasEl, {
    type: 'radar',
    data: chartData,
    options
  });
}

/**
 * Initialize or update the Horizontal Bar Chart for category scores.
 * @param {HTMLCanvasElement} canvasEl
 * @param {Object} scores
 */
export function renderBarChart(canvasEl, scores) {
  if (!canvasEl || !window.Chart) return;

  const sorted  = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const labels  = sorted.map(([k]) => k);
  const data    = sorted.map(([, v]) => v);

  const palette = [
    '#6366f1','#8b5cf6','#06b6d4','#10b981',
    '#f59e0b','#ef4444','#ec4899','#84cc16',
    '#f97316','#0ea5e9','#a78bfa','#34d399'
  ];

  const chartData = {
    labels,
    datasets: [{
      label: 'Interest Score',
      data,
      backgroundColor: labels.map((_, i) => palette[i % palette.length] + 'cc'),
      borderColor:     labels.map((_, i) => palette[i % palette.length]),
      borderWidth: 1,
      borderRadius: 6,
    }]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: ctx => ` ${ctx.raw} pts` }
      }
    },
    scales: {
      x: {
        min: 0, max: 100,
        ticks: { color: '#94a3b8', font: { size: 10 } },
        grid:  { color: 'rgba(148,163,184,0.1)' }
      },
      y: {
        ticks: { color: '#cbd5e1', font: { size: 11 } },
        grid:  { display: false }
      }
    }
  };

  if (barChart) {
    barChart.data = chartData;
    barChart.update('active');
    return;
  }

  barChart = new window.Chart(canvasEl, {
    type: 'bar',
    data: chartData,
    options
  });
}

/**
 * Render the top-category summary cards below the chart.
 * @param {HTMLElement} containerEl
 * @param {Object} scores
 */
export function renderTopCategories(containerEl, scores) {
  if (!containerEl) return;

  const top5 = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const icons = {
    'Software Engineering': '💻',
    'DSA':                  '🧠',
    'AI':                   '🤖',
    'Technical Interviews': '🎯',
    'System Design':        '🏗️',
    'Web Development':      '🌐',
    'Cybersecurity':        '🔐',
    'Cloud':                '☁️',
    'Hardware':             '⌨️',
    'DBMS':                 '🛢️',
    'Operating Systems':    '⚙️',
    'Git/GitHub':           '🐙',
  };

  containerEl.innerHTML = top5.map(([cat, score], i) => `
    <div class="top-cat-card ${i === 0 ? 'top-cat-rank1' : ''}">
      <span class="top-cat-rank">#${i + 1}</span>
      <span class="top-cat-icon">${icons[cat] || '📚'}</span>
      <span class="top-cat-name">${cat}</span>
      <span class="top-cat-score">${score} pts</span>
    </div>
  `).join('');
}

/**
 * Destroy chart instances (call on view switch to avoid memory leaks).
 */
export function destroyCharts() {
  if (radarChart) { radarChart.destroy(); radarChart = null; }
  if (barChart)   { barChart.destroy();   barChart   = null; }
}
