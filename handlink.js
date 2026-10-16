const demo=document.querySelector('.demo video');
prepareVideoPreviews([demo]);
function playDemo(){demo.muted=true;demo.play().catch(()=>{});}
playDemo();
window.addEventListener('pageshow',playDemo);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)playDemo();});
