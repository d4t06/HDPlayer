import { dashboard } from "./constant.js";

const scrollToActive = function (activeSongEle) {
   setTimeout(() => {
      activeSongEle.scrollIntoView({
         behavior: "smooth",
         block: "center",
      });
   }, 200);
};

export default function handleScrollActiveSongIntoView(force) {
   const isDesktop = window.innerWidth >= 724;

   const activeSongEle = document.querySelector(".song-item.active");
   if (!activeSongEle) return;

   const rect = activeSongEle.getBoundingClientRect();

   if (force) return scrollToActive(activeSongEle);

   const playerHeight = dashboard.offsetHeight;
   const topCondition = isDesktop ? rect.top > 0 : rect.top > playerHeight;
   const bottomCondition = rect.top < window.innerHeight;

   if (topCondition && bottomCondition) {
      scrollToActive(activeSongEle);
      console.log("scroll");
   }
}
