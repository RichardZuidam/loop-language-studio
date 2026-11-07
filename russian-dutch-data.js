// Beginnerscursus Russisch voor Nederlandstaligen.
window.RU_NL_BEGINNER_LISTS = [
  {id:'ru-nl-alphabet',title:'01 — Cyrillisch alfabet',from:'Russisch',to:'Nederlandse klank',words:[
    ['А а','a'],['Б б','b'],['В в','v'],['Г г','g'],['Д д','d'],['Е е','je / e'],['Ё ё','jo'],['Ж ж','zj'],['З з','z'],['И и','ie'],['Й й','korte j'],['К к','k'],['Л л','l'],['М м','m'],['Н н','n'],['О о','o'],['П п','p'],['Р р','rollende r'],['С с','s'],['Т т','t'],['У у','oe'],['Ф ф','f'],['Х х','ch, zoals in lach'],['Ц ц','ts'],['Ч ч','tsj'],['Ш ш','sj'],['Щ щ','sjtsj'],['Ъ ъ','hard teken'],['Ы ы','harde i-klank'],['Ь ь','zacht teken'],['Э э','è'],['Ю ю','joe'],['Я я','ja']
  ]},
  {id:'ru-nl-basics-1',title:'02 — Eerste woorden',from:'Nederlands',to:'Russisch',words:[
    ['hallo','привет'],['goedendag','здравствуйте'],['tot ziens','до свидания'],['ja','да'],['nee','нет'],['alsjeblieft','пожалуйста'],['bedankt','спасибо'],['sorry','извините'],['goed','хорошо'],['slecht','плохо'],['ik','я'],['jij / u','ты / вы'],['hij','он'],['zij','она'],['wij','мы'],['zij (meervoud)','они'],['dit','это'],['hier','здесь'],['daar','там'],['wie','кто']
  ]},
  {id:'ru-nl-basics-2',title:'03 — Mensen en familie',from:'Nederlands',to:'Russisch',words:[
    ['man','мужчина'],['vrouw','женщина'],['jongen','мальчик'],['meisje','девочка'],['vriend','друг'],['vriendin','подруга'],['familie','семья'],['moeder','мама'],['vader','папа'],['broer','брат'],['zus','сестра'],['kind','ребёнок'],['naam','имя'],['mens','человек'],['mensen','люди'],['huis','дом'],['werk','работа'],['school','школа'],['stad','город'],['land','страна']
  ]},
  {id:'ru-nl-basics-3',title:'04 — Dagelijks leven',from:'Nederlands',to:'Russisch',words:[
    ['water','вода'],['eten','еда'],['brood','хлеб'],['koffie','кофе'],['thee','чай'],['ochtend','утро'],['dag','день'],['avond','вечер'],['nacht','ночь'],['vandaag','сегодня'],['morgen','завтра'],['nu','сейчас'],['tijd','время'],['veel','много'],['weinig','мало'],['groot','большой'],['klein','маленький'],['nieuw','новый'],['oud','старый'],['mooi','красивый']
  ]},
  {id:'ru-nl-basics-4',title:'05 — Handige werkwoorden',from:'Nederlands',to:'Russisch',words:[
    ['zijn','быть'],['hebben','иметь'],['doen','делать'],['gaan','идти'],['komen','приходить'],['wonen','жить'],['werken','работать'],['leren','учить'],['spreken','говорить'],['begrijpen','понимать'],['weten','знать'],['zien','видеть'],['horen','слышать'],['willen','хотеть'],['kunnen','мочь'],['houden van','любить'],['eten','есть'],['drinken','пить'],['lezen','читать'],['schrijven','писать']
  ]},
  {id:'ru-nl-basics-5',title:'06 — Vragen en onderweg',from:'Nederlands',to:'Russisch',words:[
    ['wat','что'],['waar','где'],['wanneer','когда'],['waarom','почему'],['hoe','как'],['hoeveel','сколько'],['welke','какой'],['winkel','магазин'],['restaurant','ресторан'],['hotel','отель'],['station','вокзал'],['straat','улица'],['auto','машина'],['trein','поезд'],['links','налево'],['rechts','направо'],['rechtdoor','прямо'],['dichtbij','близко'],['ver','далеко'],['hulp','помощь']
  ]}
].map(list=>({...list,createdAt:Date.now(),lastScore:null,source:'LOOP beginnerscursus Russisch',words:list.words.map(([front,back])=>({front,back}))}));

