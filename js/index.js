import { reqNPermission, createNotification } from "./notifications.js";

import push from "./push-notifications.js";

let stream = null;

const image = document.getElementById("image");
const camera = document.getElementById("camera");
const download = document.getElementById("downloadImg");

document.addEventListener("touchstart", () => {
  setTimeout(() => {
    if (document.querySelector("body").scrollTop < 0) {
      getInsult();
    }
  }, 1000);
});

const randomiseHue = (videoElem) => {
  let i = 0;
  let interval = setInterval(() => {
    let number = Math.floor(Math.random() * 360);
    let number2 = Math.floor(Math.random() * 10);
    videoElem.style.filter = `hue-rotate(${number}deg) blur(${number2}px)`;
    i++;
    if (i == 10) {
      clearInterval(interval);
    }
  }, 2000);
};
// take photo
const captureImage = async (stream) => {
  const mediaTrack = stream.getVideoTracks()[0];

  console.log(mediaTrack);
  const captureImg = new ImageCapture(mediaTrack);
  const photo = await captureImg.takePhoto();
  const imgUrl = URL.createObjectURL(photo);

  console.log(photo);
  console.log(imgUrl);

  image.src = imgUrl;
  image.style.display = "flex";
  camera.style.display = "none";
  download.style.display = "flex";
};

//download image
document.getElementById("downloadImg").addEventListener("click", () => {
  const downloadElem = document.createElement("a");
  document.body.appendChild(downloadElem);

  downloadElem.style.display = "none";
  downloadElem.download = "myImage";
  downloadElem.href = image.src;
  downloadElem.click();

  document.body.removeChild(downloadElem);
});

// get camera
const getMedia = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElem = document.getElementById("camera");
    videoElem.srcObject = stream;
    videoElem.addEventListener("loadedmetadata", () => {
      videoElem.play();
      randomiseHue(videoElem);
    });
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
};

getMedia();

document.getElementById("addImg").addEventListener("click", () => {
  captureImage(stream);
});

const regSW = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../sw.js")
      .then(() => {
        console.log("SW working");
        push();
      })
      .catch(() => console.log("Error register SW"));
  }
};

regSW();
reqNPermission();
