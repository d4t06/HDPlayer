import { audio, player } from "./constant.js";

const LYRIC_TIME_BOUNDED = 0.3;

export default function songLyric() {
   const _this = this;

   let isOpenLyric = false;
   let lyrics = [];
   let lyricElements = [];

   /** for fetching song lyric */
   let timerId = 0;
   let ranGetLyric = false;

   /** for scroll to active lyric */
   let currentLyricIndex = -1;
   let seekDirection = "forward";
   let currentTime = 0;

   /** for scroll to active lyric when move between tabs */
   let scrollBehavior = "smooth";

   const songInfoEle = document.querySelector(".song-info");
   const songInfoSmallEle = document.querySelector(".song-info-small");
   const songLyricEle = document.querySelector(".song-lyric");

   const toggle = () => {
      isOpenLyric = !isOpenLyric;

      if (isOpenLyric) handleGetLyric();
      else scrollBehavior = "instant";

      songInfoEle.classList.toggle("hide", isOpenLyric);
      player.classList.toggle("expand", isOpenLyric);

      songInfoSmallEle.classList.toggle("hide", !isOpenLyric);
      songLyricEle.classList.toggle("hide", !isOpenLyric);
   };

   const showLoading = () => {
      songLyricEle.innerHTML = `<div class="center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="spin" style="width: 24px;" >
      <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd" />
    </svg></div>
       `;
   };

   const scroll = (ele) => {
      ele.scrollIntoView({
         behavior: scrollBehavior || "smooth",
         block: "center",
      });

      if (scrollBehavior === "instant") scrollBehavior = "smooth";
   };

   const active = (ele, force) => {
      ele.classList.toggle("active", force);
   };

   const showEmpty = () => {
      songLyricEle.innerHTML = `<div class="center">...</div>
       `;
   };

   const getLyricElements = () => {
      lyricElements = songLyricEle.querySelectorAll(".lyric");
   };

   const getLyric = async () => {
      if (!_this.currentSong) return showEmpty();

      try {
         showLoading();
         ranGetLyric = true;

         const res = await fetch(
            `https://nest-mp3.vercel.app/api/song-lyrics?song_id=${
               _this.currentSong.id
            }`
         );

         const payload = await res.json();

         if (payload.data) {
            lyrics = JSON.parse(payload.data.lyrics);
         }

         if (lyrics.length) {
            renderLyricList();
            getLyricElements();
         } else return showEmpty();
      } catch (error) {
         console.log(error);
         showEmpty();
      }
   };

   const handleGetLyric = () => {
      if (isOpenLyric && !ranGetLyric) timerId = setTimeout(getLyric, 500);
   };

   const resetForNewSong = () => {
      lyrics = [];
      clearTimeout(timerId);
      ranGetLyric = false;
      currentLyricIndex = -1;
      showEmpty();
   };

   const renderLyricList = () => {
      let html = "";

      if (lyrics.length) {
         lyrics.forEach((l) => {
            html += `<p class="lyric">${l.text}</p>`;
         });
      }

      songLyricEle.innerHTML = html;
   };

   const handleTimeUpdate = () => {
      if (!isOpenLyric) return;
      if (!lyricElements.length || !lyrics.length) return;

      if (audio.currentTime > currentTime) seekDirection = "forward";
      else seekDirection = "backward";

      currentTime = audio.currentTime;

      let nextIndex = currentLyricIndex;

      switch (seekDirection) {
         case "forward":
            while (
               lyrics[nextIndex + 1] &&
               lyrics[nextIndex + 1].start - LYRIC_TIME_BOUNDED <
                  currentTime + LYRIC_TIME_BOUNDED
            ) {
               if (!lyricElements[currentLyricIndex + 1]) return;
               nextIndex += 1;
            }
            break;

         case "backward":
            while (
               lyrics[nextIndex - 1] &&
               lyrics[nextIndex - 1].end - LYRIC_TIME_BOUNDED >
                  currentTime + LYRIC_TIME_BOUNDED
            ) {
               if (!lyricElements[currentLyricIndex - 1]) return;
               nextIndex -= 1;
            }
            break;
      }

      if (nextIndex !== currentLyricIndex) {
         // make scroll instantly
         if (Math.abs(nextIndex - currentLyricIndex) > 5)
            scrollBehavior = "instant";

         if (lyricElements[currentLyricIndex])
            active(lyricElements[currentLyricIndex], false);

         currentLyricIndex = nextIndex;

         active(lyricElements[nextIndex], true);
         scroll(lyricElements[nextIndex]);
      }
   };

   songInfoEle.addEventListener("click", toggle);
   songLyricEle.addEventListener("click", toggle);

   audio.addEventListener("loadstart", resetForNewSong);
   audio.addEventListener("loadedmetadata", handleGetLyric);
   audio.addEventListener("timeupdate", handleTimeUpdate);
}
