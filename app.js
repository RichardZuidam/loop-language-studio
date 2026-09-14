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
  score: 0, bestStreak: 0, todayXp: 0,
  sentencePacks: starterSentencePacks,
  lists: [{
    id: 'vietnamese-starter', title: 'Vietnamees — Start', from: 'Vietnamees', to: 'Nederlands', createdAt: Date.now(), lastScore: null,
    words: [
      { front: 'xin chào', back: 'hallo' }, { front: 'cảm ơn', back: 'bedankt' },
      { front: 'tạm biệt', back: 'tot ziens' }, { front: 'vâng', back: 'ja' },
      { front: 'không', back: 'nee' }, { front: 'bạn khỏe không?', back: 'hoe gaat het met je?' }
    ]
  }, ...frequencyLists]
};
let data = loadData();
let activeListId = null, editingId = null, quiz = null, activeSentencePackId = null, editingSentencePackId = null;

function loadData(){
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(!stored) return structuredClone(seed);
    if(!Array.isArray(stored.sentencePacks)) stored.sentencePacks=structuredClone(starterSentencePacks);
    starterSentencePacks.forEach(pack=>{if(!stored.sentencePacks.some(item=>item.id===pack.id))stored.sentencePacks.push(structuredClone(pack));});
    frequencyLists.forEach(list => { if(!stored.lists.some(item => item.id === list.id)) stored.lists.push(structuredClone(list)); });
    return stored;
  } catch { return structuredClone(seed); }
}
function saveData(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); updateStats(); }
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
  quiz={kind:'sentence',mode,pack,items:shuffle(pack.sentences),index:0,correct:0,points:0,streak:0,answered:false,selected:[]};route('quiz');renderQuiz();
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
  if(quiz.kind==='sentence'){renderSentenceQuestion();return;}
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
  const sentence=quiz.items[quiz.index],feedback=document.querySelector('#answer-feedback');quiz.answered=true;
  if(correct){const gained=quiz.mode==='translate'?15:10;awardSentence(sentence,gained);feedback.className='answer-feedback correct';feedback.innerHTML=`✓ ${exact?'Helemaal goed!':'Goed — dit antwoord klopt ook.'} +${gained} XP <button class="feedback-next" id="sentence-next">Volgende →</button>`;}
  else{quiz.streak=0;sentence.mastery=Math.max(0,(sentence.mastery||0)-1);feedback.className='answer-feedback wrong';feedback.innerHTML=`Nog niet. <strong>${esc(sentence.vi)}</strong>${sentence.note?`<small>${esc(sentence.note)}</small>`:''}<div class="feedback-actions"><button id="accept-sentence">Mijn antwoord goedkeuren</button><button id="sentence-next">Volgende →</button></div>`;document.querySelector('#accept-sentence').addEventListener('click',()=>{awardSentence(sentence,8);nextQuestion();});}
  document.querySelector('#sentence-next').addEventListener('click',nextQuestion);
}
function checkBuiltSentence(){if(quiz.answered){nextQuestion();return;}const sentence=quiz.items[quiz.index],given=quiz.selected.map(token=>token.word).join(' ');sentenceFeedback(normalize(given)===normalize(sentence.vi),true);}
function checkSentenceTranslation(event){
  event.preventDefault();if(quiz.answered){nextQuestion();return;}const input=document.querySelector('#sentence-answer'),sentence=quiz.items[quiz.index],given=normalize(input.value),expected=normalize(sentence.vi);
  input.disabled=true;const distance=editDistance(given,expected),close=given===expected||(expected.length>=12&&distance<=2);sentenceFeedback(close,given===expected);
}
function checkAnswer(event){
  event.preventDefault(); if(quiz.answered){nextQuestion();return;}
  const input=document.querySelector('#answer'), feedback=document.querySelector('#answer-feedback'); const word=quiz.items[quiz.index]; const exact=normalize(input.value)===normalize(word.back); const correct=answersMatch(input.value,word.back);
  quiz.answered=true; input.disabled=true;
  if(correct){ quiz.correct++; quiz.streak++; const gained=10+Math.min(quiz.streak-1,5)*2; quiz.points+=gained; feedback.className='answer-feedback correct'; feedback.innerHTML=exact?`✓ Goed! +${gained} XP`:`✓ Goed — vergelijkbaar antwoord! +${gained} XP`; }
  else { quiz.streak=0; feedback.className='answer-feedback wrong'; feedback.innerHTML=`Niet helemaal — het antwoord is <strong>${esc(word.back)}</strong>`; }
  const button=event.submitter; button.textContent='→'; button.setAttribute('aria-label','Volgende vraag'); button.focus(); document.querySelector('#quiz-score').textContent=quiz.points;
}
function nextQuestion(){ quiz.index++; quiz.answered=false; renderQuiz(); }
function rateCard(knew){ if(knew){quiz.correct++;quiz.points+=8;quiz.streak++;}else quiz.streak=0; quiz.index++; renderQuiz(); }
function finishQuiz(){
  const percent=Math.round(quiz.correct/quiz.items.length*100); const grade=(percent/10).toFixed(1).replace('.',',');
  if(quiz.kind==='sentence'){
    quiz.pack.lastScore=percent;data.score+=quiz.points;data.todayXp+=quiz.points;data.bestStreak=Math.max(data.bestStreak,quiz.streak);saveData();
    document.querySelector('#quiz-progress').style.width='100%';
    document.querySelector('#quiz-stage').innerHTML=`<div class="result-card"><p class="quiz-kicker">SENTENCE SESSION COMPLETE</p><div class="result-grade">${grade}</div><h2>${percent>=80?'Sterk gebouwd.':percent>=55?'Goed op weg.':'Nog één ronde.'}</h2><p>${quiz.correct} van de ${quiz.items.length} goed · +${quiz.points} XP</p><div class="result-actions"><button class="btn btn-ghost" id="result-back">Naar thema</button><button class="btn btn-accent" id="result-again">Nog een ronde ↻</button></div></div>`;
    document.querySelector('#result-back').addEventListener('click',()=>openSentencePack(quiz.pack.id));document.querySelector('#result-again').addEventListener('click',()=>startSentenceQuiz(quiz.mode));return;
  }
  quiz.list.lastScore=percent; data.score+=quiz.points; data.todayXp+=quiz.points; data.bestStreak=Math.max(data.bestStreak,quiz.streak); saveData();
  document.querySelector('#quiz-progress').style.width='100%';
  document.querySelector('#quiz-stage').innerHTML=`<div class="result-card"><p class="quiz-kicker">SESSION COMPLETE</p><div class="result-grade">${grade}</div><h2>${percent>=80?'Sterk werk.':percent>=55?'Goed op weg.':'Nog één ronde.'}</h2><p>${quiz.correct} van de ${quiz.items.length} goed · +${quiz.points} XP</p><div class="result-actions"><button class="btn btn-ghost" id="result-back">Naar lijst</button><button class="btn btn-accent" id="result-again">Nog een ronde ↻</button></div></div>`;
  document.querySelector('#result-back').addEventListener('click',()=>openList(quiz.list.id)); document.querySelector('#result-again').addEventListener('click',()=>startQuiz(quiz.mode));
}

document.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>route(b.dataset.route)));
document.querySelector('#hero-create').addEventListener('click',newList); document.querySelector('#library-create').addEventListener('click',newList); document.querySelector('#home-see-all').addEventListener('click',()=>route('library'));
document.querySelector('#list-search').addEventListener('input',renderLibrary); document.querySelector('#edit-list').addEventListener('click',editList); document.querySelector('#delete-list').addEventListener('click',deleteList);
document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>startQuiz(b.dataset.mode))); document.querySelector('#quiz-close').addEventListener('click',()=>quiz?.kind==='sentence'?openSentencePack(quiz.pack.id):openList(quiz.list.id));
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
updateStats(); renderHome();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));

