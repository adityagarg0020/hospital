// localStorage utility helpers

const STORAGE_PREFIX = 'mediverse_';

export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('localStorage write failed:', e);
    }
  },

  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith(STORAGE_PREFIX))
      .forEach(k => localStorage.removeItem(k));
  },
};

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good Morning', emoji: '🌅', period: 'morning' };
  if (hour < 17) return { text: 'Good Afternoon', emoji: '☀️', period: 'afternoon' };
  if (hour < 21) return { text: 'Good Evening', emoji: '🌆', period: 'evening' };
  return { text: 'Good Night', emoji: '🌙', period: 'night' };
}

export function predictWaitTime(position, avgServiceTime = 8) {
  const base = position * avgServiceTime;
  const variance = Math.floor(Math.random() * 5) - 2;
  return Math.max(0, base + variance);
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function generateTokenId() {
  const num = Math.floor(Math.random() * 900) + 100;
  return `T-${num}`;
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
