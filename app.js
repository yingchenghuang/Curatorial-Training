const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const BLUE = '#003dff';
const INK = '#111';
const LINE = '#b9b8b5';
const STORAGE_KEY = 'raum-curatorial-training-v2';

const seedRecords = [
  ['27','08.14','退潮之後','After the Tide','基隆西二倉庫','檔案／水位／缺席',21,'ⓐ','深挖'],
  ['26','08.11','共同耕地','Common Ground','桃園','第一拍完成．待判斷',null,'','待判斷'],
  ['25','08.06','白盒子裡的雨','Rain in the White Cube','台北','三題皆否．只留第一拍',null,'□','不轉化'],
  ['24','07.28','邊界測量所','Border Survey','新竹','測量／權限／身體',23,'ⓑ','深挖'],
  ['23','07.19','夜間巡邏','Night Patrol','台中','光／勞動',12,'□','不轉化'],
  ['22','07.11','第二層皮膚','Second Skin','台北','材料／照護',19,'ⓒ','已轉化'],
  ['21','06.30','拆除前的房間','Before Demolition','高雄','記憶／拆遷',21,'ⓐ','已轉化'],
  ['20','06.22','無人稱的島','Impersonal Island','台南','敘事／代言',14,'ⓔ','已轉化'],
  ['19','06.15','回聲的公尺數','Meters of Echo','台北','聲音／距離',20,'ⓓ','深挖'],
  ['18','06.01','未完成的地圖','Unfinished Map','基隆','邊界／航線',18,'ⓐ','已轉化'],
  ['17','05.24','替代的河流','A Substitute River','新北','水系／建設',15,'ⓐ','不轉化'],
  ['16','05.16','沒有門牌的家','Homes Without Numbers','台北','居住／行政',20,'ⓑ','深挖'],
  ['15','05.03','緩慢的工地','The Slow Site','台中','施工／時間',13,'□','不轉化'],
  ['14','04.27','我們借來的光','Borrowed Light','新竹','能源／共享',16,'ⓒ','已轉化'],
  ['13','04.18','一公分的海','One Centimeter of Sea','高雄','尺度／海岸',23,'ⓐ','深挖'],
  ['12','04.06','檔案尚未抵達','Archive in Transit','台北','物流／記憶',11,'□','不轉化'],
  ['11','03.29','通往背面的路','The Way Behind','台南','動線／背面',17,'ⓒ','已轉化'],
  ['10','03.20','公園裡的第五面牆','The Fifth Wall','桃園','公共性／觀看',14,'ⓐ','不轉化'],
  ['09','03.12','雨季之前','Before Rainy Season','台北','氣候／準備',21,'ⓓ','已轉化'],
  ['08','03.02','暫存城市','Cached City','新北','暫時／治理',12,'□','不轉化'],
  ['07','02.23','水平線以下','Below Horizon','基隆','港口／勞動',19,'ⓐ','深挖'],
  ['06','02.16','白天關閉的窗','Windows Closed by Day','台北','展示／遮蔽',15,'ⓑ','不轉化'],
  ['05','02.09','三種等待','Three Ways to Wait','台中','時間／身體',20,'ⓓ','已轉化'],
  ['04','01.31','沒有中心的圓','A Circle Without Center','高雄','聚集／秩序',18,'ⓒ','已轉化'],
  ['03','01.22','地方的複數','Places, Plural','台南','地方／命名',21,'ⓐ','深挖'],
  ['02','01.13','借景','Borrowed View','新竹','景觀／權力',17,'ⓑ','已轉化'],
  ['01','01.04','觀看練習之一','Seeing Exercise I','台北','觀看／位置',14,'□','不轉化'],
].map(([no,date,name,en,place,keywords,score,outlet,status]) => ({no,date,name,en,place,keywords,score,outlet,status}));

