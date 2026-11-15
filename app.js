const RECENT_KEY = 'emoji-picker-recent-v1';
const recentLimit = 10;
const search = document.querySelector('#search-input');
const clearSearch = document.querySelector('.clear-search');
const groupsRoot = document.querySelector('#emoji-groups');
const recentRoot = document.querySelector('#recent-list');
const recentEmpty = document.querySelector('#recent-empty');
const clearRecent = document.querySelector('#clear-recent');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const toast = document.querySelector('#toast');
let sourceGroups = {};
let recent = readRecent();
let toastTimer;

// Common conversion pairs keep Chinese search local, lightweight and offline.
const variants = [
  ['這','这'],['為','为'],['裏','里'],['發','发'],['後','后'],['臺','台'],['萬','万'],['與','与'],['東','东'],['絲','丝'],['並','并'],['書','书'],['買','买'],['爭','争'],['雲','云'],['亞','亚'],['產','产'],['親','亲'],['億','亿'],['從','从'],['們','们'],['價','价'],['眾','众'],['優','优'],['會','会'],['傳','传'],['傷','伤'],['體','体'],['餘','余'],['側','侧'],['偵','侦'],['樂','乐'],['償','偿'],['兒','儿'],['兌','兑'],['黨','党'],['關','关'],['興','兴'],['養','养'],['獸','兽'],['內','内'],['冊','册'],['寫','写'],['軍','军'],['農','农'],['沖','冲'],['決','决'],['況','况'],['凍','冻'],['淨','净'],['涼','凉'],['減','减'],['幾','几'],['鳳','凤'],['擊','击'],['劃','划'],['劉','刘'],['創','创'],['別','别'],['製','制'],['劇','剧'],['勸','劝'],['辦','办'],['動','动'],['勞','劳'],['華','华'],['協','协'],['單','单'],['賣','卖'],['衛','卫'],['歷','历'],['壓','压'],['縣','县'],['參','参'],['雙','双'],['變','变'],['號','号'],['嘆','叹'],['聽','听'],['嗎','吗'],['啟','启'],['員','员'],['嗚','呜'],['響','响'],['團','团'],['圖','图'],['圓','圆'],['場','场'],['壞','坏'],['塊','块'],['堅','坚'],['壇','坛'],['牆','墙'],['聲','声'],['處','处'],['備','备'],['復','复'],['頭','头'],['夾','夹'],['奪','夺'],['奮','奋'],['婦','妇'],['媽','妈'],['學','学'],['寧','宁'],['寶','宝'],['實','实'],['對','对'],['導','导'],['將','将'],['塵','尘'],['層','层'],['歲','岁'],['島','岛'],['嶺','岭'],['幣','币'],['師','师'],['帶','带'],['幫','帮'],['廣','广'],['莊','庄'],['慶','庆'],['庫','库'],['應','应'],['開','开'],['張','张'],['彎','弯'],['強','强'],['歸','归'],['當','当'],['徑','径'],['憶','忆'],['憂','忧'],['總','总'],['戀','恋'],['惡','恶'],['惱','恼'],['驚','惊'],['慘','惨'],['戶','户'],['撲','扑'],['掃','扫'],['揚','扬'],['擾','扰'],['搶','抢'],['護','护'],['報','报'],['擔','担'],['擬','拟'],['擁','拥'],['擇','择'],['揮','挥'],['換','换'],['據','据'],['攜','携'],['數','数'],['斷','断'],['無','无'],['時','时'],['顯','显'],['曉','晓'],['暈','晕'],['機','机'],['殺','杀'],['權','权'],['來','来'],['樣','样'],['歡','欢'],['殘','残'],['氣','气'],['漢','汉'],['湯','汤'],['沒','没'],['澤','泽'],['潔','洁'],['濃','浓'],['漸','渐'],['溫','温'],['灣','湾'],['濕','湿'],['滿','满'],['滅','灭'],['燈','灯'],['靈','灵'],['愛','爱'],['狀','状'],['獨','独'],['現','现'],['電','电'],['畫','画'],['療','疗'],['皺','皱'],['鹽','盐'],['著','着'],['禮','礼'],['稱','称'],['穩','稳'],['筆','笔'],['簡','简'],['類','类'],['緊','紧'],['線','线'],['組','组'],['經','经'],['結','结'],['給','给'],['絕','绝'],['繼','继'],['續','续'],['網','网'],['聯','联'],['腦','脑'],['腳','脚'],['臉','脸'],['見','见'],['觀','观'],['視','视'],['覺','觉'],['計','计'],['認','认'],['讓','让'],['記','记'],['說','说'],['請','请'],['讀','读'],['誰','谁'],['調','调'],['談','谈'],['貝','贝'],['負','负'],['財','财'],['責','责'],['賢','贤'],['敗','败'],['貨','货'],['質','质'],['貪','贪'],['貧','贫'],['購','购'],['貴','贵'],['費','费'],['賊','贼'],['資','资'],['賭','赌'],['賞','赏'],['賠','赔'],['賴','赖'],['賺','赚'],['賽','赛'],['贊','赞'],['長','长'],['門','门'],['問','问'],['間','间'],['陽','阳'],['陰','阴'],['隊','队'],['險','险'],['隨','随'],['難','难'],['靜','静'],['風','风'],['飛','飞'],['飯','饭'],['飲','饮'],['飽','饱'],['餓','饿'],['馬','马'],['驅','驱'],['魚','鱼'],['鳥','鸟'],['雞','鸡'],['龍','龙'],['龜','龟']
];
const toSimplified = new Map(variants);
const toTraditional = new Map(variants.map(([traditional, simplified]) => [simplified, traditional]));

