(() => {
  const translations = {
    en: {
      'Home':'Home','Lijsten':'Lists','Zinnen':'Sentences','Stats':'Stats','Inloggen':'Log in','Account':'Account','Uitloggen':'Log out',
      'Language studio':'Language studio','Jouw taal.':'Your language.','Jouw account.':'Your account.','Profiel.':'Profile.',
      'Gebruik LOOP gratis als gast, of log in om op ieder apparaat te synchroniseren.':'Use LOOP free as a guest, or log in to sync across devices.',
      'Account maken':'Create account','E-mailadres':'Email address','Wachtwoord':'Password','Wachtwoord vergeten?':'Forgot password?',
      'Exporteer mijn gegevens ↗':'Export my data ↗','Je download bevat je lijsten, zinnen, XP en voortgang.':'Your download contains your lists, sentences, XP and progress.',
      'Maak je eigen woordenlijsten. Oefen slim. Bouw elke dag aan een taal die van jou wordt.':'Create your own word lists. Practise smart. Build your language every day.',
      'Dagelijkse ronde':'Daily round','Nieuwe lijst':'New list','Vandaag':'Today','Beste reeks':'Best streak','Vandaag te doen':'Due today','Beheerst':'Mastered','Ooit geoefend':'Practised',
      'Jouw lijsten':'Your lists','Bekijk alles →':'View all →','Dit is pas':'This is only','het begin.':'the beginning.','Woorden':'Words','Lijsten, flashcards en overhoringen.':'Lists, flashcards and quizzes.',
      'Zinsbouw en context leren begrijpen.':'Learn sentence structure and context.','Spraak':'Speech','Luisteren, inspreken en uitspraak trainen.':'Listen, speak and train pronunciation.',
      '+ Nieuwe lijst':'+ New list','Zoek een lijst':'Search lists','+ Nieuwe zinnen':'+ New sentences','Leer betekenis én woordvolgorde':'Learn meaning and word order',
      'Nieuwe zinnen.':'New sentences.','Naam van het thema':'Theme name','Zinnen':'Sentences','één paar per regel':'one pair per line','Annuleren':'Cancel','Opslaan':'Save','Bewerk':'Edit','Verwijder':'Delete',
      'Zin bouwen':'Build sentence','Tik woorden in de juiste volgorde':'Tap words in the correct order','Zelf vertalen':'Translate yourself','Typ de Vietnamese zin':'Type the Vietnamese sentence','Alle zinnen':'All sentences',
      'Nieuwe lijst.':'New list.','Naam van de lijst':'List name','Van':'From','Naar':'To','Woorden':'Words','Maak/importeer foto':'Take/import photo','Lijst opslaan':'Save list','Alle lijsten':'All lists',
      'Overhoren':'Quiz','Typ zelf de vertaling':'Type the translation','Meerkeuze':'Multiple choice','Kies de juiste vertaling':'Choose the correct translation','Flashcards':'Flashcards','Draai om en beoordeel jezelf':'Flip and rate yourself','Gemixt oefenen':'Mixed practice','Typen, kiezen en flashcards door elkaar':'Typing, choices and flashcards mixed','Alle woorden':'All words',
      'Skip':'Skip','Jouw':'Your','groei.':'growth.','Huidige reeks':'Current streak','Deze week':'This week','Volgende herhaling':'Next review','Weekactiviteit':'Weekly activity','Moeilijke woorden':'Difficult words','Voortgang per lijst':'Progress by list',
      'Nog geen moeilijke woorden. Start een ronde.':'No difficult words yet. Start a round.','Maak eerst een woordenlijst.':'Create a word list first.','Nog niets gepland':'Nothing scheduled','Vandaag':'Today',
      'Nog geen lijsten':'No lists yet','Maak je eerste woordenlijst en begin met leren.':'Create your first word list and start learning.','Nog niet geoefend':'Not practised yet','Nog één ronde.':'One more round.','Goed op weg.':'Good progress.','Sterk werk.':'Great work.','Sterk gebouwd.':'Well built.',
      'Naar lijst':'Back to list','Naar thema':'Back to theme','Nog een ronde ↻':'Another round ↻','Controleer':'Check','Volgende →':'Next →','Nog leren':'Keep learning','Ik wist het':'I knew it','Toch goed rekenen':'Mark as correct','Mijn antwoord goedkeuren':'Accept my answer',
      'Typ de vertaling…':'Type the translation…','Typ de Vietnamese zin…':'Type the Vietnamese sentence…','Alles is voor vandaag herhaald':'Everything for today is reviewed','Je bent uitgelogd':'You are logged out','Online opslaan lukt nog niet':'Online saving is not working yet','Even geduld…':'One moment…'
    },
    ru: {
      'Home':'Главная','Lijsten':'Списки','Zinnen':'Предложения','Stats':'Статистика','Inloggen':'Войти','Account':'Аккаунт','Uitloggen':'Выйти',
      'Language studio':'Языковая студия','Jouw taal.':'Твой язык.','Jouw account.':'Твой аккаунт.','Profiel.':'Профиль.',
      'Gebruik LOOP gratis als gast, of log in om op ieder apparaat te synchroniseren.':'Используй LOOP бесплатно как гость или войди для синхронизации на всех устройствах.',
      'Account maken':'Создать аккаунт','E-mailadres':'Электронная почта','Wachtwoord':'Пароль','Wachtwoord vergeten?':'Забыли пароль?',
      'Exporteer mijn gegevens ↗':'Экспортировать данные ↗','Je download bevat je lijsten, zinnen, XP en voortgang.':'Файл содержит списки, предложения, XP и прогресс.',
      'Maak je eigen woordenlijsten. Oefen slim. Bouw elke dag aan een taal die van jou wordt.':'Создавай свои списки слов. Учись эффективно. Развивай язык каждый день.',
      'Dagelijkse ronde':'Ежедневная тренировка','Nieuwe lijst':'Новый список','Vandaag':'Сегодня','Beste reeks':'Лучшая серия','Vandaag te doen':'На сегодня','Beheerst':'Освоено','Ooit geoefend':'Изучалось',
      'Jouw lijsten':'Твои списки','Bekijk alles →':'Показать все →','Dit is pas':'Это только','het begin.':'начало.','Woorden':'Слова','Lijsten, flashcards en overhoringen.':'Списки, карточки и тесты.',
      'Zinsbouw en context leren begrijpen.':'Изучай структуру предложений и контекст.','Spraak':'Речь','Luisteren, inspreken en uitspraak trainen.':'Слушай, говори и тренируй произношение.',
      '+ Nieuwe lijst':'+ Новый список','Zoek een lijst':'Поиск списка','+ Nieuwe zinnen':'+ Новые предложения','Leer betekenis én woordvolgorde':'Изучай значение и порядок слов',
      'Nieuwe zinnen.':'Новые предложения.','Naam van het thema':'Название темы','Zinnen':'Предложения','één paar per regel':'одна пара на строку','Annuleren':'Отмена','Opslaan':'Сохранить','Bewerk':'Изменить','Verwijder':'Удалить',
      'Zin bouwen':'Собрать предложение','Tik woorden in de juiste volgorde':'Нажимай слова в правильном порядке','Zelf vertalen':'Перевести самостоятельно','Typ de Vietnamese zin':'Напиши предложение на вьетнамском','Alle zinnen':'Все предложения',
      'Nieuwe lijst.':'Новый список.','Naam van de lijst':'Название списка','Van':'С','Naar':'На','Woorden':'Слова','Maak/importeer foto':'Сделать/загрузить фото','Lijst opslaan':'Сохранить список','Alle lijsten':'Все списки',
      'Overhoren':'Тест','Typ zelf de vertaling':'Напиши перевод','Meerkeuze':'Выбор ответа','Kies de juiste vertaling':'Выбери правильный перевод','Flashcards':'Карточки','Draai om en beoordeel jezelf':'Переверни и оцени себя','Gemixt oefenen':'Смешанная практика','Typen, kiezen en flashcards door elkaar':'Ввод, выбор и карточки вперемешку','Alle woorden':'Все слова',
      'Skip':'Пропустить','Jouw':'Твой','groei.':'прогресс.','Huidige reeks':'Текущая серия','Deze week':'На этой неделе','Volgende herhaling':'Следующее повторение','Weekactiviteit':'Активность за неделю','Moeilijke woorden':'Сложные слова','Voortgang per lijst':'Прогресс по спискам',
      'Nog geen moeilijke woorden. Start een ronde.':'Сложных слов пока нет. Начни тренировку.','Maak eerst een woordenlijst.':'Сначала создай список слов.','Nog niets gepland':'Пока ничего не запланировано',
      'Nog geen lijsten':'Списков пока нет','Maak je eerste woordenlijst en begin met leren.':'Создай первый список и начни учиться.','Nog niet geoefend':'Ещё не изучалось','Nog één ronde.':'Ещё один раунд.','Goed op weg.':'Хороший прогресс.','Sterk werk.':'Отличная работа.','Sterk gebouwd.':'Отлично составлено.',
      'Naar lijst':'К списку','Naar thema':'К теме','Nog een ronde ↻':'Ещё один раунд ↻','Controleer':'Проверить','Volgende →':'Далее →','Nog leren':'Повторить','Ik wist het':'Я знал','Toch goed rekenen':'Засчитать правильным','Mijn antwoord goedkeuren':'Принять мой ответ',
      'Typ de vertaling…':'Напиши перевод…','Typ de Vietnamese zin…':'Напиши предложение на вьетнамском…','Alles is voor vandaag herhaald':'На сегодня всё повторено','Je bent uitgelogd':'Вы вышли из аккаунта','Online opslaan lukt nog niet':'Не удалось сохранить онлайн','Even geduld…':'Подождите…'
    }
  };
  const originals = new WeakMap();
  const excluded = '.word-row,.sentence-row,.quiz-word,.sentence-prompt,.flash-face strong,.list-card h3,.sentence-pack h2,input,textarea,option';
  let language = localStorage.getItem('loop-language') || 'nl';
  const translateValue = value => {
    if(language==='nl') return value;
    const clean=value.trim(), translated=translations[language]?.[clean];
    if(translated) return value.replace(clean,translated);
    let match=clean.match(/^(\d+) lijsten?$/);if(match)return `${match[1]} ${language==='ru'?'списков':'lists'}`;
    match=clean.match(/^(\d+) woorden$/);if(match)return `${match[1]} ${language==='ru'?'слов':'words'}`;
    match=clean.match(/^(\d+) dagen?$/);if(match)return `${match[1]} ${language==='ru'?'дней':'days'}`;
    match=clean.match(/^(\d+)% laatste score$/);if(match)return language==='ru'?`Последний результат: ${match[1]}%`:`${match[1]}% last score`;
    return value;
  };
  function translateNode(node){
    if(node.nodeType===Node.TEXT_NODE){const parent=node.parentElement;if(!parent||parent.closest(excluded)||!node.nodeValue.trim())return;if(!originals.has(node))originals.set(node,node.nodeValue);node.nodeValue=translateValue(originals.get(node));return;}
    if(node.nodeType!==Node.ELEMENT_NODE)return;
    if(node.matches(excluded))return;
    ['placeholder','title','aria-label'].forEach(attr=>{if(node.hasAttribute(attr)){const key=`data-i18n-${attr}`;if(!node.hasAttribute(key))node.setAttribute(key,node.getAttribute(attr));node.setAttribute(attr,translateValue(node.getAttribute(key)));}});
    node.childNodes.forEach(translateNode);
  }
  function applyLanguage(next=language){language=next;localStorage.setItem('loop-language',language);document.documentElement.lang=language;document.querySelector('#language-select')&&(document.querySelector('#language-select').value=language);translateNode(document.body);}
  const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(translateNode)));
  window.LOOP_I18N={t:translateValue,apply:applyLanguage,get language(){return language;}};
  document.addEventListener('DOMContentLoaded',()=>{document.querySelector('#language-select')?.addEventListener('change',event=>applyLanguage(event.target.value));applyLanguage();observer.observe(document.body,{childList:true,subtree:true});});
})();