window.RU_NL_BEGINNER_SENTENCES = [
  {id:'ru-nl-sentences-1',title:'Kennismaken',description:'Jezelf voorstellen en iemand begroeten.',sentences:[
    ['Hallo!','Привет!'],['Goedendag.','Здравствуйте.'],['Hoe heet je?','Как тебя зовут?'],['Ik heet Richard.','Меня зовут Ричард.'],['Aangenaam kennis te maken.','Очень приятно.'],['Hoe gaat het?','Как дела?'],['Het gaat goed.','Всё хорошо.'],['Waar kom je vandaan?','Откуда ты?'],['Ik kom uit Nederland.','Я из Нидерландов.'],['Tot ziens!','До свидания!']
  ]},
  {id:'ru-nl-sentences-2',title:'Basisgesprek',description:'Korte zinnen die je iedere dag gebruikt.',sentences:[
    ['Ik begrijp het.','Я понимаю.'],['Ik begrijp het niet.','Я не понимаю.'],['Spreek langzaam, alstublieft.','Говорите медленно, пожалуйста.'],['Kunt u dat herhalen?','Повторите, пожалуйста.'],['Wat betekent dit?','Что это значит?'],['Ik spreek een beetje Russisch.','Я немного говорю по-русски.'],['Ik leer Russisch.','Я учу русский язык.'],['Dat is goed.','Это хорошо.'],['Ik weet het niet.','Я не знаю.'],['Geen probleem.','Нет проблем.']
  ]},
  {id:'ru-nl-sentences-3',title:'Eten en drinken',description:'Bestellen en zeggen wat je wilt.',sentences:[
    ['Ik wil graag water.','Я хочу воду.'],['Een koffie, alstublieft.','Кофе, пожалуйста.'],['Ik heb honger.','Я голоден.'],['Ik heb dorst.','Я хочу пить.'],['Dit is lekker.','Это вкусно.'],['Wat wilt u?','Что вы хотите?'],['Ik wil graag bestellen.','Я хочу сделать заказ.'],['Hoeveel kost dit?','Сколько это стоит?'],['De rekening, alstublieft.','Счёт, пожалуйста.'],['Bedankt voor het eten.','Спасибо за еду.']
  ]},
  {id:'ru-nl-sentences-4',title:'Onderweg',description:'De weg vragen en reizen.',sentences:[
    ['Waar is het station?','Где вокзал?'],['Waar is het hotel?','Где отель?'],['Hoe kom ik daar?','Как туда добраться?'],['Ga rechtdoor.','Идите прямо.'],['Ga naar links.','Идите налево.'],['Ga naar rechts.','Идите направо.'],['Is het ver?','Это далеко?'],['Het is dichtbij.','Это близко.'],['Ik heb een taxi nodig.','Мне нужно такси.'],['Help me, alstublieft.','Помогите мне, пожалуйста.']
  ]},
  {id:'ru-nl-sentences-5',title:'Over jezelf',description:'Vertellen over je leven en voorkeuren.',sentences:[
    ['Ik woon in Nederland.','Я живу в Нидерландах.'],['Ik werk vandaag.','Я сегодня работаю.'],['Ik houd van muziek.','Я люблю музыку.'],['Ik lees graag.','Я люблю читать.'],['Ik drink graag koffie.','Я люблю кофе.'],['Ik heb een broer.','У меня есть брат.'],['Dit is mijn familie.','Это моя семья.'],['Ik ben moe.','Я устал.'],['Ik ben blij.','Я рад.'],['Tot morgen!','До завтра!']
  ]}
].map(pack=>({...pack,lastScore:null,sentences:pack.sentences.map(([nl,ru])=>({vi:ru,nl,literal:'',note:'',mastery:0}))}));

