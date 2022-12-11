// import { menu } from "./menu.js";
import songs0 from "./songs.js";
import songs1 from "./songs1.js";
import songs2 from "./songs2.js";
import { onPauseHandle } from "./handleEvent.js";
// import { setSettings } from "./actions.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const infoHtml =  `<div class="info-header">
<button class="menu-back-btn">
  <i class="fa-solid fa-chevron-left"></i>
</button>
<span class="menu-title">Info</span>
</div>
<div class="info">
<div class="user-img">
  <img src="./assets/images/myavatar.jpg" alt="" />
</div>
<div class="user-overall">
</div>
<div class="main-info">
    
</div>
<div class="info-footer">
          <p>nguyenhuudat &copy</p>
        </div>
`

const menuList = $(".menu-list");
const myInput = $('#input')
console.log(myInput);
const stockMenuList = menuList.innerHTML;





const handleLoadImg = () => {
  const avatar = $('.user-img img');
  const userOverall = $('.user-overall')
  const mainInfo = $('.main-info')
  avatar.onload = () => {
    console.log('img loaded');
    userOverall.innerHTML = `
    <p class="user-name">Nguyen Huu Dat</p>
    <p class="user-jobs">Font-End dev</p>
    <span class="user-graduate">Can Tho University</span>
    `
    mainInfo.innerHTML = `
    <ul class="info-container">
    <p class="main-info-title">Basic info:</p>
    <li><span>Age: 20</span></li>
    <li><span>Email: huudat01234560@gmail.com</span></li>
    <li><span>Phone: 0977099335</span></li>
    <li><span>Language: Vietnamese, English</span></li>
    </ul>
    <ul class="info-container">
    <p class="main-info-title">Graduate:</p>
    <li><span>Can Tho University</span></li>
    <li><span>Major: Software Engineering</span></li>
    </ul>
    <ul class="info-container">
    <p class="main-info-title">Skill:</p>
    <li><span>Git</span></li>
    <li><span>UI, UX Design</span></li>
    <li><span>Fusion Team Work</span></li>
    </ul>
    
    <div class="user-contact">
      <i class="fa-brands fa-facebook"></i>
      <i class="fa-brands fa-github"></i>
      <i class="fa-solid fa-envelope"></i>
    </div>`
  }
}

export const HandleGoBack = (_this) => {
  let goBackBtn = $(".menu-back-btn");
  // console.log("handle go back");

  goBackBtn.onclick = () => {
    menuList.innerHTML = stockMenuList;
    handleCLick(_this);
  };
};
const handleCLick = (_this) => {
  // console.log('handle menu');
  const switchBtn = $(".switch");
  const songListSelect = $("#songListSelect");
  const toggleInfoBtn = $(".toggle-info")
  const player = $(".player");

  myInput.onchange = () => {
    if (!myInput.checked) {
      console.log('unchecked');
      menuList.innerHTML = stockMenuList;
      handleCLick(_this);
    }
  }
  // console.log(stockMenuList);
  _this.loadConfig()
  _this.setSettings();

  // info
  toggleInfoBtn.onclick = (e) => {
    menuList.innerHTML = infoHtml;
  HandleGoBack(_this);
  handleLoadImg ()
  };

  // dark mode
  switchBtn.onclick = () => {
    _this.isDark = !_this.isDark;
    _this.setConfig("isDark", _this.isDark);
    switchBtn.classList.toggle("dark", _this.isDark);
    player.classList.toggle("dark", _this.isDark);
  };
  // playlist select
  songListSelect.onchange = (e) => {
    const loadSongs = () => {
      onPauseHandle(_this);
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
  handleCLick(_this);
};

export default handleMenu;
