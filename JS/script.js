console.log("lets start JS");

let currentSong = new Audio();
let songs;
let currFolder;

function toMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

async function getSongs(folder) {
  let a = await fetch(`${folder}`);
  currFolder = folder;
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`${folder}`)[1].replace(/^\/+/, ""));
    }
  }

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> 
                    <img class="invert" src="img/music.svg" alt="">
                    <div class="info">
                        <div>${song.replaceAll("%20", " ")}</div>
                        <div>Omkar</div>
                    </div>
                    <img class="invert" src="img/pause.svg" alt="">
                </li>`;
  }

  //EventListener for each Song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  return songs
}

const playMusic = (track, pause = false) => {
  // let audio = new Audio("/songs/" + track)
  currentSong.src = `${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "img/play-button.svg";
  }

  document.querySelector(".songInfo").innerHTML = decodeURI(track);
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
};

async function displayAlbums() {
  let a = await fetch(`songs/`);
  let response = await a.text();

  let div = document.createElement("div");
  div.innerHTML = response;

  let anchors = div.getElementsByTagName("a");
  let cardContainer = document.querySelector(".cardContainer");

  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("songs/")) {
        let folder = e.getAttribute("href").replace(/\/$/, "").split("/").pop();


      //Get metadata of the folder
      let a = await fetch(`songs/${folder}/info.json`);
      let response = await a.json();
      console.log(response);

      cardContainer.innerHTML =
        cardContainer.innerHTML +
        ` <div data-folder="${folder}" class="card">
            <div class="play">
            <img src="img/play.svg" alt="" />
            </div>
            <img src="songs/${folder}/cover.jpg" alt="" />
            <h2>${response.title}</h2>
            <p>${response.description}</p>
            </div> `;
    }
  }


//Load playlist when card is clicked
Array.from(document.getElementsByClassName("card")).forEach(e => { 
  e.addEventListener("click", async item => {
      console.log("Fetching Songs")
      songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)  
      playMusic(songs[0])

  })
})

// Shuffle songs


// Add eventListener to play next and previous
play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "img/play-button.svg";
    } else {
      currentSong.pause();
      play.src = "img/pause.svg";
    }
  });
  
}

async function main() {
  // List pf all songs

  await getSongs("songs/marathi");
  playMusic(songs[0], true);
  console.log(songs);

  // show all song on library

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> 
                    <img class="invert" src="img/music.svg" alt="">
                    <div class="info">
                        <div>${song.replaceAll("%20", " ")}</div>
                        <div>Omkar</div>
                    </div>
                    <img class="invert" src="img/pause.svg" alt="">
                </li>`;
  }

  //EventListener for each Song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  // Display all the albums
  displayAlbums();

  

  // Listener for time Update Event
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songTime").innerHTML = `${toMinutesSeconds(
      currentSong.currentTime
    )}/${toMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // EventListener for seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Event listener for Hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  // Event listener for Close Button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  //Event Listener for Previous
  previous.addEventListener("click", () => {
    if (!songs || !songs.length) return;
  
    let current = currentSong.src.split("/").slice(-1)[0];
    let index = songs.indexOf(current);
    if (index > 0) {
      playMusic(songs[index - 1]);
    }
  });

  //Event Listener for nExt
  next.addEventListener("click", () => {
    currentSong.pause();
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  // Event for volume
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      currentSong.volume = parseInt(e.target.value) / 100;
    });

    // Event listener for change volume image and make it mute
    document.querySelector(".volume>img").addEventListener("click", e=>{ 
      if(e.target.src.includes("img/volumeMain.svg")){
          e.target.src = e.target.src.replace("img/volumeMain.svg", "img/mute.svg")
          currentSong.volume = 0;
          document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
      }
      else{
          e.target.src = e.target.src.replace("img/mute.svg", "img/volumeMain.svg")
          currentSong.volume = .10;
          document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
      }

  })

  // Event on click on home Button
  document.querySelector(".home").addEventListener("click", e=>{
    
  })
}

main();
