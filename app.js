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
const TRADITIONAL_TO_SIMPLIFIED = new Map([
  ['這','这'],['為','为'],['裏','里'],['發','发'],['後','后'],['臺','台'],['萬','万'],['與','与'],['東','东'],['絲','丝'],['並','并'],['書','书'],['買','买'],['爭','争'],['雲','云'],['亞','亚'],['產','产'],['親','亲'],['億','亿'],['從','从'],['們','们'],['價','价'],['眾','众'],['優','优'],['會','会'],['傳','传'],['傷','伤'],['體','体'],['餘','余'],['側','侧'],['偵','侦'],['樂','乐'],['償','偿'],['兒','儿'],['兌','兑'],['黨','党'],['關','关'],['興','兴'],['養','养'],['獸','兽'],['內','内'],['冊','册'],['寫','写'],['軍','军'],['農','农'],['沖','冲'],['決','决'],['況','况'],['凍','冻'],['淨','净'],['涼','凉'],['減','减'],['幾','几'],['鳳','凤'],['擊','击'],['劃','划'],['劉','刘'],['創','创'],['別','别'],['製','制'],['劇','剧'],['勸','劝'],['辦','办'],['動','动'],['勞','劳'],['華','华'],['協','协'],['單','单'],['賣','卖'],['衛','卫'],['歷','历'],['壓','压'],['縣','县'],['參','参'],['雙','双'],['變','变'],['號','号'],['嘆','叹'],['聽','听'],['嗎','吗'],['啟','启'],['員','员'],['嗚','呜'],['響','响'],['團','团'],['圖','图'],['圓','圆'],['場','场'],['壞','坏'],['塊','块'],['堅','坚'],['壇','坛'],['牆','墙'],['聲','声'],['處','处'],['備','备'],['復','复'],['頭','头'],['夾','夹'],['奪','夺'],['奮','奋'],['婦','妇'],['媽','妈'],['學','学'],['寧','宁'],['寶','宝'],['實','实'],['對','对'],['導','导'],['將','将'],['塵','尘'],['層','层'],['歲','岁'],['島','岛'],['嶺','岭'],['幣','币'],['師','师'],['帶','带'],['幫','帮'],['廣','广'],['莊','庄'],['慶','庆'],['庫','库'],['應','应'],['開','开'],['張','张'],['彎','弯'],['強','强'],['歸','归'],['當','当'],['徑','径'],['憶','忆'],['憂','忧'],['總','总'],['戀','恋'],['惡','恶'],['惱','恼'],['驚','惊'],['慘','惨'],['戶','户'],['撲','扑'],['掃','扫'],['揚','扬'],['擾','扰'],['搶','抢'],['護','护'],['報','报'],['擔','担'],['擬','拟'],['擁','拥'],['擇','择'],['揮','挥'],['換','换'],['據','据'],['攜','携'],['數','数'],['斷','断'],['無','无'],['時','时'],['顯','显'],['曉','晓'],['暈','晕'],['機','机'],['殺','杀'],['權','权'],['來','来'],['樣','样'],['歡','欢'],['殘','残'],['氣','气'],['漢','汉'],['湯','汤'],['沒','没'],['澤','泽'],['潔','洁'],['濃','浓'],['漸','渐'],['溫','温'],['灣','湾'],['濕','湿'],['滿','满'],['滅','灭'],['燈','灯'],['靈','灵'],['愛','爱'],['狀','状'],['獨','独'],['現','现'],['電','电'],['畫','画'],['療','疗'],['皺','皱'],['鹽','盐'],['著','着'],['禮','礼'],['稱','称'],['穩','稳'],['筆','笔'],['簡','简'],['類','类'],['緊','紧'],['線','线'],['組','组'],['經','经'],['結','结'],['給','给'],['絕','绝'],['繼','继'],['續','续'],['網','网'],['聯','联'],['腦','脑'],['腳','脚'],['臉','脸'],['見','见'],['觀','观'],['視','视'],['覺','觉'],['計','计'],['認','认'],['讓','让'],['記','记'],['說','说'],['請','请'],['讀','读'],['誰','谁'],['調','调'],['談','谈'],['貝','贝'],['負','负'],['財','财'],['責','责'],['賢','贤'],['敗','败'],['貨','货'],['質','质'],['貪','贪'],['貧','贫'],['購','购'],['貴','贵'],['費','费'],['賊','贼'],['資','资'],['賭','赌'],['賞','赏'],['賠','赔'],['賴','赖'],['賺','赚'],['賽','赛'],['贊','赞'],['長','长'],['門','门'],['問','问'],['間','间'],['陽','阳'],['陰','阴'],['隊','队'],['險','险'],['隨','随'],['難','难'],['靜','静'],['風','风'],['飛','飞'],['飯','饭'],['飲','饮'],['飽','饱'],['餓','饿'],['馬','马'],['驅','驱'],['魚','鱼'],['鳥','鸟'],['雞','鸡'],['龍','龙'],['龜','龟'],['貓','猫'],['紅','红'],['綠','绿'],['黃','黄'],['藍','蓝'],['鬆','松'],['樓','楼'],['車','车'],['顏','颜'],['丟','丢'],['悶','闷'],['飄','飘'],['爛','烂'],['廟','庙'],['閉','闭'],['鈴','铃'],['鐘','钟'],['鍋','锅'],['鏡','镜'],['錢','钱'],['鎖','锁'],['鑰','钥'],['針','针'],['劍','剑'],['餅','饼'],['餃','饺'],['豬','猪'],['麵','面'],['餓','饿'],['蘋','苹'],['檸','柠'],['櫻','樱'],['樹','树'],['橫','横'],['標','标'],['點','点'],['錄','录'],['訊','讯'],['顆','颗'],['繪','绘'],['圍','围'],['隻','只']
]);
const SEARCH_TRANSLATIONS = [
  ['woman', '女性 女人 女生', '女性 女人 女生'], ['man', '男性 男人 男生', '男性 男人 男生'],
  ['girl', '女孩 女生', '女孩 女生'], ['boy', '男孩 男生', '男孩 男生'],
  ['person', '人物 人', '人物 人'], ['family', '家庭 家人', '家庭 家人'],
  ['couple', '情侶 伴侶', '情侣 伴侣'], ['kiss', '親吻 親親', '亲吻 亲亲'],
  ['light skin tone', '淺膚色', '较浅肤色'], ['medium light skin tone', '中等偏淺膚色', '中等偏浅肤色'],
  ['medium skin tone', '中等膚色', '中等肤色'], ['medium dark skin tone', '中等偏深膚色', '中等偏深肤色'],
  ['dark skin tone', '深膚色', '较深肤色'], ['health worker', '醫護人員 醫生 護士', '医护人员 医生 护士'],
  ['technologist', '科技工作者 工程師', '科技工作者 工程师'], ['office worker', '辦公室人員', '办公室人员'],
  ['factory worker', '工廠工人', '工厂工人'], ['construction worker', '建築工人', '建筑工人'],
  ['scientist', '科學家', '科学家'], ['teacher', '老師', '老师'], ['student', '學生', '学生'],
  ['singer', '歌手', '歌手'], ['artist', '藝術家', '艺术家'], ['cook', '廚師', '厨师'],
  ['farmer', '農夫 農民', '农夫 农民'], ['mechanic', '技工 修理工', '技工 修理工'],
  ['judge', '法官', '法官'], ['firefighter', '消防員', '消防员'], ['pilot', '飛行員', '飞行员'],
  ['astronaut', '太空人 宇航員', '太空人 宇航员'], ['police officer', '警察', '警察'],
  ['detective', '偵探', '侦探'], ['guard', '守衛 保安', '守卫 保安'],
  ['ninja', '忍者', '忍者'], ['mage', '魔法師', '魔法师'], ['vampire', '吸血鬼', '吸血鬼'],
  ['fairy', '仙子 仙女', '仙子 仙女'], ['zombie', '殭屍', '僵尸'],
  ['wheelchair', '輪椅', '轮椅'], ['white hair', '白髮 白頭髮', '白发 白头发'],
  ['red hair', '紅髮 紅頭髮', '红发 红头发'], ['curly hair', '捲髮 捲頭髮', '卷发 卷头发']
];
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
let activeCategory = 'smileys';
let toastTimer;
let searchIndex = new WeakMap();
let toneVariantsByBase = new Map();
let activeToneMenu = null;
let activeToneTrigger = null;