const principles = [
  {no:'01',ver:'V3',q:'我相信一個好展覽首先要做到什麼？',a:'讓人在還沒讀任何文字之前，就已經站在一個問題裡面。',history:[['v2 · 11','提出一個清楚的、可以被辯論的命題。'],['v1 · 01','把好作品放在一起。']]},
  {no:'02',ver:'V3',q:'我最不能接受的策展習慣？',a:'用論述替作品收尾。作品還沒說完，文字先給了答案。',history:[['v2 · 11','過度學術化的展場文字。'],['v1 · 01','作品只是論述的插圖。']]},
  {no:'03',ver:'V3',q:'我如何判斷作品之間真的產生關係？',a:'拿掉其中一件，另一件會變笨。',history:[['v2 · 11','兩件放在一起後多出第三種意義。'],['v1 · 01','主題接近就算有關係。']]},
  {no:'04',ver:'V2',q:'觀眾應該擁有多少自由？',a:'可以自己決定順序，但不能自己決定要不要面對那個問題。',history:[['v1 · 01','越自由越好。']]},
  {no:'05',ver:'V3',q:'策展人的權力應該用在哪裡？',a:'用在決定誰進來，不是用在決定觀眾怎麼想。',history:[['v2 · 11','用在建立作品之間的關係。'],['v1 · 01','越克制越好。']]},
  {no:'06',ver:'V3',q:'我希望自己的策展最終改變什麼？',a:'讓一個地方被重新看見，而且在展覽結束後還繼續被那樣看。',history:[['v2 · 11','讓觀眾對某個議題有新的理解。'],['v1 · 01','讓更多人來看展。']]},
];

const detailFields = [
  ['01','三十秒否決','FILTER','通過兩題 — 並置讓我停超過三十秒，策展假設想反駁。空間決策不算新。'],
  ['02','第一眼','FIRST SIGHT','倉庫盡頭那道被封起來的門，光從縫裡漏出來。'],
  ['03','一組並置','JUXTAPOSITION','《潮線》錄像 ↔ 對面牆的《船籍登記簿》。第二跨距，相距七公尺。錄像裡的水位變成名冊的時間軸；兩件單看都只是檔案，並置後變成「誰被記錄下來」。'],
  ['04','一句話命題','THESIS','當一個港口的紀錄比它的人更長壽，記錄本身算不算一種驅逐？'],
  ['05','最大失敗','FAILURE','假設觀眾會逆著動線讀完名冊。實際上九成的人看了三頁就走。'],
  ['06','策展手術','RE-CURATE','刪掉入口 800 字論述；把名冊移到入口正對面成為第一件作品；給《潮線》多三公尺退距；環境音壓三成。'],
];

const totals = [14,17,11,19,13,21,9,16,22,12,15,18,10,20,13,16,23,11,17,14,21,12,19,15,20,18,21];
const trendSeries = {命題:[3,3,4,4,4,5,4,5,5],並置:[4,3,4,4,3,4,4,4,4],空間:[4,4,3,4,4,3,4,4,4],場域:[3,3,3,4,4,4,4,5,5],倫理:[4,4,3,3,3,3,2,3,3]};
const deltas = {命題:'+0.7',並置:'+0.1',空間:'±0.0',場域:'+0.9',倫理:'−0.8'};

const state = {
  route: location.hash.slice(1) || 'today', filter:'全部', indexMode:'mine', scale:25,
  openField:2, openPrinciple:0, activeBar:26, activeTrend:'倫理', destination:'Notion', scope:'只深挖',
  records: loadRecords(), selected:'27', count:0,
};

function loadRecords(){
  try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(saved) ? [...saved, ...seedRecords] : seedRecords; }
  catch { return seedRecords; }
}
function saveUserRecords(){
  const custom = state.records.filter(record => record.custom);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(custom));
}
function escapeHTML(value=''){ return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }
function routeTo(route){ state.route = route; location.hash = route; render(); scrollTo({top:0,behavior:'smooth'}); }
function toast(message){ const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2300); }
function iconLabel(status){ return status === '待判斷' ? '—' : status === '不轉化' ? '□' : status; }

function pageHead(kicker,title,sub=''){
  return `<header class="page-head"><div class="kicker">${kicker}</div><h1 class="display">${title}</h1>${sub?`<p class="subhead">${sub}</p>`:''}</header>`;
}

function screenBar(left,right,leftRoute='today'){
  return `<div class="screen-bar"><button data-route="${leftRoute}">${left}</button><span>${right}</span></div>`;
}

