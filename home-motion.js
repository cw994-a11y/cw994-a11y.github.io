(() => {
 function mountHeroPullback(scene) {
  const viewport=scene.querySelector('.scene-viewport'),content=scene.querySelector('.hero-content'),background=scene.querySelector('.scene-background'),copy=content.querySelector('.intro-copy'),portrait=content.querySelector('.intro-portrait');
  const motionPreference=matchMedia('(prefers-reduced-motion:reduce)'),shortScreen=matchMedia('(max-width:900px) and (max-height:600px)');
  const events=new AbortController(),clamp=value=>Math.max(0,Math.min(1,value));
  let target=0,progress=0,animationFrame=null,destroyed=false;
  const staticLayout=()=>motionPreference.matches||shortScreen.matches;
  function render() {
   animationFrame=null;
   progress+=(target-progress)*.085;
   if(Math.abs(target-progress)<.0001)progress=target;
   const eased=progress*progress*(3-2*progress);
   copy.style.transform=staticLayout()?'none':'translateY('+(-eased*4)+'%) scale('+(1-eased*.68)+')';
   portrait.style.transform=staticLayout()?'none':'translateY('+(-eased*7)+'%) scale('+(1-eased*.48)+')';
   background.style.opacity=staticLayout()?'0':String(clamp(progress*1.8));
   if(progress!==target)animationFrame=requestAnimationFrame(render);
  }
  function update() {
   if(destroyed)return;
   scene.classList.toggle('is-static',staticLayout());
   const distance=scene.offsetHeight-viewport.offsetHeight;
   target=staticLayout()||distance<=0?0:clamp(-scene.getBoundingClientRect().top/distance);
   if(staticLayout())progress=target;
   if(animationFrame===null)animationFrame=requestAnimationFrame(render);
  }
  scene.classList.add('is-active');
  addEventListener('scroll',update,{passive:true,signal:events.signal});
  addEventListener('resize',update,{signal:events.signal});
  motionPreference.addEventListener('change',update,{signal:events.signal});
  shortScreen.addEventListener('change',update,{signal:events.signal});
  const observer=new ResizeObserver(update);observer.observe(viewport);
  update();progress=target;
  return () => {
   destroyed=true;events.abort();observer.disconnect();
   if(animationFrame!==null)cancelAnimationFrame(animationFrame);
   scene.classList.remove('is-active','is-static');copy.style.removeProperty('transform');portrait.style.removeProperty('transform');background.style.removeProperty('opacity');
  };
 }
 const scene=document.querySelector('.scroll-scene');
 let cleanup=mountHeroPullback(scene);
 // Static document lifecycle: release listeners/RAF on exit, rebind after bfcache restoration.
 addEventListener('pagehide',()=>{cleanup();cleanup=null;});
 addEventListener('pageshow',()=>{if(!cleanup)cleanup=mountHeroPullback(scene);});
})();
