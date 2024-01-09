export const setLocalStorage = (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
};
export const getLocalStorageItem = (key) => JSON.parse(localStorage.getItem(key)) || "";

export const  handleTimeText = (duration) => {
   if (!duration) return "";

   let minute = 0;
   let fixexDuration = +duration.toFixed(0);
   while (fixexDuration >= 60) {
     fixexDuration -= 60;
     minute++;
   }

   if (minute < 10) {
     if (fixexDuration >= 10) {
       return `0${minute}:${fixexDuration}`;
     }
     return `0${minute}:0${fixexDuration}`;
   } else {
     if (fixexDuration >= 10) {
       return `${minute}:${fixexDuration}`;
     }
     return `${minute}:0${fixexDuration}`;
   }
 };