function todayPage(){
  const filters=['全部','待判斷','深挖','已轉化'];
  const rows=state.records.filter(r=>state.filter==='全部'||r.status===state.filter).slice(0,5);
  return `<section class="page"><div class="screen-bar"><button class="screen-brand" data-route="today"><i></i>RAUM+ / 策展思維</button><a href="https://raumlaboratory.com/" target="_blank" rel="noreferrer">作品網站 ↗</a></div>
    <div class="hero">
      <div><img class="hero-logo" src="assets/raum-lab-logo.png" alt="RAUM+ 藝術與開放空間實驗室"></div>
      <div class="hero-meta">黃英誠的策展判斷系統<br>Eason Huang’s Curatorial Field System</div>
      <div class="hero-copy"><h1 class="display">策展思維</h1><p class="subhead">看得少，判斷得清楚。</p>
        <div class="count"><strong id="exhibitionCount">${String(state.count).padStart(2,'0')}</strong> EXHIBITIONS <i>/</i> <strong>03</strong> PENDING</div>
        <div class="calibration-strip"><span>THREE TEMPOS</span><button data-route="drift">CALIB / 25</button><button data-route="principles">PRINCIPLES v3</button></div>
      </div>
    </div>
    <div class="section"><div class="filters">${filters.map(f=>`<button class="filter ${state.filter===f?'active':''}" data-filter="${f}">${f}</button>`).join('')}</div>
      <div class="status">SHOWING ${rows.length} OF ${state.records.length} — ${state.filter==='全部'?'平均 16.4 / 25':'篩選：'+state.filter}</div>
      <div class="section-head"><h2>LATEST NOTES <small>最新紀錄</small></h2><button data-route="index">VIEW ALL →</button></div>
      <div>${rows.map(recordRow).join('')}</div>
    </div>
    <div class="marquee"><div class="marquee-inner">${Array(2).fill('<span>★ 值得偷學</span><span>× 結構性失敗</span><span>→ 動線</span><span>↔ 作品對話</span><span>○ 停留點</span><span>! 意外</span><span>? 待查證</span><span>∆ 可轉化</span>').join('')}</div></div>
    <div class="center-action"><button class="outline-button" data-new-entry>新一場觀看 ↓</button></div>
  </section>`;
}

function recordRow(r){
  return `<button class="record-row" data-record="${escapeHTML(r.no)}"><span class="no">${escapeHTML(r.no)}</span><span><strong>${escapeHTML(r.name)}</strong><em>${escapeHTML(r.keywords)}</em></span><span class="score">${r.score ?? '—'}</span></button>`;
}

function detailPage(){
  const r=state.records.find(x=>x.no===state.selected)||state.records[0];
  const dimensions = state.scale===25 ? [['命題',5],['並置',4],['空間',4],['場域',5],['倫理',3]] : [['命題',9],['作品選擇',7],['作品關係',8],['空間',8],['節奏',6],['場域',9],['研究',7],['公共性',6],['倫理',5],['觀眾',5]];
  const max=state.scale===25?5:10;
  return `<section class="page">${screenBar('← 年度索引',`${escapeHTML(r.no)} / ${state.records.length}`,'index')}
    <div class="detail-layout"><header class="detail-head"><div class="detail-no">NO. ${escapeHTML(r.no)} / ${escapeHTML(r.outlet||'待判斷')}</div><h1>${escapeHTML(r.name)}</h1><em>${escapeHTML(r.en||'Field Note')}</em><div class="detail-meta">${escapeHTML(r.place)} · 2026.${escapeHTML(r.date)} · 74′</div></header>
      <div class="score-panel"><div class="score-toolbar"><span class="detail-no">${state.scale===25?'五維':'十維'}校準 / CALIBRATION</span><div class="segmented"><button data-scale="25" class="${state.scale===25?'active':''}">/25</button><button data-scale="100" class="${state.scale===100?'active':''}">/100</button></div></div>
        <div class="score-total"><strong>${state.scale===25?(r.score??'—'):r.score?Math.round(r.score/25*100):'—'}</strong><span>/ ${state.scale}</span><em>${r.score?'通過兩題．深挖名單':'尚待校準'}</em></div>
        ${dimensions.map(([name,value])=>`<div class="dimension ${value/max>=.9?'best':''}"><span>${name}</span><div class="meter"><i style="width:${value/max*100}%"></i></div><small>${value} / ${max}</small></div>`).join('')}
      </div>
      <div class="accordions">${detailFields.map((field,i)=>`<article class="accordion ${state.openField===i?'active':''}" data-field="${i}"><span class="no">${field[0]}</span><div><div class="accordion-head"><h3>${field[1]}</h3><small>${field[2]}</small></div>${state.openField===i?`<p>${field[3]}</p>`:''}</div></article>`).join('')}</div>
    </div><aside class="quote"><small>ONE LINE TO KEEP IT / 一句話收藏</small><p>一份比人活得更久的名冊，最後把人擠出了自己的港口。</p></aside></section>`;
}

