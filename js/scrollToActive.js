import{dashboard}from"./constant.js";const scrollToActive=function(o){setTimeout((()=>{o.scrollIntoView({behavior:"smooth",block:"center"})}),200)};export default function handleScrollActiveSongIntoView(o){const t=window.innerWidth>=724,e=document.querySelector(".song-item.active");if(!e)return;const n=e.getBoundingClientRect();if(o)return scrollToActive(e);const c=dashboard.offsetHeight,i=t?n.top>0:n.top>c,r=n.top<window.innerHeight;i&&r&&(scrollToActive(e),console.log("scroll"))}