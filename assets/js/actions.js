// import {
//    collection,
//    getDocs,
//    query,
//    where,
// } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import {
   songListSelect,
   songlist,
   timeSliderCurrent,
   timeSliderHolder,
   currentTimeEle,
   durationEle,
   volumeSliderCurrent,
   switchBtn,
   randomBtn,
   rePeatBtn,
   body,
} from "./constant.js";
import { db, collection, getDocs, query, where } from "./firebase/config.js";
import { onPauseHandle } from "./handleEvent.js";
import { getLocalStorageItem, setLocalStorage } from "./utils/appHelper.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audioEle = $(".audio");
let actuallySongs = [];

export const getActuallySongs = function () {
   console.log("get actually songs");
   actuallySongs = this.song_in === "playlist" ? this.playlistSongs : this.songs;
};

export const fetchSongs = async function () {
   const songSollectionRef = collection(db, "songs");
   const queryGetSongs = query(
      songSollectionRef,
      where("by", "==", "huudat01234560@gmail.com")
   );

   const playlistCollectionRef = collection(db, "playlist");
   const queryGetPlaylists = query(
      playlistCollectionRef,
      where("by", "==", "huudat01234560@gmail.com")
   );

   try {
      const songsSnap = await getDocs(queryGetSongs);
      const playlistsSnap = await getDocs(queryGetPlaylists);

      if (songsSnap.docs.length) {
         const userSongs = songsSnap.docs.map((doc) => doc.data());
         this.songs = userSongs;
      } else {
         this.songs = temporarySongs;
      }

      if (playlistsSnap.docs.length) {
         const playlists = playlistsSnap.docs.map((doc) => doc.data());
         this.playlists = playlists;
      }
   } catch (error) {
      console.log(error);
   }
};

export const sortSongs = function () {
   var sortedSongs = this.songs.sort((a, b) => {
      return a.name > b.name;
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
            <div class="song-frame">
              <div class="song-img" style="background-image: url(${
                 song.image_url || "https://placehold.co/100"
              })" >
              </div>
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
   let playlistHTML = '<option value="">Default</option>';

   if (this?.playlists?.length) {
      this.playlists.forEach(
         (playlist) =>
            (playlistHTML += `<option value='${playlist.name}'>${playlist.name}</option>`)
      );
      songListSelect.innerHTML = playlistHTML;
   }
};

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
   timeSliderCurrent.style.width = "0%";
   timeSliderHolder.style.transform = `translate(100%, -50%)`;
   currentTimeEle.innerText = "00:00";
   durationEle.innerText = "/ 00:00";
};

const renderCurrentSong = (currentSong) => {
   const singerEle = $(".dashboard h4");
   const titleEle = $(".dashboard h2");
   const cdEle = $(".cd-img");
   const titleEl = $(".title-wrapper h2");

   if (titleEle.style.transition !== "unset") {
      titleEl.style.transition = `unset`;
      titleEl.style.transform = `translateX(0px)`;
   }

   singerEle.innerText = currentSong.singer;
   titleEle.innerText = currentSong.name;
   cdEle.style.backgroundImage = `url(${
      currentSong.image_url || "https://placehold.co/300"
   })`;
   audioEle.src = currentSong.song_url;
   document.title = currentSong.name;
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
   onPauseHandle(this);
   resetForNewSong();

   if (!actuallySongs) return console.log("can't load current song");

   const currentSong = actuallySongs[this.currentIndex];
   if (!currentSong) return console.log("can't load current song");

   // set current song
   setLocalStorage("current", currentSong);
   this.currentSong = currentSong;

   renderCurrentSong(currentSong);
   toggleActive(this);
};

export const loadConfig = function () {
   this.isRepeat = getLocalStorageItem("isRepeat", false);
   this.isDark = getLocalStorageItem("isDark", false);

   const currentSong = getLocalStorageItem("current", null);
   this.currentSong = currentSong;

   if (window.innerWidth > 550) {
      const storageVolume = getLocalStorageItem("volume", 1);

      volumeSliderCurrent.style.width = storageVolume * 100 + "%";

      this.volume = storageVolume;
      audioEle.volume = storageVolume;
   }

   randomBtn.classList.toggle("active", this.isRandom);
   rePeatBtn.classList.toggle("active", this.isRepeat);

   body.classList.toggle("dark", this.isDark);
   switchBtn.classList.toggle("dark", this.isDark);
};

export const loadCurrentSongFromLocalStorage = function () {
   if (this.currentSong) renderCurrentSong(this.currentSong);
   else this.isFirstLoadSong = false;
};

export const updateCurrentIndex = function () {
   if (!actuallySongs || !this.currentSong)
      return console.log("can't update current index");

   const index = actuallySongs.findIndex((song) => song.id === this.currentSong.id);

   if (index === -1) return;

   this.currentIndex = index;
};
