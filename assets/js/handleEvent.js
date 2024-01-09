import { handleTimeText, setLocalStorage } from "../../utils/appHelper.js";
import {
   dashboard,
   cd,
   cdImg,
   playBtn,
   prevBtn,
   nextBtn,
   randomBtn,
   rePeatBtn,
   musicVolume,
   gotopBtn,
   timeSlider,
   timeSliderCurrent,
   timeSliderHolder,
   volumeSliderCurrent,
   volumeSliderHolder,
   currentTimeEle,
   durationEle,
   waitIcon,
} from "./constant.js";
// import { subMenu } from "./menu.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let intervalId;

const onPauseHandle = function (_this) {
   playBtn.classList.remove("playing");
   _this.isPlaying = false;
   cdImg.style.animationPlayState = "paused";
};

const handleEvents = function () {
   const _this = this;
   const audio = $(".audio");
   const songElements = $$(".song-item");

   const cdWidth = cd.offsetWidth;
   const isDesktop = window.innerWidth >= 724;

   let firstTimeRender = true;
   let isLoadedAudio = false;

   audio.volume = this.volume

   // define methods
   const playSong = function () {
      audio.play();
      _this.isPlaying = true;
      playBtn.classList.add("playing");
   };

   const scrollToActive = function (activeSongEle) {
      setTimeout(() => {
         activeSongEle.scrollIntoView({
            behavior: "smooth",
            block: "center",
         });
      }, 200);
   };

   const handleScroll = (index) => {
      const activeSongEle = $(".song-item.active");
      if (!activeSongEle) return;
      const rect = activeSongEle.getBoundingClientRect();

      const playerHeight = dashboard.offsetHeight;
      const topCondition = isDesktop ? rect.top > 0 : rect.top > playerHeight;
      const bottomCondition = rect.top < window.innerHeight;

      if (topCondition && bottomCondition) {
         console.log("scroll");
         scrollToActive(activeSongEle);
      } else {
         console.log("no scroll");
      }
   };

   if (!isDesktop) musicVolume.remove();
   else {
      window.addEventListener("keydown", (e) => {
         e.preventDefault();

         if (e.key === " ") {
            playBtn.click();
         }
      });
   }

   cdImg.onclick = () => {
      scrollToActive(_this.currentIndex);
   };

   const unScroll = () => {
      let titleEl = $(".title-wrapper h2");

      console.log("unscroll text");
      titleEl.style.transition = `unset`;
      titleEl.style.transform = `translateX(0px)`;
   };

   const scrollText = () => {
      if (intervalId) clearInterval(intervalId);

      let titleEl = $(".title-wrapper h2");
      let singerWrapper = $(".title-wrapper");
      let duration, distance;

      if (!titleEl || !singerWrapper) return;

      const handleScroll = () => {
         // scroll distance
         distance = titleEl.offsetWidth + 20;
         duration = +(distance / 35).toFixed(1);
      };

      const scroll = () => {
         console.log("scroll text");
         // add animation
         titleEl.style.transition = `transform linear ${duration}s`;
         titleEl.style.transform = `translateX(-${distance}px)`;

         setTimeout(() => {
            unScroll();
         }, duration * 1000);
      };

      // if innerText less than container
      let isOverFlow = titleEl.offsetWidth - singerWrapper.offsetWidth > 0 ? true : false;
      if (!isOverFlow) return;

      handleScroll();

      titleEl.innerHTML = titleEl.innerText + "&nbsp; &nbsp; &nbsp;" + titleEl.innerText;

      scroll();
      intervalId = setInterval(() => {
         scroll();
      }, duration * 1000 + 3000 + 1000);
   };

   // >>> play song when click
   songElements.forEach((song) => {
      song.onclick = (e) => {
         if (e.target.parentElement.classList.contains("song-detail")) return;

         if (+song.id !== _this.currentIndex) {
            _this.currentIndex = +song.id;
            _this.loadCurrentSong();
         }
      };
   });

   // const cdImgAnimate = cdImg.animate([{ transform: "rotate(360deg)" }], {
   //   duration: 12000,
   //   iterations: Infinity //
   // });

   // resize the cd when scroll
   window.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const newCdWidth = cdWidth - scrollTop / 2;
      const newOpacity = newCdWidth / cdWidth;

      if (newCdWidth < 0) {
         cd.style.width = 0 + "px";
         cd.style.opacity = 0;

         gotopBtn.classList.add("show");
         return;
      }

      cd.style.width = newCdWidth + "px";
      cd.style.opacity = newOpacity;

      gotopBtn.classList.remove("show");
   };

   const onPlayHandle = function () {
      playBtn.classList.add("playing");
      playBtn.classList.remove("waiting");

      _this.isPlaying = true;
      _this.isWaiting = false;
      cdImg.style.animationPlayState = "running";
   };

   const onWaitingHandle = function () {
      _this.isWaiting = true;
      playBtn.classList.add("waiting");
      playBtn.classList.remove("playing");
   };

   //  >>> audio handle
   audio.onplaying = () => onPlayHandle();

   audio.onpause = () => {
      onPauseHandle(_this);
   };

   audio.ontimeupdate = function () {
      const currentTime = audio.currentTime;
      const duration = audio.duration;

      timeSliderCurrent.style.width = (currentTime / (duration / 100)).toFixed(1) + "%";

      // timeSliderHolder.style.left = (currentTime / (duration / 100)).toFixed(1) + "%";
      timeSliderHolder.style.transform = `translateX(${
        100 - +(currentTime / (duration / 100) + 1).toFixed(1) + "%"
      })`;

      currentTimeEle.innerText = handleTimeText(currentTime) || "00:00";
   };

   audio.onended = function () {
      // unScroll();
      if (_this.isRepeat) {
         playSong();
         console.log("Repeat");
         return;
      }

      if (_this.isRandom) {
         _this.randomSong();
         // activeSong(_this.currentIndex);
         return;
      }

      // default
      _this.nextSong();
      // activeSong(_this.currentIndex);
   };

   audio.onloadedmetadata = (e) => {
      durationEle.innerText = "/ " + handleTimeText(e.target.duration);
      isLoadedAudio = true;

      if (firstTimeRender) {
         firstTimeRender = false;
         return;
      }

      if (_this.endOfList) {
         _this.endOfList = false;
      } else if (!_this.isPlaying) {
         handleScroll(_this.currentIndex);
         scrollText();
         playSong();
      }
   };

   audio.onwaiting = () => onWaitingHandle();

   // >> process handle
   musicVolume.onclick = function (e) {
      let volumeBaseWidth = musicVolume.offsetWidth;
      let newVolume = (e.clientX - 25) / volumeBaseWidth;

      volumeSliderCurrent.style.width = newVolume * 100 + "%";
      audio.volume = +newVolume.toFixed(2);

      setLocalStorage("volume", +newVolume.toFixed(2));
   };

   timeSlider.onclick = (e) => {
      if (!isLoadedAudio) return;

      let playerWidth = timeSlider.offsetWidth;
      let newCurrentTime = Math.floor(((e.clientX - 25) / playerWidth) * 100);
      let newTime = (audio.duration * newCurrentTime) / 100;
      audio.currentTime = +newTime.toFixed(2);

      if (!_this.isPlaying && !this.isWaiting) {
         playSong();
      }
   };

   // >>> button handle
   playBtn.onclick = function () {
      if (!isLoadedAudio) return;

      console.log("click", _this.isPlaying);
      if (_this.isPlaying) {
         audio.pause(); // (default)
      } else {
         audio.play();
      }
   };

   nextBtn.onclick = function () {
      _this.nextSong();
      _this.endOfList = false;
   };

   prevBtn.onclick = function () {
      _this.prevSong();
   };

   randomBtn.onclick = function () {
      const value = !_this.isRandom;

      _this.isRandom = value;
      setLocalStorage("isRandom", value);
      randomBtn.classList.toggle("active", value);
   };

   rePeatBtn.onclick = function () {
      const value = !_this.isRepeat;

      _this.isRepeat = value;
      setLocalStorage("isRepeat", value);
      rePeatBtn.classList.toggle("active", value);
   };

   gotopBtn.onclick = () => scrollToActive(0);
};

export { onPauseHandle };
export default handleEvents;
