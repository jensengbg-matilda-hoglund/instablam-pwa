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

// take photo
const captureImage = async (stream) => {
  const mediaTrack = stream.getVideoTracks()[0];

  console.log(mediaTrack);
  const captureImg = new ImageCapture(mediaTrack);
  const photo = await captureImg.takePhoto();
  const imgUrl = URL.createObjectURL(photo);
  document.querySelector(".imgSettings").style.display = "flex";
  document.querySelector("#addImg").style.display = "none";
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

  const canvas = document.querySelector("canvas");

  if (canvas) {
    downloadElem.href = document.getElementById("image").toDataURL();
    downloadElem.click();
    document.body.removeChild(downloadElem);
    const imageUrl = canvas.toDataURL("image/jpg");
    createNotification(imageUrl);
  } else {
    downloadElem.href = image.src;
    downloadElem.click();
    document.body.removeChild(downloadElem);
    createNotification(downloadElem);
  }
});

// get camera
const getMedia = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElem = document.getElementById("camera");
    videoElem.srcObject = stream;
    videoElem.addEventListener("loadedmetadata", () => {
      videoElem.play();
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

// edit image shit
const brightness = document.querySelector("#brightness");
const brightnessRange = document.querySelector("#brightnessRange");
const contrast = document.querySelector("#contrast");
const contrastRange = document.querySelector("#contrastRange");
const saturation = document.querySelector("#saturation");
const saturationRange = document.querySelector("#saturationRange");
const sepia = document.querySelector("#sepia");
const sepiaRange = document.querySelector("#sepiaRange");
const sharpen = document.querySelector("#sharpen");
const sharpenRange = document.querySelector("#sharpenRange");

let brightnessOldValue = 0;
let contrastOldValue = 0;
let saturationOldValue = 0;
let sepiaOldValue = 0;
let sharpenOldValue = 0;

// BRIGHTNESS
const changeBrightness = (value) => {
  Caman("#image", function () {
    if (value === 0) {
      this.revert();
    }
    this.brightness(value - brightnessOldValue);

    brightnessOldValue = value;
    this.render();
  });
};

brightnessRange.addEventListener("input", (e) => {
  let newValue = e.srcElement.value;
  changeBrightness(newValue);
});

brightness.addEventListener("click", () => {
  brightnessRange.style.display = "flex";
  contrastRange.style.display = "none";
  saturationRange.style.display = "none";
  sepiaRange.style.display = "none";
  sharpenRange.style.display = "none";
});

// ------------------

// CONTRAST
const changeContrast = (value) => {
  Caman("#image", function () {
    if (value === 0) {
      this.revert();
    }
    this.contrast(value - contrastOldValue);

    contrastOldValue = value;
    this.render();
  });
};

contrastRange.addEventListener("input", (e) => {
  let newValue = e.srcElement.value;
  changeContrast(newValue);
});

contrast.addEventListener("click", () => {
  contrastRange.style.display = "flex";
  saturationRange.style.display = "none";
  brightnessRange.style.display = "none";
  sepiaRange.style.display = "none";
  sharpenRange.style.display = "none";
});
// ------------------

// SATURATION
const changeSaturation = (value) => {
  Caman("#image", function () {
    if (value === 0) {
      this.revert();
    }
    this.saturation(value - saturationOldValue);

    saturationOldValue = value;
    this.render();
  });
};

saturationRange.addEventListener("input", (e) => {
  let newValue = e.srcElement.value;
  changeSaturation(newValue);
});

saturation.addEventListener("click", () => {
  saturationRange.style.display = "flex";
  contrastRange.style.display = "none";
  brightnessRange.style.display = "none";
  sepiaRange.style.display = "none";
  sharpenRange.style.display = "none";
});

// SEPIA
const changeSepia = (value) => {
  Caman("#image", function () {
    if (value === 0) {
      this.revert();
    }
    this.sepia(value - sepiaOldValue);

    sepiaOldValue = value;
    this.render();
  });
};

sepiaRange.addEventListener("input", (e) => {
  let newValue = e.srcElement.value;
  changeSepia(newValue);
});

sepia.addEventListener("click", () => {
  console.log("here");
  sepiaRange.style.display = "flex";
  saturationRange.style.display = "none";
  contrastRange.style.display = "none";
  brightnessRange.style.display = "none";
  sharpenRange.style.display = "none";
});

// SHARPEN

const changeSharpen = (value) => {
  Caman("#image", function () {
    if (value === 0) {
      this.revert();
    }
    this.sharpen(value - sharpenOldValue);

    sharpenOldValue = value;
    this.render();
  });
};

sharpenRange.addEventListener("input", (e) => {
  let newValue = e.srcElement.value;
  changeSharpen(newValue);
});

sharpen.addEventListener("click", () => {
  console.log("here");
  sharpenRange.style.display = "flex";
  saturationRange.style.display = "none";
  contrastRange.style.display = "none";
  brightnessRange.style.display = "none";
  sepiaRange.style.display = "none";
});
