export const setLocalStorage=(e,t)=>{const o=JSON.parse(localStorage.getItem("HD-Player")||"{}");o[e]=t,localStorage.setItem("HD-Player",JSON.stringify(o))};export const getLocalStorageItem=(e,t)=>JSON.parse(localStorage.getItem("HD-Player")||"{}")[e]||t;export const handleTimeText=e=>{if(!e)return"";let t=0,o=+e.toFixed(0);for(;o>=60;)o-=60,t++;return t<10?o>=10?`0${t}:${o}`:`0${t}:0${o}`:o>=10?`${t}:${o}`:`${t}:0${o}`};