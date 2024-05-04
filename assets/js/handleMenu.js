import { setLocalStorage } from "./utils/appHelper.js";
import { onPauseHandle } from "./handleEvent.js";

const $ = document.querySelector.bind(document);
const level2 = $(".level2");

export const HandleGoBack = (_this) => {
   let goBackBtn = $(".menu-back-btn");

   goBackBtn.onclick = () => {
      level2.classList.remove("open");
   };
};

const handleMenuEvents = (_this) => {
   const switchBtn = $(".switch");
   const songListSelect = $("#songListSelect");
   const toggleInfoBtn = $(".toggle-info");
   const player = $(".player");

   // _this.setSettings();

   // handle open sub menu
   toggleInfoBtn.onclick = (e) => {
      const subMenuName = e.target.getAttribute("data-for");
      // const subMenu = subMenuList[subMenuName];

      const subMenuEle = $(`.${subMenuName}`);

      if (subMenuEle) {
         level2.classList.add("open");
         subMenuEle.style.display = "block";
         HandleGoBack();
      }
   };

   // handle on dark mode
   switchBtn.onclick = () => {
      const value = !_this.isDark;
      _this.isDark = value;
      setLocalStorage("isDark", value);

      const body = $("body");
      body.classList.toggle("dark", _this.isDark);
      switchBtn.classList.toggle("dark", _this.isDark);
   };

   // handle select playlist
   songListSelect.onchange = (e) => {
      // pause
      onPauseHandle(_this);
      const playlistName = e.target.value;

      if (playlistName) {
         const playlist = _this.playlists.find(
            (playlist) => playlist.name === e.target.value
         );
         const playlistSongs = getPlaylistSongs(playlist, _this.songs);

         _this.playlistSongs = playlistSongs;
         _this.song_in = "playlist";
      } else {
         _this.song_in = "songs";
      }

      _this.currentIndex = 0;
      _this.getActuallySongs();

      _this.render();
      _this.loadCurrentSong();
      _this.handleEvents();
   };
};

const getPlaylistSongs = (playlist, songs) => {
   return songs.filter((song) => playlist.song_ids.includes(song.id));
};

const handleMenu = function () {
   const _this = this;
   handleMenuEvents(_this);
};

export default handleMenu;