function normalize(value) {
  return [...String(value).toLocaleLowerCase().normalize('NFKC')]
    .map(char => TRADITIONAL_TO_SIMPLIFIED.get(char) || char)
    .join('').trim();
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
      closeToneMenu();
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
  const normalizedEnglish = ` ${info.englishName.toLocaleLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
  const translationHints = SEARCH_TRANSLATIONS
    .filter(([term]) => normalizedEnglish.includes(` ${term} `))
    .flatMap(([, traditional, simplified]) => [traditional, simplified]);
  return normalize([
    info.emoji, info.englishName, info.simplifiedName, info.traditionalName,
    info.keywords, translationHints.join(' '), category.label, category.zh, category.tw, category.en,
    category.id, ...categoryNames
  ].filter(Boolean).join(' '));
}
function baseEmoji(emoji) {
  return emoji.replace(/[\u{1F3FB}-\u{1F3FF}]/gu, '');
}
function buildSearchIndex() {
  searchIndex = new WeakMap();
  toneVariantsByBase = new Map();
  for (const category of categories) {
    category.baseItems = [];
    for (const item of category.items) {
      const base = baseEmoji(item[0]);
      if (base === item[0]) category.baseItems.push(item);
      else {
        const variants = toneVariantsByBase.get(base) || [];
        variants.push(item);
        toneVariantsByBase.set(base, variants);
      }
    }
  }
  for (const category of categories) {
    for (const item of category.baseItems) {
      const variants = toneVariantsByBase.get(item[0]) || [];
      const variantTerms = variants.map(variant => searchableText(variant, category)).join(' ');
      searchIndex.set(item, `${searchableText(item, category)} ${variantTerms}`);
    }
  }
}
function closeToneMenu(restoreFocus = false) {
  if (!activeToneMenu) return;
  const trigger = activeToneTrigger;
  activeToneMenu.remove();
  activeToneMenu = null;
  activeToneTrigger = null;
  trigger?.setAttribute('aria-expanded', 'false');
  if (restoreFocus) trigger?.focus();
}
function openToneMenu(trigger, item, category) {
  if (activeToneTrigger === trigger) {
    closeToneMenu();
    return;
  }
  closeToneMenu();
  const { emoji, traditionalName, englishName } = emojiInfo(item);
  const menu = document.createElement('div');
  menu.className = 'tone-menu';
  menu.setAttribute('role', 'group');
  menu.setAttribute('aria-label', `${traditionalName} 膚色變體`);
  const choices = [item, ...(toneVariantsByBase.get(emoji) || [])];
  const seen = new Set();
  for (const choice of choices) {
    const variantEmoji = choice[0];
    if (seen.has(variantEmoji)) continue;
    seen.add(variantEmoji);
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'tone-option';
    option.textContent = variantEmoji;
    option.setAttribute('aria-label', `複製 ${variantEmoji} ${choice[3]} ${choice[1]}`);
    option.title = `${choice[3]} · ${choice[1]}`;
    option.addEventListener('click', () => {
      closeToneMenu();
      copyEmoji(variantEmoji);
    });
    menu.append(option);
  }
  document.body.append(menu);
  const rect = trigger.getBoundingClientRect();
  const left = Math.max(8, Math.min(window.innerWidth - menu.offsetWidth - 8, rect.left + rect.width / 2 - menu.offsetWidth / 2));
  let top = rect.bottom + 5;
  if (top + menu.offsetHeight > window.innerHeight - 8) top = Math.max(8, rect.top - menu.offsetHeight - 5);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  trigger.setAttribute('aria-expanded', 'true');
  activeToneMenu = menu;
  activeToneTrigger = trigger;
  menu.querySelector('button')?.focus();
}
function renderEmojiTile(item, category, withTonePicker = false) {
  const { emoji, englishName, simplifiedName, traditionalName } = emojiInfo(item);
  const cell = document.createElement('div');
  cell.className = 'emoji-cell';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'emoji-tile';
  button.textContent = emoji;
  button.setAttribute('aria-label', `複製 ${emoji} ${traditionalName} ${englishName}`);
  button.title = `${traditionalName} · ${englishName}`;
  button.dataset.category = category.id;
  button.addEventListener('click', () => copyEmoji(emoji));
  cell.append(button);
  if (withTonePicker && toneVariantsByBase.has(emoji)) {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'tone-trigger';
    trigger.textContent = '◐';
    trigger.setAttribute('aria-label', `選擇 ${traditionalName} 膚色變體`);
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.title = `膚色變體：${traditionalName} · ${englishName}`;
    trigger.addEventListener('click', () => openToneMenu(trigger, item, category));
    cell.append(trigger);
  }
  return cell;
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
    const matches = category.baseItems.filter(item => !query || searchIndex.get(item).includes(query));
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
    grid.append(...matches.map(item => renderEmojiTile(item, category, true)));
    section.append(heading, grid);
    groupsRoot.append(section);
  }
  libraryTitle.textContent = query ? '搜尋結果' : activeCategory === 'all' ? '全部表情' : categories.find(category => category.id === activeCategory)?.label || '全部表情';
  resultCount.textContent = `${total} 個 emoji`;
  emptyState.hidden = total !== 0;
  clearSearch.hidden = !search.value;
}
document.addEventListener('pointerdown', event => {
  if (activeToneMenu && !activeToneMenu.contains(event.target) && !activeToneTrigger?.contains(event.target)) closeToneMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeToneMenu) closeToneMenu(true);
});
window.addEventListener('resize', () => closeToneMenu());
window.addEventListener('scroll', () => closeToneMenu(), true);
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
search.addEventListener('input', () => {
  activeCategory = search.value.trim() ? 'all' : 'smileys';
  closeToneMenu();
  makeTabs();
  renderLibrary();
});
clearSearch.addEventListener('click', () => {
  search.value = '';
  activeCategory = 'smileys';
  closeToneMenu();
  makeTabs();
  renderLibrary();
  search.focus();
});
document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => {
  search.value = button.dataset.query;
  activeCategory = 'all';
  closeToneMenu();
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
    buildSearchIndex();
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
