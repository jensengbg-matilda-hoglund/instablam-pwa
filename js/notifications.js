function requestNotificationPermission() {
  Notification.requestPermission().then((response) => {
    console.log(response);
  });
}

function createNotification() {
  const icon = "assets/images/instablam-icon.png";

  const notification = new Notification("New photo saved", {
    icon: icon,
  });

  notification.addEventListener("click", (event) => {
    window.open("https://localhost/");
  });
}

export { requestNotificationPermission, createNotification };