function indexPage(){
  const rows=state.records.slice(0,12);
  return `<section class="page"><div class="screen-bar"><strong>年度索引</strong><span class="screen-status" id="offlineState">${navigator.onLine?'本機優先':'離線 · 本機'}</span></div>
    <div class="catalog-tools"><button data-index-mode="mine" class="${state.indexMode==='mine'?'active':''}">我的 ${state.records.length} 場</button><button data-index-mode="class" class="${state.indexMode==='class'?'active':''}">班級 · 14 人</button></div>
    ${state.indexMode==='mine'?`<div class="catalog"><div class="catalog-heading"><span>NO.</span><span>日期</span><span>展覽 / EXHIBITION</span><span>狀態</span><span>/25</span></div>${rows.map(r=>`<div class="catalog-row" data-record="${r.no}" tabindex="0"><span>${r.no}</span><span>${r.date}</span><div><strong>${escapeHTML(r.name)}</strong><br><em>${escapeHTML(r.keywords)}</em></div><span>${iconLabel(r.status)}</span><span>${r.score??'—'}</span></div>`).join('')}</div>`:classIndex()}
    <div class="pending"><h3>PENDING · 第一拍完成，還沒離場</h3><div class="pending-row"><div><strong>共同耕地</strong><small>桃園 · 08.11 · 差 3 天</small></div><button class="outline-button" data-record="26">寫離場</button></div><div class="pending-row"><div><strong>夜色施工中</strong><small>台中 · 08.09 · 差 5 天</small></div><button class="outline-button" data-new-entry>繼續記錄</button></div></div>
  </section>`;
}

function classIndex(){
  const klass=[['—','班級','英誠訓練 · 14 人','本期平均 15.8 ／ 你 17.2','15.8'],['A','08.14','退潮之後','11 人已寫 · 分數散佈 9–23','16.4'],['B','08.11','共同耕地','4 人卡在第二拍','—'],['C','07.28','邊界測量所','全班最高共識 · 空間維度','20.1'],['D','07.19','夜間巡邏','分歧最大 · 倫理維度差 3.4','13.2']];
  return `<div class="catalog"><div class="catalog-heading"><span>ID</span><span>日期</span><span>班級訊號 / CLASS SIGNAL</span><span>狀態</span><span>/25</span></div>${klass.map((r,i)=>`<div class="catalog-row"><span>${r[0]}</span><span>${r[1]}</span><div><strong>${r[2]}</strong><br><em>${r[3]}</em></div><span>${i===0?'概要':'ⓐ'}</span><span>${r[4]}</span></div>`).join('')}</div>`;
}

function principlesPage(){
  return `<section class="page">${screenBar('← 今日','VERSION 3')}${pageHead('OPERATING PRINCIPLES / 我的策展原則','策展原則')}
    <div class="principles"><div class="progress-copy"><strong>7</strong> OF 10 EXHIBITIONS<br>每十場強制改寫一次，舊版本不刪除</div><div class="progress"><i></i></div>
      <div class="catalog-heading" style="margin-top:22px"><span>NO.</span><span></span><span>原則 / PRINCIPLE</span><span></span><span>版本</span></div>
      ${principles.map((p,i)=>`<article class="principle ${state.openPrinciple===i?'active':''}" data-principle="${i}"><span class="no">${p.no}</span><div><div class="answer">${p.a}</div>${state.openPrinciple===i?`<div class="history"><p class="question">${p.q}</p>${p.history.map(h=>`<div class="history-row"><span>${h[0]}</span><em>${h[1]}</em></div>`).join('')}</div>`:''}</div><span class="version">${p.ver}</span></article>`).join('')}
    </div><div class="center-action"><button class="outline-button" disabled>開始 v4 改寫 · 還差 3 場</button></div></section>`;
}

