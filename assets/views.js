// 조회수: GoatCounter(gjf-graphicnews)로 집계하고, data-views 요소에 숫자를 표시한다.
// data-range: day(일간) | month(월간) | all(누적). GoatCounter 공개 카운터는 날짜를 UTC로만 나누므로
// 날짜도 UTC로 잡는다(일간 = 한국 시간 오전 9시부터 다음 날 오전 9시 전까지). 한국 날짜로 잡으면 0~9시에 일간이 0으로 나온다.
(function(){
  var C='https://gjf-graphicnews.goatcounter.com';
  var s=document.createElement('script');s.async=true;s.src='https://gc.zgo.at/count.js';s.setAttribute('data-goatcounter',C+'/count');document.head.appendChild(s);
  function ymd(d){return d.toISOString().slice(0,10);}
  var now=new Date(), today=ymd(now), tomorrow=ymd(new Date(now.getTime()+864e5));
  var range={day:'?start='+today+'&end='+tomorrow, month:'?start='+today.slice(0,8)+'01&end='+tomorrow, all:'?start=2026-11-01&end='+tomorrow};
  function get(p,r){
    return fetch(C+'/counter/'+encodeURIComponent(p)+'.json'+(range[r]||range.all))
      .then(function(x){if(x.status===404)return {count:'0'};if(!x.ok)throw 0;return x.json();})
      .then(function(j){return j.count;}).catch(function(){return null;});
  }
  var els=document.querySelectorAll('[data-views]');
  for(var i=0;i<els.length;i++)(function(el){
    var parts=el.querySelectorAll('[data-range]'), list=parts.length?parts:[el], done=0, ok=0;
    for(var k=0;k<list.length;k++)(function(t){
      get(el.getAttribute('data-views'),t.getAttribute('data-range')).then(function(n){
        if(n!==null){t.textContent=(t.getAttribute('data-label')||'조회수')+' '+n;ok++;}
        if(++done===list.length&&ok)el.hidden=false;
      });
    })(list[k]);
  })(els[i]);
})();
