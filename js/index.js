import {
  requestNotificationPermission,
  createNotification,
} from "./notifications.js";
import push from "./push-notifications.js";

let stream = null;

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

const captureImage = async (stream) => {
  const mediaTrack = stream.getVideoTracks()[0];
  console.log(mediaTrack);
  const captureImg = new ImageCapture(mediaTrack);
  const photo = await captureImg.takePhoto();
  console.log(photo);
  const imgUrl = URL.createObjectURL(photo);
  console.log(imgUrl);
  document.querySelector("#photo").src = imgUrl;
};

const getMedia = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElem = document.getElementById("me");
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

/* document.querySelector("#addImg").addEventListener("click", () => {
  //document.querySelector('.shakespeare').classList.toggle('hide');
  captureImage(stream);
}); */

const registrateServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../sw.js")
      .then((registration) => {
        console.log("Registered service worker");
        push();
      })
      .catch((error) => console.log("Error with register service worker"));
  }
};

registrateServiceWorker();
requestNotificationPermission();