function driftPage(){
  const trend=trendSeries[state.activeTrend];
  const names=['白盒子裡的雨','共同耕地','邊界測量所','退潮之後'];
  const activeText=`NO.${String(state.activeBar+1).padStart(2,'0')} · ${state.activeBar===26?'退潮之後':names[state.activeBar%4]} · ${totals[state.activeBar]}/25`;
  const outlets=[['ⓐ 公共藝術',7,BLUE],['ⓑ 策展',5,'#3a63ff'],['ⓒ 空間',4,INK],['ⓓ 教學',3,'#6b6b6b'],['ⓔ 書寫',2,'#9a9a9a'],['不轉化',6,'#dcdbd8']];
  return `<section class="page">${screenBar('← 今日','2026')}${pageHead('JUDGEMENT DRIFT / 判斷軌跡','判斷軌跡')}
    <div class="chart-section"><div class="chart-caption"><span>TOTAL / 25 · 27 EXHIBITIONS</span><output>${activeText}</output></div><div class="bar-chart">${totals.map((v,i)=>`<button aria-label="第 ${i+1} 場：${v} 分" data-bar="${i}" class="${v>=20?'high':''} ${state.activeBar===i?'active':''}" style="height:${v/25*100}%"></button>`).join('')}</div><div class="chart-axis"><span>01</span><span>MEAN 16.4</span><span>27</span></div></div>
    <div class="chart-section"><div class="chart-caption"><span>FIVE DIMENSIONS · 前 13 場 → 後 14 場</span></div>${Object.keys(trendSeries).map(name=>trendRow(name,trendSeries[name])).join('')}<p class="chart-note">${state.activeTrend==='倫理'?'倫理是唯一往下走的維度。不是展覽變差，是你開始問「誰被消失」，尺度自己變嚴格了。':state.activeTrend+'在後半段上升。看得少但問得深，這一維通常最早反映出來。'}</p></div>
    <div class="chart-section"><div class="chart-caption"><span>OUTLETS · 27 場的去處</span></div><div class="outlet-bar">${outlets.map(o=>`<i style="width:${o[1]/27*100}%;background:${o[2]}"></i>`).join('')}</div><div class="legend">${outlets.map(o=>`<span style="--c:${o[2]}">${o[0]} ${o[1]}</span>`).join('')}</div></div>
    <div class="chart-section" style="margin-bottom:48px"><div class="chart-caption"><span>30-SECOND FILTER · 稀有性</span></div><div class="rarity">${[['11','三題皆否\n只留第一拍'],['8','通過一題\n當天寫完'],['5','通過兩題\n深挖名單'],['3','通過三題\n設計實驗']].map(x=>`<div><strong>${x[0]}</strong><small>${x[1]}</small></div>`).join('')}</div><p class="chart-note">六場誠實留白。填充物會稀釋資料庫，讓真正的訊號變難找。</p></div>
  </section>`;
}

function trendRow(name, values){
  const points=values.map((v,i)=>`${i*20},${24-(v-1)/4*20}`).join(' ');
  return `<div class="trend-row ${state.activeTrend===name?'active':''}" data-trend="${name}"><span>${name}</span><svg class="sparkline" viewBox="0 0 160 24" preserveAspectRatio="none"><polyline points="${points}" fill="none" stroke="currentColor" stroke-width="${state.activeTrend===name?2:1}"/></svg><output>${deltas[name]}</output></div>`;
}

