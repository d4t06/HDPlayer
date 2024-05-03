import{handleTimeText,setLocalStorage}from"./utils/appHelper.js";import{dashboard,cd,cdImg,playBtn,prevBtn,nextBtn,randomBtn,rePeatBtn,musicVolume,gotopBtn,timeSlider,timeSliderCurrent,timeSliderHolder,volumeSliderCurrent,currentTimeEle}from"./constant.js";const $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document);let intervalId=null;const onPauseHandle=function(t){playBtn.classList.remove("playing"),t.isPlaying=!1,cdImg.style.animationPlayState="paused"},handleEvents=function(){const t=this,e=$(".audio"),n=$$(".song-item"),i=cd.offsetWidth,o=window.innerWidth>=724,l=function(){e.play(),t.isPlaying=!0,playBtn.classList.add("playing")},s=function(t){setTimeout((()=>{t.scrollIntoView({behavior:"smooth",block:"center"})}),200)},a=t=>{const e=$(".song-item.active");if(!e)return;if(void 0!==t)return s(n[t]);const i=e.getBoundingClientRect(),l=dashboard.offsetHeight,a=o?i.top>0:i.top>l,r=i.top<window.innerHeight;a&&r&&s(e)};cdImg.onclick=()=>{a(t.currentIndex)};const r=()=>{intervalId&&clearInterval(intervalId);let t,e,n=$(".title-wrapper h2"),i=$(".title-wrapper");if(!n||!i)return;const o=()=>{n.style.transition=`transform linear ${t}s`,n.style.transform=`translateX(-${e}px)`,setTimeout((()=>{(()=>{let t=$(".title-wrapper h2");console.log("unscroll text"),t.style.transition="unset",t.style.transform="translateX(0px)"})()}),1e3*t)};n.offsetWidth-i.offsetWidth>0&&(e=n.offsetWidth+20,t=+(e/35).toFixed(1),n.innerHTML=n.innerText+"&nbsp; &nbsp; &nbsp;"+n.innerText,o(),intervalId=setInterval((()=>{o()}),1e3*t+3e3+1e3))};n.forEach(((e,n)=>{e.onclick=i=>{i.target.parentElement.classList.contains("song-detail")||t.currentSong&&e.id===t.currentSong.id||(t.currentIndex=n,t.loadCurrentSong())}})),window.onscroll=function(){if(o)return;const t=window.scrollY||document.documentElement.scrollTop,e=i-t/2,n=e/i;if(e<0)return cd.style.width="0px",cd.style.opacity=0,void gotopBtn.classList.add("show");cd.style.width=e+"px",cd.style.opacity=n,gotopBtn.classList.remove("show")};function c(t){volumeSliderCurrent.style.width=100*t+"%",e.volume=t,setLocalStorage("volume",t)}e.onplaying=e=>(playBtn.classList.add("playing"),playBtn.classList.remove("waiting"),t.isPlaying=!0,t.isWaiting=!1,void(cdImg.style.animationPlayState="running")),e.onpause=()=>{onPauseHandle(t)},e.ontimeupdate=function(){const t=e.currentTime,n=e.duration;t&&(timeSliderCurrent.style.width=(t/(n/100)).toFixed(1)+"%",timeSliderHolder.style.transform=`translate(${100-+(t/(n/100)+1).toFixed(1)+"%"}, -50%)`,currentTimeEle.innerText=handleTimeText(t)||"00:00")},e.onended=function(){return t.isRepeat?l():t.isRandom?t.randomSong():void t.nextSong()},e.addEventListener("loadedmetadata",(e=>{t.ifFirstLoadSong||(t.endOfList?t.endOfList=!1:t.isPlaying||(a(),r(),l()))})),musicVolume.onclick=function(t){let e=musicVolume.offsetWidth;c(+((t.clientX-25)/e).toFixed(2))},musicVolume.onwheel=function(t){t.preventDefault();const n=.05;let i=e.volume;t.deltaY>0?i-n>0?i-=n:i=0:i+n<1?i+=n:i=1,c(+i.toFixed(2))},timeSlider.onclick=n=>{let i=timeSlider.offsetWidth,o=Math.floor((n.clientX-25)/i*100),s=e.duration*o/100;e.currentTime=+s.toFixed(2),t.isPlaying||this.isWaiting||l()},playBtn.onclick=function(){t.isPlaying?e.pause():e.play()},nextBtn.onclick=function(){t.nextSong(),t.endOfList=!1},prevBtn.onclick=function(){t.prevSong()},randomBtn.onclick=function(){const e=!t.isRandom;t.isRandom=e,setLocalStorage("isRandom",e),randomBtn.classList.toggle("active",e)},rePeatBtn.onclick=function(){const e=!t.isRepeat;t.isRepeat=e,setLocalStorage("isRepeat",e),rePeatBtn.classList.toggle("active",e)},gotopBtn.onclick=()=>a(0)};export{onPauseHandle};export default handleEvents;