import handleEvents from"./handleEvent.js";import handleAudioEvent from"./handleAudioEvent.js";import{sortSongs,loadConfig,render,nextSong,prevSong,randomSong,loadCurrentSong,fetchSongs,getActuallySongs,renderMenu,loadCurrentSongFromLocalStorage,updateCurrentIndex}from"./actions.js";import handleMenu from"./handleMenu.js";const app={currentSongs:null,currentIndex:0,volume:1,status:"",isRepeat:!1,isRandom:!1,isPlaying:!1,isDark:!1,isLoadedAudio:!1,lastPlayList:"",songs:[],song_in:"songs",endOfList:!1,playlists:[],playlistSongs:[],isWaiting:!1,fetchSongs:fetchSongs,sortSongs:sortSongs,loadConfig:loadConfig,render:render,nextSong:nextSong,prevSong:prevSong,randomSong:randomSong,loadCurrentSong:loadCurrentSong,loadCurrentSongFromLocalStorage:loadCurrentSongFromLocalStorage,updateCurrentIndex:updateCurrentIndex,handleMenu:handleMenu,handleEvents:handleEvents,handleAudioEvent:handleAudioEvent,getActuallySongs:getActuallySongs,renderMenu:renderMenu,start:async function(){this.handleAudioEvent(),this.loadConfig(),this.loadCurrentSongFromLocalStorage(),await this.fetchSongs(),this.getActuallySongs(),this.render(),this.updateCurrentIndex(),this.handleEvents(),this.renderMenu(),this.handleMenu()}};app.start();