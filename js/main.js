import handleEvents from"./handleEvent.js";import handleAudioEvent from"./handleAudioEvent.js";import{sortSongs,loadConfig,render,nextSong,prevSong,randomSong,loadCurrentSong,fetchSongs,getActuallySongs,renderMenu,loadCurrentSongFromLocalStorage,updateCurrentIndex}from"./actions.js";import handleMenu from"./handleMenu.js";const app={isRepeat:!1,isRandom:!1,isPlaying:!1,isWaiting:!1,isFirstLoadSong:!0,currentIndex:0,isDark:!1,songs:[],endOfList:!1,fetchSongs:fetchSongs,sortSongs:sortSongs,loadConfig:loadConfig,render:render,nextSong:nextSong,prevSong:prevSong,randomSong:randomSong,loadCurrentSong:loadCurrentSong,loadCurrentSongFromLocalStorage:loadCurrentSongFromLocalStorage,updateCurrentIndex:updateCurrentIndex,handleMenu:handleMenu,handleEvents:handleEvents,handleAudioEvent:handleAudioEvent,getActuallySongs:getActuallySongs,renderMenu:renderMenu,start:async function(){this.loadConfig(),await this.fetchSongs(),this.sortSongs(),this.getActuallySongs(),this.render(),this.loadCurrentSongFromLocalStorage(),this.updateCurrentIndex(),this.handleEvents(),this.renderMenu(),this.handleMenu()}};app.start();