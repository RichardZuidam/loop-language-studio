const STORAGE_KEY = 'loop-language-studio-v1';
const frequencyLists = (window.VI_FREQUENCY_LISTS || []).map((list, index) => ({
  id: `vi-frequency-${index + 1}`, title: list.title, from: 'Vietnamees', to: 'Nederlands',
  createdAt: Date.now() - index, lastScore: null,
  words: list.words.map(([front, back]) => ({ front, back })), source: list.source
}));
const starterSentencePacks = (window.LOOP_SENTENCE_PACKS || []).map(pack => ({
  ...pack, lastScore: null, sentences: pack.sentences.map(([vi,nl,literal,note])=>({vi,nl,literal,note,mastery:0}))
}));
const seed = {
  score: 0, bestStreak: 0, todayXp: 0, xpDate: new Date().toISOString().slice(0,10), dailyGoal: 50,
  activity: {}, activityMinutes:{}, studyMinutes:0, answered:0, skillStats:{},
  sentencePacks: starterSentencePacks,
  lists: [{
    id: 'vietnamese-starter', title: 'Vietnamees — Start', from: 'Vietnamees', to: 'Nederlands', createdAt: Date.now(), lastScore: null,
    words: [
      { front: 'xin chào', back: 'hallo' }, { front: 'cảm ơn', back: 'bedankt' },
      { front: 'tạm biệt', back: 'tot ziens' }, { front: 'vâng', back: 'ja' },
      { front: 'không', back: 'nee' }, { front: 'bạn khỏe không?', back: 'hoe gaat het met je?' }
    ]
  }]
};
const importPresets={
  'nl-es-50':{id:'nl-es-frequency-50',title:'50 meest gebruikte Nederlandse woorden',from:'Nederlands',to:'Spaans',createdAt:Date.now(),lastScore:null,source:'OpenSubtitles Nederlandse frequentielijst',words:[
    ['ik','yo'],['je','tú / te / tu'],['het','el / lo'],['de','el / la'],['dat','eso / que'],['is','es'],['een','un / una'],['niet','no'],['en','y'],['wat','qué / lo que'],
    ['van','de'],['we','nosotros'],['in','en'],['ze','ella / ellos'],['hij','él'],['op','en / sobre'],['te','a / para'],['zijn','ser / estar / su'],['er','allí / hay'],['maar','pero'],
    ['die','ese / esa / que'],['heb','tengo'],['me','me'],['met','con'],['voor','para / por'],['als','si / como'],['ben','soy / estoy'],['was','era / estaba / fue'],['dit','esto'],['mijn','mi'],
    ['om','para / alrededor de'],['aan','a / en'],['jij','tú'],['naar','a / hacia'],['dan','entonces / que'],['hier','aquí'],['weet','sé / sabe'],['kan','puedo / puede'],['geen','ningún / sin'],['nog','todavía / aún'],
    ['moet','debe / tengo que'],['wil','quiere / quiero'],['wel','sí / realmente'],['ja','sí'],['zo','así / tan'],['heeft','tiene / ha'],['hebben','tener'],['hem','él / lo'],['goed','bien / bueno'],['nee','no']
  ].map(([front,back])=>({front,back}))},
  'ru-nl-alphabet':{id:'ru-nl-cyrillic-alphabet',title:'Russisch — Cyrillisch alfabet',from:'Russisch',to:'Nederlandse uitspraak',createdAt:Date.now(),lastScore:null,source:'Russisch alfabet',words:[
    ['А а','a'],['Б б','b'],['В в','v'],['Г г','g'],['Д д','d'],['Е е','je / e'],['Ё ё','jo'],['Ж ж','zj'],['З з','z'],['И и','ie'],['Й й','korte j'],
    ['К к','k'],['Л л','l'],['М м','m'],['Н н','n'],['О о','o'],['П п','p'],['Р р','rollende r'],['С с','s'],['Т т','t'],['У у','oe'],['Ф ф','f'],
    ['Х х','ch, zoals in lach'],['Ц ц','ts'],['Ч ч','tsj'],['Ш ш','sj'],['Щ щ','sjtsj'],['Ъ ъ','hard teken, geen eigen klank'],['Ы ы','harde i-klank'],
    ['Ь ь','zacht teken, geen eigen klank'],['Э э','è'],['Ю ю','joe'],['Я я','ja']
  ].map(([front,back])=>({front,back}))}
};
const hadLegacyData = Boolean(localStorage.getItem(STORAGE_KEY));
function freshAccountData(){
  return {score:0,bestStreak:0,todayXp:0,xpDate:new Date().toISOString().slice(0,10),dailyGoal:50,activity:{},activityMinutes:{},studyMinutes:0,answered:0,skillStats:{},sentencePacks:[],lists:[structuredClone(seed.lists[0])]};
}
let data = loadData();
let activeListId = null, editingId = null, quiz = null, activeSentencePackId = null, editingSentencePackId = null, cloudUser = null, cloudSaveTimer = null, pendingPracticeMode = null;

