const demonstrations=[...document.querySelectorAll('.hero-video, .video-grid video')];
const filmDialog=document.querySelector('#film-dialog');
const fullFilm=document.querySelector('#full-film');
prepareVideoPreviews(demonstrations);
demonstrations.forEach(video=>{video.muted=true;video.defaultMuted=true;});
function resumeClips(){if(!document.hidden&&!filmDialog.open)demonstrations.forEach(video=>video.play().catch(()=>{}));}
resumeClips();
window.addEventListener('pageshow',resumeClips);
document.querySelector('[data-open-film]').addEventListener('click',()=>{demonstrations.forEach(video=>video.pause());filmDialog.showModal();fullFilm.play().catch(()=>{});});
document.querySelector('[data-close-film]').addEventListener('click',()=>filmDialog.close());
filmDialog.addEventListener('close',()=>{fullFilm.pause();resumeClips();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){demonstrations.forEach(video=>video.pause());fullFilm.pause();}else resumeClips();});
