import{setLocalStorage}from"./utils/appHelper.js";import{handleOnPause}from"./handleAudioEvent.js";const $=document.querySelector.bind(document),level2=$(".level2");export const HandleGoBack=e=>{$(".menu-back-btn").onclick=()=>{level2.classList.remove("open")}};const handleMenuEvents=e=>{const t=$(".switch"),n=$("#songListSelect");$(".toggle-info").onclick=e=>{const t=e.target.getAttribute("data-for"),n=$(`.${t}`);n&&(level2.classList.add("open"),n.style.display="block",HandleGoBack())},t.onclick=()=>{const n=!e.isDark;e.isDark=n,setLocalStorage("isDark",n);const s=document.querySelector(".my-tag");s&&(n?s.setAttribute("content","#333"):s.setAttribute("content","#fff"));$("body").classList.toggle("dark",e.isDark),t.classList.toggle("dark",e.isDark)},n.onchange=t=>{handleOnPause(e);if(t.target.value){const n=e.playlists.find((e=>e.name===t.target.value)),s=getPlaylistSongs(n,e.songs);e.playlistSongs=s,e.song_in="playlist"}else e.song_in="songs";e.currentIndex=0,e.getActuallySongs(),e.render(),e.loadCurrentSong(),e.handleEvents()}},getPlaylistSongs=(e,t)=>t.filter((t=>e.song_ids.includes(t.id))),handleMenu=function(){handleMenuEvents(this)};export default handleMenu;