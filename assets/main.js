import handleEvents from "./js/handleEvent.js";
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
} from "./js/actions.js";
import handleMenu from "./js/handleMenu.js";
import { playlist, songs } from "./js/testData.js";

const app = {
   currentIndex: 0,
   volume: 1,
   status: "",
   isRepeat: false,
   isRandom: false,
   isPlaying: false,
   isDark: false,
   lastPlayList: "",

   songs: songs,
   song_in: "songs",
   endOfList: false,
   playlists: playlist,
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
      await this.fetchSongs();

      this.getActuallySongs();

      this.loadConfig();

      this.render()
      
      this.loadCurrentSong();

      this.renderMenu();

      this.handleEvents();

      this.handleMenu();

   },
};

app.start();
