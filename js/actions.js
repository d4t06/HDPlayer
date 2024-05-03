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
   player,
} from "./constant.js";
import { db, collection, getDocs, query, where } from "./firebase/config.js";
import { onPauseHandle } from "./handleEvent.js";
import { getLocalStorageItem, setLocalStorage } from "./utils/appHelper.js";
const $ = document.querySelector.bind(document),
   $$ = document.querySelectorAll.bind(document),
   audioEle = $(".audio");
let actuallySongs = [];
export const getActuallySongs = function () {
   console.log("get actually songs"),
      (actuallySongs = "playlist" === this.song_in ? this.playlistSongs : this.songs);
};
export const fetchSongs = async function () {
   const t = collection(db, "songs"),
      e = query(t, where("by", "==", "huudat01234560@gmail.com")),
      n = collection(db, "playlist"),
      o = query(n, where("by", "==", "huudat01234560@gmail.com"));
   try {
      const t = await getDocs(e),
         n = await getDocs(o);
      if (t.docs.length) {
         const e = t.docs.map((t) => t.data());
         this.songs = e;
      } else this.songs = temporarySongs;
      if (n.docs.length) {
         const t = n.docs.map((t) => t.data());
         this.playlists = t;
      }
   } catch (t) {
      console.log(t);
   }
};
export const sortSongs = function () {
   var t = this.songs.sort((t, e) => t.name > e.name);
   this.songs = t;
};
export const render = function () {
   let t = "";
   if (!actuallySongs.length) return (t += "<h1>Error when render songs</h1>");
   actuallySongs.forEach((e) => {
      t += `<li class="song-item ${this.currentSong.id === e.id ? "active" : ""}" id="${
         e.id
      }">\n            <div class="song-frame">\n              <div class="song-img" style="background-image: url(${
         e.image_url || "https://placehold.co/100"
      })" >\n              </div>\n            </div>\n            <div class="song-info">\n              <h2>${
         e.name
      }</h2>\n              <h4>${
         e.singer
      }</h4>\n            </div>\n            <div class="song-detail">\n              <i class="fa-solid fa-ellipsis-vertical"></i>\n            </div>\n          </li>`;
   }),
      (songlist.innerHTML = t);
};
export const renderMenu = function () {
   let t = '<option value="">Default</option>';
   this?.playlists?.length &&
      (this.playlists.forEach(
         (e) => (t += `<option value='${e.name}'>${e.name}</option>`)
      ),
      (songListSelect.innerHTML = t));
};
export const nextSong = function () {
   let t = this.currentIndex + 1;
   t <= actuallySongs.length - 1
      ? (this.currentIndex = t)
      : ((this.currentIndex = 0), (this.endOfList = !0)),
      this.loadCurrentSong();
};
export const prevSong = function () {
   (this.currentIndex =
      this.currentIndex > 0 ? this.currentIndex - 1 : actuallySongs.length - 1),
      this.loadCurrentSong();
};
export const randomSong = function () {
   let t = 0;
   do {
      t = Math.floor(actuallySongs.length * Math.random());
   } while (t === this.currentIndex);
   (this.currentIndex = t), this.loadCurrentSong();
};
const resetForNewSong = () => {
      (timeSliderCurrent.style.width = "0%"),
         (timeSliderHolder.style.transform = "translate(100%, -50%)"),
         (currentTimeEle.innerText = "00:00"),
         (durationEle.innerText = "/ 00:00");
   },
   renderCurrentSong = (t) => {
      const e = $(".dashboard h4"),
         n = $(".dashboard h2"),
         o = $(".cd-img"),
         s = $(".title-wrapper h2");
      "unset" !== n.style.transition &&
         ((s.style.transition = "unset"), (s.style.transform = "translateX(0px)")),
         (e.innerText = t.singer),
         (n.innerText = t.name),
         (o.style.backgroundImage = `url(${t.image_url || "https://placehold.co/300"})`),
         (audioEle.src = t.song_url),
         (document.title = t.name);
   },
   toggleActive = function (t) {
      const e = $$(".song-item");
      for (var n of e) n.classList.contains("active") && n.classList.remove("active");
      const o = e[t.currentIndex];
      o && o.classList.add("active");
   };
export const loadCurrentSong = function () {
   if ((onPauseHandle(this), resetForNewSong(), !actuallySongs))
      return console.log("can't load current song");
   const t = actuallySongs[this.currentIndex];
   if (!t) return console.log("can't load current song");
   setLocalStorage("current", t),
      (this.currentSong = t),
      renderCurrentSong(t),
      toggleActive(this);
};
export const loadConfig = function () {
   (this.isRepeat = getLocalStorageItem("isRepeat", !1)),
      (this.isDark = getLocalStorageItem("isDark", !1));
   const t = getLocalStorageItem("current", null);
   if (((this.currentSong = t), window.innerWidth > 550)) {
      const t = getLocalStorageItem("volume", 1);
      (volumeSliderCurrent.style.width = 100 * t + "%"),
         (this.volume = t),
         (audioEle.volume = t);
   }
   randomBtn.classList.toggle("active", !!this.isRandom),
      rePeatBtn.classList.toggle("active", !!this.isRepeat),
      player.classList.toggle("dark", !!this.isDark),
      switchBtn.classList.toggle("dark", !!this.isDark);
};
export const loadCurrentSongFromLocalStorage = function () {
   renderCurrentSong(this.currentSong);
};
export const updateCurrentIndex = function () {
   if (!actuallySongs || !this.currentSong)
      return console.log("can't update current index");
   const t = actuallySongs.findIndex((t) => t.id === this.currentSong.id);
   -1 !== t && (this.currentIndex = t);
};