function loadData(){
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(!stored) return structuredClone(seed);
    if(!Array.isArray(stored.sentencePacks)) stored.sentencePacks=structuredClone(starterSentencePacks);
    starterSentencePacks.forEach(pack=>{if(!stored.sentencePacks.some(item=>item.id===pack.id))stored.sentencePacks.push(structuredClone(pack));});
    prepareData(stored);return stored;
  } catch { return structuredClone(seed); }
}
function dayKey(date=new Date()){return date.toISOString().slice(0,10);}
function prepareData(target){
  const today=dayKey();if(target.xpDate!==today){target.todayXp=0;target.xpDate=today;}if(!target.dailyGoal)target.dailyGoal=50;if(!target.activity)target.activity={};if(!target.activityMinutes)target.activityMinutes={};if(!target.studyMinutes)target.studyMinutes=0;if(!target.answered)target.answered=0;if(!target.skillStats)target.skillStats={};
  const firstFrequency=(target.lists||[]).find(list=>list.id==='vi-frequency-1'||list.title==='Vietnamese frequentie 001–100');
  if(firstFrequency){const sau=firstFrequency.words.find(word=>word.front==='sau');if(sau){sau.front='sau đó';sau.back='daarna / vervolgens';}if(!firstFrequency.words.some(word=>word.front==='sự')){const behindIndex=firstFrequency.words.findIndex(word=>word.front==='đằng sau');firstFrequency.words.splice(Math.max(0,behindIndex),0,{front:'sự',back:'gebeurtenis / zaak / aangelegenheid / verschijnsel'});}}
  if(firstFrequency){const can=firstFrequency.words.find(word=>word.front==='có thể');if(can)can.back='kunnen / misschien';}
  (target.lists||[]).flatMap(list=>list.words||[]).forEach(word=>{word.correctCount=word.correctCount||0;word.wrongCount=word.wrongCount||0;});
  return target;
}
function saveData(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); updateStats(); scheduleCloudSave(); }
function importPresetFromUrl(){
  const params=new URLSearchParams(location.search),hashParams=new URLSearchParams(location.hash.replace(/^#/,'')),key=params.get('import')||hashParams.get('import'),preset=importPresets[key];if(!preset)return null;
  if(!Array.isArray(data.lists))data.lists=[];
  if(!data.lists.some(list=>list.id===preset.id)){data.lists.unshift(structuredClone(preset));showToast('Woordenlijst toegevoegd aan dit account');}
  params.delete('import');hashParams.delete('import');history.replaceState({},'',`${location.pathname}${params.size?`?${params}`:''}${hashParams.size?`#${hashParams}`:''}`);return preset.id;
}
function esc(value=''){ return value.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function normalize(value){ return value.trim().toLocaleLowerCase('nl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim(); }
const equivalentAnswers = [
  ['bedankt','dankjewel','dank je wel','dank je','thanks'], ['hallo','hoi','goedendag'],
  ['tot ziens','doei','dag'], ['ja','jazeker','zeker'], ['nee','neen'],
  ['jij','je'], ['jou','je'], ['jouw','je'], ['wij','we'], ['zij','ze'],
  ['niet','geen'], ['ook','eveneens'], ['maar','echter'], ['mooi','prachtig'],
  ['groot','enorm'], ['klein','miniem'], ['snel','vlug'], ['blij','gelukkig'],
  ['boos','kwaad'], ['kijken','zien'], ['praten','spreken'], ['beginnen','starten'],
  ['maken','creeren'], ['kopen','aanschaffen'], ['huis','woning'], ['baan','werk']
].map(group => group.map(normalize));
function editDistance(a,b){
  const row=Array.from({length:b.length+1},(_,i)=>i);
  for(let i=1;i<=a.length;i++){
    let previous=row[0]; row[0]=i;
    for(let j=1;j<=b.length;j++){
      const saved=row[j]; row[j]=Math.min(row[j]+1,row[j-1]+1,previous+(a[i-1]===b[j-1]?0:1)); previous=saved;
    }
  }
  return row[b.length];
}
function answerVariants(value){ return value.split(/\s*(?:\/|;|,)\s*/).map(normalize).filter(Boolean); }
function answersMatch(given, expected){
  const attempts=answerVariants(given), answers=answerVariants(expected);
  return attempts.some(attempt => answers.some(answer => {
    if(attempt===answer)return true;
    if(equivalentAnswers.some(group=>group.includes(attempt)&&group.includes(answer)))return true;
    return Math.max(attempt.length,answer.length)>=5 && editDistance(attempt,answer)<=1;
  }));
}
function listById(id){ return data.lists.find(list => list.id === id); }
function showToast(message){ const toast=document.querySelector('#toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove('show'),2200); }

function route(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelector(`#${name}-view`)?.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.route===name));
  if(name==='home') renderHome();
  if(name==='library') renderLibrary();
  if(name==='sentences') renderSentencePacks();
  if(name==='statistics') renderStatistics();
  window.scrollTo(0,0); document.querySelector('#app').focus({preventScroll:true});
}
function dateLabel(key){return new Intl.DateTimeFormat('nl-NL',{weekday:'short'}).format(new Date(`${key}T12:00:00`)).replace('.','');}
function currentStreak(){let streak=0,date=new Date();while((data.activity?.[dayKey(date)]||0)>0){streak++;date.setDate(date.getDate()-1);}return streak;}
function renderStatistics(){
  prepareData(data);const words=data.lists.flatMap(list=>list.words),sentences=data.sentencePacks.flatMap(pack=>pack.sentences),today=dayKey(),days=Array.from({length:7},(_,i)=>{const date=new Date();date.setDate(date.getDate()-(6-i));const key=dayKey(date);return{key,xp:data.activity[key]||0,minutes:data.activityMinutes[key]||0};}),max=Math.max(1,...days.map(day=>day.xp));
  const wordStats={total:words.length,new:words.filter(w=>!w.reviewed).length,learning:words.filter(w=>w.reviewed&&(w.level||0)<3).length,learned:words.filter(w=>(w.level||0)>=3).length,mastered:words.filter(w=>(w.level||0)>=5).length,due:words.filter(w=>w.reviewed&&(!w.due||w.due<=today)).length,hard:words.filter(w=>(w.wrongCount||0)>Math.max(1,w.correctCount||0)).length};
  const sentenceStats={total:sentences.length,new:sentences.filter(s=>!(s.mastery||0)).length,learning:sentences.filter(s=>(s.mastery||0)===1).length,learned:sentences.filter(s=>(s.mastery||0)>=1).length,mastered:sentences.filter(s=>(s.mastery||0)>=2).length};
  const milestones=[{name:'Starter',words:100,sentences:25},{name:'Foundation',words:500,sentences:100},{name:'Conversational',words:1500,sentences:350},{name:'Independent',words:3000,sentences:750},{name:'Fluent foundation',words:5000,sentences:1500}];
  let nextIndex=milestones.findIndex(step=>wordStats.mastered<step.words||sentenceStats.mastered<step.sentences);if(nextIndex<0)nextIndex=milestones.length-1;const next=milestones[nextIndex],level=nextIndex===0?'Starter':milestones[nextIndex-1].name,progress=Math.min(100,Math.round(((Math.min(1,wordStats.mastered/next.words)+Math.min(1,sentenceStats.mastered/next.sentences))/2)*100));
  document.querySelector('#fluency-level').textContent=level;document.querySelector('#fluency-percent').textContent=`${progress}%`;document.querySelector('#fluency-bar').style.width=`${progress}%`;document.querySelector('#fluency-next').textContent=`Nog ${Math.max(0,next.words-wordStats.mastered)} woorden en ${Math.max(0,next.sentences-sentenceStats.mastered)} zinnen tot ${next.name}.`;
  document.querySelector('#current-streak').textContent=`${currentStreak()} ${currentStreak()===1?'dag':'dagen'}`;document.querySelector('#week-xp').textContent=`${days.reduce((sum,day)=>sum+day.xp,0)} XP`;document.querySelector('#study-time').textContent=`${data.studyMinutes||0} min`;
  const future=words.filter(word=>word.due).map(word=>word.due).sort()[0];document.querySelector('#next-review').textContent=future?(future<=today?'Vandaag':new Intl.DateTimeFormat('nl-NL',{day:'numeric',month:'short'}).format(new Date(`${future}T12:00:00`))):'Nog niets gepland';
  document.querySelector('#fluency-road').innerHTML=milestones.map((step,i)=>{const done=wordStats.mastered>=step.words&&sentenceStats.mastered>=step.sentences,active=i===nextIndex;return`<article class="${done?'done':''} ${active?'active':''}"><span>${String(i+1).padStart(2,'0')}</span><div><b>${step.name}</b><small>${step.words} woorden · ${step.sentences} zinnen</small></div><em>${done?'✓':active?`${progress}%`:'—'}</em></article>`;}).join('');
  const metric=(label,value)=>`<article><span>${label}</span><strong>${value}</strong></article>`;document.querySelector('#word-metrics').innerHTML=metric('Totaal',wordStats.total)+metric('Nieuw',wordStats.new)+metric('Leren',wordStats.learning)+metric('Geleerd',wordStats.learned)+metric('Beheerst',wordStats.mastered)+metric('Te herhalen',wordStats.due)+metric('Moeilijk',wordStats.hard);document.querySelector('#sentence-metrics').innerHTML=metric('Totaal',sentenceStats.total)+metric('Nieuw',sentenceStats.new)+metric('Leren',sentenceStats.learning)+metric('Geleerd',sentenceStats.learned)+metric('Beheerst',sentenceStats.mastered);
  const skillNames={recognition:'Woordherkenning',production:'Woordproductie',context:'Contextbegrip',sentenceBuild:'Zinsbouw',sentenceTranslate:'Zelf vertalen'},skillRows=Object.entries(skillNames).map(([key,label])=>{const stat=data.skillStats[key]||{},percent=stat.attempts?Math.round(stat.correct/stat.attempts*100):0;return`<div><header><b>${label}</b><span>${percent}%</span></header><i><span style="width:${percent}%"></span></i><small>${stat.attempts||0} vragen</small></div>`;});document.querySelector('#skill-bars').innerHTML=skillRows.join('');
  const weakest=Object.entries(skillNames).map(([key,label])=>{const stat=data.skillStats[key]||{};return{label,score:stat.attempts?stat.correct/stat.attempts:1,attempts:stat.attempts||0};}).filter(s=>s.attempts).sort((a,b)=>a.score-b.score)[0];const advice=wordStats.due?`Herhaal vandaag eerst ${wordStats.due} woorden.`:wordStats.hard?`Oefen je ${wordStats.hard} moeilijke woorden opnieuw.`:weakest?`${weakest.label} is nu je beste aandachtspunt.`:'Doe een eerste oefenronde om persoonlijk advies te krijgen.';document.querySelector('#learning-advice').innerHTML=`<strong>${advice}</strong><p>${data.answered||0} vragen totaal beantwoord.</p>`;
  document.querySelector('#activity-chart').innerHTML=days.map(day=>`<div class="activity-day"><span>${day.xp}</span><i style="height:${Math.max(4,day.xp/max*100)}%"></i><b>${dateLabel(day.key)}</b><small>${day.minutes}m</small></div>`).join('');
  const hardest=data.lists.flatMap(list=>list.words.map(word=>({...word,listTitle:list.title}))).filter(word=>word.wrongCount).sort((a,b)=>b.wrongCount-a.wrongCount).slice(0,5);document.querySelector('#hardest-words').innerHTML=hardest.length?hardest.map((word,i)=>`<div><span>${i+1}</span><b>${esc(word.front)}</b><small>${word.wrongCount}× fout · ${esc(word.listTitle)}</small></div>`).join(''):'<p class="stats-empty">Nog geen moeilijke woorden. Start een ronde.</p>';
  document.querySelector('#list-progress').innerHTML=data.lists.length?data.lists.map(list=>{const mastered=list.words.filter(word=>(word.level||0)>=5).length,percent=list.words.length?Math.round(mastered/list.words.length*100):0;return`<div><header><b>${esc(list.title)}</b><span>${percent}% · ${mastered}/${list.words.length}</span></header><i><span style="width:${percent}%"></span></i></div>`;}).join(''):'<p class="stats-empty">Maak eerst een woordenlijst.</p>';
}
function updateStats(){
  document.querySelector('#total-score').textContent=data.score;
  document.querySelector('#today-xp').textContent=`${data.todayXp}/${data.dailyGoal||50} XP`;
  document.querySelector('#best-streak').textContent=data.bestStreak;
  const words=data.lists.flatMap(list=>list.words),today=new Date().toISOString().slice(0,10);
  const due=words.filter(word=>word.reviewed&&(!word.due||word.due<=today)).length;
  document.querySelector('#due-count')&&(document.querySelector('#due-count').textContent=due);
  document.querySelector('#mastered-count')&&(document.querySelector('#mastered-count').textContent=words.filter(word=>(word.level||0)>=5).length);
  document.querySelector('#learning-count')&&(document.querySelector('#learning-count').textContent=words.filter(word=>word.reviewed).length);
}
function cardHTML(list,index){
  const result=list.lastScore==null?'Nog niet geoefend':`${list.lastScore}% laatste score`;
  return `<button class="list-card" data-list-id="${esc(list.id)}"><span class="card-num">${String(index+1).padStart(2,'0')} / LIST</span><h3>${esc(list.title)}</h3><p>${esc(list.from)} → ${esc(list.to)}</p><div class="card-foot"><span>${list.words.length} woorden</span><span>${result} →</span></div></button>`;
}
function bindCards(root){ root.querySelectorAll('[data-list-id]').forEach(card=>card.addEventListener('click',()=>openList(card.dataset.listId))); }
function emptyHTML(){ return `<div class="empty"><h3>Nog geen lijsten</h3><p>Maak je eerste woordenlijst en begin met leren.</p><button class="btn btn-accent" data-empty-create>Nieuwe lijst</button></div>`; }
function renderHome(){
  const root=document.querySelector('#recent-lists'), lists=data.lists.slice(0,6);
  root.innerHTML=lists.length?lists.map(cardHTML).join(''):emptyHTML(); bindCards(root);
  root.querySelector('[data-empty-create]')?.addEventListener('click',newList);
  updateStats();
}
function renderLibrary(){
  const query=normalize(document.querySelector('#list-search').value);
  const lists=data.lists.filter(l=>normalize(`${l.title} ${l.from} ${l.to}`).includes(query));
  const root=document.querySelector('#all-lists'); root.innerHTML=lists.length?lists.map(cardHTML).join(''):emptyHTML(); bindCards(root);
  root.querySelector('[data-empty-create]')?.addEventListener('click',newList);
  document.querySelector('#list-count').textContent=`${lists.length} ${lists.length===1?'lijst':'lijsten'}`;
}
function newList(){ editingId=null; document.querySelector('#editor-heading').textContent='NIEUWE LIJST.'; document.querySelector('#list-form').reset(); route('editor'); }
function editList(){
  const list=listById(activeListId); if(!list)return; editingId=list.id;
  document.querySelector('#editor-heading').textContent='LIJST BEWERKEN.';
  document.querySelector('#list-title').value=list.title; document.querySelector('#language-from').value=list.from; document.querySelector('#language-to').value=list.to;
  document.querySelector('#word-pairs').value=list.words.map(w=>`${w.front} = ${w.back}`).join('\n'); route('editor');
}
function parseWords(text){ return text.split('\n').map(line=>line.trim()).filter(Boolean).map(line=>{ const parts=line.split(/\s*(?:=|;|\t)\s*/); return parts.length>=2?{front:parts[0].trim(),back:parts.slice(1).join(' = ').trim()}:null; }).filter(w=>w?.front&&w?.back); }
function openList(id){
  const list=listById(id); if(!list)return; activeListId=id;
  document.querySelector('#detail-title').textContent=list.title; document.querySelector('#detail-languages').textContent=`${list.from} → ${list.to}`;
  document.querySelector('#detail-meta').textContent=`${list.words.length} woorden · ${list.lastScore==null?'Nog niet geoefend':`laatste score ${list.lastScore}%`}`;
  document.querySelector('#word-count').textContent=`${list.words.length} entries`;
  document.querySelector('#word-table').innerHTML=list.words.map((w,i)=>`<div class="word-row"><span>${String(i+1).padStart(2,'0')}</span><b>${esc(w.front)}</b><span>${esc(w.back)}</span></div>`).join(''); route('detail');
}
function deleteList(){
  const list=listById(activeListId); if(!list || !confirm(`Verwijder “${list.title}”?`))return;
  data.lists=data.lists.filter(l=>l.id!==activeListId); saveData(); route('library'); showToast('Lijst verwijderd');
}
function sentencePackById(id){return data.sentencePacks.find(pack=>pack.id===id);}
function renderSentencePacks(){
  const root=document.querySelector('#sentence-packs');
  root.innerHTML=data.sentencePacks.map((pack,index)=>{
    const mastered=pack.sentences.filter(s=>(s.mastery||0)>=2).length;
    const progress=pack.sentences.length?Math.round(mastered/pack.sentences.length*100):0;
    return `<button class="sentence-pack" data-sentence-pack="${esc(pack.id)}"><span class="card-num">${String(index+1).padStart(2,'0')} / THEMA</span><h2>${esc(pack.title)}</h2><p>${esc(pack.description||'Jouw eigen zinnenlijst.')}</p><div class="sentence-progress"><span style="width:${progress}%"></span></div><div class="card-foot"><span>${pack.sentences.length} zinnen</span><span>${progress}% beheerst →</span></div></button>`;
  }).join('');
  root.querySelectorAll('[data-sentence-pack]').forEach(button=>button.addEventListener('click',()=>openSentencePack(button.dataset.sentencePack)));
  document.querySelector('#sentence-pack-count').textContent=`${data.sentencePacks.length} thema's`;
}
function openSentencePack(id){
  const pack=sentencePackById(id); if(!pack)return; activeSentencePackId=id;
  document.querySelector('#sentence-detail-title').textContent=pack.title;
  document.querySelector('#sentence-detail-meta').textContent=`${pack.sentences.length} zinnen · ${pack.lastScore==null?'Nog niet geoefend':`laatste score ${pack.lastScore}%`}`;
  document.querySelector('#sentence-count').textContent=`${pack.sentences.length} zinnen`;
  document.querySelector('#sentence-table').innerHTML=pack.sentences.map((s,i)=>`<article class="sentence-row"><span>${String(i+1).padStart(2,'0')}</span><div><b>${esc(s.vi)}</b><p>${esc(s.nl)}</p>${s.literal?`<small>${esc(s.literal)}</small>`:''}</div><em>${(s.mastery||0)>=2?'BEHEERST':(s.mastery||0)===1?'LEREN':'NIEUW'}</em></article>`).join('');
  route('sentence-detail');
}
function newSentencePack(){editingSentencePackId=null;document.querySelector('#sentence-editor-heading').textContent='NIEUWE ZINNEN.';document.querySelector('#sentence-form').reset();route('sentence-editor');}
function editSentencePack(){
  const pack=sentencePackById(activeSentencePackId);if(!pack)return;editingSentencePackId=pack.id;
  document.querySelector('#sentence-editor-heading').textContent='ZINNEN BEWERKEN.';document.querySelector('#sentence-title').value=pack.title;
  document.querySelector('#sentence-pairs').value=pack.sentences.map(s=>`${s.vi} = ${s.nl}`).join('\n');route('sentence-editor');
}
function deleteSentencePack(){
  const pack=sentencePackById(activeSentencePackId);if(!pack||!confirm(`Verwijder “${pack.title}”?`))return;
  data.sentencePacks=data.sentencePacks.filter(item=>item.id!==pack.id);saveData();route('sentences');showToast('Zinnenthema verwijderd');
}
function startSentenceQuiz(mode){
  const pack=sentencePackById(activeSentencePackId);if(!pack?.sentences.length)return;
  quiz={kind:'sentence',mode,pack,items:shuffle(pack.sentences),index:0,correct:0,points:0,streak:0,answered:false,selected:[],mistakes:[],startedAt:Date.now()};route('quiz');renderQuiz();
}
function shuffle(items){ const out=[...items]; for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];} return out; }
const REVIEW_INTERVALS=[0,1,3,7,14,30,60];
function recordWordResult(word,correct){
  word.reviewed=true;word.level=correct?Math.min(6,(word.level||0)+1):Math.max(0,(word.level||0)-1);
  word.correctCount=(word.correctCount||0)+(correct?1:0);word.wrongCount=(word.wrongCount||0)+(correct?0:1);word.lastReviewed=new Date().toISOString();
  const date=new Date();date.setDate(date.getDate()+(correct?REVIEW_INTERVALS[word.level]:0));word.due=date.toISOString().slice(0,10);
}
function startDailyReview(){
  const words=data.lists.flatMap(list=>list.words),today=new Date().toISOString().slice(0,10),due=words.filter(word=>word.reviewed&&(!word.due||word.due<=today)),fresh=words.filter(word=>!word.reviewed).slice(0,10),items=shuffle([...due,...fresh]).slice(0,20);
  if(!items.length){showToast('Alles is voor vandaag herhaald');return;}
  quiz={kind:'daily',mode:'mixed',list:{id:'daily-review',title:'Dagelijkse ronde',from:'Vietnamees',to:'Nederlands',words:items,lastScore:null},items,index:0,correct:0,points:0,streak:0,answered:false,direction:'both',mistakes:[],startedAt:Date.now()};route('quiz');renderQuiz();
}
function startQuiz(mode,options={}){
  const list=listById(activeListId); if(!list?.words.length)return;
  if(mode==='context'&&!options.configured){document.querySelector('#context-choice-modal').classList.remove('hidden');return;}
  if(mode!=='context'&&!options.configured){pendingPracticeMode=mode;document.querySelector('#direction-choice-modal').classList.remove('hidden');return;}
  const items=mode==='context'?list.words.filter(word=>window.LOOP_CONTEXTS?.[word.front]):list.words;
  if(mode==='context'&&!items.length){showToast('Voor deze lijst zijn nog geen contextvoorbeelden');return;}
  quiz={mode,list,items:shuffle(items),index:0,correct:0,points:0,streak:0,answered:false,showTranslation:options.showTranslation!==false,direction:options.direction||'forward',mistakes:[],startedAt:Date.now()}; route('quiz'); renderQuiz();
}
function addMistake(item){if(!quiz.mistakes.includes(item))quiz.mistakes.push(item);}
function recordSkill(key,correct){const stat=data.skillStats[key]||(data.skillStats[key]={attempts:0,correct:0});stat.attempts++;if(correct)stat.correct++;data.answered=(data.answered||0)+1;}
function questionSides(word){const reverse=quiz.direction==='reverse'||(quiz.direction==='both'&&quiz.index%2===1);return reverse?{prompt:word.back,answer:word.front,from:quiz.list.to,to:quiz.list.from}:{prompt:word.front,answer:word.back,from:quiz.list.from,to:quiz.list.to};}
function renderQuiz(){
  const stage=document.querySelector('#quiz-stage'); document.querySelector('#quiz-score').textContent=quiz.points;
  document.querySelector('#quiz-progress').style.width=`${quiz.index/quiz.items.length*100}%`;
  if(quiz.index>=quiz.items.length){ finishQuiz(); return; }
  if(quiz.kind==='sentence'){renderSentenceQuestion();return;}
  const word=quiz.items[quiz.index];
  const activeMode=quiz.mode==='mixed'?['type','choice','cards'][quiz.index%3]:quiz.mode;
  quiz.activeMode=activeMode;
  if(activeMode==='context'){
    const baseContext=window.LOOP_CONTEXTS[word.front],examples=[{sentence:baseContext.sentence,translation:baseContext.translation},...(baseContext.examples||[])],example=examples[((word.correctCount||0)+(word.wrongCount||0))%examples.length],context={...baseContext,...example},contextMode=['explain','choice','fill'][quiz.index%3];quiz.contextMode=contextMode;quiz.activeContext=context;
    const translation=quiz.showTranslation?`<p class="context-translation">${esc(context.translation)}</p>`:'<p class="context-translation context-hidden-hint">Vertaling verborgen</p>';
    if(contextMode==='choice'){
      const other=shuffle(Object.entries(window.LOOP_CONTEXTS).filter(([key])=>key!==word.front)).slice(0,3).map(([,item])=>item.explanation),choices=shuffle([context.explanation,...other]);
      stage.innerHTML=`<div class="quiz-card context-card"><p class="quiz-kicker">CONTEXT KIEZEN · ${quiz.index+1}/${quiz.items.length}</p><h2 class="context-example">${esc(context.sentence)}</h2>${translation}<p class="context-question">Welke uitleg past bij <strong>${esc(word.front)}</strong>?</p><div class="choice-grid">${choices.map(choice=>`<button data-context-choice="${esc(choice)}">${esc(choice)}</button>`).join('')}</div><div id="answer-feedback" class="answer-feedback"></div></div>`;
      document.querySelectorAll('[data-context-choice]').forEach(button=>button.addEventListener('click',()=>checkContextChoice(button.dataset.contextChoice)));
    }else if(contextMode==='fill'){
      const blank=context.sentence.replace(new RegExp(word.front.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),'_____');
      stage.innerHTML=`<div class="quiz-card context-card"><p class="quiz-kicker">VUL HET WOORD IN · ${quiz.index+1}/${quiz.items.length}</p><h2 class="context-example">${esc(blank)}</h2>${translation}<form id="context-form"><label class="context-question">Welk woord ontbreekt?</label><div class="answer-wrap"><input id="context-answer" autocomplete="off" placeholder="Typ het Vietnamese woord…"><button aria-label="Controleer">→</button></div><div id="answer-feedback" class="answer-feedback"></div></form></div>`;
      document.querySelector('#context-form').addEventListener('submit',checkContextAnswer);document.querySelector('#context-answer').focus();
    }else{
      stage.innerHTML=`<div class="quiz-card context-card"><p class="quiz-kicker">LEREN IN CONTEXT · ${quiz.index+1}/${quiz.items.length}</p><h2 class="context-example">${esc(context.sentence)}</h2>${translation}<form id="context-form"><label class="context-question"><span>Wat betekent of doet</span> <strong>${esc(word.front)}</strong> <span>in deze zin?</span></label><div class="answer-wrap"><input id="context-answer" autocomplete="off" placeholder="Leg het in je eigen woorden uit…"><button aria-label="Controleer">→</button></div><div id="answer-feedback" class="answer-feedback"></div></form></div>`;
      document.querySelector('#context-form').addEventListener('submit',checkContextAnswer);document.querySelector('#context-answer').focus();
    }
  }else if(activeMode==='type'){
    const sides=questionSides(word);stage.innerHTML=`<div class="quiz-card"><p class="quiz-kicker">${esc(sides.from)} → ${esc(sides.to)} · ${quiz.index+1}/${quiz.items.length}</p><h2 class="quiz-word">${esc(sides.prompt)}</h2><form id="answer-form"><div class="answer-wrap"><input id="answer" autocomplete="off" autocapitalize="none" placeholder="Typ de vertaling…" aria-label="Jouw antwoord"><button aria-label="Controleer">→</button></div><div id="answer-feedback" class="answer-feedback"></div></form></div>`;
    const form=document.querySelector('#answer-form'); form.addEventListener('submit',checkAnswer); document.querySelector('#answer').focus();
  }else if(activeMode==='choice'){
    const sides=questionSides(word),reverse=sides.answer===word.front,distractors=shuffle(quiz.list.words.filter(item=>item!==word)).slice(0,3).map(item=>reverse?item.front:item.back),choices=shuffle([sides.answer,...distractors]);
    stage.innerHTML=`<div class="quiz-card"><p class="quiz-kicker">MEERKEUZE · ${esc(sides.from)} → ${esc(sides.to)} · ${quiz.index+1}/${quiz.items.length}</p><h2 class="quiz-word">${esc(sides.prompt)}</h2><div class="choice-grid">${choices.map(choice=>`<button data-choice="${esc(choice)}">${esc(choice)}</button>`).join('')}</div><div id="answer-feedback" class="answer-feedback"></div></div>`;
    document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>checkChoice(button.dataset.choice)));
  }else{
    const sides=questionSides(word);stage.innerHTML=`<div><div id="flashcard" class="flashcard" role="button" tabindex="0" aria-label="Draai flashcard om"><div class="flash-inner"><div class="flash-face"><small>${esc(sides.from)} · tik om te draaien</small><strong>${esc(sides.prompt)}</strong></div><div class="flash-face back"><small>${esc(sides.to)}</small><strong>${esc(sides.answer)}</strong></div></div></div><div class="card-controls"><button data-rate="0">Nog leren</button><button data-rate="1">Ik wist het</button></div></div>`;
    const card=document.querySelector('#flashcard'); const flip=()=>card.classList.toggle('flipped'); card.addEventListener('click',flip); card.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter')flip()});
    document.querySelectorAll('[data-rate]').forEach(b=>b.addEventListener('click',()=>rateCard(Number(b.dataset.rate))));
  }
}
function checkContextAnswer(event){
  event.preventDefault();if(quiz.answered){nextQuestion();return;}
  const word=quiz.items[quiz.index],context=quiz.activeContext||window.LOOP_CONTEXTS[word.front],input=document.querySelector('#context-answer'),given=normalize(input.value);
  const correct=quiz.contextMode==='fill'?answersMatch(input.value,word.front):context.keywords.some(keyword=>{const key=normalize(keyword);return given.includes(key)||key.includes(given)&&given.length>=4;});quiz.answered=true;input.disabled=true;
  const feedback=document.querySelector('#answer-feedback');recordSkill('context',correct);
  if(correct){recordWordResult(word,true);quiz.correct++;quiz.streak++;quiz.points+=12;feedback.className='answer-feedback correct';feedback.innerHTML=`✓ Goede uitleg! +12 XP<small>${esc(context.explanation)}</small>`;}
  else{recordWordResult(word,false);addMistake(word);quiz.streak=0;feedback.className='answer-feedback wrong';feedback.innerHTML=`${quiz.contextMode==='fill'?`Het ontbrekende woord is <strong>${esc(word.front)}</strong>. `:''}${esc(context.explanation)}<div class="feedback-actions"><button type="button" id="accept-context">Mijn uitleg ook goedkeuren</button></div>`;document.querySelector('#accept-context').addEventListener('click',()=>{recordWordResult(word,true);quiz.correct++;quiz.points+=8;nextQuestion();});}
  const button=event.submitter;button.textContent='→';button.setAttribute('aria-label','Volgende vraag');document.querySelector('#quiz-score').textContent=quiz.points;
}
function checkContextChoice(answer){
  if(quiz.answered)return;const word=quiz.items[quiz.index],context=quiz.activeContext||window.LOOP_CONTEXTS[word.front],correct=answer===context.explanation,feedback=document.querySelector('#answer-feedback');quiz.answered=true;recordSkill('context',correct);
  document.querySelectorAll('[data-context-choice]').forEach(button=>{button.disabled=true;if(button.dataset.contextChoice===context.explanation)button.classList.add('is-correct');});
  if(correct){recordWordResult(word,true);quiz.correct++;quiz.points+=10;quiz.streak++;feedback.className='answer-feedback correct';feedback.innerHTML='✓ Goed! +10 XP <button class="feedback-next" id="context-next">Volgende →</button>';}
  else{recordWordResult(word,false);addMistake(word);quiz.streak=0;feedback.className='answer-feedback wrong';feedback.innerHTML=`Niet helemaal — ${esc(context.explanation)} <button class="feedback-next" id="context-next">Volgende →</button>`;}
  document.querySelector('#context-next').addEventListener('click',nextQuestion);document.querySelector('#quiz-score').textContent=quiz.points;
}
function checkChoice(answer){
  if(quiz.answered)return;const word=quiz.items[quiz.index],sides=questionSides(word),correct=answersMatch(answer,sides.answer),feedback=document.querySelector('#answer-feedback');quiz.answered=true;recordSkill(sides.answer===word.front?'production':'recognition',correct);
  document.querySelectorAll('[data-choice]').forEach(button=>{button.disabled=true;if(answersMatch(button.dataset.choice,sides.answer))button.classList.add('is-correct');});
  if(correct){recordWordResult(word,true);quiz.correct++;quiz.streak++;quiz.points+=8;feedback.className='answer-feedback correct';feedback.innerHTML='✓ Goed! +8 XP <button class="feedback-next" id="choice-next">Volgende →</button>';}
  else{recordWordResult(word,false);addMistake(word);quiz.streak=0;feedback.className='answer-feedback wrong';feedback.innerHTML=`Niet helemaal — <strong>${esc(sides.answer)}</strong><div class="feedback-actions"><button id="accept-word">Toch goed rekenen</button><button id="choice-next">Volgende →</button></div>`;document.querySelector('#accept-word').addEventListener('click',acceptCurrentWord);}
  document.querySelector('#choice-next').addEventListener('click',nextQuestion);document.querySelector('#quiz-score').textContent=quiz.points;
}
function acceptCurrentWord(){if(!quiz.answered)return;recordWordResult(quiz.items[quiz.index],true);quiz.correct++;quiz.points+=6;nextQuestion();}
function speakCurrent(){
  if(!('speechSynthesis' in window)||!quiz)return;const text=quiz.kind==='sentence'?quiz.items[quiz.index]?.vi:quiz.items[quiz.index]?.front;if(!text)return;
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='vi-VN';utterance.rate=.82;speechSynthesis.speak(utterance);
}
function skipCurrent(){if(!quiz||quiz.index>=quiz.items.length)return;const item=quiz.items[quiz.index];addMistake(item);recordSkill(quiz.kind==='sentence'?(quiz.mode==='build'?'sentenceBuild':'sentenceTranslate'):quiz.mode==='context'?'context':questionSides(item).answer===item.front?'production':'recognition',false);quiz.streak=0;nextQuestion();}
function renderSentenceQuestion(){
  const stage=document.querySelector('#quiz-stage'), sentence=quiz.items[quiz.index];
  if(quiz.mode==='translate'){
    stage.innerHTML=`<div class="quiz-card sentence-quiz"><p class="quiz-kicker">NEDERLANDS → VIETNAMEES · ${quiz.index+1}/${quiz.items.length}</p><h2 class="sentence-prompt">${esc(sentence.nl)}</h2><form id="sentence-answer-form"><div class="answer-wrap"><input id="sentence-answer" autocomplete="off" autocapitalize="none" placeholder="Typ de Vietnamese zin…"><button aria-label="Controleer">→</button></div><div id="answer-feedback" class="answer-feedback"></div></form></div>`;
    document.querySelector('#sentence-answer-form').addEventListener('submit',checkSentenceTranslation);document.querySelector('#sentence-answer').focus();
  }else{
    quiz.selected=[]; const tokens=sentence.vi.split(/\s+/).map((word,index)=>({word,index}));quiz.available=shuffle(tokens);
    stage.innerHTML=`<div class="quiz-card sentence-quiz"><p class="quiz-kicker">BOUW DE VIETNAMESE ZIN · ${quiz.index+1}/${quiz.items.length}</p><h2 class="sentence-prompt">${esc(sentence.nl)}</h2><div id="built-sentence" class="built-sentence"><span>Tik de woorden in de juiste volgorde</span></div><div id="word-tiles" class="word-tiles"></div><button class="btn btn-accent sentence-check" id="check-built">Controleer →</button><div id="answer-feedback" class="answer-feedback"></div></div>`;
    renderSentenceTiles();document.querySelector('#check-built').addEventListener('click',checkBuiltSentence);
  }
}
function renderSentenceTiles(){
  const built=document.querySelector('#built-sentence'),tiles=document.querySelector('#word-tiles');
  built.innerHTML=quiz.selected.length?quiz.selected.map((token,i)=>`<button data-selected="${i}">${esc(token.word)}</button>`).join(''):'<span>Tik de woorden in de juiste volgorde</span>';
  tiles.innerHTML=quiz.available.map(token=>quiz.selected.some(s=>s.index===token.index)?'':`<button data-token="${token.index}">${esc(token.word)}</button>`).join('');
  tiles.querySelectorAll('[data-token]').forEach(button=>button.addEventListener('click',()=>{quiz.selected.push(quiz.available.find(token=>token.index===Number(button.dataset.token)));renderSentenceTiles();}));
  built.querySelectorAll('[data-selected]').forEach(button=>button.addEventListener('click',()=>{quiz.selected.splice(Number(button.dataset.selected),1);renderSentenceTiles();}));
}
function awardSentence(sentence,points){quiz.correct++;quiz.streak++;quiz.points+=points;sentence.mastery=Math.min(3,(sentence.mastery||0)+1);document.querySelector('#quiz-score').textContent=quiz.points;}
function sentenceFeedback(correct,exact=false){
  const sentence=quiz.items[quiz.index],feedback=document.querySelector('#answer-feedback');quiz.answered=true;recordSkill(quiz.mode==='build'?'sentenceBuild':'sentenceTranslate',correct);
  if(correct){const gained=quiz.mode==='translate'?15:10;awardSentence(sentence,gained);feedback.className='answer-feedback correct';feedback.innerHTML=`✓ ${exact?'Helemaal goed!':'Goed — dit antwoord klopt ook.'} +${gained} XP <button class="feedback-next" id="sentence-next">Volgende →</button>`;}
  else{addMistake(sentence);quiz.streak=0;sentence.mastery=Math.max(0,(sentence.mastery||0)-1);feedback.className='answer-feedback wrong';feedback.innerHTML=`Nog niet. <strong>${esc(sentence.vi)}</strong>${sentence.note?`<small>${esc(sentence.note)}</small>`:''}<div class="feedback-actions"><button id="accept-sentence">Mijn antwoord goedkeuren</button><button id="sentence-next">Volgende →</button></div>`;document.querySelector('#accept-sentence').addEventListener('click',()=>{awardSentence(sentence,8);nextQuestion();});}
  document.querySelector('#sentence-next').addEventListener('click',nextQuestion);
}
function checkBuiltSentence(){if(quiz.answered){nextQuestion();return;}const sentence=quiz.items[quiz.index],given=quiz.selected.map(token=>token.word).join(' ');sentenceFeedback(normalize(given)===normalize(sentence.vi),true);}
function checkSentenceTranslation(event){
  event.preventDefault();if(quiz.answered){nextQuestion();return;}const input=document.querySelector('#sentence-answer'),sentence=quiz.items[quiz.index],given=normalize(input.value),expected=normalize(sentence.vi);
  input.disabled=true;const distance=editDistance(given,expected),close=given===expected||(expected.length>=12&&distance<=2);sentenceFeedback(close,given===expected);
}
function checkAnswer(event){
  event.preventDefault(); if(quiz.answered){nextQuestion();return;}
  const input=document.querySelector('#answer'), feedback=document.querySelector('#answer-feedback'); const word=quiz.items[quiz.index],sides=questionSides(word); const exact=normalize(input.value)===normalize(sides.answer); const correct=answersMatch(input.value,sides.answer);
  quiz.answered=true; input.disabled=true;recordSkill(sides.answer===word.front?'production':'recognition',correct);
  if(correct){ recordWordResult(word,true);quiz.correct++; quiz.streak++; const gained=10+Math.min(quiz.streak-1,5)*2; quiz.points+=gained; feedback.className='answer-feedback correct'; feedback.innerHTML=exact?`✓ Goed! +${gained} XP`:`✓ Goed — vergelijkbaar antwoord! +${gained} XP`; }
  else { recordWordResult(word,false);addMistake(word);quiz.streak=0; feedback.className='answer-feedback wrong'; feedback.innerHTML=`Niet helemaal — het antwoord is <strong>${esc(sides.answer)}</strong><div class="feedback-actions"><button type="button" id="accept-word">Toch goed rekenen</button></div>`; document.querySelector('#accept-word').addEventListener('click',acceptCurrentWord); }
  const button=event.submitter; button.textContent='→'; button.setAttribute('aria-label','Volgende vraag'); button.focus(); document.querySelector('#quiz-score').textContent=quiz.points;
}
function nextQuestion(){ quiz.index++; quiz.answered=false; renderQuiz(); }
function rateCard(knew){const word=quiz.items[quiz.index];recordWordResult(word,Boolean(knew));recordSkill(questionSides(word).answer===word.front?'production':'recognition',Boolean(knew));if(knew){quiz.correct++;quiz.points+=8;quiz.streak++;}else{addMistake(word);quiz.streak=0;} quiz.index++; renderQuiz(); }
function retryMistakes(){
  const previous=quiz,items=shuffle([...previous.mistakes]);
  quiz={kind:previous.kind,mode:previous.mode,list:previous.list,pack:previous.pack,items,index:0,correct:0,points:0,streak:0,answered:false,selected:[],direction:previous.direction,showTranslation:previous.showTranslation,mistakes:[],isRetry:true,startedAt:Date.now()};renderQuiz();
}
function retryButton(){return quiz.mistakes.length?`<button class="btn btn-ghost retry-mistakes" id="retry-mistakes">Oefen ${quiz.mistakes.length} ${quiz.mistakes.length===1?'fout':'fouten'} opnieuw</button>`:'';}
function bindRetryButton(){document.querySelector('#retry-mistakes')?.addEventListener('click',retryMistakes);}
function finishQuiz(){
  if(quiz.finished)return;quiz.finished=true;const minutes=Math.max(1,Math.ceil((Date.now()-(quiz.startedAt||Date.now()))/60000));data.studyMinutes=(data.studyMinutes||0)+minutes;data.activityMinutes[dayKey()]=(data.activityMinutes[dayKey()]||0)+minutes;
  const percent=Math.round(quiz.correct/quiz.items.length*100); const grade=(percent/10).toFixed(1).replace('.',',');
  if(quiz.kind==='sentence'){
    quiz.pack.lastScore=percent;data.score+=quiz.points;data.todayXp+=quiz.points;data.activity[dayKey()]=(data.activity[dayKey()]||0)+quiz.points;data.bestStreak=Math.max(data.bestStreak,quiz.streak,currentStreak());saveData();
    document.querySelector('#quiz-progress').style.width='100%';
    document.querySelector('#quiz-stage').innerHTML=`<div class="result-card"><p class="quiz-kicker">SENTENCE SESSION COMPLETE</p><div class="result-grade">${grade}</div><h2>${percent>=80?'Sterk gebouwd.':percent>=55?'Goed op weg.':'Nog één ronde.'}</h2><p>${quiz.correct} van de ${quiz.items.length} goed · +${quiz.points} XP</p><div class="result-actions">${retryButton()}<button class="btn btn-ghost" id="result-back">Naar thema</button><button class="btn btn-accent" id="result-again">Nog een ronde ↻</button></div></div>`;
    bindRetryButton();document.querySelector('#result-back').addEventListener('click',()=>openSentencePack(quiz.pack.id));document.querySelector('#result-again').addEventListener('click',()=>startSentenceQuiz(quiz.mode));return;
  }
  quiz.list.lastScore=percent; data.score+=quiz.points; data.todayXp+=quiz.points;data.activity[dayKey()]=(data.activity[dayKey()]||0)+quiz.points; data.bestStreak=Math.max(data.bestStreak,quiz.streak,currentStreak()); saveData();
  document.querySelector('#quiz-progress').style.width='100%';
  document.querySelector('#quiz-stage').innerHTML=`<div class="result-card"><p class="quiz-kicker">SESSION COMPLETE</p><div class="result-grade">${grade}</div><h2>${percent>=80?'Sterk werk.':percent>=55?'Goed op weg.':'Nog één ronde.'}</h2><p>${quiz.correct} van de ${quiz.items.length} goed · +${quiz.points} XP</p><div class="result-actions">${retryButton()}<button class="btn btn-ghost" id="result-back">Naar lijst</button><button class="btn btn-accent" id="result-again">Nog een ronde ↻</button></div></div>`;
  bindRetryButton();document.querySelector('#result-back').addEventListener('click',()=>quiz.kind==='daily'?route('home'):openList(quiz.list.id)); document.querySelector('#result-again').addEventListener('click',()=>quiz.kind==='daily'?startDailyReview():startQuiz(quiz.mode));
}

document.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>route(b.dataset.route)));
document.querySelector('#hero-create').addEventListener('click',newList);document.querySelector('#daily-review').addEventListener('click',startDailyReview); document.querySelector('#library-create').addEventListener('click',newList); document.querySelector('#home-see-all').addEventListener('click',()=>route('library'));
document.querySelector('#list-search').addEventListener('input',renderLibrary); document.querySelector('#edit-list').addEventListener('click',editList); document.querySelector('#delete-list').addEventListener('click',deleteList);
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>startQuiz(b.dataset.mode))); document.querySelector('#quiz-close').addEventListener('click',()=>quiz?.kind==='sentence'?openSentencePack(quiz.pack.id):quiz?.kind==='daily'?route('home'):openList(quiz.list.id));
document.querySelector('#context-choice-close').addEventListener('click',()=>document.querySelector('#context-choice-modal').classList.add('hidden'));
document.querySelectorAll('[data-context-translation]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#context-choice-modal').classList.add('hidden');startQuiz('context',{configured:true,showTranslation:button.dataset.contextTranslation==='yes'});}));
document.querySelector('#direction-choice-close').addEventListener('click',()=>document.querySelector('#direction-choice-modal').classList.add('hidden'));
document.querySelectorAll('[data-direction]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#direction-choice-modal').classList.add('hidden');startQuiz(pendingPracticeMode,{configured:true,direction:button.dataset.direction});}));
document.querySelector('#quiz-speak').addEventListener('click',speakCurrent);document.querySelector('#quiz-skip').addEventListener('click',skipCurrent);
document.querySelector('#sentence-create').addEventListener('click',newSentencePack);document.querySelector('#edit-sentence-pack').addEventListener('click',editSentencePack);document.querySelector('#delete-sentence-pack').addEventListener('click',deleteSentencePack);
document.querySelectorAll('[data-sentence-mode]').forEach(button=>button.addEventListener('click',()=>startSentenceQuiz(button.dataset.sentenceMode)));
document.querySelector('#swap-languages').addEventListener('click',()=>{const a=document.querySelector('#language-from'),b=document.querySelector('#language-to');[a.value,b.value]=[b.value,a.value];});
document.querySelector('#list-form').addEventListener('submit',event=>{
  event.preventDefault(); const words=parseWords(document.querySelector('#word-pairs').value); if(!words.length){showToast('Gebruik een = tussen woord en vertaling');return;}
  const values={title:document.querySelector('#list-title').value.trim(),from:document.querySelector('#language-from').value.trim()||'Taal 1',to:document.querySelector('#language-to').value.trim()||'Taal 2',words};
  if(editingId){Object.assign(listById(editingId),values);activeListId=editingId;}else{activeListId=`list-${Date.now()}`;data.lists.unshift({id:activeListId,createdAt:Date.now(),lastScore:null,...values});}
  saveData(); openList(activeListId); showToast('Lijst opgeslagen');
});
document.querySelector('#sentence-form').addEventListener('submit',event=>{
  event.preventDefault();const sentences=parseWords(document.querySelector('#sentence-pairs').value).map(pair=>({vi:pair.front,nl:pair.back,literal:'',note:'',mastery:0}));if(!sentences.length){showToast('Gebruik een = tussen beide zinnen');return;}
  const title=document.querySelector('#sentence-title').value.trim();
  if(editingSentencePackId){const pack=sentencePackById(editingSentencePackId);pack.title=title;pack.sentences=sentences;activeSentencePackId=pack.id;}else{activeSentencePackId=`sent-${Date.now()}`;data.sentencePacks.unshift({id:activeSentencePackId,title,description:'Jouw eigen zinnenlijst.',lastScore:null,sentences});}
  saveData();openSentencePack(activeSentencePackId);showToast('Zinnen opgeslagen');
});
const savedTheme=localStorage.getItem('loop-theme');if(savedTheme==='dark')document.body.classList.add('dark-theme');
document.querySelector('#theme-toggle').addEventListener('click',()=>{document.body.classList.toggle('dark-theme');localStorage.setItem('loop-theme',document.body.classList.contains('dark-theme')?'dark':'light');});
document.querySelector('#photo-import').addEventListener('click',()=>document.querySelector('#photo-input').click());
document.querySelector('#photo-input').addEventListener('change',async event=>{
  const file=event.target.files?.[0],status=document.querySelector('#photo-status');if(!file)return;
  if(!('TextDetector' in window)){status.textContent='Automatische tekstherkenning wordt op deze browser nog niet ondersteund. Typ of plak de lijst hieronder.';return;}
  try{
    status.textContent='Tekst op de foto herkennen…';const bitmap=await createImageBitmap(file),lines=await new TextDetector().detect(bitmap),text=lines.map(line=>line.rawValue).join('\n');
    document.querySelector('#word-pairs').value+=(document.querySelector('#word-pairs').value?'\n':'')+text;status.textContent='Tekst toegevoegd. Zet tussen ieder woordpaar nog een = en controleer de accenten.';
  }catch{status.textContent='Deze foto kon niet worden gelezen. Probeer een scherpere foto of typ de woorden handmatig.';}
});
const authGate=document.querySelector('#auth-gate'),authMessage=document.querySelector('#auth-message'),authSubmit=document.querySelector('#auth-submit');let authMode='login';
const supabaseClient=window.supabase?.createClient(window.LOOP_SUPABASE.url,window.LOOP_SUPABASE.key);
function scheduleCloudSave(){if(!cloudUser||!supabaseClient)return;clearTimeout(cloudSaveTimer);cloudSaveTimer=setTimeout(async()=>{const {error}=await supabaseClient.from('user_state').upsert({user_id:cloudUser.id,data,updated_at:new Date().toISOString()});if(error)showToast('Online opslaan lukt nog niet');},500);}
async function activateAccount(user){
  cloudUser=user;authGate.classList.add('hidden');const accountButton=document.querySelector('#account-button');accountButton.textContent='Account';accountButton.title=user.email||'Account';
  const {data:row,error}=await supabaseClient.from('user_state').select('data').eq('user_id',user.id).maybeSingle();
  if(row?.data){data=prepareData(row.data);}
  else if(!error){
    const mayImport=hadLegacyData&&!localStorage.getItem('loop-owner-migrated');
    data=mayImport?data:freshAccountData();
    if(mayImport)localStorage.setItem('loop-owner-migrated',user.id);
    scheduleCloudSave();
  }else showToast('Account actief; database moet nog worden ingesteld');
  const importedId=importPresetFromUrl();localStorage.setItem(STORAGE_KEY,JSON.stringify(data));if(importedId)scheduleCloudSave();renderHome();renderLibrary();updateStats();if(importedId)openList(importedId);
}
document.querySelectorAll('[data-auth-tab]').forEach(button=>button.addEventListener('click',()=>{authMode=button.dataset.authTab;document.querySelectorAll('[data-auth-tab]').forEach(item=>item.classList.toggle('active',item===button));authSubmit.textContent=authMode==='login'?'Inloggen →':'Account maken →';authMessage.textContent='';}));
document.querySelector('#auth-form').addEventListener('submit',async event=>{event.preventDefault();const email=document.querySelector('#auth-email').value.trim(),password=document.querySelector('#auth-password').value;authSubmit.disabled=true;authMessage.textContent='Even geduld…';const result=authMode==='signup'?await supabaseClient.auth.signUp({email,password}):await supabaseClient.auth.signInWithPassword({email,password});authSubmit.disabled=false;if(result.error){authMessage.textContent=result.error.message;return;}if(result.data.session)await activateAccount(result.data.user);else authMessage.textContent='Controleer je e-mail en bevestig je account.';});
document.querySelector('#forgot-password').addEventListener('click',async()=>{const email=document.querySelector('#auth-email').value.trim();if(!email){authMessage.textContent='Vul eerst je e-mailadres in.';return;}const {error}=await supabaseClient.auth.resetPasswordForEmail(email,{redirectTo:location.href});authMessage.textContent=error?error.message:'Herstellink verstuurd naar je e-mail.';});
document.querySelector('#auth-close').addEventListener('click',()=>authGate.classList.add('hidden'));
document.querySelector('#account-close').addEventListener('click',()=>document.querySelector('#account-modal').classList.add('hidden'));
document.querySelector('#account-button').addEventListener('click',()=>{if(cloudUser){document.querySelector('#account-email').textContent=cloudUser.email;document.querySelector('#account-modal').classList.remove('hidden');}else authGate.classList.remove('hidden');});
document.querySelector('#logout-button').addEventListener('click',async()=>{await supabaseClient.auth.signOut();cloudUser=null;document.querySelector('#account-button').textContent='Inloggen';data=freshAccountData();localStorage.setItem(STORAGE_KEY,JSON.stringify(data));renderHome();document.querySelector('#account-modal').classList.add('hidden');showToast('Je bent uitgelogd');});
document.querySelector('#export-data').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`loop-export-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(link.href);});
if(supabaseClient)supabaseClient.auth.getSession().then(({data:{session}})=>{if(session)activateAccount(session.user);else if(location.search.includes('import=')||location.hash.includes('import=')){authMessage.textContent='Log in om deze woordenlijst aan je account toe te voegen.';authGate.classList.remove('hidden');}});else authMessage.textContent='De accountverbinding kon niet worden geladen.';
updateStats(); renderHome();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));

