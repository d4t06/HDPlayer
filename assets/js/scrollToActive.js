import { dashboard } from "./constant.js";

const scrollToActive = function (activeSongEle) {
   setTimeout(() => {
      activeSongEle.scrollIntoView({
         behavior: "smooth",
         block: "center",
      });
   }, 200);
};

export default function handleScrollActiveSongIntoView(curIndex) {
   const isDesktop = window.innerWidth >= 724;

   const activeSongEle = document.querySelector(".song-item.active");
   if (!activeSongEle) return;

   if (curIndex !== undefined) return scrollToActive(songElements[curIndex]);

   const rect = activeSongEle.getBoundingClientRect();

   const playerHeight = dashboard.offsetHeight;
   const topCondition = isDesktop ? rect.top > 0 : rect.top > playerHeight;
   const bottomCondition = rect.top < window.innerHeight;

   if (topCondition && bottomCondition) {
      scrollToActive(activeSongEle);
   }
}
