import { handleTimeText, setLocalStorage } from "./utils/appHelper.js";
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
   currentTimeEle,
   durationEle,
} from "./constant.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let intervalId = null;

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

   const handleScrollActiveSongIntoView = (curIndex) => {
      const activeSongEle = $(".song-item.active");
      if (!activeSongEle) return;

      if (curIndex !== undefined) return scrollToActive(songElements[curIndex]);

      const rect = activeSongEle.getBoundingClientRect();

      const playerHeight = dashboard.offsetHeight;
      const topCondition = isDesktop ? rect.top > 0 : rect.top > playerHeight;
      const bottomCondition = rect.top < window.innerHeight;

      if (topCondition && bottomCondition) {
         scrollToActive(activeSongEle);
      }
   };

   cdImg.onclick = () => {
      handleScrollActiveSongIntoView(_this.currentIndex);
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

      const calc = () => {
         // scroll distance
         distance = titleEl.offsetWidth + 20;
         duration = +(distance / 35).toFixed(1);
      };

      const scroll = () => {
         titleEl.style.transition = `transform linear ${duration}s`;
         titleEl.style.transform = `translateX(-${distance}px)`;

         setTimeout(() => {
            unScroll();
         }, duration * 1000);
      };

      // if innerText less than container
      let isOverFlow = titleEl.offsetWidth - singerWrapper.offsetWidth > 0 ? true : false;
      if (!isOverFlow) return;

      calc();

      titleEl.innerHTML = titleEl.innerText + "&nbsp; &nbsp; &nbsp;" + titleEl.innerText;

      scroll();
      intervalId = setInterval(() => {
         scroll();
      }, duration * 1000 + 3000 + 1000);
   };

   // >>> play song when click
   songElements.forEach((song, index) => {
      song.onclick = (e) => {
         if (e.target.parentElement.classList.contains("song-detail")) return;

         if (!_this.currentSong || song.id !== _this.currentSong.id) {
            _this.currentIndex = index;

            // set and load current song
            _this.loadCurrentSong();
         }
      };
   });

   // resize the cd when scroll
   window.onscroll = function () {
      if (isDesktop) return;
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

   const onPlayHandle = function (e) {
      playBtn.classList.add("playing");
      playBtn.classList.remove("waiting");

      _this.isPlaying = true;
      _this.isWaiting = false;
      cdImg.style.animationPlayState = "running";
   };

   //  >>> audio handle
   audio.onplaying = (e) => onPlayHandle(e);

   audio.onpause = () => {
      onPauseHandle(_this);
   };

   audio.ontimeupdate = function () {
      const currentTime = audio.currentTime;
      const duration = audio.duration;

      if (!currentTime) return;

      timeSliderCurrent.style.width = (currentTime / (duration / 100)).toFixed(1) + "%";

      // timeSliderHolder.style.left = (currentTime / (duration / 100)).toFixed(1) + "%";
      timeSliderHolder.style.transform = `translate(${
         100 - +(currentTime / (duration / 100) + 1).toFixed(1) + "%"
      }, -50%)`;

      currentTimeEle.innerText = handleTimeText(currentTime) || "00:00";
   };

   audio.onended = function () {
      if (_this.isRepeat) return playSong();

      if (_this.isRandom) return _this.randomSong();

      _this.nextSong();
   };

   audio.addEventListener("loadedmetadata", (e) => {
      durationEle.innerText = "/ " + handleTimeText(e.target.duration);

      if (_this.isFirstLoadSong) {
         _this.isFirstLoadSong = false;
         return;
      }

      console.log("event event");

      if (_this.endOfList) {
         _this.endOfList = false;
      } else if (!_this.isPlaying) {
         handleScrollActiveSongIntoView();
         scrollText();
         playSong();
      }
   });

   function updateVolume(vol) {
      volumeSliderCurrent.style.width = vol * 100 + "%";
      audio.volume = vol;

      setLocalStorage("volume", vol);
   }

   musicVolume.onclick = function (e) {
      let volumeBaseWidth = musicVolume.offsetWidth;
      let newVolume = (e.clientX - 25) / volumeBaseWidth;

      updateVolume(+newVolume.toFixed(2));
   };

   musicVolume.onwheel = function (e) {
      e.preventDefault();

      const AMOUNT = 0.05;
      let newVolume = audio.volume;

      // scroll down
      if (e.deltaY > 0) {
         if (newVolume - AMOUNT > 0) newVolume -= AMOUNT;
         else {
            newVolume = 0;
         }
      } else {
         if (newVolume + AMOUNT < 1) newVolume += AMOUNT;
         else {
            newVolume = 1;
         }
      }

      updateVolume(+newVolume.toFixed(2));
   };

   timeSlider.onclick = (e) => {
      // if (!_this.isLoadedAudio) return;

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
      // if (!_this.isLoadedAudio) return;

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

   gotopBtn.onclick = () => handleScrollActiveSongIntoView(0);
};

export { onPauseHandle };
export default handleEvents;
