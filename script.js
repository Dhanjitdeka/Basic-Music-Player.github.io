const musicContainer = document.querySelector('.music-container');
const title = document.querySelector('#title');
const progressContainer  = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const audio = document.querySelector('#audio');
const cover = document.querySelector('#cover');

//song titles
const songTitles = ['Bluesy Wednesday','Dear God','Fireflies Owl City'];

//keep track of the songs

let songIndex = 0;

//initially load song
loadSong(songTitles[songIndex]);

//update the song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong(){
    musicContainer.classList.add('play');
    play.querySelector('img.change-btn').src = "images/iconmonstr-pause-thin-240.png";
    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play');
    play.querySelector('img.change-btn').src = "images/iconmonstr-play-thin-240.png";
    audio.pause();
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songTitles.length - 1;
    }
    loadSong(songTitles[songIndex]);
    playSong();

}

function nextSong(){
    songIndex++;
    if(songIndex > (songTitles.length - 1)){
        songIndex = 0;
    }

    loadSong(songTitles[songIndex]);
    playSong();
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
//event listeners

play.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
})

//change song events

prev.addEventListener('click', prevSong);
next.addEventListener('click',nextSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);