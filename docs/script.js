const seekSlider = document.getElementById('seekSlider');
const durationM = document.getElementById("m");
const durationS = document.getElementById("s");
const durationMT = document.getElementById("mTotal");
const durationST = document.getElementById("sTotal");
const back = document.getElementById("backward");
const next = document.getElementById("forward");
const sname = document.getElementById("sname");
const pbtn = document.querySelector('.playbtn')
const pic = document.getElementById("pic");
const loading = document.getElementsByClassName('loading')[0]
const musics = ["Mere Samnewali Khidki Mein","Baby - Justin Bieber", "Gulabi Aankhen","Pasoori", "Girls Like You","Barish", "Lavitating", "Mere Liye Tum Kaafi Ho", "Bilionera","Likhe Jo Khat Tujhe", "Kaise Hua", "HUSN", "Teri Baaton Mein Aisa Uljha Jiya"];
var count = 0
const random = (current = 0) => {
    return Math.floor(musics.length * Math.random());
}
let pree = document.getElementById("dontcare");
var scope = document.querySelector(".back");
function setBack(img = "preload.png") {
    scope.src = "pics/preload.png";
    pree.src = img;
    pree.onload = () => {
        pic.style.display = "none";
        pic.src = img;
        scope.src = img;
        setTimeout(function() {
            pic.style.display = "block"
        }, 100);
        
    }
}
function pre() {
    pic.src = "pics/preload.png";
}
function first() {
    count = random();
    audio.src = "songs/" + musics[count] + ".mp3";
    pic.src = "pics/" + musics[count] + ".jpg";
    setBack(pic.src);
    seekSlider.style.background = `rgba(255, 255, 255, 0.2)`;
    sname.textContent = musics[count];
    document.title = musics[count] + " | Sankar";
    document.querySelector('link[rel="website icon"]').href = pic.src;
    audio.cover = "pics/" + musics[count] + ".jpg"
    audio.title =  musics[count]
    setMediaSessionMetadata(audio)
}
first()
const nextSong = () => {
    pre()
    played()
    seekSlider.style.background = `rgba(255, 255, 255, 0.2)`;
    if (musics.length >= 0) {
        if (musics.length > count+1) {
            count++;  
        } else {
            count = 0;
        }
        audio.src = "songs/" + musics[count] + ".mp3";
        setBack("pics/" + musics[count] + ".jpg");
        document.title = musics[count] + " | Sankar";
        document.querySelector('link[rel="website icon"]').href = pic.src;
        sname.textContent = musics[count]
        audio.play()
        document.querySelector('.ctlBtn > .playbtn').classList.remove("fa-play")
        document.querySelector('.ctlBtn > .playbtn').classList.add("fa-pause")
    } else {
        alert("Please add some Songs to play!");
    }
    audio.cover = "pics/" + musics[count] + ".jpg"
    audio.title =  musics[count]
    setMediaSessionMetadata(audio)
}
audio.addEventListener('loadstart', () => {
    load()
})
audio.addEventListener('loadeddata', () => {
    loaded()
})
const previousSong = () => {
    pre()
    played()
    seekSlider.style.background = `rgba(255, 255, 255, 0.2)`;
    if (musics.length >= 0) {
        if (count != 0) {
            count--;
        } else {
            count = musics.length - 1;
        }
        audio.src = "songs/" + musics[count] + ".mp3";
        setBack("pics/" + musics[count] + ".jpg");
        document.title = musics[count] + " | Sankar";
        document.querySelector('link[rel="website icon"]').href = pic.src;
        sname.textContent = musics[count];
        audio.play()
        document.querySelector('.ctlBtn > .playbtn').classList.remove("fa-play")
        document.querySelector('.ctlBtn > .playbtn').classList.add("fa-pause")
    } else {
        alert("Please add some Songs to play!");
    }
    audio.cover = "pics/" + musics[count] + ".jpg"
    audio.title =  musics[count]
    setMediaSessionMetadata(audio)
}
const updateDuration = audi => {
    let dur = audi.currentTime
    durationM.innerHTML = Math.floor(dur / 60);
    durationS.innerHTML = Math.floor(dur % 60);
}
const updateTotalDuration = audi => {
    let dur = audi.duration
    durationMT.innerHTML = Math.floor(dur / 60);
    durationST.innerHTML = Math.floor(dur % 60);
}
audio.onloadedmetadata = () => {
    seekSlider.max = audio.duration
    updateTotalDuration(audio)
    let playedPercentage = (audio.currentTime / audio.duration) * 100
    seekSlider.style.background = `linear-gradient(to right, #fff3f3 ${playedPercentage}%, #fff3 ${playedPercentage}%)`;
}
const played = () => {
    var playedPercentage = (audio.currentTime / audio.duration) * 100
    seekSlider.style.background = `linear-gradient(to right, #fff3f3 ${playedPercentage}%, #fff3 ${playedPercentage}%)`;
}
const updateD = () => {
    let dur = seekSlider.value;
    durationM.innerHTML = Math.floor(dur / 60);
    durationS.innerHTML = Math.floor(dur % 60);
}
seekSlider.oninput = function() {
    updateD()
    let playedPercentage = (seekSlider.value / audio.duration) * 100;

    seekSlider.style.background = `linear-gradient(to right, #fff3f3 ${playedPercentage}%, #fff3 ${playedPercentage}%)`;
    audio.ontimeupdate = function() {

        if (audio.duration <= audio.currentTime) {
            nextSong()
        } else {
            updateD()
        }

    }

};
seekSlider.onchange = () => {
    audio.currentTime = seekSlider.value;
    load()
    let playedPercentage = (seekSlider.value / audio.duration) * 100;
    seekSlider.style.background = `linear-gradient(to right, #fff3f3 ${playedPercentage}%, #fff3 ${playedPercentage}%)`;
    setof()
    played()
}
function loaded() {
    loading.style.display = 'none'
    document.querySelector('.ctlBtn > .playbtn').style.color = "#111"
    document.querySelector('.ctlBtn > .playbtn').style.background = "#fff3f3"
}
function load() {
    loading.style.display = 'block'
    document.querySelector('.ctlBtn > .playbtn').style.color = "#fff"
    document.querySelector('.ctlBtn > .playbtn').style.background = "#fff4"
}
function setof() {
    audio.ontimeupdate = function() {
        loaded()
        seekSlider.value = audio.currentTime;
        if (audio.duration <= audio.currentTime) {
            nextSong()
        } else {
            updateDuration(audio)
        }
        played()
    }
}
function playM(ok) {
    played()
    setof()
    if (ok.classList.contains("fa-pause")) {
        audio.pause()
        ok.classList.add("fa-play")
        ok.classList.remove("fa-pause")
    } else {
        audio.play()
        ok.classList.remove("fa-play")
        ok.classList.add("fa-pause")
    }
}

function setMediaSessionMetadata(audio) {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: audio.title,
        artist: "Artist",
        album: "Zotify",
        artwork: [
          { src: audio.src, sizes: "512x512", type: "image/jpeg" }
        ]
      })
  }

  navigator.mediaSession.setActionHandler('play', (e) => {
    audio.play()
    playM(document.querySelector('.ctlBtn > .playbtn'))
    console.log('play')
  })

  navigator.mediaSession.setActionHandler('pause', function() {
    audio.pause()
    playM(document.querySelector('.ctlBtn > .playbtn'))
    console.log('pause')
  })
  
  navigator.mediaSession.setActionHandler('previoustrack', previousSong)

  navigator.mediaSession.setActionHandler('nexttrack', nextSong)

  // key controllers
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
        playM(document.querySelector('.ctlBtn > .playbtn'))
        } else if (e.code === 'ArrowRight') {
        if (audio.currentTime + 5 >= audio.duration) {
            nextSong()
        } else {
            seekSlider.value = audio.currentTime + 5
            seekSlider.onchange()
        }
        } else if (e.code === 'ArrowLeft') {
        seekSlider.value = audio.currentTime - 5
        seekSlider.onchange()
        } else {
            console.log(e.code)
        }
    })