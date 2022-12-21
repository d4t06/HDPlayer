// import { menu } from "./menu.js";
import songs0 from "./songs.js";
import songs1 from "./songs1.js";
import songs2 from "./songs2.js";
import { onPauseHandle } from "./handleEvent.js";
// import { setSettings } from "./actions.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const infoHtml = `<div class="info-header">
<button class="menu-back-btn">
  <i class="fa-solid fa-chevron-left"></i>
</button>
<span class="menu-title">Info</span>
</div>
<div class="info">
<div class="user-img skeleton">
  <img src="./assets/images/myavatar.jpg" alt="" />
</div>
<div class="user-overall">
</div>
<div class="main-info">
    
</div>
<h1 class="loading">Loading...</h1>

`;

const menuList = $(".menu-list");
const myInput = $("#input");
// console.log(myInput);
const stockMenuList = menuList.innerHTML;

const handleLoadImg = () => {
  const avatar = $(".user-img img");
  const userOverall = $(".user-overall");
  const mainInfo = $(".main-info");
  const loading = $(".loading");
  const userImg = $(".user-img");
  avatar.onload = () => {
    loading.remove();
    userImg.classList.remove("skeleton");
    console.log("img loaded");
    userOverall.innerHTML = `
    <p class="user-name">Nguyen Huu Dat</p>
    <p class="user-jobs">Font-End dev</p>
    <span class="user-graduate">Can Tho University</span>
    `;
    mainInfo.innerHTML = `
    <ul class="info-container ">
    <p class="main-info-title">Basic info:</p>
    <li><span>Age: 20</span></li>
    <li><span>Major: Software Engineering</span></li>
    <li><span>Languages: Vietnamese, English</span></li>
    </ul>
    <ul class="info-container separate">
    <p class="main-info-title">Graduate:</p>
    <li><span>Can Tho University</span></li>
    </ul>
    <ul class="info-container separate">
    <p class="main-info-title">Skill:</p>
    <li><span>Github</span></li>
    <li><span>UI, UX Design</span></li>
    <li><span>Fusion Team Work</span></li>
    </ul>

    <div class="contact">

    <a href="#">
    <i class="fa-brands fa-facebook social-icon"></i>
    
    </a>
    
    <a href="#">
    <i class="fa-solid fa-envelope social-icon"></i>  
    
    </a>
    
    <a href="#">
    <i class="fa-brands fa-github social-icon"></i>
    
    </a>

    </div>
`;
  };
};

export const HandleGoBack = (_this) => {
  let goBackBtn = $(".menu-back-btn");
  // console.log("handle go back");

  goBackBtn.onclick = () => {
    menuList.innerHTML = stockMenuList;
    handleMenuEvents(_this);
  };
};
const handleMenuEvents = (_this) => {
  // console.log('handle menu');
  const switchBtn = $(".switch");
  const songListSelect = $("#songListSelect");
  const toggleInfoBtn = $(".toggle-info");
  const player = $(".player");

  // load cac cai dat cua menu
  _this.setSettings();

  myInput.onchange = () => {
    if (!myInput.checked) {
      console.log("unchecked handle menu events");
      menuList.innerHTML = stockMenuList;
      handleMenuEvents(_this);
    }
  };
  // console.log(stockMenuList);

  // _this.loadConfig();

  // info
  toggleInfoBtn.onclick = (e) => {
    menuList.innerHTML = infoHtml;
    HandleGoBack(_this);
    handleLoadImg();
  };

  // dark mode
  switchBtn.onclick = () => {
    // gan lai bien global
    _this.isDark = !_this.isDark;
    _this.setConfig("isDark", _this.isDark);
    switchBtn.classList.toggle("dark", _this.isDark);
    player.classList.toggle("dark", _this.isDark);
  };
  // playlist select
  songListSelect.onchange = (e) => {
    const loadSongs = () => {
      onPauseHandle(_this);
      // gan lai bien global
      _this.lastPlayList = _this.config.lastPlayList;
      _this.currentIndex = 0;
      console.log(_this.currentIndex);
      _this.updatePath();
      _this.render();
      _this.loadCurrentSong();
      _this.handlEvents();
    };
    switch (e.target.value) {
      case "pmq":
        _this.songs = songs1;
        _this.setConfig("lastPlayList", "songs1");

        break;
      case "ngocmai":
        _this.songs = songs2;
        _this.setConfig("lastPlayList", "songs2");
        break;
      default:
        _this.songs = songs0;
        _this.setConfig("lastPlayList", "songs0");
        break;
    }
    loadSongs();
  };
};
const handleMenu = function () {
  const _this = this;
  handleMenuEvents(_this);
};

export default handleMenu;
