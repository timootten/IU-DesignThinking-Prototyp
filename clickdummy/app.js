// ===== HabitForge — Shared Application Logic =====
const STORAGE_KEY = 'habitforge_data';

// ── Motivational Quotes ──
const QUOTES = [
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Every action you take is a vote for the type of person you wish to become.", author: "James Clear" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
];

// ── Identity Icons ──
const IDENTITY_ICONS = [
  { icon: 'fa-chart-line', label: 'Investor' },
  { icon: 'fa-dumbbell', label: 'Athlete' },
  { icon: 'fa-book-open', label: 'Reader' },
  { icon: 'fa-pen-fancy', label: 'Writer' },
  { icon: 'fa-laptop-code', label: 'Developer' },
  { icon: 'fa-heart-pulse', label: 'Health Enthusiast' },
  { icon: 'fa-music', label: 'Musician' },
  { icon: 'fa-palette', label: 'Artist' },
  { icon: 'fa-graduation-cap', label: 'Student' },
  { icon: 'fa-seedling', label: 'Mindful Person' },
  { icon: 'fa-utensils', label: 'Chef' },
  { icon: 'fa-brain', label: 'Thinker' },
];

// ── Existing Routines for Habit Stacking ──
const EXISTING_ROUTINES = [
  'Morning Coffee', 'After Breakfast', 'Commute to Work',
  'Lunch Break', 'Afternoon Break', 'Commute Home',
  'After Workout', 'Evening Wind-Down', 'Before Bed',
  'After Shower', 'After Dinner',
];

// ── Tree Stages ──
const TREE_STAGES = [
  { emoji: '🌰', label: 'Seed', desc: 'Plant your seed — start your first habit!' },
  { emoji: '🌱', label: 'Sprout', desc: 'Your sprout is growing!' },
  { emoji: '🌿', label: 'Seedling', desc: 'Getting stronger every day!' },
  { emoji: '🪴', label: 'Young Plant', desc: 'Almost there — keep going!' },
  { emoji: '🌳', label: 'Full Tree', desc: 'Amazing! All habits done today!' },
];

// ══════════════════════════════════════
//  LocalStorage CRUD
// ══════════════════════════════════════
function getData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedData();
    const data = JSON.parse(raw);
    if (!data.habits || data.habits.length === 0) return seedData();
    return data;
  } catch { return seedData(); }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function updateData(fn) {
  const data = getData();
  fn(data);
  saveData(data);
  return data;
}

// ══════════════════════════════════════
//  Seed Sample Data
// ══════════════════════════════════════
function seedData() {
  const data = {
    habits: [],
    completions: {},
    streakFreezes: { available: 2, usedDates: [] },
    favoriteQuoteIndices: [],
    theme: 'dark',
    buddyEnabled: true,
    reminders: [],
  };

  const t1a = gid(), t1b = gid(), t1c = gid();
  data.habits.push({
    id: gid(),
    identity: 'Investor',
    icon: 'fa-chart-line',
    why: 'I want financial freedom to support my family',
    bigGoal: 'Build a $10,000 emergency fund',
    linkedHabit: 'Morning Coffee',
    timeOfDay: 'morning',
    specificTime: '07:30',
    frequency: 'daily',
    tasks: [
      { id: t1a, name: 'Read 10 pages of finance book', why: 'Knowledge compounds over time' },
      { id: t1b, name: 'Save $10 automatically', why: 'Small amounts add up' },
      { id: t1c, name: 'Track daily expenses', why: 'Awareness is the first step' },
    ],
    createdAt: ds(-14),
  });

  const t2a = gid(), t2b = gid();
  data.habits.push({
    id: gid(),
    identity: 'Athlete',
    icon: 'fa-dumbbell',
    why: 'I want to feel strong and energetic every day',
    bigGoal: 'Run a half marathon',
    linkedHabit: 'After Waking Up',
    timeOfDay: 'morning',
    specificTime: '06:00',
    frequency: 'daily',
    tasks: [
      { id: t2a, name: '20 min morning run', why: 'Build cardiovascular endurance' },
      { id: t2b, name: '10 push-ups', why: 'Strength builds confidence' },
    ],
    createdAt: ds(-7),
  });

  // Historical completions for streaks
  for (let i = 1; i <= 13; i++) {
    const d = ds(-i);
    if (i === 10) {
      // Day 10 missed → streak freeze
      data.streakFreezes.usedDates.push(d);
      continue;
    }
    if (!data.completions[d]) data.completions[d] = [];
    data.completions[d].push(t1a, t1b, t1c);
  }
  for (let i = 1; i <= 6; i++) {
    const d = ds(-i);
    if (!data.completions[d]) data.completions[d] = [];
    data.completions[d].push(t2a, t2b);
  }

  data.reminders = [
    { id: gid(), label: 'Read finance book', time: '07:30', emoji: '📚', enabled: true },
    { id: gid(), label: 'Morning run', time: '06:00', emoji: '🏃', enabled: true },
    { id: gid(), label: 'Track expenses', time: '21:00', emoji: '💰', enabled: true },
    { id: gid(), label: 'Push-ups', time: '06:30', emoji: '💪', enabled: true },
    { id: gid(), label: 'Meditation', time: '22:00', emoji: '🧘', enabled: false },
  ];

  saveData(data);
  return data;
}

