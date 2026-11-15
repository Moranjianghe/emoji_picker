const RECENT_KEY = 'emoji-picker-recent-v2';
const RECENT_LIMIT = 18;
const CATEGORY_NAMES = {
  smileys: ['笑臉與情緒', 'smileys and emotion'],
  people: ['人物與身體', 'people and body'],
  animals: ['動物與自然', 'animals and nature'],
  food: ['食物與飲料', 'food and drink'],
  travel: ['旅遊與地點', 'travel and places'],
  activities: ['活動與運動', 'activities and sports'],
  objects: ['物品與日常', 'objects'],
  symbols: ['符號與標誌', 'symbols'],
  flags: ['旗幟', 'flags']
};
const search = document.querySelector('#search-input');
const clearSearch = document.querySelector('.clear-search');
const tabsRoot = document.querySelector('#category-tabs');
const groupsRoot = document.querySelector('#emoji-groups');
const recentRoot = document.querySelector('#recent-list');
const recentEmpty = document.querySelector('#recent-empty');
const clearRecent = document.querySelector('#clear-recent');
const resultCount = document.querySelector('#result-count');
const libraryTitle = document.querySelector('#library-title');
const emptyState = document.querySelector('#empty-state');
const toast = document.querySelector('#toast');
let categories = [];
let recent = readRecent();
let activeCategory = 'all';
let toastTimer;

function normalize(value) {
  return String(value).toLocaleLowerCase().normalize('NFKC').trim();
}
function readRecent() {
  try {
    const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(item => typeof item === 'string').slice(0, RECENT_LIMIT) : [];
  } catch { return []; }
}
function makeTabs() {
  const all = { id: 'all', label: '全部', icon: '☷' };
  const buttons = [all, ...categories].map(category => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'category-tab';
    button.dataset.cat = category.id;
    button.setAttribute('aria-pressed', String(category.id === activeCategory));
    button.setAttribute('aria-label', category.label);
    button.innerHTML = `<span aria-hidden="true">${category.icon}</span><span>${category.label}</span>`;
    button.addEventListener('click', () => {
      activeCategory = category.id;
      makeTabs();
      renderLibrary();
    });
    return button;
  });
  tabsRoot.replaceChildren(...buttons);
}
function emojiInfo(item) {
  const [emoji, englishName, simplifiedName, traditionalName, keywords = ''] = item;
  return { emoji, englishName, simplifiedName, traditionalName, keywords };
}
function searchableText(item, category) {
  const info = emojiInfo(item);
  const categoryNames = CATEGORY_NAMES[category.id] || [];
  return normalize([
    info.emoji, info.englishName, info.simplifiedName, info.traditionalName,
    info.keywords, category.label, category.id, ...categoryNames
  ].join(' '));
}
function renderEmojiTile(item, category) {
  const { emoji, englishName, simplifiedName, traditionalName } = emojiInfo(item);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'emoji-tile';
  button.textContent = emoji;
  button.setAttribute('aria-label', `複製 ${emoji} ${traditionalName} ${englishName}`);
  button.title = `${traditionalName} · ${englishName}`;
  button.dataset.category = category.id;
  button.addEventListener('click', () => copyEmoji(emoji));
  return button;
}
function renderRecent() {
  const recentTiles = recent.map(emoji => {
    const category = categories.find(group => group.items.some(item => item[0] === emoji));
    if (!category) return null;
    const item = category.items.find(entry => entry[0] === emoji);
    return renderEmojiTile(item, category);
  }).filter(Boolean);
  recentRoot.replaceChildren(...recentTiles);
  const hasItems = recentTiles.length > 0;
  recentEmpty.hidden = hasItems;
  clearRecent.hidden = !hasItems;
}
function renderLibrary() {
  const query = normalize(search.value);
  const visibleCategories = categories.filter(category => activeCategory === 'all' || activeCategory === category.id);
  groupsRoot.replaceChildren();
  let total = 0;
  for (const category of visibleCategories) {
    const matches = category.items.filter(item => !query || searchableText(item, category).includes(query));
    if (!matches.length) continue;
    total += matches.length;
    const section = document.createElement('section');
    section.className = 'group-section';
    const heading = document.createElement('h3');
    heading.className = 'group-title';
    heading.append(document.createTextNode(`${category.icon} ${category.label}`));
    const count = document.createElement('small');
    count.textContent = `${matches.length}`;
    heading.append(count);
    const grid = document.createElement('div');
    grid.className = 'emoji-grid library-grid';
    grid.setAttribute('aria-label', `${category.label} emoji`);
    grid.append(...matches.map(item => renderEmojiTile(item, category)));
    section.append(heading, grid);
    groupsRoot.append(section);
  }
  libraryTitle.textContent = query ? '搜尋結果' : activeCategory === 'all' ? '全部表情' : categories.find(category => category.id === activeCategory)?.label || '全部表情';
  resultCount.textContent = `${total} 個 emoji`;
  emptyState.hidden = total !== 0;
  clearSearch.hidden = !search.value;
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1600);
}
async function copyEmoji(emoji) {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(emoji);
    else {
      const field = document.createElement('textarea');
      field.value = emoji;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.append(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      if (!copied) throw new Error('clipboard unavailable');
    }
    recent = [emoji, ...recent.filter(item => item !== emoji)].slice(0, RECENT_LIMIT);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(recent)); } catch { /* copying still succeeded */ }
    renderRecent();
    showToast('已複製，可以貼上了');
  } catch {
    showToast('無法存取剪貼簿，請檢查瀏覽器權限');
  }
}
search.addEventListener('input', renderLibrary);
clearSearch.addEventListener('click', () => { search.value = ''; renderLibrary(); search.focus(); });
document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
  search.value = button.dataset.query;
  activeCategory = 'all';
  makeTabs();
  renderLibrary();
  libraryTitle.scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
clearRecent.addEventListener('click', () => {
  recent = [];
  try { localStorage.removeItem(RECENT_KEY); } catch { /* no-op when storage is unavailable */ }
  renderRecent();
});
fetch('./emoji.json')
  .then(response => { if (!response.ok) throw new Error('emoji data unavailable'); return response.json(); })
  .then(data => {
    categories = Array.isArray(data.categories) ? data.categories : [];
    makeTabs();
    renderRecent();
    renderLibrary();
  })
  .catch(() => {
    renderRecent();
    resultCount.textContent = '暫時無法載入';
    emptyState.hidden = false;
    emptyState.querySelector('p').textContent = 'Emoji 清單無法載入';
    emptyState.querySelector('span:last-child').textContent = '請重新整理頁面後再試一次。';
  });
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
