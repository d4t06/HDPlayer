import{handleTimeText as t,setLocalStorage as n}from"./utils/appHelper.js";import{dashboard as e,cd as i,cdImg as o,playBtn as s,prevBtn as l,nextBtn as a,randomBtn as c,rePeatBtn as r,musicVolume as d,gotopBtn as u,timeSlider as f,timeSliderCurrent as p,timeSliderHolder as m,volumeSliderCurrent as g,currentTimeEle as y}from"./constant.js";const h=document.querySelector.bind(document),w=document.querySelectorAll.bind(document);let x;const v=function(t){s.classList.remove("playing"),t.isPlaying=!1,o.style.animationPlayState="paused"};export{v as onPauseHandle};export default function(){const L=this,k=h(".audio"),S=w(".song-item"),R=i.offsetWidth,T=window.innerWidth>=724,W=function(){k.play(),L.isPlaying=!0,s.classList.add("playing")},P=function(t){setTimeout((()=>{t.scrollIntoView({behavior:"smooth",block:"center"})}),200)},b=t=>{const n=h(".song-item.active");if(!n)return;if(void 0!==t)return P(S[t]);const i=n.getBoundingClientRect(),o=e.offsetHeight,s=T?i.top>0:i.top>o,l=i.top<window.innerHeight;s&&l&&P(n)};o.onclick=()=>{b(L.currentIndex)};const F=()=>{x&&clearInterval(x);let t,n,e=h(".title-wrapper h2"),i=h(".title-wrapper");if(!e||!i)return;const o=()=>{e.style.transition=`transform linear ${t}s`,e.style.transform=`translateX(-${n}px)`,setTimeout((()=>{(()=>{let t=h(".title-wrapper h2");console.log("unscroll text"),t.style.transition="unset",t.style.transform="translateX(0px)"})()}),1e3*t)};e.offsetWidth-i.offsetWidth>0&&(n=e.offsetWidth+20,t=+(n/35).toFixed(1),e.innerHTML=e.innerText+"&nbsp; &nbsp; &nbsp;"+e.innerText,o(),x=setInterval((()=>{o()}),1e3*t+3e3+1e3))};S.forEach(((t,n)=>{t.onclick=e=>{e.target.parentElement.classList.contains("song-detail")||t.id!==L.currentSong.id&&(L.currentIndex=n,L.loadCurrentSong())}})),window.onscroll=function(){if(T)return;const t=window.scrollY||document.documentElement.scrollTop,n=R-t/2,e=n/R;if(n<0)return i.style.width="0px",i.style.opacity=0,void u.classList.add("show");i.style.width=n+"px",i.style.opacity=e,u.classList.remove("show")};function I(t){g.style.width=100*t+"%",k.volume=t,n("volume",t)}k.onplaying=()=>(s.classList.add("playing"),s.classList.remove("waiting"),L.isPlaying=!0,L.isWaiting=!1,void(o.style.animationPlayState="running")),k.onpause=()=>{v(L)},k.ontimeupdate=function(){const n=k.currentTime,e=k.duration;n&&(p.style.width=(n/(e/100)).toFixed(1)+"%",m.style.transform=`translate(${100-+(n/(e/100)+1).toFixed(1)+"%"}, -50%)`,y.innerText=t(n)||"00:00")},k.onended=function(){L.isRepeat?W():L.isRandom?L.randomSong():L.nextSong()},k.addEventListener("loadedmetadata",(t=>{L.endOfList?L.endOfList=!1:L.isPlaying||(b(),F(),W())})),d.onclick=function(t){let n=d.offsetWidth;I(+((t.clientX-25)/n).toFixed(2))},d.onwheel=function(t){t.preventDefault();const n=.05;let e=k.volume;t.deltaY>0?e-n>0?e-=n:e=0:e+n<1?e+=n:e=1,I(+e.toFixed(2))},f.onclick=t=>{if(!L.isLoadedAudio)return;let n=f.offsetWidth,e=Math.floor((t.clientX-25)/n*100),i=k.duration*e/100;k.currentTime=+i.toFixed(2),L.isPlaying||this.isWaiting||W()},s.onclick=function(){L.isLoadedAudio&&(L.isPlaying?k.pause():k.play())},a.onclick=function(){L.nextSong(),L.endOfList=!1},l.onclick=function(){L.prevSong()},c.onclick=function(){const t=!L.isRandom;L.isRandom=t,n("isRandom",t),c.classList.toggle("active",t)},r.onclick=function(){const t=!L.isRepeat;L.isRepeat=t,n("isRepeat",t),r.classList.toggle("active",t)},u.onclick=()=>b(0)}