// ══════════════════════════════════════
//  Date & ID Helpers
// ══════════════════════════════════════
function today() { return new Date().toISOString().split('T')[0]; }
function ds(offset) { const d = new Date(); d.setDate(d.getDate() + offset); return d.toISOString().split('T')[0]; }
function gid() { return 'id_' + Math.random().toString(36).slice(2, 11) + Date.now().toString(36); }

// ══════════════════════════════════════
//  Streak Calculation
// ══════════════════════════════════════
function calcStreak(taskIds, data) {
  if (!taskIds.length) return 0;
  let streak = 0;
  const t = today();
  const tc = data.completions[t] || [];
  if (taskIds.every(id => tc.includes(id))) streak = 1;

  let day = 1;
  while (day < 400) {
    const d = ds(-day);
    const c = data.completions[d] || [];
    if (taskIds.every(id => c.includes(id))) { streak++; day++; }
    else if (data.streakFreezes.usedDates.includes(d)) { streak++; day++; }
    else break;
  }
  return streak;
}

// ══════════════════════════════════════
//  Theme
// ══════════════════════════════════════
function initTheme() {
  const data = getData();
  applyTheme(data.theme || 'dark');
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  // Update toggle icon if it exists
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun text-yellow-300' : 'fas fa-moon text-indigo-500';
  }
}

function toggleTheme() {
  return updateData(d => {
    d.theme = d.theme === 'dark' ? 'light' : 'dark';
    applyTheme(d.theme);
  });
}

// ══════════════════════════════════════
//  Daily Quote
// ══════════════════════════════════════
function getDailyQuote() {
  const n = today().replace(/-/g, '');
  const i = parseInt(n, 10) % QUOTES.length;
  return { ...QUOTES[i], index: i };
}

function toggleFavQuote(index) {
  const data = getData();
  const pos = data.favoriteQuoteIndices.indexOf(index);
  if (pos > -1) data.favoriteQuoteIndices.splice(pos, 1);
  else data.favoriteQuoteIndices.push(index);
  saveData(data);
  return data.favoriteQuoteIndices.includes(index);
}

function isQuoteFav(index) {
  return getData().favoriteQuoteIndices.includes(index);
}

// ══════════════════════════════════════
//  Habit CRUD
// ══════════════════════════════════════
function addHabit(habit) {
  updateData(d => d.habits.push(habit));
}

function updateHabit(id, updates) {
  updateData(d => {
    const i = d.habits.findIndex(h => h.id === id);
    if (i > -1) Object.assign(d.habits[i], updates);
  });
}

function deleteHabit(id) {
  updateData(d => { d.habits = d.habits.filter(h => h.id !== id); });
}

function getHabit(id) {
  return getData().habits.find(h => h.id === id) || null;
}

