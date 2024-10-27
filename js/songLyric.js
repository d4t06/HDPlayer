import{audio,player}from"./constant.js";const LYRIC_TIME_BOUNDED=.3;export default function songLyric(){const e=this;let t=!1,a=[],n=[],r=0,s=!1,i=-1,o="forward",l=0,c="smooth";const d=document.querySelector(".song-info"),u=document.querySelector(".song-info-small"),g=document.querySelector(".song-lyric"),h=()=>{t=!t,t?m():c="instant",d.classList.toggle("hide",t),player.classList.toggle("expand",t),u.classList.toggle("hide",!t),g.classList.toggle("hide",!t)},f=(e,t)=>{e.classList.toggle("active",t)},v=()=>{g.innerHTML='<div class="center">...</div>\n       '},p=async()=>{if(!e.currentSong)return v();try{g.innerHTML='<div class="center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="spin" style="width: 24px;" >\n      <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clip-rule="evenodd" />\n    </svg></div>\n       ',s=!0;const t=await fetch(`https://nest-mp3.vercel.app/api/song-lyrics?song_id=${e.currentSong.id}`),r=await t.json();if(r.data&&(a=JSON.parse(r.data.lyrics)),!a.length)return v();w(),n=g.querySelectorAll(".lyric")}catch(e){console.log(e),v()}},m=()=>{t&&!s&&(r=setTimeout(p,500))},w=()=>{let e="";a.length&&a.forEach((t=>{e+=`<p class="lyric">${t.text}</p>`})),g.innerHTML=e};d.addEventListener("click",h),g.addEventListener("click",h),audio.addEventListener("loadstart",(()=>{a=[],clearTimeout(r),s=!1,i=-1,v()})),audio.addEventListener("loadedmetadata",m),audio.addEventListener("timeupdate",(()=>{if(!t)return;if(!n.length||!a.length)return;o=audio.currentTime>l?"forward":"backward",l=audio.currentTime;let e=i;switch(o){case"forward":for(;a[e+1]&&a[e+1].start-.3<l+.3;){if(!n[i+1])return;e+=1}break;case"backward":for(;a[e-1]&&a[e-1].end-.3>l+.3;){if(!n[i-1])return;e-=1}}e!==i&&(Math.abs(e-i)>5&&(c="instant"),n[i]&&f(n[i],!1),i=e,f(n[e],!0),n[e].scrollIntoView({behavior:c||"smooth",block:"center"}),"instant"===c&&(c="smooth"))}))}