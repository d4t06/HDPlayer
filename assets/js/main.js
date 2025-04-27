import {
   sortSongs,
   loadLocalStorage,
   render,
   nextSong,
   prevSong,
   randomSong,
   loadCurrentSong,
   fetchSongs,
   getActuallySongs,
   updateCurrentIndex,
} from "./actions.js";
import handleAudioEvent from "./handleAudioEvent.js";
import handleEvent from "./handleEvent.js";
import handleMenu from "./handleMenu.js";
import songLyric from "./songLyric.js";

const app = {
   isRepeat: false,
   isRandom: false,
   isFirstLoadSong: true,
   currentIndex: null,
   currentSong: null,
   isDark: false,

   songs: [],
   endOfList: false,

   isLocalStorageAvailable: true,

   //actions
   fetchSongs,
   sortSongs,
   loadLocalStorage,
   render,
   nextSong,
   prevSong,
   randomSong,
   loadCurrentSong,
   updateCurrentIndex,
   handleMenu,
   getActuallySongs,

   handleEvent,
   handleAudioEvent,

   // components
   songLyric,

   start: async function () {
      this.handleAudioEvent();

      this.loadLocalStorage();

      await this.fetchSongs();

      this.getActuallySongs();

      this.render();

      this.handleEvent();

      this.updateCurrentIndex();

      this.handleMenu();

      // components
      this.songLyric();
   },
};

app.start();
