// Persoonlijke A2-focus voor Richard: routes begrijpen en emoties genuanceerd uitdrukken.
window.VI_RICHARD_FOCUS_LISTS = [
  {id:'vi-focus-directions',title:'Route volgen — kernwoorden',from:'Vietnamees',to:'Nederlands',words:[
    ['đi thẳng','rechtdoor gaan'],['rẽ trái','linksaf slaan'],['rẽ phải','rechtsaf slaan'],['quay lại','omkeren / teruggaan'],['đi qua','langs / doorheen gaan'],['băng qua','oversteken'],['ngã tư','kruispunt'],['ngã ba','driesprong'],['đèn giao thông','verkeerslicht'],['vòng xuyến','rotonde'],['bên trái','aan de linkerkant'],['bên phải','aan de rechterkant'],['đối diện','tegenover'],['bên cạnh','naast'],['ở giữa','tussen / in het midden'],['gần','dichtbij'],['xa','ver weg'],['cho đến khi','totdat']
  ]},
  {id:'vi-focus-emotions',title:'Emoties — meer diepgang',from:'Vietnamees',to:'Nederlands',words:[
    ['cảm thấy','zich voelen'],['vui','blij'],['buồn','verdrietig'],['lo lắng','bezorgd'],['thất vọng','teleurgesteld'],['tức giận','boos'],['ngạc nhiên','verrast'],['bối rối','verward / ongemakkelijk'],['cô đơn','eenzaam'],['nhớ','missen'],['tự hào','trots'],['biết ơn','dankbaar'],['thoải mái','op zijn gemak'],['căng thẳng','gespannen / gestrest'],['sợ','bang'],['hy vọng','hopen'],['thật sự','echt / werkelijk'],['hơi','een beetje'],['khó diễn tả','moeilijk uit te leggen'],['cần thời gian','tijd nodig hebben']
  ]},
  {id:'vi-focus-nuance',title:'Gesprekken — redenen en nuance',from:'Vietnamees',to:'Nederlands',words:[
    ['bởi vì','omdat'],['vì vậy','daarom'],['mặc dù','hoewel'],['nhưng','maar'],['nếu','als / indien'],['có lẽ','misschien'],['theo mình','volgens mij'],['dường như','het lijkt alsof'],['điều đó làm mình','dat maakt mij'],['mình không chắc','ik weet het niet zeker'],['mình hiểu ý bạn','ik begrijp wat je bedoelt'],['ý mình là','wat ik bedoel is']
  ]}
].map(list=>({...list,createdAt:Date.now(),lastScore:null,source:'LOOP persoonlijke A2-route',words:list.words.map(([front,back])=>({front,back}))}));

window.VI_RICHARD_FOCUS_SENTENCES = [
  {id:'vi-focus-route-instructions',title:'Een route stap voor stap',description:'Luister naar routes met meerdere stappen.',sentences:[
    ['Đi thẳng đến ngã tư.','Ga rechtdoor tot het kruispunt.'],['Sau đó rẽ trái.','Sla daarna linksaf.'],['Đi qua đèn giao thông rồi rẽ phải.','Ga langs het verkeerslicht en sla daarna rechtsaf.'],['Băng qua đường ở ngã tư.','Steek de straat over bij het kruispunt.'],['Đi thẳng cho đến khi bạn thấy ngân hàng.','Ga rechtdoor totdat je de bank ziet.'],['Nó ở bên phải, đối diện khách sạn.','Het is rechts, tegenover het hotel.'],['Đi qua cầu rồi quay lại bên trái.','Ga over de brug en ga daarna links terug.'],['Ở vòng xuyến, đi theo lối ra thứ hai.','Neem op de rotonde de tweede afslag.'],['Nhà ga ở giữa ngân hàng và siêu thị.','Het station ligt tussen de bank en de supermarkt.'],['Đi bộ khoảng năm phút.','Het is ongeveer vijf minuten lopen.']
  ]},
  {id:'vi-focus-route-clarify',title:'Doorvragen als je de route niet begrijpt',description:'Laat iemand vertragen, herhalen en verduidelijken.',sentences:[
    ['Bạn có thể nói chậm hơn không?','Kun je langzamer praten?'],['Bạn có thể nhắc lại không?','Kun je dat herhalen?'],['Sau đó tôi phải đi đâu?','Waar moet ik daarna heen?'],['Tôi rẽ ở ngã tư thứ nhất hay thứ hai?','Sla ik af bij het eerste of tweede kruispunt?'],['Chỗ đó có gần đây không?','Is die plek dichtbij?'],['Đi bộ mất bao lâu?','Hoe lang duurt het te voet?'],['Bạn có thể chỉ trên bản đồ không?','Kun je het op de kaart aanwijzen?'],['Tôi bị lạc.','Ik ben verdwaald.'],['Tôi có đi đúng hướng không?','Ga ik de goede kant op?'],['Ý bạn là tôi phải quay lại à?','Bedoel je dat ik terug moet gaan?']
  ]},
  {id:'vi-focus-emotion-sentences',title:'Vertellen hoe je je echt voelt',description:'Meer zeggen dan alleen blij of verdrietig.',sentences:[
    ['Hôm nay mình cảm thấy hơi buồn.','Vandaag voel ik me een beetje verdrietig.'],['Mình lo vì chưa biết chuyện gì sẽ xảy ra.','Ik ben bezorgd omdat ik niet weet wat er zal gebeuren.'],['Mình hơi thất vọng, nhưng mình hiểu.','Ik ben een beetje teleurgesteld, maar ik begrijp het.'],['Điều đó làm mình rất vui.','Daar word ik erg blij van.'],['Mình nhớ gia đình.','Ik mis mijn familie.'],['Mình tự hào về bạn.','Ik ben trots op jou.'],['Mình thật sự biết ơn.','Ik ben echt dankbaar.'],['Dạo này mình hơi căng thẳng.','De laatste tijd ben ik wat gespannen.'],['Mình cần một chút thời gian.','Ik heb even tijd nodig.'],['Mình không biết diễn tả thế nào.','Ik weet niet hoe ik het moet uitleggen.']
  ]},
  {id:'vi-focus-deeper-conversation',title:'Een gesprek verdiepen',description:'Reageren, doorvragen en je reden uitleggen.',sentences:[
    ['Tại sao bạn cảm thấy như vậy?','Waarom voel je je zo?'],['Chuyện gì làm bạn lo lắng?','Waar maak je je zorgen over?'],['Bạn muốn nói thêm về chuyện đó không?','Wil je daar meer over vertellen?'],['Mình hiểu ý bạn.','Ik begrijp wat je bedoelt.'],['Theo mình, điều đó không dễ chút nào.','Volgens mij is dat helemaal niet makkelijk.'],['Mặc dù khó, mình vẫn muốn thử.','Hoewel het moeilijk is, wil ik het toch proberen.'],['Có lẽ mình cần suy nghĩ thêm.','Misschien moet ik er langer over nadenken.'],['Ý mình là mình cần được lắng nghe.','Wat ik bedoel, is dat ik gehoord wil worden.'],['Mình cảm thấy tốt hơn sau khi nói chuyện.','Ik voel me beter nadat we hebben gepraat.'],['Cảm ơn bạn đã chia sẻ với mình.','Bedankt dat je dit met me hebt gedeeld.']
  ]}
].map(pack=>({...pack,lastScore:null,sentences:pack.sentences.map(([vi,nl])=>({vi,nl,literal:'',note:'',mastery:0}))}));

