import { setLocalStorage } from "../../utils/appHelper.js";
import { onPauseHandle } from "./handleEvent.js";

const $ = document.querySelector.bind(document);

const level2 = $(".level2");
const level2Content = $(".level2-content");

const subMenuList = {
   info: `<div class="info-header">
  <button class="menu-back-btn">
  <svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  width="25px"
>
  <path
     stroke-linecap="round"
     stroke-linejoin="round"
     d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
  />
</svg>
  </button>
  </div><ul class="info-container ">
  <p class="main-info-title">Basic info:</p>
  <li><span>FullName: Nguyễn Hữu Đạt</span></li>
  <li><span>Birthday: 07/08/2003</span></li>
  <li><span>Address: Can Tho, Viet Nam</span></li>
  <li><span>Email: huudat01234560@gmail.com</span></li>
</ul>

<ul class="info-container separate">
  <p class="main-info-title">Graduate:</p>
  <li><span>Can Tho University</span></li>
  <li><span>Major: Software Engineering</span></li>
</ul>

<ul class="info-container separate">
  <p class="main-info-title">Skill:</p>
  <li><span>HTML, CSS, JavaScript (React JS, Vue JS)</span></li>
  <li><span>Node (ExpressJS)</span></li>
  <li><span>MySQL, NoSQL (MongoDB)</span></li>
  <li>Github</span></li>
  <li><span>English</span></li>
</ul>

<div class="contact">
<a href="https://facebook.com/DAtdz06" target="_blank">
<i class="fa-brands fa-facebook social-icon"></i>
</a>

<a href="https://www.linkedin.com/in/dat-nguyen-9371a926a" target="_blank">
<i class="fa-brands fa-linkedin social-icon"></i>
</a>

<a href="https://github.com/d4t06" target="_blank">
<i class="fa-brands fa-github social-icon"></i>
</a>
</div>`,
   test: "test",
};

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

      const subMenuEle = $(`.${subMenuName}`)

      if (subMenuEle) {
         level2.classList.add("open");
         subMenuEle.style.display = 'block'
         HandleGoBack();
      }
   };

   // handle on dark mode
   switchBtn.onclick = () => {
      const value = !_this.isDark;
      _this.isDark = value;
      setLocalStorage("isDark", value);

      switchBtn.classList.toggle("dark", _this.isDark);
      player.classList.toggle("dark", _this.isDark);
   };

   // handle select playlist
   songListSelect.onchange = (e) => {
      // pause
      onPauseHandle(_this);
      const playlistName = e.target.value;

      if (playlistName) {
         const playlist = _this.playlists.find((playlist) => playlist.name === e.target.value);
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