function getAllTasks(data) {
  const tasks = [];
  data.habits.forEach(h => {
    h.tasks.forEach(t => {
      tasks.push({ ...t, habitId: h.id, habitIdentity: h.identity, habitIcon: h.icon, linkedHabit: h.linkedHabit, timeOfDay: h.timeOfDay, specificTime: h.specificTime });
    });
  });
  return tasks;
}

// ══════════════════════════════════════
//  Task Completion
// ══════════════════════════════════════
function toggleTaskCompletion(taskId) {
  const data = getData();
  const t = today();
  if (!data.completions[t]) data.completions[t] = [];
  const idx = data.completions[t].indexOf(taskId);
  if (idx > -1) data.completions[t].splice(idx, 1);
  else data.completions[t].push(taskId);
  saveData(data);
  return data.completions[t].includes(taskId);
}

function isTaskCompleted(taskId, data) {
  const c = data.completions[today()] || [];
  return c.includes(taskId);
}

// ══════════════════════════════════════
//  Completion Percentage for Tree
// ══════════════════════════════════════
function getTodayProgress(data) {
  const tasks = getAllTasks(data);
  if (!tasks.length) return { done: 0, total: 0, pct: 0 };
  const done = tasks.filter(t => isTaskCompleted(t.id, data)).length;
  return { done, total: tasks.length, pct: Math.round((done / tasks.length) * 100) };
}

function getTreeStage(pct) {
  if (pct >= 100) return 4;
  if (pct >= 75) return 3;
  if (pct >= 50) return 2;
  if (pct >= 25) return 1;
  return 0;
}

// ══════════════════════════════════════
//  Confetti (simple CSS-based)
// ══════════════════════════════════════
function fireConfetti() {
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;';
  document.body.appendChild(container);
  const colors = ['#10b981','#84cc16','#fbbf24','#f472b6','#60a5fa','#a78bfa','#fb923c'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    const c = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const dur = 1.5 + Math.random();
    const size = 6 + Math.random() * 8;
    const rot = Math.random() * 360;
    p.style.cssText = `
      position:absolute;top:-20px;left:${x}%;width:${size}px;height:${size}px;
      background:${c};border-radius:${Math.random()>.5?'50%':'2px'};
      animation:confettiFall ${dur}s ease-out ${delay}s forwards;
      transform:rotate(${rot}deg);opacity:1;
    `;
    container.appendChild(p);
  }
  setTimeout(() => container.remove(), 3000);
}

// Inject confetti keyframes once
(function injectConfettiCSS() {
  if (document.getElementById('confetti-css')) return;
  const s = document.createElement('style');
  s.id = 'confetti-css';
  s.textContent = `
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity:1; }
      100% { transform: translateY(100vh) rotate(720deg); opacity:0; }
    }
  `;
  document.head.appendChild(s);
})();

// ══════════════════════════════════════
//  Bottom Navigation Builder
// ══════════════════════════════════════
function renderBottomNav(active) {
  const pages = [
    { href: 'index.html', icon: 'fa-home', label: 'Home', key: 'home' },
    { href: 'add-edit.html', icon: 'fa-plus-circle', label: 'Add', key: 'add' },
    { href: 'accountability.html', icon: 'fa-users', label: 'Buddy', key: 'buddy' },
    { href: 'focus.html', icon: 'fa-crosshairs', label: 'Focus', key: 'focus' },
  ];
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  const links = pages.map(p => `
    <a href="${p.href}" class="flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${p.key === active
      ? 'text-emerald-500 dark:text-emerald-400 scale-110'
      : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}">
      <i class="fas ${p.icon} text-lg"></i>
      <span class="text-[10px] font-semibold">${p.label}</span>
    </a>
  `).join('');
  nav.innerHTML = `<div class="max-w-2xl mx-auto flex flex-row items-center justify-around py-2">${links}</div>`;
}

// ══════════════════════════════════════
//  Time Formatting
// ══════════════════════════════════════
function formatTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function timeOfDayLabel(tod) {
  const map = { morning: '☀️ Morning', afternoon: '🌤️ Afternoon', evening: '🌙 Evening' };
  return map[tod] || tod;
}
