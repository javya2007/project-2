import { REELS_DATA } from './reelsData.js';

export const WEIGHTS = {
  SAVE: 5,
  SHARE: 5,
  REPLAY: 4,
  LIKE: 3,
  WATCH: 2,
  SKIP: -2
};

const STORAGE_KEY = 'reelsense_interactions_v1';
const SAVED_KEY = 'reelsense_saved_reels_v1';

export class InteractionEngine {
  constructor() {
    this.interactions = this.loadInteractions();
    this.savedIds = new Set(this.loadSavedIds());
  }

  loadInteractions() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
      return [];
    }
  }

  saveInteractions() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.interactions));
    } catch (e) {
      console.warn('LocalStorage write failed:', e);
    }
  }

  loadSavedIds() {
    try {
      const data = localStorage.getItem(SAVED_KEY);
      return data ? JSON.parse(data) : ['reel-2', 'reel-7'];
    } catch (e) {
      return ['reel-2', 'reel-7'];
    }
  }

  persistSavedIds() {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(Array.from(this.savedIds)));
    } catch (e) {
      console.warn('Saved IDs write failed:', e);
    }
  }

  recordInteraction(reelId, actionType) {
    const reel = REELS_DATA.find(r => r.id === reelId);
    if (!reel) return;

    const weight = WEIGHTS[actionType.toUpperCase()] || 0;
    const entry = {
      reelId,
      action: actionType.toUpperCase(),
      weight,
      category: reel.category,
      tags: reel.tags,
      isHypeOrMeme: reel.isHypeOrMeme,
      timestamp: Date.now()
    };

    this.interactions.push(entry);
    this.saveInteractions();

    if (actionType.toUpperCase() === 'SAVE') {
      this.savedIds.add(reelId);
      this.persistSavedIds();
    }
    return entry;
  }

  toggleSave(reelId) {
    if (this.savedIds.has(reelId)) {
      this.savedIds.delete(reelId);
      this.recordInteraction(reelId, 'SKIP'); // Penalty for unsaving
    } else {
      this.savedIds.add(reelId);
      this.recordInteraction(reelId, 'SAVE');
    }
    this.persistSavedIds();
    return this.savedIds.has(reelId);
  }

  isSaved(reelId) {
    return this.savedIds.has(reelId);
  }

  getSavedReels() {
    return REELS_DATA.filter(r => this.savedIds.has(r.id));
  }

  clearAllData() {
    this.interactions = [];
    this.savedIds = new Set();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SAVED_KEY);
  }

  // Calculate composite semantic weights across technical categories
  getCategoryScores() {
    const scores = {
      "Software Engineering": 20,
      "DSA": 15,
      "Technical Interviews": 10,
      "System Design": 12,
      "AI": 18,
      "Web Development": 15,
      "Cybersecurity": 10,
      "Cloud": 10,
      "Hardware": 8,
      "DBMS": 10,
      "Operating Systems": 8,
      "Git/GitHub": 8
    };

    // Calculate score accumulated per category
    this.interactions.forEach(item => {
      const w = item.weight;
      if (item.category && scores[item.category] !== undefined) {
        scores[item.category] += w;
      }
      
      // Secondary tag weights
      if (item.tags) {
        item.tags.forEach(tag => {
          if (tag === "Software Engineering" || tag === "Coding Interview") {
            scores["Software Engineering"] += w * 0.6;
            scores["Technical Interviews"] += w * 0.6;
          }
          if (tag === "DSA" || tag === "Algorithms") {
            scores["DSA"] += w * 0.8;
          }
          if (tag === "AI" || tag === "Machine Learning") {
            if (!item.isHypeOrMeme) {
              scores["AI"] += w * 0.7;
            } else {
              scores["AI"] += w * 0.1; // Discount hype content
            }
          }
          if (tag === "System Design" || tag === "HLD") {
            scores["System Design"] += w * 0.7;
          }
          if (tag === "Hardware") {
            scores["Hardware"] += w * 0.8;
          }
          if (tag === "Cybersecurity") {
            scores["Cybersecurity"] += w * 0.8;
          }
        });
      }
    });

    // Ensure non-negative and normalize to standard 0 - 100 percentages
    let maxVal = 1;
    Object.values(scores).forEach(val => { if (val > maxVal) maxVal = val; });

    const normalized = {};
    Object.keys(scores).forEach(key => {
      const raw = Math.max(5, scores[key]);
      normalized[key] = Math.min(99, Math.round((raw / maxVal) * 95));
    });

    return normalized;
  }

  // Pre-configured Main Test Case sequence runner
  runMainTestCase() {
    this.clearAllData();
    
    // 1. Likes Java Meme
    this.recordInteraction("reel-1", "LIKE");
    
    // 2. Saves Software Engineer Reel
    this.recordInteraction("reel-2", "SAVE");
    
    // 3. Replays Coding Interview Reel
    this.recordInteraction("reel-3", "REPLAY");
    
    // 4. Likes Developer Laptop Reel
    this.recordInteraction("reel-4", "LIKE");
    
    // 5. Replays DSA Reel
    this.recordInteraction("reel-5", "REPLAY");
    
    // 6. Skips AI Job-Hype Reel
    this.recordInteraction("reel-6", "SKIP");

    return this.getCategoryScores();
  }
}
