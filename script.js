let video = document.getElementById('player_video');
let toggle = document.getElementById('player_button toggle');
let play = document.getElementById('play');
let pause = document.getElementById('pause');
let progressBar = document.getElementById('progress_filled');
let volume = document.getElementById('volume');
let playbackSpeed = document.getElementById('playbackSpeed');
let rewind = document.getElementById('rewind');
let skip = document.getElementById('skip');


play.style.display = 'block';
pause.style.display = 'none';


toggle.addEventListener('click',()=>{
	if(video.paused || video.ended){
		play.style.display = 'block';
		pause.style.display = 'none';
		video.play();
	}else{
		play.style.display = 'none';
		pause.style.display = 'block';
		video.pause();
	}
})

video.addEventListener("loadedmetadata",()=>{
	progressBar.setAttribute('max',video.duration);
})

video.addEventListener('timeupdate',()=>{
	if(!progressBar.getAttribute('max')){
		progressBar.setAttribute('max',video.duration);
	}
	if(video.ended || video.paused){
		play.style.display = 'none';
		pause.style.display = 'block';
	}
	progressBar.value = video.currentTime;
})

progressBar.addEventListener("click", (e) => {
  if (!Number.isFinite(video.duration)) return;
  const rect = progressBar.getBoundingClientRect();
  const pos = (e.pageX - rect.left) / progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

playbackSpeed.addEventListener('click',()=>{
	let val = playbackSpeed.textContent;
	if(val == '16x'){
		playbackSpeed.textContent = '1x';
		playSpeed(1);
	}else{
		let n = val[0];
		n *= 2;
		playbackSpeed.textContent = n + 'x';
		playSpeed(n);
	}
})

rewind.addEventListener('click',()=>{
	video.currentTime -= 10;
});

skip.addEventListener('click',()=>{
	video.currentTime += 25;
})

function setVolume(val){
	video.volume = val/100;
}

function playSpeed(val){
	video.playbackRate = `${val}`;
}
