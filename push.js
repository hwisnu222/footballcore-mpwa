const webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BP9PwRDrzDhYJl7Pr5SpUCYAJtpteooE2yMnC-T8CKOStZk7BcIuGwXO8qBjNyYthQwBo-5ae6-mnRwNkmGF-HI",
  privateKey: "lBh7b9-VKDRD9uV-Q_kx8U3iWKID6ZvyfgAmBA6sMXU",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/ebtBlCEjj-0:APA91bEDQjD41BDhS3STQtQgUgo5obATgOadMft1BW3IINN0SXiKzrKtWi-dGs0f-LCUt_q7TalwmuWWsxpZIx6dvA26dmsWZ0qWMH-As-6A82ZBB2ggtF9l0oUHXSIiCMqp04ZaoTY5",
  keys: {
    p256dh:
      "BPm1CHKfzar9uuuFCOHFn8DvvFuKxwOKNTZigo+mE8ABkLKCzC9+52TUjqbL/0ODnJvDVeTBPMRwuvdoIYzWG/Q=",
    auth: "a/U1uT/8hkkq9T0arihHrw==",
  },
};
const payload = "Hai.. aku notifikasi dari Footballcore";

const options = {
  gcmAPIKey: "844179201651",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