const destinationData={
  Notion:{sub:'策展資料庫 · 每場一列',status:'欄位範本\n可下載',note:'下載 CSV 後可直接匯入 Notion 資料庫。App 不會在背景上傳你的觀看紀錄。',map:[['展覽名稱','NAME · TITLE'],['日期／停留','DATE'],['五維總分','SCORE · NUMBER /25'],['出海口','OUTLET · SELECT'],['一句話命題','THESIS · TEXT'],['一組並置','JUXTAPOSITION · TEXT']]},
  備忘錄:{sub:'Apple Notes · 每場一則',status:'本機\n離線可寫',note:'備忘錄是離線的那一份。下載純文字後，用分享選單加入備忘錄。',map:[['資料夾','策展觀看 / 2026'],['標題','展覽名稱 ｜ 21/25'],['第一行','一句話收藏'],['正文段落','命題 · 並置 · 失敗 · 手術'],['附註列','地點 · 日期 · 出海口']]},
  Markdown:{sub:'.md 單場全文',status:'檔案\n可分享',note:'單場全文，適合貼進課程講義或提案附錄。',map:[['檔名','2026-08-14-退潮之後.md'],['H1','展覽名稱'],['Front matter','score / outlet / site'],['H2 區塊','命題 · 並置 · 失敗 · 手術'],['引用','> 一句話收藏']]},
  CSV:{sub:'年度索引 27 列',status:'檔案\n可分享',note:'只帶索引與分數，用來看判斷軌跡，不帶內文。',map:[['第 1 欄','NO.'],['第 2 欄','DATE'],['第 3 欄','EXHIBITION'],['第 4 欄','CITY'],['第 5 欄','TOTAL /25'],['第 6 欄','OUTLET']]},
};

function exportPage(){
  const current=destinationData[state.destination];
  const count=state.scope==='全部'?state.records.length:state.scope==='只深挖'?state.records.filter(r=>r.status==='深挖').length:4;
  return `<section class="page">${screenBar('← 今日','第三拍 · 30 MIN')}${pageHead('TRANSFER / 把方法推出去','匯出','紀錄的價值在於能被叫出來。')}
    <div class="export-grid"><div class="destinations">${Object.entries(destinationData).map(([name,d])=>`<button class="destination ${state.destination===name?'active':''}" data-destination="${name}"><span><strong>${name}</strong><em>${d.sub}</em></span><small>${d.status}</small></button>`).join('')}</div>
      <div class="mapping"><h2>欄位對映 / ${state.destination.toUpperCase()} MAPPING</h2>${current.map.map(m=>`<div class="map-row"><span>${m[0]}</span><b>→</b><code>${m[1]}</code></div>`).join('')}<p class="chart-note">${current.note}</p></div></div>
    <div class="export-foot"><div class="status">匯出範圍 / SCOPE</div><div class="filters">${['全部','只深挖','本月'].map(s=>`<button class="filter ${state.scope===s?'active':''}" data-scope="${s}">${s}</button>`).join('')}</div><button class="primary-button export-button" data-download><span>下載 ${count} 筆 · ${state.destination}</span><span>↓</span></button><div class="export-note">LOCAL FIRST — 下載只讀取這台裝置的資料，不會上傳。</div></div>
  </section>`;
}

function render(){
  const valid=['today','detail','index','principles','drift','export'];
  if(!valid.includes(state.route)) state.route='today';
  const pages={today:todayPage,detail:detailPage,index:indexPage,principles:principlesPage,drift:driftPage,export:exportPage};
  $('#app').innerHTML=pages[state.route]();
  $$('.bottom-nav button').forEach(button=>{ const route=button.dataset.route; button.toggleAttribute('aria-current', route===state.route || (state.route==='detail'&&route==='index') || (state.route==='drift'&&route==='today')); if(button.hasAttribute('aria-current')) button.setAttribute('aria-current','page'); });
}

