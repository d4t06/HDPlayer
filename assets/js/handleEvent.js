import {
   audio,
   gotopBtn,
   musicVolume,
   nextBtn,
   playBtn,
   prevBtn,
   randomBtn,
   rePeatBtn,
   timeSlider,
} from "./constant.js";
import { updateVolume } from "./handleAudioEvent.js";
import { setLocalStorage } from "./utils/appHelper.js";

const $$ = document.querySelectorAll.bind(document);

export default function handleEvent() {
   const _this = this;
   const songElements = $$(".song-item");

   // const cdWidth = cd.offsetWidth;
   // const isDesktop = window.innerWidth >= 724;

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

   // cdImg.onclick = () => {
   //    handleScrollActiveSongIntoView(true);
   // };

   window.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > 100) gotopBtn.classList.add("show");
      else gotopBtn.classList.remove("show");
   };

   musicVolume.onclick = function (e) {
      let volumeBaseWidth = musicVolume.offsetWidth;
      let newVolume = (e.clientX - 25) / volumeBaseWidth;

      updateVolume(+newVolume.toFixed(2));

      setLocalStorage("volume", newVolume.toFixed(2));
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

      setLocalStorage("volume", newVolume.toFixed(2));
   };

   timeSlider.onclick = (e) => {
      // if (!_this.isLoadedAudio) return;

      let playerWidth = timeSlider.offsetWidth;
      let newCurrentTime = Math.floor(((e.clientX - 25) / playerWidth) * 100);
      let newTime = (audio.duration * newCurrentTime) / 100;
      audio.currentTime = +newTime.toFixed(2);

      if (!_this.isPlaying && !this.isWaiting) {
         console.log("playe");

         audio.play();
      }
   };

   // >>> button handle
   playBtn.onclick = function () {
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

   gotopBtn.onclick = () => {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
   };
}
