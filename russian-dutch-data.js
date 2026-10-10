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

