const previews=Array.from(document.querySelectorAll('video[autoplay]'));
prepareVideoPreviews(previews);
function playPreviews(){previews.forEach(video=>{video.muted=true;video.play().catch(()=>{});});}
playPreviews();
window.addEventListener('pageshow',playPreviews);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)playPreviews();});
