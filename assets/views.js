// 조회수: GoatCounter(gjf-graphicnews)로 집계하고, data-views 요소에 누적 숫자를 표시한다.
(function(){
  var C='https://gjf-graphicnews.goatcounter.com';
  var s=document.createElement('script');s.async=true;s.src='https://gc.zgo.at/count.js';s.setAttribute('data-goatcounter',C+'/count');document.head.appendChild(s);
  function get(p){
    return fetch(C+'/counter/'+encodeURIComponent(p)+'.json')
      .then(function(r){if(r.status===404)return {count:'0'};if(!r.ok)throw 0;return r.json();})
      .then(function(j){return j.count;}).catch(function(){return null;});
  }
  var els=document.querySelectorAll('[data-views]');
  for(var i=0;i<els.length;i++)(function(el){
    get(el.getAttribute('data-views')).then(function(n){
      if(n===null)return;el.textContent=(el.getAttribute('data-label')||'조회수')+' '+n;el.hidden=false;
    });
  })(els[i]);
})();
