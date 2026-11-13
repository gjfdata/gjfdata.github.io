(function(){var t=[].slice.call(document.querySelectorAll('[data-card]'));if(!t.length)return;
var srcs=[],seen={};t.forEach(function(b){var s=b.getAttribute('data-card');if(!seen[s]){seen[s]=1;srcs.push(s)}});
var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
lb.innerHTML='<img alt=""><button class="x" aria-label="닫기">×</button><button class="pv2" aria-label="이전">‹</button><button class="nx" aria-label="다음">›</button><div class="ct"></div>';
document.body.appendChild(lb);var im=lb.querySelector('img'),ct=lb.querySelector('.ct'),i=0,x0=null;
function show(k){i=(k+srcs.length)%srcs.length;im.src=srcs[i];im.alt=(i+1)+'번 카드';ct.textContent=(i+1)+' / '+srcs.length;lb.classList.add('on')}
function hide(){lb.classList.remove('on')}
t.forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();show(srcs.indexOf(b.getAttribute('data-card')))})});
lb.querySelector('.x').onclick=hide;lb.querySelector('.pv2').onclick=function(e){e.stopPropagation();show(i-1)};lb.querySelector('.nx').onclick=function(e){e.stopPropagation();show(i+1)};
lb.addEventListener('click',function(e){if(e.target===lb)hide()});
document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')hide();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)show(d<0?i+1:i-1);x0=null});})();
