import handleEvents from "./handleEvent.js";
import handleAudioEvent from "./handleAudioEvent.js";
import {
   sortSongs,
   loadConfig,
   render,
   nextSong,
   prevSong,
   randomSong,
   loadCurrentSong,
   fetchSongs,
   getActuallySongs,
   renderMenu,
   loadCurrentSongFromLocalStorage,
   updateCurrentIndex,
} from "./actions.js";
import handleMenu from "./handleMenu.js";

const app = {
   currentSongs: null,
   currentIndex: 0,
   volume: 1,
   status: "",
   isRepeat: false,
   isRandom: false,
   isPlaying: false,
   isDark: false,
   isFirstLoadSong: true,
   lastPlayList: "",

   songs: [],
   song_in: "songs",
   endOfList: false,
   playlists: [],
   playlistSongs: [],
   isWaiting: false,

   //actions
   fetchSongs,
   sortSongs,
   loadConfig,
   render,
   nextSong,
   prevSong,
   randomSong,
   loadCurrentSong,
   loadCurrentSongFromLocalStorage,
   updateCurrentIndex,
   handleMenu,
   handleEvents,
   handleAudioEvent,
   getActuallySongs,
   renderMenu,

   start: async function () {
      // this.handleAudioEvent();

      this.loadConfig();

      await this.fetchSongs();

      this.getActuallySongs();

      this.render();

      this.loadCurrentSongFromLocalStorage();

      this.updateCurrentIndex();

      this.handleEvents();

      this.renderMenu();

      this.handleMenu();
   },
};

app.start();
