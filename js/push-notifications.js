export default () => {
  let servicew;

  const publicKey =
    "BOZGoy3XBimNMwTFc08sctwfCsKAkZYb3LDUCx39ecNv4KeBkIDBIfvi0IniaCLG2KTWpxxBYdV8H_tUFbj_RSs";

  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.ready.then((sw) => {
      servicew = sw;
      sw.pushManager.getSubscription().then((subscription) => {
        console.log("Is subscribed: ", subscription);
      });
    });
  }

  const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  const saveSubscription = async (subscription) => {
    const url = "https://localhost/notifications/save";

    const response = await fetch(url, {
      method: "POST",
      //mode: "cors",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  document.querySelector(".notifications").addEventListener("click", () => {
    const notificationsOff = document.querySelector("#notificationsOff");
    const notificationsOn = document.querySelector("#notificationsOn");

    servicew.pushManager.getSubscription().then(async (subscription) => {
      if (subscription) {
        subscription.unsubscribe();
        notificationsOff.style.display = "flex";
        notificationsOn.style.display = "none";
      } else {
        try {
          const subscribed = await servicew.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(publicKey),
          });
          saveSubscription(subscribed);
          console.log(subscribed);

          notificationsOff.style.display = "none";
          notificationsOn.style.display = "flex";
        } catch (error) {}
      }
    });
  });
};
