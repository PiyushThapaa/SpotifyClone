// Initializing the variables

let songIndex = 0;
let audioElement = new Audio('Tools/songs/0.mp3')
let playbutton = document.getElementById('playbutton');
let gif = document.getElementById('gif');
let songBar = document.getElementById('songprogress');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let SongName = document.getElementById('songName');

let songs = [
    { SongName: 'Pink Blue', PathName: 'Tools/songs/0.mp3', coverName: 'Tools/banners/pinkblue banner.jpg' },
    { SongName: 'Samjho Na', PathName: 'Tools/songs/1.mp3', coverName: 'Tools/banners/samjhona banner.jpg' },
    { SongName: 'If you\'re reading this...', PathName: 'Tools/songs/2.mp3', coverName: 'Tools/banners/readingthis banner.JPG' },
    { SongName: 'Cynide', PathName: 'Tools/songs/3.mp3/', coverName: 'Tools/banners/cynide banner.jpg' },
    { SongName: 'Death Bed', PathName: 'Tools/songs/4.mp3/', coverName: 'Tools/banners/deathbed banner.png' },
    { SongName: 'Instagram', PathName: 'Tools/songs/5 Song.mp3/', coverName: 'Tools/banners/instagram banner.jpg' },
    { SongName: 'Shape of You', PathName: 'Tools/songs/6.mp3/', coverName: 'Tools/banners/shapeofyou banner.png' },
    { SongName: 'Starboy', PathName: 'Tools/songs/7.mp3/', coverName: 'Tools/banners/starboy banner.jpg' },
    { SongName: 'Timi Sangai', PathName: 'Tools/songs/8.mp3/', coverName: 'Tools/banners/timisangai banner.jpg' }
];

songItems.forEach((element, index) => {
    element.getElementsByTagName('img')[0].src = songs[index].coverName;
    element.getElementsByTagName('span')[0].innerText = songs[index].SongName;
})

function bottomplaybuttonEngine() {
    playbutton.classList.remove('fa-circle-play');
    playbutton.classList.add('fa-circle-pause');
    audioElement.play();
    gif.style.opacity = 1;
}
function bottompausebuttonEngine() {
    playbutton.classList.add('fa-circle-play');
    playbutton.classList.remove('fa-circle-pause');
    audioElement.pause();
    gif.style.opacity = 0;
}
function makeAllplay() {
    songItemPlay.forEach(element => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}
function songName(){
        SongName.innerText = `${songs[songIndex].SongName}`;
    }

// Handling the play/pause click
playbutton.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        bottomplaybuttonEngine()
        songName()
    } else {
        bottompausebuttonEngine()

    }
})


songItemPlay.forEach(element => {
    element.addEventListener('click', (e) => {
        makeAllplay()
        songIndex = parseInt(e.target.id)
        audioElement.src = `Tools/songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        if (audioElement.paused || audioElement.currentTime == 0) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
            bottomplaybuttonEngine()
            songName()
        }
    })
})


// Updating the Song Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    songBar.value = progress;
})

// Updating song with song bar
songBar.addEventListener('change', () => {
    audioElement.currentTime = (songBar.value * audioElement.duration) / 100
})

// Operating forward/backward buttons
let forward = document.getElementById('forwardbutton');
forward.addEventListener('click', () => {
    if (songIndex >= 0 && songIndex <= 7) {
        songIndex += 1
        audioElement.src = `Tools/songs/${songIndex}.mp3`;
        audioElement.play()
        songName()
        bottomplaybuttonEngine()
    }
    else {
        audioElement.src = `Tools/songs/0.mp3`;
        audioElement.play()
        songIndex = 0
        songName()
        bottomplaybuttonEngine()
        
    }
})
let backward = document.getElementById('backwardbutton');
backward.addEventListener('click',()=>{
    if (songIndex >= 1 && songIndex <= 8 ) {
        songIndex -= 1
        audioElement.src = `Tools/songs/${songIndex}.mp3`;
        audioElement.play()
        songName()
    } else{
        audioElement.src = `Tools/songs/8.mp3`;
        audioElement.play()
        songIndex = 8
        songName()
    }
})
setInterval(()=>{
    if (songBar.value == '100') {
        if (songIndex >= 0 && songIndex <= 7) {
            songIndex += 1
            audioElement.src = `Tools/songs/${songIndex}.mp3`;
            audioElement.play()
            songName()
        }
        else {
            audioElement.src = `Tools/songs/0.mp3`;
            audioElement.play()
            songIndex = 0
            songName()  
        }
    }
})
