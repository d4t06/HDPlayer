import{songlist,timeSliderHolder,currentTimeEle,switchBtn,randomBtn,rePeatBtn,body,timeSlider,audio,playBtn,durationEle}from"./constant.js";import{handleOnPause,updateVolume}from"./handleAudioEvent.js";import{convertToEn,generateHSL,getLocalStorageItem,setLocalStorage}from"./utils/appHelper.js";const $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document),audioEle=$(".audio");let actuallySongs=[];export const getActuallySongs=function(){console.log("get actually songs"),actuallySongs=this.songs};export const fetchSongs=async function(){try{const t=await fetch("https://nest-mp3.vercel.app/api/songs");if(!t.ok)throw new Error("");const e=await t.json();e.data.songs.length&&(this.songs=e.data.songs)}catch(t){console.log(t)}};export const sortSongs=function(){var t=this.songs.sort(((t,e)=>convertToEn(t.name.charAt(0))>convertToEn(e.name.charAt(0))));this.songs=t};export const render=function(){let t="";if(!actuallySongs.length)return t+="<h1>Error when render songs</h1>";actuallySongs.forEach((e=>{t+=`<li class="song-item ${this.currentSong&&this.currentSong.id===e.id?"active":""}" id="${e.id}">\n            <div class="song-frame" style="background-color: ${generateHSL(e.name)}">\n               ${e.name.charAt(0)}\n            </div>\n            <div class="song-info">\n              <h2>${e.name}</h2>\n              <h4>${e.singer}</h4>\n            </div>\n            <div class="song-detail">\n              <i class="fa-solid fa-ellipsis-vertical"></i>\n            </div>\n          </li>`})),songlist.innerHTML=t};export const renderMenu=function(){};export const nextSong=function(){let t=this.currentIndex+1;t<=actuallySongs.length-1?this.currentIndex=t:(this.currentIndex=0,this.endOfList=!0),this.loadCurrentSong()};export const prevSong=function(){this.currentIndex=this.currentIndex>0?this.currentIndex-1:actuallySongs.length-1,this.loadCurrentSong()};export const randomSong=function(){let t=0;do{t=Math.floor(actuallySongs.length*Math.random())}while(t===this.currentIndex);this.currentIndex=t,this.loadCurrentSong()};const resetForNewSong=()=>{timeSlider.style.background="#e1e1e1",timeSliderHolder.style.left="0",currentTimeEle.innerText="0:00",durationEle.innerText="0:00",setLocalStorage("current-time",0)},renderCurrentSong=t=>{if(!t.currentSong)return;const e=$(".dashboard h4"),n=$(".dashboard h2"),o=$(".cd-img"),r=$(".title-wrapper h2");"unset"!==n.style.transition&&(r.style.transition="unset",r.style.transform="translateX(0px)"),e.innerText=t.currentSong.singer,n.innerText=t.currentSong.name,o.style.backgroundImage=`url(${t.currentSong.image_url||"https://placehold.co/300"})`,audioEle.src=t.currentSong.song_url,document.title=t.currentSong.name},toggleActive=function(t){const e=$$(".song-item");for(var n of e)n.classList.contains("active")&&n.classList.remove("active");const o=e[t.currentIndex];o&&o.classList.add("active")};export const loadCurrentSong=function(){handleOnPause(this),resetForNewSong();const t=actuallySongs[this.currentIndex];if(!t)return console.log("can't load current song");setLocalStorage("current",t),this.currentSong=t,renderCurrentSong(this),toggleActive(this)};export const loadLocalStorage=function(){this.isRepeat=getLocalStorageItem("isRepeat",!1),this.isDark=getLocalStorageItem("isDark",!1);const t=getLocalStorageItem("current",null),e=getLocalStorageItem("current-time",0);if(this.currentSong=t,audioEle.currentTime=e,window.innerWidth>550){const t=getLocalStorageItem("volume",1);updateVolume(t)}if(randomBtn.classList.toggle("active",this.isRandom),rePeatBtn.classList.toggle("active",this.isRepeat),body.classList.toggle("dark",this.isDark),switchBtn.classList.toggle("dark",this.isDark),this.isDark){const t=document.querySelector(".my-tag");t&&t.setAttribute("content","#333")}renderCurrentSong(this)};export const updateCurrentIndex=function(){if(!actuallySongs||!this.currentSong)return console.log("can't update current index");const t=actuallySongs.findIndex((t=>t.id===this.currentSong.id));-1!==t&&(this.currentIndex=t)};