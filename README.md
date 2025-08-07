🎧 Spotify Clone

A responsive Spotify-like music player built using **HTML, CSS, and JavaScript**.

## 🔥 Features

- ✅ Browse multiple playlists
- ✅ Click on a playlist to load its songs automatically
- ✅ Songs display in the library section
- ✅ Play/Pause songs
- ✅ Next/Previous track controls
- ✅ Volume control (increase/decrease/mute)
- ✅ Responsive design for all devices
- ✅ Automatically fetches playlist details from `info.json`

## 📁 How It Works

- Each playlist (e.g., `marathi/`, `ganpati/`) is stored in a separate folder inside the `songs/` directory.
- Each folder contains:
  - `.mp3` files
  - `cover.jpg` (for album art)
  - `info.json` (with playlist metadata: title, description)

The app dynamically fetches and displays playlists and songs using JavaScript.

## 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)

## 📂 Folder Structure


spotifyJSClone/
│
├── css/
│   ├── style.css
│   ├── utility.css
│   └── media.css
│
├── img/
│   └── \[All icons and images]
│
├── js/
│   └── script.js
│
├── songs/
│   ├── marathi/
│   │   ├── Aplich Hawa.mp3
│   │   ├── Shaky.mp3
│   │   ├── cover.jpg
│   │   └── info.json
│   └── ganpati/
│       ├── Morya Re.mp3
│       ├── Deva Ho Deva.mp3
│       ├── cover.jpg
│       └── info.json
│
├── index.html
└── README.md
