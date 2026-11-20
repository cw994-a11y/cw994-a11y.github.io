/* Shared behaviour for the MR demo pages: play clips only while visible, full-demo dialog. */
(function(){
  var $=function(s){return document.querySelector(s)}, $$=function(s){return [].slice.call(document.querySelectorAll(s))};
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function play(v){if(reduce)return; var p=v.play(); if(p&&p.catch)p.catch(function(){})}
  var vids=$$('video[data-auto]');
  if('IntersectionObserver' in window){
    var vo=new IntersectionObserver(function(es){es.forEach(function(e){
      var v=e.target;
      if(e.isIntersecting){ if(v.preload==='none') v.preload='metadata'; play(v) } else v.pause();
    })},{threshold:.2});
    vids.forEach(function(v){vo.observe(v)});
  } else vids.forEach(play);
  var dlg=$('#film'), fv=$('#filmVideo');
  if(dlg&&fv){
    $$('[data-film]').forEach(function(b){b.addEventListener('click',function(){ if(dlg.showModal){dlg.showModal(); fv.currentTime=0; play(fv)} else window.open(fv.getAttribute('src')) })});
    $('#closeFilm').addEventListener('click',function(){fv.pause();dlg.close()});
    dlg.addEventListener('close',function(){fv.pause()});
    dlg.addEventListener('click',function(e){if(e.target===dlg){fv.pause();dlg.close()}});
  }
})();
