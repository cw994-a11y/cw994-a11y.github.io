const demo=document.querySelector('.hero-video');
const videos=Array.from(document.querySelectorAll('video[autoplay]'));
prepareVideoPreviews([demo]);
function playDemo(){videos.forEach(video=>{video.muted=true;video.play().catch(()=>{});});}
playDemo();
window.addEventListener('pageshow',playDemo);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)playDemo();});
