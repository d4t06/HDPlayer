import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

import {
   songListSelect,
   songlist,
   timeSliderCurrent,
   timeSliderHolder,
   currentTimeEle,
   durationEle,
   volumeSliderCurrent,
   volumeSliderHolder,
   switchBtn,
   randomBtn,
   rePeatBtn,
   player,
} from "./constant.js";
import { db } from "../../firebase/config.js";
import { onPauseHandle } from "./handleEvent.js";
import { getLocalStorageItem } from "../../utils/appHelper.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let actuallySongs = [];

export const getActuallySongs = function () {
   console.log("get actually songs");
   actuallySongs = this.song_in === "playlist" ? this.playlistSongs : this.songs;
};

export const fetchSongs = async function () {
   const songSollectionRef = collection(db, "songs");
   const queryGetSongs = query(songSollectionRef, where("by", "==", "huudat01234560@gmail.com"));

   const playlistCollectionRef = collection(db, "playlist");
   const queryGetPlaylists = query(playlistCollectionRef, where("by", "==", "huudat01234560@gmail.com"));

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
      actuallySongs.forEach((song, index) => {
         songListHTML += `<li class="song-item" id="${index}">
            <div class="song-frame">
              <div class="song-img" style="background-image: url(${song.image_url || "https://placehold.co/100"})" >
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
         (playlist) => (playlistHTML += `<option value='${playlist.name}'>${playlist.name}</option>`)
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
   this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : actuallySongs.length - 1;
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
   // timeSliderHolder.style.left = "0%";
   timeSliderHolder.style.transform = `translateX(100%, -50%)`;
   currentTimeEle.innerText = "00:00";
   durationEle.innerText = "/ --:--";
};

export const loadCurrentSong = function () {
   onPauseHandle(this);
   resetForNewSong();

   let singerEle = $(".dashboard h4");
   let titleEle = $(".dashboard h2");
   let cdEle = $(".cd-img");
   let audioEle = $(".audio");
   let titleEl = $(".title-wrapper h2");
   let songElements = $$(".song-item");

   if (titleEle.style.transition !== "unset") {
      console.log("unScroll text");
      titleEl.style.transition = `unset`;
      titleEl.style.transform = `translateX(0px)`;
   }

   const currentSong = actuallySongs[this.currentIndex];
   const currentSongEle = songElements[this.currentIndex];

   // console.log('check current songs', currentSong)

   for (var songEle of songElements) {
      if (songEle.classList.contains("active")) {
         songEle.classList.remove("active");
      }
   }
   currentSongEle.classList.add("active");

   singerEle.innerText = currentSong.singer;
   titleEle.innerText = currentSong.name;
   cdEle.style.backgroundImage = `url(${currentSong.image_url || "https://placehold.co/300"})`;
   audioEle.src = currentSong.song_url;
   document.title = currentSong.name;
};

export const loadConfig = function () {
   this.isRepeat = getLocalStorageItem("isRepeat");
   this.isDark = getLocalStorageItem("isDark");

   if (window.innerWidth > 550) {
      let volume = getLocalStorageItem("volume");
      volumeSliderCurrent.style.width = volume * 100 + "%";

      this.volume = volume;
   }

   // cấu hình trình phát
   randomBtn.classList.toggle("active", !!this.isRandom);
   rePeatBtn.classList.toggle("active", !!this.isRepeat);
   //cấu hình dark mode
   player.classList.toggle("dark", !!this.isDark);
   // console.log(switchBtn);
   switchBtn.classList.toggle("dark", !!this.isDark);
   // console.log(switchBtn);

   // cấu hình option playlist
   // const option = this.lastPlayList ? this.lastPlayList[this.lastPlayList.length - 1] : 0;
   // songListSelect.options[option].selected = true;
};
