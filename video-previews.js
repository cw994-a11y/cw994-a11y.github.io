// Keep an original still visible while the browser buffers or seeks a loop.
function prepareVideoPreviews(videos){
 videos.forEach(video=>{
  const frame=document.createElement('div');
  frame.className=video.classList.contains('hero-video')?'hero-media':'video-preview';
  video.before(frame);
  frame.append(video);
  const poster=()=>{frame.style.backgroundImage=`url("${video.poster}")`;};
  const reveal=()=>{if(video.readyState>=2)video.style.opacity='1';};
  poster();
  video.style.opacity=video.readyState>=2?'1':'0';
  video.addEventListener('loadstart',()=>{poster();video.style.opacity='0';});
  video.addEventListener('loadeddata',reveal);
  video.addEventListener('playing',reveal);
  video.addEventListener('seeked',reveal);
  video.addEventListener('waiting',()=>{if(video.readyState<2)video.style.opacity='0';});
  video.addEventListener('error',()=>{video.style.opacity='0';});
 });
}
