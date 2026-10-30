const reducedMotion=matchMedia('(prefers-reduced-motion:reduce)');
const scene=document.querySelector('.intro-scroll'),intro=document.querySelector('.intro'),work=document.querySelector('.work-section'),stage=document.querySelector('.project-stage'),projects=Array.from(stage.children);
const clamp=value=>Math.max(0,Math.min(1,value));
const ease=value=>{value=clamp(value);return value*value*(3-2*value);};
let frame=0;
document.documentElement.classList.add('motion-ready');
function render(){
 frame=0;const rect=scene.getBoundingClientRect(),mobile=innerWidth<=760;
 const progress=reducedMotion.matches?1:clamp(-rect.top/Math.max(1,rect.height-innerHeight)),retreat=ease(progress/.9),copy=1-ease(progress/.35),camera=2.5-1.5*retreat;
 scene.style.setProperty('--camera-scale',camera.toFixed(4));scene.style.setProperty('--portrait-scale',(camera*.4*(mobile?1-.45*retreat:1)).toFixed(4));
 scene.style.setProperty('--copy-opacity',copy.toFixed(3));scene.style.setProperty('--copy-z',(-160*retreat).toFixed(1)+'px');scene.style.setProperty('--copy-events',copy>.3?'auto':'none');
 scene.style.setProperty('--work-heading',ease((progress-.72)/.15).toFixed(3));scene.style.setProperty('--work-events',progress>.82?'auto':'none');
 intro.inert=!reducedMotion.matches&&progress>.3;work.inert=!reducedMotion.matches&&progress<=.82;
 const width=stage.clientWidth,height=stage.clientHeight,cardWidth=Math.min(250,width*(mobile?.4:.225));
 stage.style.setProperty('--project-width',cardWidth+'px');
 projects.forEach((project,i)=>{
  const side=i%2===0?-1:1,row=Math.floor(i/2),arrive=ease((progress-.22)/.48);
  const x=side*width*(mobile?.257:(row===1?.29:.31)),y=(row-1)*height*(mobile?.235:.26);
  project.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';
  project.style.opacity=arrive.toFixed(3);
 });
}
function requestRender(){if(!frame)frame=requestAnimationFrame(render);}
addEventListener('scroll',requestRender,{passive:true});addEventListener('resize',requestRender);reducedMotion.addEventListener('change',requestRender);
new ResizeObserver(requestRender).observe(stage);
function showWork(){if(reducedMotion.matches)return;const rect=scene.getBoundingClientRect();scrollTo({top:scrollY+rect.top+rect.height-innerHeight,behavior:'smooth'});}
document.querySelectorAll('a[href="#work"]').forEach(link=>link.addEventListener('click',event=>{if(reducedMotion.matches)return;event.preventDefault();history.replaceState(null,'','#work');showWork();}));
document.querySelectorAll('.wordmark,.site-footer a[href="#main"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();history.replaceState(null,'','#main');scrollTo({top:0,behavior:reducedMotion.matches?'instant':'smooth'});}));
render();if(location.hash==='#work')requestAnimationFrame(showWork);