const vocab = [
  { tag: 'happy', terms: 'happy happiness joy joyful smile smiling 开心 開心 快乐 快樂 高兴 高興 笑 微笑 赞 讚 好耶 cute 可爱 可愛' },
  { tag: 'sad', terms: 'sad sadness cry crying tears 哭 哭泣 難過 难过 伤心 傷心 嗚嗚 呜呜' },
  { tag: 'angry', terms: 'angry anger mad annoyed 生氣 生气 愤怒 憤怒 火大 討厭 讨厌' },
  { tag: 'surprised', terms: 'surprised surprise shocked shock 驚訝 惊讶 震驚 震惊 什麼 什么 蛤' },
  { tag: 'love', terms: 'love heart lovely affection 愛 愛心 爱 心動 心动 喜歡 喜欢' },
  { tag: 'shy', terms: 'shy embarrassed blush blushing 害羞 臉紅 脸红 不好意思' },
  { tag: 'sleepy', terms: 'sleepy sleep tired 困 累 睡覺 睡觉' },
  { tag: 'greeting', terms: 'hello hi wave greeting 嗨 哈囉 哈喽 揮手 挥手 打招呼' },
  { tag: 'action', terms: 'action hit fight dance run 走起 衝 冲 打 擊 击 揍' },
  { tag: 'confused', terms: 'confused confusion awkward 困惑 尷尬 尴尬 無語 无语' }
];
function normalize(value) {
  return [...String(value).toLocaleLowerCase()]
    .map(char => toSimplified.get(toTraditional.get(char) || char) || char)
    .join('').normalize('NFKC').trim();
}
function readRecent() {
  try {
    const saved = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(item => typeof item === 'string').slice(0, recentLimit) : [];
  } catch { return []; }
}
function tagsFor(emoji) {
  const checks = {
    happy: /[∀ω◕‿︶]|￣∇/u, sad: /TдT|つд⊂|ﾉд`|;´д`|つд`/u,
    angry: /╬|`д´|`ε´|`ヮ´|`ー´/u, surprised: /ﾟДﾟ|Σ|☉|⊙|ﾟ ﾟ/u,
    love: /[♡♥]|〃∀|∀〃/u, shy: /〃|ゝ∀/u, sleepy: /-д-|´ρ`|ρω/u,
    greeting: /[ノﾉ]/u, action: /☆ミ|☆彡/u, confused: /[？?]/u
  };
  return Object.entries(checks).filter(([, pattern]) => pattern.test(emoji)).map(([tag]) => tag);
}
function searchableText(emoji, groupName) {
  const tags = tagsFor(emoji);
  const matchingTerms = vocab.filter(entry => tags.includes(entry.tag)).map(entry => entry.terms);
  return normalize(`${emoji} ${groupName} A island kaomoji emoticon ${matchingTerms.join(' ')}`);
}
function renderEmojiTile(emoji) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'emoji-tile';
  button.textContent = emoji;
  button.setAttribute('aria-label', `複製 ${emoji}`);
  button.title = '點一下複製';
  button.addEventListener('click', () => copyEmoji(emoji));
  return button;
}
function renderRecent() {
  recentRoot.replaceChildren(...recent.map(renderEmojiTile));
  const hasItems = recent.length > 0;
  recentEmpty.hidden = hasItems;
  clearRecent.hidden = !hasItems;
}
function renderLibrary() {
  const query = normalize(search.value);
  groupsRoot.replaceChildren();
  let total = 0;
  for (const [name, list] of Object.entries(sourceGroups)) {
    const matches = list.filter(emoji => !query || searchableText(emoji, name).includes(query));
    if (!matches.length) continue;
    total += matches.length;
    const section = document.createElement('section');
    section.className = 'group-section';
    const heading = document.createElement('h3');
    heading.className = 'group-title';
    heading.append(document.createTextNode(name));
    const count = document.createElement('small');
    count.textContent = `${matches.length} 個`;
    heading.append(count);
    const grid = document.createElement('div');
    grid.className = 'emoji-grid';
    grid.setAttribute('aria-label', `${name} 顏文字`);
    grid.append(...matches.map(renderEmojiTile));
    section.append(heading, grid);
    groupsRoot.append(section);
  }
  resultCount.textContent = query ? `找到 ${total} 個` : `共 ${total} 個`;
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
    recent = [emoji, ...recent.filter(item => item !== emoji)].slice(0, recentLimit);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
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
  renderLibrary();
  document.querySelector('#library-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
}));
clearRecent.addEventListener('click', () => {
  recent = [];
  localStorage.removeItem(RECENT_KEY);
  renderRecent();
});
fetch('./kaomoji.json')
  .then(response => { if (!response.ok) throw new Error('data unavailable'); return response.json(); })
  .then(data => {
    sourceGroups = data && typeof data === 'object' ? data : {};
    renderRecent();
    renderLibrary();
  })
  .catch(() => {
    renderRecent();
    resultCount.textContent = '暫時無法載入';
    emptyState.hidden = false;
    emptyState.querySelector('p').textContent = '顏文字清單無法載入';
    emptyState.querySelector('span:last-child').textContent = '請重新整理頁面後再試一次。';
  });
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}