window.RU_NL_READING_SERIES = [
  {id:'ru-dialogue-01',title:'Russische dialogen 01 — Kennismaken',lines:[
    ['Анна: Привет! Как тебя зовут?','Anna: Hoi! Hoe heet je?'],['Ричард: Меня зовут Ричард. А тебя?','Richard: Ik heet Richard. En jij?'],['Анна: Я Анна. Очень приятно.','Anna: Ik ben Anna. Aangenaam.'],['Ричард: Мне тоже приятно.','Richard: Ook aangenaam.'],['Анна: Ты из Нидерландов?','Anna: Kom je uit Nederland?'],['Ричард: Да, я из Амстердама.','Richard: Ja, ik kom uit Amsterdam.'],['Анна: Ты говоришь по-русски?','Anna: Spreek je Russisch?'],['Ричард: Немного. Я только начинаю.','Richard: Een beetje. Ik begin pas.']
  ]},
  {id:'ru-dialogue-02',title:'Russische dialogen 02 — In het café',lines:[
    ['Официант: Добрый день. Что вы хотите?','Ober: Goedendag. Wat wilt u?'],['Ричард: Кофе, пожалуйста.','Richard: Een koffie, alstublieft.'],['Официант: С молоком или без?','Ober: Met melk of zonder?'],['Ричард: С молоком, пожалуйста.','Richard: Met melk, alstublieft.'],['Официант: Что-нибудь поесть?','Ober: Wilt u iets eten?'],['Ричард: Да, один бутерброд.','Richard: Ja, één broodje.'],['Официант: Хорошо. Ещё что-нибудь?','Ober: Goed. Nog iets?'],['Ричард: Нет, спасибо.','Richard: Nee, bedankt.']
  ]},
  {id:'ru-dialogue-03',title:'Russische dialogen 03 — Plannen voor vandaag',lines:[
    ['Анна: Что ты делаешь сегодня?','Anna: Wat ga je vandaag doen?'],['Ричард: Утром я работаю.','Richard: In de ochtend werk ik.'],['Анна: А после работы?','Anna: En na het werk?'],['Ричард: Я иду в магазин.','Richard: Ik ga naar de winkel.'],['Анна: Ты свободен вечером?','Anna: Ben je ’s avonds vrij?'],['Ричард: Да, после семи.','Richard: Ja, na zeven uur.'],['Анна: Давай выпьем кофе.','Anna: Laten we koffie drinken.'],['Ричард: Хорошая идея!','Richard: Goed idee!']
  ]},
  {id:'ru-dialogue-04',title:'Russische dialogen 04 — In de winkel',lines:[
    ['Ричард: Извините, сколько это стоит?','Richard: Pardon, hoeveel kost dit?'],['Продавец: Это стоит пятьсот рублей.','Verkoper: Dit kost vijfhonderd roebel.'],['Ричард: У вас есть другой цвет?','Richard: Heeft u een andere kleur?'],['Продавец: Да, есть синий и чёрный.','Verkoper: Ja, er is blauw en zwart.'],['Ричард: Можно посмотреть синий?','Richard: Mag ik de blauwe bekijken?'],['Продавец: Конечно. Вот, пожалуйста.','Verkoper: Natuurlijk. Alstublieft.'],['Ричард: Хорошо, я беру.','Richard: Goed, ik neem hem.'],['Продавец: Оплата картой?','Verkoper: Betaling met de kaart?']
  ]},
  {id:'ru-dialogue-05',title:'Russische dialogen 05 — De weg vragen',lines:[
    ['Ричард: Извините, где метро?','Richard: Pardon, waar is de metro?'],['Анна: Идите прямо до светофора.','Anna: Ga rechtdoor tot het verkeerslicht.'],['Ричард: А потом?','Richard: En daarna?'],['Анна: Потом поверните направо.','Anna: Sla daarna rechtsaf.'],['Ричард: Это далеко?','Richard: Is het ver?'],['Анна: Нет, пять минут пешком.','Anna: Nee, vijf minuten lopen.'],['Ричард: Можете повторить медленнее?','Richard: Kunt u het langzamer herhalen?'],['Анна: Конечно. Прямо, потом направо.','Anna: Natuurlijk. Rechtdoor, daarna rechtsaf.']
  ]},
  {id:'ru-dialogue-06',title:'Russische dialogen 06 — Familie',lines:[
    ['Анна: У тебя большая семья?','Anna: Heb je een grote familie?'],['Ричард: Не очень. У меня есть брат.','Richard: Niet echt. Ik heb een broer.'],['Анна: Где он живёт?','Anna: Waar woont hij?'],['Ричард: Он живёт в Роттердаме.','Richard: Hij woont in Rotterdam.'],['Анна: Вы часто видитесь?','Anna: Zien jullie elkaar vaak?'],['Ричард: Да, примерно раз в неделю.','Richard: Ja, ongeveer één keer per week.'],['Анна: А твои родители?','Anna: En je ouders?'],['Ричард: Они живут недалеко от меня.','Richard: Ze wonen niet ver van mij.']
  ]},
  {id:'ru-dialogue-07',title:'Russische dialogen 07 — Gevoelens',lines:[
    ['Анна: Ты сегодня какой-то тихий.','Anna: Je bent vandaag een beetje stil.'],['Ричард: Да, я немного устал.','Richard: Ja, ik ben een beetje moe.'],['Анна: Всё хорошо?','Anna: Gaat alles goed?'],['Ричард: Я немного переживаю из-за работы.','Richard: Ik maak me een beetje zorgen over mijn werk.'],['Анна: Хочешь поговорить об этом?','Anna: Wil je erover praten?'],['Ричард: Да, но мне трудно объяснить.','Richard: Ja, maar ik vind het moeilijk om uit te leggen.'],['Анна: Ничего. Я тебя слушаю.','Anna: Geeft niet. Ik luister naar je.'],['Ричард: Спасибо. Для меня это важно.','Richard: Bedankt. Dat is belangrijk voor mij.']
  ]},
  {id:'ru-dialogue-08',title:'Russische dialogen 08 — Weekendplannen',lines:[
    ['Анна: Какие у тебя планы на выходные?','Anna: Wat zijn je plannen voor het weekend?'],['Ричард: Если будет хорошая погода, я поеду за город.','Richard: Als het mooi weer is, ga ik de stad uit.'],['Анна: Ты поедешь один?','Anna: Ga je alleen?'],['Ричард: Нет, с друзьями.','Richard: Nee, met vrienden.'],['Анна: Что вы будете делать?','Anna: Wat gaan jullie doen?'],['Ричард: Немного гулять и отдыхать.','Richard: Een beetje wandelen en ontspannen.'],['Анна: Звучит хорошо.','Anna: Dat klinkt goed.'],['Ричард: Хочешь поехать с нами?','Richard: Wil je met ons meegaan?']
  ]}
].map((episode,index)=>({id:episode.id,title:episode.title,sourceLanguage:'ru',targetLanguage:'nl',series:'Russische dialogen',episode:index+1,text:episode.lines.map(line=>line[0]).join('\n'),lineTranslations:episode.lines.map(line=>line[1]),clickedWords:[],createdAt:Date.now()-index,updatedAt:Date.now()-index}));

