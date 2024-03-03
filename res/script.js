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
const musics = ["Baby - Justin Bieber", "Pasoori", "Girls Like You", "Lavitating", "Mere Liye Tum Kaafi Ho", "Bilionera", "Kaise Hua", "HUSN", "Teri Baaton Mein Aisa Uljha Jiya"];
var count = 0
const random = (current = 0) => {
    return Math.floor(musics.length * Math.random());
}
function setBack(img = "pics/HUSN.jpg") {
    var scope = document.querySelector(".back");
    let preload = document.querySelector(".dontcare");
    pic.src = "pics/preload.png";
    pic.style.filter = "grayscale(10%)";
    preload.src = img;
    scope.src = img;
    preload.onload = () => {
        pic.src = img;
        pic.style.filter = "grayscale(0%)";
        pic.style.animation = "2s ease fade"
    }
}
function first() {
    count = random();
    audio.src = "songs/" + musics[count] + ".mp3";
    pic.src = "pics/" + musics[count] + ".jpg";
    setBack(pic.src);
    sname.textContent = musics[count];
    document.title = musics[count] + " | Sankar";
    document.querySelector('link[rel="website icon"]').href = pic.src;

}
first();;
const nextSong = () => {
    seekSlider.style.background = `linear-gradient(to right, #fff3f3 0%, #fff3 100%)`;
    played();
    if (musics.length >= 0) {
        if (musics.length > count+1) {
            count++;
            audio.src = "songs/" + musics[count] + ".mp3";
            pic.src = "pics/" + musics[count] + ".jpg";
            setBack(pic.src);
            document.querySelector('link[rel="website icon"]').href = pic.src;
            document.title = musics[count] + " | Sankar";
            sname.textContent = musics[count];
            if (isPlaying) {
                audio.play();
            }
        } else {
            count = 0;
            audio.src = "songs/" + musics[count] + ".mp3";
            pic.src = "pics/" + musics[count] + ".jpg";
            setBack(pic.src);
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
    seekSlider.style.background = `linear-gradient(to right, #fff3f3 0%, #fff3 100%)`;
    played();
    if (musics.length >= 0) {
        if (count != 0) {
            count--;
            audio.src = "songs/" + musics[count] + ".mp3";
            pic.src = "pics/" + musics[count] + ".jpg";
            setBack(pic.src);
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
            pic.src = "pics/" + musics[count] + ".jpg";
            setBack(pic.src);
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
    let dur = audi.duration - 4;
    durationMT.innerHTML = Math.floor(dur / 60);
    durationST.innerHTML = Math.floor(dur % 60);
}
audio.onloadedmetadata = function() {
    seekSlider.max = audio.duration - 4;
    updateTotalDuration(audio);
    var playedPercentage = (audio.currentTime / audio.duration) * 100;

    seekSlider.style.background = `linear-gradient(to right, #fff3f3 ${playedPercentage}%, #fff3 ${playedPercentage}%)`;
};
const played = () => {
    var playedPercentage = (audio.currentTime / audio.duration) * 100;

    seekSlider.style.background = `linear-gradient(to right, #fff3f3 ${playedPercentage}%, #fff3 ${playedPercentage}%)`;
}
const updateD = () => {
    let dur = seekSlider.value;
    durationM.innerHTML = Math.floor(dur / 60);
    durationS.innerHTML = Math.floor(dur % 60);
}
seekSlider.oninput = function() {
    updateD();
    var playedPercentage = (seekSlider.value / audio.duration) * 100;

    seekSlider.style.background = `linear-gradient(to right, #fff3f3 ${playedPercentage}%, #fff3 ${playedPercentage}%)`;
    audio.ontimeupdate = function() {

        if (audio.duration - 4 <= audio.currentTime) {
            nextSong();
        } else {
            updateD();
        }

    }

};
seekSlider.onchange = () => {
    audio.currentTime = seekSlider.value;
    setof();
    played();

}
function setof() {
    audio.ontimeupdate = function() {
        seekSlider.value = audio.currentTime;
        if (audio.duration - 4 <= audio.currentTime) {
            nextSong();
        } else {
            updateDuration(audio);
        }
        played();

    }
}
var isPlaying = false;
function playM(ok) {
    played();
    setof()
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