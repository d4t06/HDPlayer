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

const app = {
   isRepeat: false,
   isRandom: false,
   isPlaying: false,
   isWaiting: false,

   isFirstLoadSong: true,
   currentIndex: 0,
   isDark: false,

   songs: [],
   endOfList: false,

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

   start: async function () {
      this.handleAudioEvent();

      this.loadLocalStorage();

      await this.fetchSongs();

      this.getActuallySongs();

      this.render();

      this.handleEvent();

      this.updateCurrentIndex();

      this.handleMenu();
   },
};

app.start();
