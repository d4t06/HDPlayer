import{setLocalStorage}from"./utils/appHelper.js";import{handleOnPause}from"./handleAudioEvent.js";const $=document.querySelector.bind(document),level2=$(".level2");export const HandleGoBack=e=>{$(".menu-back-btn").onclick=()=>{level2.classList.remove("open")}};const handleMenuEvents=e=>{const n=$(".switch"),t=$("#songListSelect");$(".toggle-info").onclick=e=>{const n=e.target.getAttribute("data-for"),t=$(`.${n}`);t&&(level2.classList.add("open"),t.style.display="block",HandleGoBack())},n.onclick=()=>{const t=!e.isDark;e.isDark=t,console.log("toggle"),setLocalStorage("isDark",t);$("body").classList.toggle("dark",e.isDark),n.classList.toggle("dark",e.isDark)},t.onchange=n=>{handleOnPause(e);if(n.target.value){const t=e.playlists.find((e=>e.name===n.target.value)),s=getPlaylistSongs(t,e.songs);e.playlistSongs=s,e.song_in="playlist"}else e.song_in="songs";e.currentIndex=0,e.getActuallySongs(),e.render(),e.loadCurrentSong(),e.handleEvents()}},getPlaylistSongs=(e,n)=>n.filter((n=>e.song_ids.includes(n.id))),handleMenu=function(){handleMenuEvents(this)};export default handleMenu;