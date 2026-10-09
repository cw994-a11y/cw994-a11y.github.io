const videos=[...document.querySelectorAll('.hero-video, .video-shell video')];
const dialog=document.querySelector('#pitch-dialog'),pitch=document.querySelector('#pitch-video');
prepareVideoPreviews(videos);
videos.forEach(video=>{video.muted=true;video.defaultMuted=true;});
function playDemonstrations(){if(!document.hidden&&!dialog.open)videos.forEach(video=>video.play().catch(()=>{}));}
playDemonstrations();
window.addEventListener('pageshow',playDemonstrations);
document.querySelector('[data-open-pitch]').addEventListener('click',()=>{videos.forEach(video=>video.pause());dialog.showModal();pitch.play().catch(()=>{});});
document.querySelector('#close-pitch').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{pitch.pause();playDemonstrations();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){videos.forEach(video=>video.pause());pitch.pause();}else playDemonstrations();});
const lightVideo=document.querySelector('#light-video');
const patterns={
 breathing:{src:'assets/led-breathing.mp4',text:'Breathing / Blue light gently rises and fades.'},
 rainbow:{src:'assets/led-rainbow.mp4',text:'Rainbow / A shifting spectrum of color.'},
 single:{src:'assets/led-single.mp4',text:'Single color / Turn the dial to select a steady color.'}
};
document.querySelectorAll('[data-pattern]').forEach(button=>button.addEventListener('click',()=>{
 const pattern=patterns[button.dataset.pattern];
 document.querySelectorAll('[data-pattern]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 lightVideo.poster=button.dataset.pattern==='breathing'?'assets/light.jpg':`assets/led-${button.dataset.pattern}-poster.jpg`;
 lightVideo.src=pattern.src;
 lightVideo.play().catch(()=>{});
 document.querySelector('#pattern-status').textContent=pattern.text;
}));
