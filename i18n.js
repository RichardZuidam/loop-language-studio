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
      'Typ de vertaling…':'Type the translation…','Typ de Vietnamese zin…':'Type the Vietnamese sentence…','Alles is voor vandaag herhaald':'Everything for today is reviewed','Je bent uitgelogd':'You are logged out','Online opslaan lukt nog niet':'Online saving is not working yet','Even geduld…':'One moment…','Leren in context':'Learn in context','Leg de functie van het woord uit':'Explain the word’s function','Wat betekent of doet':'What does','in deze zin?':'mean or do in this sentence?','Leg het in je eigen woorden uit…':'Explain it in your own words…','Mijn uitleg ook goedkeuren':'Accept my explanation too','Goede uitleg!':'Good explanation!'
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
      'Typ de vertaling…':'Напиши перевод…','Typ de Vietnamese zin…':'Напиши предложение на вьетнамском…','Alles is voor vandaag herhaald':'На сегодня всё повторено','Je bent uitgelogd':'Вы вышли из аккаунта','Online opslaan lukt nog niet':'Не удалось сохранить онлайн','Even geduld…':'Подождите…','Leren in context':'Учить в контексте','Leg de functie van het woord uit':'Объясни функцию слова','Wat betekent of doet':'Что означает или делает','in deze zin?':'в этом предложении?','Leg het in je eigen woorden uit…':'Объясни своими словами…','Mijn uitleg ook goedkeuren':'Засчитать моё объяснение','Goede uitleg!':'Хорошее объяснение!'
    }
  };
  Object.assign(translations.en, {
    'WOORDEN':'WORDS','LIJSTEN.':'LISTS.','ZINNEN':'SENTENCES','IN CONTEXT.':'IN CONTEXT.','JOUW':'YOUR','GROEI.':'GROWTH.',
    'YOUR COLLECTION':'YOUR COLLECTION','YOUR PROGRESS / 03':'YOUR PROGRESS / 03','YOUR PERSONAL LANGUAGE SYSTEM / 01':'YOUR PERSONAL LANGUAGE SYSTEM / 01','WORDS':'WORDS','THAT STICK.':'THAT STICK.',
    'HUIDIGE REEKS':'CURRENT STREAK','DEZE WEEK':'THIS WEEK','VOLGENDE HERHALING':'NEXT REVIEW','VANDAAG TE DOEN':'DUE TODAY','BEHEERST':'MASTERED','OOIT GEOEFEND':'PRACTISED',
    'Vietnamees':'Vietnamese','Nederlands':'Dutch','Vietnamees → Nederlands':'Vietnamese → Dutch','VIETNAMEES → NEDERLANDS':'VIETNAMESE → DUTCH','TAAL → TAAL':'LANGUAGE → LANGUAGE',
    'Vietnamese frequentie 001–100':'Vietnamese frequency 001–100','Vietnamese frequentie 101–200':'Vietnamese frequency 101–200','Vietnamese frequentie 201–300':'Vietnamese frequency 201–300','Vietnamees — Start':'Vietnamese — Starter',
    'Elke dag':'Every day','Gewone zinnen voor je dagelijkse routine.':'Common sentences for your daily routine.','Kennismaken':'Introductions','Begroeten, voorstellen en eenvoudige gesprekjes.':'Greetings, introductions and simple conversations.','Eten & drinken':'Food & drinks','Bestellen en praten over wat je lekker vindt.':'Order food and talk about what you like.',
    '← Terug naar zinnen':'← Back to sentences','← Alle thema\'s':'← All themes','← Terug naar lijsten':'← Back to lists','← Alle lijsten':'← All lists','NIEUWE ZINNEN.':'NEW SENTENCES.','NIEUWE LIJST.':'NEW LIST.','THEMA':'THEME','LIJST':'LIST',
    'Gebruik = tussen de Vietnamese zin en de Nederlandse betekenis.':'Use = between the Vietnamese sentence and its meaning.','Gebruik =, een tab of een puntkomma tussen het woord en de vertaling.':'Use =, a tab or a semicolon between the word and its translation.',
    'Tekst wordt toegevoegd als je browser fotoherkenning ondersteunt.':'Text will be added if your browser supports photo recognition.','Gratis Vietnamees':'Free Vietnamese','Privacy':'Privacy',
    'Naar home':'Go home','Hoofdnavigatie':'Main navigation','Taal':'Language','Inloggen of account openen':'Log in or open account','Donker thema':'Dark mode','Totaal aantal punten':'Total points','Luister naar uitspraak':'Listen to pronunciation',
    'Bijv. In het restaurant':'E.g. At the restaurant','Bijv. Vietnamees — Les 1':'E.g. Vietnamese — Lesson 1','Talen omwisselen':'Swap languages','Voor deze lijst zijn nog geen contextvoorbeelden':'There are no context examples for this list yet'
  });
  Object.assign(translations.en, {'KIES JE':'CHOOSE YOUR','UITDAGING.':'CHALLENGE.','Wil je de Nederlandse vertaling van de voorbeeldzin zien?':'Would you like to see the translation of the example sentence?','Met vertaling':'With translation','Zonder vertaling':'Without translation','Vertaling verborgen':'Translation hidden'});
  Object.assign(translations.ru, {'KIES JE':'ВЫБЕРИ','UITDAGING.':'СЛОЖНОСТЬ.','Wil je de Nederlandse vertaling van de voorbeeldzin zien?':'Показать перевод примера?','Met vertaling':'С переводом','Zonder vertaling':'Без перевода','Vertaling verborgen':'Перевод скрыт'});
  Object.assign(translations.ru, {
    'WOORDEN':'СЛОВА','LIJSTEN.':'СПИСКИ.','ZINNEN':'ПРЕДЛОЖЕНИЯ','IN CONTEXT.':'В КОНТЕКСТЕ.','JOUW':'ТВОЙ','GROEI.':'ПРОГРЕСС.',
    'YOUR COLLECTION':'ТВОЯ КОЛЛЕКЦИЯ','YOUR PROGRESS / 03':'ТВОЙ ПРОГРЕСС / 03','YOUR PERSONAL LANGUAGE SYSTEM / 01':'ТВОЯ ЯЗЫКОВАЯ СИСТЕМА / 01','WORDS':'СЛОВА','THAT STICK.':'КОТОРЫЕ ЗАПОМНЯТСЯ.',
    'HUIDIGE REEKS':'ТЕКУЩАЯ СЕРИЯ','DEZE WEEK':'НА ЭТОЙ НЕДЕЛЕ','VOLGENDE HERHALING':'СЛЕДУЮЩЕЕ ПОВТОРЕНИЕ','VANDAAG TE DOEN':'НА СЕГОДНЯ','BEHEERST':'ОСВОЕНО','OOIT GEOEFEND':'ИЗУЧАЛОСЬ',
    'Vietnamees':'Вьетнамский','Nederlands':'Нидерландский','Vietnamees → Nederlands':'Вьетнамский → Нидерландский','VIETNAMEES → NEDERLANDS':'ВЬЕТНАМСКИЙ → НИДЕРЛАНДСКИЙ','TAAL → TAAL':'ЯЗЫК → ЯЗЫК',
    'Vietnamese frequentie 001–100':'Частотный вьетнамский 001–100','Vietnamese frequentie 101–200':'Частотный вьетнамский 101–200','Vietnamese frequentie 201–300':'Частотный вьетнамский 201–300','Vietnamees — Start':'Вьетнамский — Начало',
    'Elke dag':'Каждый день','Gewone zinnen voor je dagelijkse routine.':'Обычные фразы для повседневной жизни.','Kennismaken':'Знакомство','Begroeten, voorstellen en eenvoudige gesprekjes.':'Приветствия, знакомства и простые разговоры.','Eten & drinken':'Еда и напитки','Bestellen en praten over wat je lekker vindt.':'Заказывай еду и говори о своих предпочтениях.',
    '← Terug naar zinnen':'← Назад к предложениям','← Alle thema\'s':'← Все темы','← Terug naar lijsten':'← Назад к спискам','← Alle lijsten':'← Все списки','NIEUWE ZINNEN.':'НОВЫЕ ПРЕДЛОЖЕНИЯ.','NIEUWE LIJST.':'НОВЫЙ СПИСОК.','THEMA':'ТЕМА','LIJST':'СПИСОК',
    'Gebruik = tussen de Vietnamese zin en de Nederlandse betekenis.':'Используй = между вьетнамским предложением и его значением.','Gebruik =, een tab of een puntkomma tussen het woord en de vertaling.':'Используй =, табуляцию или точку с запятой между словом и переводом.',
    'Tekst wordt toegevoegd als je browser fotoherkenning ondersteunt.':'Текст добавится, если браузер поддерживает распознавание фото.','Gratis Vietnamees':'Бесплатный вьетнамский','Privacy':'Конфиденциальность',
    'Naar home':'На главную','Hoofdnavigatie':'Главная навигация','Taal':'Язык','Inloggen of account openen':'Войти или открыть аккаунт','Donker thema':'Тёмная тема','Totaal aantal punten':'Всего очков','Luister naar uitspraak':'Слушать произношение',
    'Bijv. In het restaurant':'Например: В ресторане','Bijv. Vietnamees — Les 1':'Например: Вьетнамский — Урок 1','Talen omwisselen':'Поменять языки','Voor deze lijst zijn nog geen contextvoorbeelden':'Для этого списка пока нет примеров контекста'
  });
  Object.assign(translations.en, {'OEFENRICHTING':'PRACTICE DIRECTION','KIES JE':'CHOOSE YOUR','RICHTING.':'DIRECTION.','Welke kant wil je deze ronde oefenen?':'Which direction would you like to practise?','Vietnamees → Nederlands':'Vietnamese → Dutch','Nederlands → Vietnamees':'Dutch → Vietnamese','Beide richtingen':'Both directions','CONTEXT KIEZEN':'CHOOSE CONTEXT','Welke uitleg past bij':'Which explanation matches','VUL HET WOORD IN':'FILL IN THE WORD','Welk woord ontbreekt?':'Which word is missing?','Typ het Vietnamese woord…':'Type the Vietnamese word…','Het ontbrekende woord is':'The missing word is','Oefen':'Practise','fout opnieuw':'mistake again','fouten opnieuw':'mistakes again'});
  Object.assign(translations.ru, {'OEFENRICHTING':'НАПРАВЛЕНИЕ','KIES JE':'ВЫБЕРИ','RICHTING.':'НАПРАВЛЕНИЕ.','Welke kant wil je deze ronde oefenen?':'Какое направление ты хочешь тренировать?','Vietnamees → Nederlands':'Вьетнамский → Нидерландский','Nederlands → Vietnamees':'Нидерландский → Вьетнамский','Beide richtingen':'Оба направления','CONTEXT KIEZEN':'ВЫБЕРИ КОНТЕКСТ','Welke uitleg past bij':'Какое объяснение подходит к','VUL HET WOORD IN':'ВСТАВЬ СЛОВО','Welk woord ontbreekt?':'Какого слова не хватает?','Typ het Vietnamese woord…':'Введи вьетнамское слово…','Het ontbrekende woord is':'Пропущенное слово','Oefen':'Повторить','fout opnieuw':'ошибку','fouten opnieuw':'ошибки'});
  Object.assign(translations.en, {'JOUW':'YOUR','ROUTE.':'JOURNEY.','HUIDIG NIVEAU':'CURRENT LEVEL','Begin je eerste ronde.':'Start your first round.','LEERTIJD':'STUDY TIME','Road to Fluency':'Road to Fluency','Woorden':'Words','Zinnen':'Sentences','Vaardigheden':'Skills','Persoonlijk advies':'Personal advice','Totaal':'Total','Nieuw':'New','Leren':'Learning','Geleerd':'Learned','Te herhalen':'Due for review','Moeilijk':'Difficult','Woordherkenning':'Word recognition','Woordproductie':'Word production','Contextbegrip':'Context comprehension','Zinsbouw':'Sentence building','Zelf vertalen':'Translate yourself','vragen':'questions','min':'min'});
  Object.assign(translations.ru, {'JOUW':'ТВОЙ','ROUTE.':'ПУТЬ.','HUIDIG NIVEAU':'ТЕКУЩИЙ УРОВЕНЬ','Begin je eerste ronde.':'Начни первую тренировку.','LEERTIJD':'ВРЕМЯ УЧЁБЫ','Road to Fluency':'Путь к свободному владению','Woorden':'Слова','Zinnen':'Предложения','Vaardigheden':'Навыки','Persoonlijk advies':'Личная рекомендация','Totaal':'Всего','Nieuw':'Новое','Leren':'Изучается','Geleerd':'Выучено','Te herhalen':'Повторить','Moeilijk':'Сложные','Woordherkenning':'Распознавание слов','Woordproductie':'Воспроизведение слов','Contextbegrip':'Понимание контекста','Zinsbouw':'Построение предложений','Zelf vertalen':'Самостоятельный перевод','vragen':'вопросов','min':'мин'});
  Object.assign(translations.en, {
    'LIJST BEWERKEN.':'EDIT LIST.','ZINNEN BEWERKEN.':'EDIT SENTENCES.','Jouw eigen zinnenlijst.':'Your own sentence list.','THEMA':'THEME','BEHEERST':'MASTERED','LEREN':'LEARNING','NIEUW':'NEW','beheerst':'mastered',
    'Lijst verwijderd':'List deleted','Zinnenthema verwijderd':'Sentence theme deleted','Zinnen opgeslagen':'Sentences saved','Lijst opgeslagen':'List saved','Account actief; database moet nog worden ingesteld':'Account active; the database still needs setup',
    'Controleer je e-mail en bevestig je account.':'Check your email and confirm your account.','Vul eerst je e-mailadres in.':'Enter your email address first.','Herstellink verstuurd naar je e-mail.':'Password reset link sent to your email.','De accountverbinding kon niet worden geladen.':'The account connection could not be loaded.',
    'Niet helemaal —':'Not quite —','Niet helemaal — het antwoord is':'Not quite — the answer is','Goed!':'Correct!','Helemaal goed!':'Exactly right!','Goed — dit antwoord klopt ook.':'Correct — this answer works too.','Goed — vergelijkbaar antwoord!':'Correct — similar answer!','Nog niet.':'Not yet.',
    'NEDERLANDS → VIETNAMEES':'DUTCH → VIETNAMESE','BOUW DE VIETNAMESE ZIN':'BUILD THE VIETNAMESE SENTENCE','MEERKEUZE':'MULTIPLE CHOICE','LEREN IN CONTEXT':'LEARN IN CONTEXT','tik om te draaien':'tap to flip','Jouw antwoord':'Your answer','Volgende vraag':'Next question','Draai flashcard om':'Flip flashcard',
    'Tekst op de foto herkennen…':'Recognising text in the photo…','Tekst toegevoegd. Zet tussen ieder woordpaar nog een = en controleer de accenten.':'Text added. Add = between each word pair and check the accents.','Deze foto kon niet worden gelezen. Probeer een scherpere foto of typ de woorden handmatig.':'This photo could not be read. Try a clearer photo or enter the words manually.','Automatische tekstherkenning wordt op deze browser nog niet ondersteund. Typ of plak de lijst hieronder.':'Automatic text recognition is not supported in this browser yet. Type or paste the list below.'
  });
  Object.assign(translations.ru, {
    'LIJST BEWERKEN.':'ИЗМЕНИТЬ СПИСОК.','ZINNEN BEWERKEN.':'ИЗМЕНИТЬ ПРЕДЛОЖЕНИЯ.','Jouw eigen zinnenlijst.':'Твой собственный список предложений.','THEMA':'ТЕМА','BEHEERST':'ОСВОЕНО','LEREN':'ИЗУЧАЕТСЯ','NIEUW':'НОВОЕ','beheerst':'освоено',
    'Lijst verwijderd':'Список удалён','Zinnenthema verwijderd':'Тема предложений удалена','Zinnen opgeslagen':'Предложения сохранены','Lijst opgeslagen':'Список сохранён','Account actief; database moet nog worden ingesteld':'Аккаунт активен; базу данных ещё нужно настроить',
    'Controleer je e-mail en bevestig je account.':'Проверь почту и подтверди аккаунт.','Vul eerst je e-mailadres in.':'Сначала введи электронную почту.','Herstellink verstuurd naar je e-mail.':'Ссылка для восстановления отправлена на почту.','De accountverbinding kon niet worden geladen.':'Не удалось загрузить подключение аккаунта.',
    'Niet helemaal —':'Не совсем —','Niet helemaal — het antwoord is':'Не совсем — правильный ответ','Goed!':'Правильно!','Helemaal goed!':'Совершенно верно!','Goed — dit antwoord klopt ook.':'Правильно — этот ответ тоже подходит.','Goed — vergelijkbaar antwoord!':'Правильно — похожий ответ!','Nog niet.':'Пока нет.',
    'NEDERLANDS → VIETNAMEES':'НИДЕРЛАНДСКИЙ → ВЬЕТНАМСКИЙ','BOUW DE VIETNAMESE ZIN':'СОБЕРИ ВЬЕТНАМСКОЕ ПРЕДЛОЖЕНИЕ','MEERKEUZE':'ВЫБОР ОТВЕТА','LEREN IN CONTEXT':'УЧИТЬ В КОНТЕКСТЕ','tik om te draaien':'нажми, чтобы перевернуть','Jouw antwoord':'Твой ответ','Volgende vraag':'Следующий вопрос','Draai flashcard om':'Перевернуть карточку',
    'Tekst op de foto herkennen…':'Распознаём текст на фото…','Tekst toegevoegd. Zet tussen ieder woordpaar nog een = en controleer de accenten.':'Текст добавлен. Поставь = между парами слов и проверь диакритику.','Deze foto kon niet worden gelezen. Probeer een scherpere foto of typ de woorden handmatig.':'Не удалось прочитать фото. Попробуй более чёткое или введи слова вручную.','Automatische tekstherkenning wordt op deze browser nog niet ondersteund. Typ of plak de lijst hieronder.':'Этот браузер пока не поддерживает распознавание текста. Введи или вставь список ниже.'
  });
  const originals = new WeakMap();
  const excluded = '.word-row,.sentence-row,.quiz-word,.sentence-prompt,.context-example,.context-translation,.flash-face strong,input,textarea,option';
  let language = localStorage.getItem('loop-language') || 'nl';
  const translateValue = value => {
    if(language==='nl') return value;
    const clean=value.trim(), translated=translations[language]?.[clean];
    if(translated) return value.replace(clean,translated);
    let match=clean.match(/^(\d+) lijsten?$/);if(match)return `${match[1]} ${language==='ru'?'списков':'lists'}`;
    match=clean.match(/^(\d+) woorden$/);if(match)return `${match[1]} ${language==='ru'?'слов':'words'}`;
    match=clean.match(/^(\d+) dagen?$/);if(match)return `${match[1]} ${language==='ru'?'дней':'days'}`;
    match=clean.match(/^(\d+)% laatste score$/i);if(match)return language==='ru'?`Последний результат: ${match[1]}%`:`${match[1]}% last score`;
    match=clean.match(/^(\d+) \/ LIST$/i);if(match)return `${match[1]} / ${language==='ru'?'СПИСОК':'LIST'}`;
    match=clean.match(/^(\d+) zinnen$/i);if(match)return `${match[1]} ${language==='ru'?'предложений':'sentences'}`;
    match=clean.match(/^(\d+) thema(?:'s)?$/i);if(match)return `${match[1]} ${language==='ru'?'тем':'themes'}`;
    match=clean.match(/^Oefen (\d+) fouten? opnieuw$/i);if(match)return language==='ru'?`Повторить ошибки: ${match[1]}`:`Practise ${match[1]} ${match[1]==='1'?'mistake':'mistakes'} again`;
    if(language==='en')return value.replace(/laatste score/gi,'last score').replace(/woorden/gi,'words').replace(/zinnen/gi,'sentences').replace(/dagen/gi,'days').replace(/fout/gi,'wrong');
    if(language==='ru')return value.replace(/laatste score/gi,'последний результат').replace(/woorden/gi,'слов').replace(/zinnen/gi,'предложений').replace(/dagen/gi,'дней').replace(/fout/gi,'ошибок');
    return value;
  };
  function translateNode(node){
    if(node.nodeType===Node.TEXT_NODE){const parent=node.parentElement;if(!parent||parent.closest(excluded)||!node.nodeValue.trim())return;if(!originals.has(node))originals.set(node,node.nodeValue);node.nodeValue=translateValue(originals.get(node));return;}
    if(node.nodeType!==Node.ELEMENT_NODE)return;
    ['placeholder','title','aria-label'].forEach(attr=>{if(node.hasAttribute(attr)){const key=`data-i18n-${attr}`;if(!node.hasAttribute(key))node.setAttribute(key,node.getAttribute(attr));node.setAttribute(attr,translateValue(node.getAttribute(key)));}});
    if(node.matches(excluded))return;
    node.childNodes.forEach(translateNode);
  }
  function applyLanguage(next=language){language=next;localStorage.setItem('loop-language',language);document.documentElement.lang=language;document.querySelector('#language-select')&&(document.querySelector('#language-select').value=language);translateNode(document.body);}
  const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(translateNode)));
  window.LOOP_I18N={t:translateValue,apply:applyLanguage,get language(){return language;}};
  document.addEventListener('DOMContentLoaded',()=>{document.querySelector('#language-select')?.addEventListener('change',event=>applyLanguage(event.target.value));applyLanguage();observer.observe(document.body,{childList:true,subtree:true});});
})();

