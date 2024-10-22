import {
   formatTime,
   getLocalStorageItem,
   setLocalStorage,
} from "./utils/appHelper.js";
import {
   playBtn,
   timeSlider,
   timeSliderHolder,
   currentTimeEle,
   durationEle,
   volumeSlider,
   volumeSliderHolder,
   audio,
   control,
} from "./constant.js";

const $ = document.querySelector.bind(document);

let intervalId = null; // scroll text

export const handleOnPause = function (_this) {
   playBtn.classList.remove("playing", "waiting");
   _this.isPlaying = false;
};

export const handleTimeUpdate = function (time) {
   const currentTime = time || audio.currentTime;
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
      playBtn.classList.remove("waiting");
      playBtn.classList.add("playing");

      _this.isPlaying = true;
      _this.isWaiting = false;
   };

   audio.onpause = () => {
      console.log("pause");
      handleOnPause(_this);
   };

   audio.onerror = () => {
      if (!_this.songs.length) return handleOnPause();
      _this.nextSong();
   };

   audio.onended = function () {
      if (_this.isRepeat) return audio.play();

      if (_this.isRandom) return _this.randomSong();

      _this.nextSong();
   };

   audio.addEventListener("timeupdate", () => {
      handleTimeUpdate();

      if (!!audio.currentTime && Math.round(audio.currentTime) % 3 === 0) {
         setLocalStorage("current-time", Math.round(audio.currentTime));
      }
   });

   audio.addEventListener("loadstart", () => {
      this.isWaiting = true;
      playBtn.classList.add("waiting");
      timeSlider.classList.add("disable");
   });

   audio.addEventListener("loadedmetadata", async (e) => {
      durationEle.innerText = formatTime(e.target.duration);

      this.isWaiting = false;
      playBtn.classList.remove("waiting");
      timeSlider.classList.remove("disable");
      control.classList.remove("disable");

      if (_this.isFirstLoadSong) {
         const currentTime = getLocalStorageItem("current-time", 0);
         handleTimeUpdate(currentTime);

         return;
      }

      if (_this.endOfList) {
         _this.endOfList = false;
      } else if (!_this.isPlaying) {
         // handleScrollActiveSongIntoView();
         scrollText();
         audio.play();
      }
   });
}