function downloadExport(){
  let records=state.records;
  if(state.scope==='只深挖') records=records.filter(r=>r.status==='深挖');
  if(state.scope==='本月') records=records.slice(0,4);
  let content,type,ext;
  if(['CSV','Notion'].includes(state.destination)){
    content='\ufeffNO.,DATE,EXHIBITION,CITY,SCORE,OUTLET,STATUS\n'+records.map(r=>[r.no,r.date,r.name,r.place,r.score??'',r.outlet,r.status].map(v=>`"${String(v??'').replaceAll('"','""')}"`).join(',')).join('\n'); type='text/csv'; ext='csv';
  } else if(state.destination==='Markdown'){
    content=records.map(r=>`# ${r.name}\n\n- 日期：2026.${r.date}\n- 地點：${r.place}\n- 分數：${r.score??'待判斷'} / 25\n- 出海口：${r.outlet||'留白'}\n\n> ${r.keywords}\n`).join('\n---\n\n'); type='text/markdown'; ext='md';
  } else {
    content=records.map(r=>`${r.name} ｜ ${r.score??'待判斷'}/25\n${r.place} · 2026.${r.date}\n${r.keywords}\n出海口：${r.outlet||'留白'}`).join('\n\n──────────\n\n'); type='text/plain'; ext='txt';
  }
  const url=URL.createObjectURL(new Blob([content],{type:`${type};charset=utf-8`}));
  const link=document.createElement('a'); link.href=url; link.download=`策展觀看-${new Date().toISOString().slice(0,10)}.${ext}`; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); toast(`已產生 ${records.length} 筆 ${state.destination} 檔案`);
}

document.addEventListener('click', event=>{
  const route=event.target.closest('[data-route]'); if(route){routeTo(route.dataset.route);return;}
  const filter=event.target.closest('[data-filter]'); if(filter){state.filter=filter.dataset.filter;render();return;}
  const record=event.target.closest('[data-record]'); if(record){state.selected=record.dataset.record;state.route='detail';location.hash='detail';render();scrollTo(0,0);return;}
  const scale=event.target.closest('[data-scale]'); if(scale){state.scale=Number(scale.dataset.scale);render();return;}
  const field=event.target.closest('[data-field]'); if(field){const i=Number(field.dataset.field);state.openField=state.openField===i?null:i;render();return;}
  const mode=event.target.closest('[data-index-mode]'); if(mode){state.indexMode=mode.dataset.indexMode;render();return;}
  const principle=event.target.closest('[data-principle]'); if(principle){const i=Number(principle.dataset.principle);state.openPrinciple=state.openPrinciple===i?null:i;render();return;}
  const bar=event.target.closest('[data-bar]'); if(bar){state.activeBar=Number(bar.dataset.bar);render();return;}
  const trend=event.target.closest('[data-trend]'); if(trend){state.activeTrend=trend.dataset.trend;render();return;}
  const destination=event.target.closest('[data-destination]'); if(destination){state.destination=destination.dataset.destination;render();return;}
  const scope=event.target.closest('[data-scope]'); if(scope){state.scope=scope.dataset.scope;render();return;}
  if(event.target.closest('[data-download]')){downloadExport();return;}
  if(event.target.closest('[data-new-entry]')){$('#entryDialog').showModal();}
});

$('#entryForm').addEventListener('submit', event=>{
  if(event.submitter?.value==='cancel') return;
  event.preventDefault(); const data=new FormData(event.currentTarget); const now=new Date(data.get('date')+'T12:00:00');
  const record={custom:true,no:`L${Date.now()}`,date:`${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`,name:data.get('name'),en:'Local Field Note',place:data.get('place')||'未填地點',keywords:data.get('firstSight')||data.get('mark'),score:null,outlet:'',status:'待判斷'};
  state.records.unshift(record); saveUserRecords(); event.currentTarget.reset(); $('#entryDialog').close(); state.filter='全部'; routeTo('today'); toast('已保存到這台裝置');
});

window.addEventListener('hashchange',()=>{state.route=location.hash.slice(1)||'today';render();});
window.addEventListener('online',updateNetwork); window.addEventListener('offline',updateNetwork);
function updateNetwork(){ const el=$('#offlineState'); if(el) el.textContent=navigator.onLine?'本機優先':'離線 · 本機'; }

if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(console.warn));
updateNetwork(); render();
const counter=setInterval(()=>{
  if(state.count>=27){clearInterval(counter);return;}
  state.count++;
  const countElement=$('#exhibitionCount');
  if(countElement) countElement.textContent=String(state.count).padStart(2,'0');
},42);
