const seekSlider = document.getElementById('seekSlider');
const durationM = document.getElementById("m");
const durationS = document.getElementById("s");
const durationMT = document.getElementById("mTotal");
const durationST = document.getElementById("sTotal");
const back = document.getElementById("backward");
const next = document.getElementById("forward");
const sname = document.getElementById("sname");
const pbtn = document.getElementById("pbtn");
const pic = document.getElementById("pic");
const musics = ["Baby - Justin Bieber","Pasoori","Girls Like You","Lavitating","Mere Liye Tum Kaafi Ho","Bilionera","Kaise Hua","HUSN","Teri Baaton Mein Aisa Uljha Jiya"];
var count = 0
const random = (current = 0) => {
    return Math.floor(musics.length * Math.random());
}
function first() {
count = random();
audio.src = "songs/" + musics[count] + ".mp3";
pic.src = "pics/" + musics[count] +  ".jpg";
sname.textContent = musics[count];
document.title = musics[count] + " | Sankar";
document.querySelector('link[rel="website icon"]').href = pic.src;

}
first();;
const nextSong = () => {
    played();
    if (musics.length >= 0) {
    if (musics.length > count+1) { 
        count++;
        audio.src = "songs/" + musics[count] + ".mp3";
        pic.src = "pics/" + musics[count] +  ".jpg";
        document.querySelector('link[rel="website icon"]').href = pic.src;
        document.title = musics[count] + " | Sankar";
        sname.textContent = musics[count];
    if (isPlaying) {
        audio.play();
        }
    } else {
        count = 0;
        audio.src = "songs/" + musics[count] + ".mp3";
        pic.src = "pics/" + musics[count] +  ".jpg";
        document.title = musics[count] + " | Sankar";
        document.querySelector('link[rel="website icon"]').href = pic.src;
        sname.textContent = musics[count];
                if (isPlaying) {
        audio.play();
        }
    }
    } else {
        alert("Please add some Songs to play!");
    }
}
const previousSong = () => {
    played();
        if (musics.length >= 0) {
    if (count != 0) { 
        count--;
        audio.src = "songs/" + musics[count] + ".mp3";
        pic.src = "pics/" + musics[count] +  ".jpg";
        document.querySelector('link[rel="website icon"]').href = pic.src;
        document.title = musics[count] + " | Sankar";
        sname.textContent = musics[count];
        if (isPlaying) {
        audio.play();
        }

    } else {
                if (isPlaying) {
        audio.play();
        }
        count = musics.length - 1;
        audio.src = "songs/" + musics[count] + ".mp3";
        pic.src = "pics/" + musics[count] +  ".jpg";
        document.title = musics[count] + " | Sankar";
        document.querySelector('link[rel="website icon"]').href = pic.src;
        sname.textContent = musics[count];
    }
    } else {
        alert("Please add some Songs to play!");
    }
}
const updateDuration = audi => {
    let dur = audi.currentTime;
    durationM.innerHTML = Math.floor(dur / 60);
    durationS.innerHTML = Math.floor(dur % 60);
}
const updateTotalDuration = audi => {
    let dur = audi.duration - 6;
    durationMT.innerHTML = Math.floor(dur / 60);
    durationST.innerHTML = Math.floor(dur % 60);
}
audio.onloadedmetadata = function() {
  seekSlider.max = audio.duration - 6;
  updateTotalDuration(audio);
   var playedPercentage = (audio.currentTime / audio.duration) * 100;
  
  seekSlider.style.background = `linear-gradient(to right, #555 ${playedPercentage}%, #3237488f ${playedPercentage}%)`;
};
 const played = () => {
      var playedPercentage = (audio.currentTime / audio.duration) * 100;
  
  seekSlider.style.background = `linear-gradient(to right, #555 ${playedPercentage}%, #3237488f ${playedPercentage}%)`;
 }
seekSlider.oninput = function() {
    updateDuration(audio);
  audio.currentTime = seekSlider.value;
  played();
  
};

audio.ontimeupdate = function() {
    seekSlider.value = audio.currentTime;
  if (audio.duration - 6 <= audio.currentTime) {
      nextSong();
  } else {
  updateDuration(audio);
  }
  played();
  
}
var isPlaying = false;
       function playM(ok) {
           played();
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                ok.classList.add("fa-play");
                ok.classList.remove("fa-pause");
            } else {
                audio.play();
                isPlaying = true;
                ok.classList.remove("fa-play");
                ok.classList.add("fa-pause");
            }
        }
