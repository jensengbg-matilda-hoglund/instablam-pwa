const reqNPermission = () => {
  Notification.requestPermission().then((response) => {
    console.log(response);
  });
};

const createNotification = (imgLink) => {
  const icon = "assets/images/instablam-icon.jpg";

  const notification = new Notification("New photo saved", {
    icon: icon,
  });

  notification.addEventListener("click", () => {
    window.open(imgLink);
  });
};

export { reqNPermission, createNotification };
