import handleEvents from "./handleEvent.js";
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
} from "./actions.js";
import handleMenu from "./handleMenu.js";

const app = {
   currentIndex: 0,
   volume: 1,
   status: "",
   isRepeat: false,
   isRandom: false,
   isPlaying: false,
   isDark: false,
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
   handleMenu,
   handleEvents,
   getActuallySongs,
   renderMenu,

   start: async function () {
      this.loadConfig();

      await this.fetchSongs();

      this.getActuallySongs();

      this.render()
      
      this.loadCurrentSong();

      this.renderMenu();

      this.handleEvents();

      this.handleMenu();

   },
};

app.start();
