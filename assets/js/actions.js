import {
   songlist,
   timeSliderHolder,
   currentTimeEle,
   switchBtn,
   randomBtn,
   rePeatBtn,
   body,
   timeSlider,
   audio,
   playBtn,
   durationEle,
} from "./constant.js";
import { handleOnPause, updateVolume } from "./handleAudioEvent.js";
import {
   convertToEn,
   generateHSL,
   getLocalStorageItem,
   setLocalStorage,
} from "./utils/appHelper.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audioEle = $(".audio");
let actuallySongs = [];

export const getActuallySongs = function () {
   console.log("get actually songs");
   actuallySongs = this.songs;
   // actuallySongs =
   //    this.song_in === "playlist" ? this.playlistSongs : this.songs;
};

export const fetchSongs = async function () {
   try {
      const res = await fetch("https://nest-mp3.vercel.app/api/songs");
      if (!res.ok) throw new Error("");

      const payload = await res.json();

      if (payload.data.songs.length) {
         this.songs = payload.data.songs;
      }
   } catch (error) {
      console.log(error);
   }
};

export const sortSongs = function () {
   var sortedSongs = this.songs.sort((a, b) => {
      return convertToEn(a.name.charAt(0)) > convertToEn(b.name.charAt(0));
   });

   this.songs = sortedSongs;
};

export const render = function () {
   let songListHTML = "";

   if (actuallySongs.length) {
      actuallySongs.forEach((song) => {
         songListHTML += `<li class="song-item ${
            this.currentSong && this.currentSong.id === song.id ? "active" : ""
         }" id="${song.id}">
            <div class="song-frame" style="background-color: ${generateHSL(
               song.name
            )}">
               ${song.name.charAt(0)}
            </div>
            <div class="song-info">
              <h2>${song.name}</h2>
              <h4>${song.singer}</h4>
            </div>
            <div class="song-detail">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </li>`;
      });
   } else return (songListHTML += "<h1>Error when render songs</h1>");

   songlist.innerHTML = songListHTML;
};

export const renderMenu = function () {
   // let playlistHTML = '<option value="">Default</option>';
   // if (this?.playlists?.length) {
   //    this.playlists.forEach(
   //       (playlist) =>
   //          (playlistHTML += `<option value='${playlist.name}'>${playlist.name}</option>`)
   //    );
   //    songListSelect.innerHTML = playlistHTML;
   // }
};

// export const playSong = function () {
//    audio.play();
//    playBtn.classList.add("playing");
// };

export const nextSong = function () {
   let newIndex = this.currentIndex + 1;

   if (newIndex <= actuallySongs.length - 1) {
      this.currentIndex = newIndex;
   } else {
      this.currentIndex = 0;
      this.endOfList = true;
   }

   this.loadCurrentSong();
};

export const prevSong = function () {
   this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : actuallySongs.length - 1;
   this.loadCurrentSong();
};

export const randomSong = function () {
   let newIndex = 0;
   do {
      newIndex = Math.floor(actuallySongs.length * Math.random());
   } while (newIndex === this.currentIndex);
   this.currentIndex = newIndex;
   this.loadCurrentSong();
};

const resetForNewSong = () => {
   timeSlider.style.background = "#e1e1e1";
   timeSliderHolder.style.left = `0`;
   currentTimeEle.innerText = "0:00";
   durationEle.innerText = "0:00";
   setLocalStorage('current-time', 0)
};

const renderCurrentSong = (_this) => {
   if (!_this.currentSong) return;

   const singerEle = $(".dashboard h4");
   const titleEle = $(".dashboard h2");
   const cdEle = $(".cd-img");
   const titleEl = $(".title-wrapper h2");

   if (titleEle.style.transition !== "unset") {
      titleEl.style.transition = `unset`;
      titleEl.style.transform = `translateX(0px)`;
   }

   singerEle.innerText = _this.currentSong.singer;
   titleEle.innerText = _this.currentSong.name;
   cdEle.style.backgroundImage = `url(${
      _this.currentSong.image_url || "https://placehold.co/300"
   })`;
   audioEle.src = _this.currentSong.song_url;
   document.title = _this.currentSong.name;
};

const toggleActive = function (_this) {
   const songElements = $$(".song-item");

   for (var songEle of songElements) {
      if (songEle.classList.contains("active")) {
         songEle.classList.remove("active");
      }
   }

   const currentSongEle = songElements[_this.currentIndex];

   if (currentSongEle) currentSongEle.classList.add("active");
};

export const loadCurrentSong = function () {
   handleOnPause(this);
   resetForNewSong();

   const currentSong = actuallySongs[this.currentIndex];
   if (!currentSong) return console.log("can't load current song");

   setLocalStorage("current", currentSong);
   // setLocalStorage("current-time", 0);
   this.currentSong = currentSong;

   renderCurrentSong(this);
   toggleActive(this);
};

export const loadLocalStorage = function () {
   this.isRepeat = getLocalStorageItem("isRepeat", false);
   this.isDark = getLocalStorageItem("isDark", false);

   const currentSong = getLocalStorageItem("current", null);
   const currentTime = getLocalStorageItem("current-time", 0);

   this.currentSong = currentSong;
   audioEle.currentTime = currentTime;

   if (window.innerWidth > 550) {
      const storageVolume = getLocalStorageItem("volume", 1);
      updateVolume(storageVolume);
   }

   randomBtn.classList.toggle("active", this.isRandom);
   rePeatBtn.classList.toggle("active", this.isRepeat);

   body.classList.toggle("dark", this.isDark);
   switchBtn.classList.toggle("dark", this.isDark);

   renderCurrentSong(this);
};

export const updateCurrentIndex = function () {
   if (!actuallySongs || !this.currentSong)
      return console.log("can't update current index");

   const index = actuallySongs.findIndex(
      (song) => song.id === this.currentSong.id
   );

   if (index === -1) return;

   this.currentIndex = index;
};
