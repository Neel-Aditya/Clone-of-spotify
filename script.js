console.log("Let's go for java script");

// we'll create a currentSong variable that will play the current song
let currentSong = new Audio();

// we are not using server side scripting now

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Songs%20collection/");
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/Songs%20collection/")[1]);
        }
    }

    return songs;

}

const playMusic = (track)=>{
//    for playing the current song
    currentSong.src = "/Songs collection/" + track;
    currentSong.play();
    play.src="pausebutton.svg";
    document.querySelector(".songinfo").innerHTML=track;
    document.querySelector(".songtime").innerHTML="00.00/00.00";

}

async function main() {
    
    // get all the songs list 
    let songs = await getSongs();
    console.log(songs);

    // display the songs in library

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img src="musicon.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div></div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img src="playbtn(for library).svg" alt="">
                            </div>        
                     </li>`;

    }

    // attach an event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{

        e.addEventListener("click", element =>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
        })
        
    
    });

    // attach an event listener to prev, next and play
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src="pausebutton.svg";
        }
        else{
                currentSong.pause();
                play.src="playbutton.svg";
        }
    })

}
    // play the first song

    // var audio = new Audio(`/Songs collection/${songs[0]}`);
    
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     let duration = audio.duration;
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
        
    // });

    main();



