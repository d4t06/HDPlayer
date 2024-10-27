export const setLocalStorage = (key, value) => {
   const storage = JSON.parse(localStorage.getItem("HD-Player") || "{}");
   storage[key] = value;

   localStorage.setItem("HD-Player", JSON.stringify(storage));
};

export const getLocalStorageItem = (key, initValue) =>
   JSON.parse(localStorage.getItem("HD-Player") || "{}")[key] || initValue;

export const formatTime = (time) => {
   const minutes = Math.floor(time / 60);
   const seconds = Math.floor(time % 60);
   return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const convertToEn = (name) =>
   name
      .toLocaleLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a")
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
      .replace(/ì|í|ị|ỉ|ĩ/g, "i")
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
      .replace(/ỳ|ý|ý|ỷ|ỹ/g, "y")
      .replace(/đ/g, "d");

// const getHashOfString = (str) => {
//    const array = Array.from(str);
//    return array.reduce(
//       (total, _char, index) => (total += str.charCodeAt(index)),
//       0
//    );
// };

// const hRange = [0, 360];
// const sRange = [50, 75];
// const lRange = [25, 55];

// const normalizeHash = (hash, min, max) => {
//    return Math.floor((hash % (max - min)) + min);
// };

// export const generateHSL = (name) => {
//    const hash = getHashOfString(name);
//    const h = normalizeHash(hash, hRange[0], hRange[1]);
//    const s = normalizeHash(hash, sRange[0], sRange[1]);
//    const l = normalizeHash(hash, lRange[0], lRange[1]);

//    return `hsl(${h}, ${s}%, ${l}%)`;
// };
