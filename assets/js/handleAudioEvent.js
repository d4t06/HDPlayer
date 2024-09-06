import { formatTime, setLocalStorage } from "./utils/appHelper.js";
import {
   cdImg,
   playBtn,
   timeSlider,
   timeSliderHolder,
   currentTimeEle,
   durationEle,
   volumeSlider,
   volumeSliderHolder,
   audio,
} from "./constant.js";
import handleScrollActiveSongIntoView from "./scrollToActive.js";

const $ = document.querySelector.bind(document);

let intervalId = null;
let setLocalStorageTimerId = 0;

export const handleOnPause = function (_this) {
   playBtn.classList.remove("playing");
   _this.isPlaying = false;
   cdImg.style.animationPlayState = "paused";

   clearInterval(setLocalStorageTimerId);
};

export const handleTimeUpdate = function () {
   const currentTime = audio.currentTime;
   const duration = audio.duration;

   const ratio = ((currentTime / duration) * 100).toFixed(1);

   timeSlider.style.background = `linear-gradient(to right, #999 ${ratio}%, #e1e1e1 ${ratio}%, #e1e1e1 100%)`;
   timeSliderHolder.style.left = ratio + "%";

   currentTimeEle.innerText = formatTime(currentTime) || "00:00";
};

export const updateVolume = (vol) => {
   audio.volume = vol;

   volumeSliderHolder.style.left = vol * 100 + "%";
   volumeSlider.style.background = `linear-gradient(to right, #999 ${
      vol * 100
   }%, #e1e1e1 ${vol * 100}%, #e1e1e1 100%)`;
};

export default function handleAudioEvent() {
   const _this = this;

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
      let isOverFlow =
         titleEl.offsetWidth - singerWrapper.offsetWidth > 0 ? true : false;
      if (!isOverFlow) return;

      calc();

      titleEl.innerHTML =
         titleEl.innerText + "&nbsp; &nbsp; &nbsp;" + titleEl.innerText;

      scroll();
      intervalId = setInterval(() => {
         scroll();
      }, duration * 1000 + 3000 + 1000);
   };

   //  >>> audio handle
   audio.onplaying = function () {
      playBtn.classList.add("playing");
      playBtn.classList.remove("waiting");

      _this.isPlaying = true;
      _this.isWaiting = false;
      cdImg.style.animationPlayState = "running";

      setLocalStorageTimerId = setInterval(() => {
         setLocalStorage("current-time", Math.ceil(audio.currentTime));
         console.log("set time");
      }, 3000);
   };

   audio.onpause = () => {
      console.log("pause");
      handleOnPause(_this);
   };

   audio.onerror = () => {
      if (!_this.songs.length) return handleOnPause();
      _this.nextSong();
   };

   audio.ontimeupdate = handleTimeUpdate;

   audio.onended = function () {
      if (_this.isRepeat) return audio.play();

      if (_this.isRandom) return _this.randomSong();

      _this.nextSong();
   };

   audio.onseeked = () => {
      clearInterval(setLocalStorageTimerId);
   };

   audio.addEventListener("loadedmetadata", (e) => {
      durationEle.innerText = formatTime(e.target.duration);

      if (_this.isFirstLoadSong) {
         _this.isFirstLoadSong = false;
         return;
      }

      if (_this.endOfList) {
         _this.endOfList = false;
      } else if (!_this.isPlaying) {
         handleScrollActiveSongIntoView();
         scrollText();
         audio.play();
      }
   });
}
