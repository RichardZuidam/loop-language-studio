const STORAGE_KEY = 'loop-language-studio-v1';
const seed = {
  score: 0, bestStreak: 0, todayXp: 0,
  lists: [{
    id: 'vietnamese-starter', title: 'Vietnamees — Start', from: 'Vietnamees', to: 'Nederlands', createdAt: Date.now(), lastScore: null,
    words: [
      { front: 'xin chào', back: 'hallo' }, { front: 'cảm ơn', back: 'bedankt' },
      { front: 'tạm biệt', back: 'tot ziens' }, { front: 'vâng', back: 'ja' },
      { front: 'không', back: 'nee' }, { front: 'bạn khỏe không?', back: 'hoe gaat het met je?' }
    ]
  }]
};
let data = loadData();
let activeListId = null, editingId = null, quiz = null;

function loadData(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || structuredClone(seed); } catch { return structuredClone(seed); } }
function saveData(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); updateStats(); }
function esc(value=''){ return value.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function normalize(value){ return value.trim().toLocaleLowerCase('nl').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[.!?]/g,''); }
function listById(id){ return data.lists.find(list => list.id === id); }
function showToast(message){ const toast=document.querySelector('#toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove('show'),2200); }

function route(name){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelector(`#${name}-view`)?.classList.add('active');
  document.querySelectorAll('.nav-link').forEach(b=>b.classList.toggle('active',b.dataset.route===name));
  if(name==='home') renderHome();
  if(name==='library') renderLibrary();
  window.scrollTo(0,0); document.querySelector('#app').focus({preventScroll:true});
}
function updateStats(){
  document.querySelector('#total-score').textContent=data.score;
  document.querySelector('#today-xp').textContent=`${data.todayXp} XP`;
  document.querySelector('#best-streak').textContent=data.bestStreak;
}
function cardHTML(list,index){
  const result=list.lastScore==null?'Nog niet geoefend':`${list.lastScore}% laatste score`;
  return `<button class="list-card" data-list-id="${esc(list.id)}"><span class="card-num">${String(index+1).padStart(2,'0')} / LIST</span><h3>${esc(list.title)}</h3><p>${esc(list.from)} → ${esc(list.to)}</p><div class="card-foot"><span>${list.words.length} woorden</span><span>${result} →</span></div></button>`;
}
function bindCards(root){ root.querySelectorAll('[data-list-id]').forEach(card=>card.addEventListener('click',()=>openList(card.dataset.listId))); }
function emptyHTML(){ return `<div class="empty"><h3>Nog geen lijsten</h3><p>Maak je eerste woordenlijst en begin met leren.</p><button class="btn btn-accent" data-empty-create>Nieuwe lijst</button></div>`; }
function renderHome(){
  const root=document.querySelector('#recent-lists'), lists=data.lists.slice(0,3);
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
function shuffle(items){ const out=[...items]; for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];} return out; }
function startQuiz(mode){
  const list=listById(activeListId); if(!list?.words.length)return;
  quiz={mode,list,items:shuffle(list.words),index:0,correct:0,points:0,streak:0,answered:false}; route('quiz'); renderQuiz();
}
function renderQuiz(){
  const stage=document.querySelector('#quiz-stage'); document.querySelector('#quiz-score').textContent=quiz.points;
  document.querySelector('#quiz-progress').style.width=`${quiz.index/quiz.items.length*100}%`;
  if(quiz.index>=quiz.items.length){ finishQuiz(); return; }
  const word=quiz.items[quiz.index];
  if(quiz.mode==='type'){
    stage.innerHTML=`<div class="quiz-card"><p class="quiz-kicker">${esc(quiz.list.from)} → ${esc(quiz.list.to)} · ${quiz.index+1}/${quiz.items.length}</p><h2 class="quiz-word">${esc(word.front)}</h2><form id="answer-form"><div class="answer-wrap"><input id="answer" autocomplete="off" autocapitalize="none" placeholder="Typ de vertaling…" aria-label="Jouw antwoord"><button aria-label="Controleer">→</button></div><div id="answer-feedback" class="answer-feedback"></div></form></div>`;
    const form=document.querySelector('#answer-form'); form.addEventListener('submit',checkAnswer); document.querySelector('#answer').focus();
  }else{
    stage.innerHTML=`<div><div id="flashcard" class="flashcard" role="button" tabindex="0" aria-label="Draai flashcard om"><div class="flash-inner"><div class="flash-face"><small>${esc(quiz.list.from)} · tik om te draaien</small><strong>${esc(word.front)}</strong></div><div class="flash-face back"><small>${esc(quiz.list.to)}</small><strong>${esc(word.back)}</strong></div></div></div><div class="card-controls"><button data-rate="0">Nog leren</button><button data-rate="1">Ik wist het</button></div></div>`;
    const card=document.querySelector('#flashcard'); const flip=()=>card.classList.toggle('flipped'); card.addEventListener('click',flip); card.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter')flip()});
    document.querySelectorAll('[data-rate]').forEach(b=>b.addEventListener('click',()=>rateCard(Number(b.dataset.rate))));
  }
}
function checkAnswer(event){
  event.preventDefault(); if(quiz.answered){nextQuestion();return;}
  const input=document.querySelector('#answer'), feedback=document.querySelector('#answer-feedback'); const word=quiz.items[quiz.index]; const correct=normalize(input.value)===normalize(word.back);
  quiz.answered=true; input.disabled=true;
  if(correct){ quiz.correct++; quiz.streak++; const gained=10+Math.min(quiz.streak-1,5)*2; quiz.points+=gained; feedback.className='answer-feedback correct'; feedback.innerHTML=`✓ Goed! +${gained} XP`; }
  else { quiz.streak=0; feedback.className='answer-feedback wrong'; feedback.innerHTML=`Niet helemaal — het antwoord is <strong>${esc(word.back)}</strong>`; }
  const button=event.submitter; button.textContent='→'; button.setAttribute('aria-label','Volgende vraag'); button.focus(); document.querySelector('#quiz-score').textContent=quiz.points;
}
function nextQuestion(){ quiz.index++; quiz.answered=false; renderQuiz(); }
function rateCard(knew){ if(knew){quiz.correct++;quiz.points+=8;quiz.streak++;}else quiz.streak=0; quiz.index++; renderQuiz(); }
function finishQuiz(){
  const percent=Math.round(quiz.correct/quiz.items.length*100); const grade=(percent/10).toFixed(1).replace('.',',');
  quiz.list.lastScore=percent; data.score+=quiz.points; data.todayXp+=quiz.points; data.bestStreak=Math.max(data.bestStreak,quiz.streak); saveData();
  document.querySelector('#quiz-progress').style.width='100%';
  document.querySelector('#quiz-stage').innerHTML=`<div class="result-card"><p class="quiz-kicker">SESSION COMPLETE</p><div class="result-grade">${grade}</div><h2>${percent>=80?'Sterk werk.':percent>=55?'Goed op weg.':'Nog één ronde.'}</h2><p>${quiz.correct} van de ${quiz.items.length} goed · +${quiz.points} XP</p><div class="result-actions"><button class="btn btn-ghost" id="result-back">Naar lijst</button><button class="btn btn-accent" id="result-again">Nog een ronde ↻</button></div></div>`;
  document.querySelector('#result-back').addEventListener('click',()=>openList(quiz.list.id)); document.querySelector('#result-again').addEventListener('click',()=>startQuiz(quiz.mode));
}

document.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>route(b.dataset.route)));
document.querySelector('#hero-create').addEventListener('click',newList); document.querySelector('#library-create').addEventListener('click',newList); document.querySelector('#home-see-all').addEventListener('click',()=>route('library'));
document.querySelector('#list-search').addEventListener('input',renderLibrary); document.querySelector('#edit-list').addEventListener('click',editList); document.querySelector('#delete-list').addEventListener('click',deleteList);
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>startQuiz(b.dataset.mode))); document.querySelector('#quiz-close').addEventListener('click',()=>openList(quiz.list.id));
document.querySelector('#swap-languages').addEventListener('click',()=>{const a=document.querySelector('#language-from'),b=document.querySelector('#language-to');[a.value,b.value]=[b.value,a.value];});
document.querySelector('#list-form').addEventListener('submit',event=>{
  event.preventDefault(); const words=parseWords(document.querySelector('#word-pairs').value); if(!words.length){showToast('Gebruik een = tussen woord en vertaling');return;}
  const values={title:document.querySelector('#list-title').value.trim(),from:document.querySelector('#language-from').value.trim()||'Taal 1',to:document.querySelector('#language-to').value.trim()||'Taal 2',words};
  if(editingId){Object.assign(listById(editingId),values);activeListId=editingId;}else{activeListId=`list-${Date.now()}`;data.lists.unshift({id:activeListId,createdAt:Date.now(),lastScore:null,...values});}
  saveData(); openList(activeListId); showToast('Lijst opgeslagen');
});
updateStats(); renderHome();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
