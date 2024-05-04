import { handleTimeText } from "./utils/appHelper.js";
import { playBtn, durationEle } from "./constant.js";

const $ = document.querySelector.bind(document);

const handleAudioEvent = function () {
   const _this = this;
   const audio = $(".audio");

   // const onWaitingHandle = function () {
   //    _this.isWaiting = true;
   //    playBtn.classList.add("waiting");
   //    playBtn.classList.remove("playing");
   // };

   audio.addEventListener("loadedmetadata", (e) => {
      durationEle.innerText = "/ " + handleTimeText(e.target.duration);

      _this.isFirstLoadSong = false;

      console.log("audio event");
   });

   // audio.onwaiting = () => onWaitingHandle();
};

export default handleAudioEvent;
