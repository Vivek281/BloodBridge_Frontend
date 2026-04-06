// Import the Firebase scripts
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDaSRvGJavq6nbavvKEYOEvNqJZ9GdDvvY",
  authDomain: "bloodbridge-d7517.firebaseapp.com",
  projectId: "bloodbridge-d7517",
  storageBucket: "bloodbridge-d7517.firebasestorage.app",
  messagingSenderId: "245814811674",
  appId: "1:245814811674:web:207a44cb67fa2c519605a3",
  measurementId: "G-CXC5WB2ZZT",
};

// Initializing the firebase app.
firebase.initializeApp(firebaseConfig);

// Retrieve the firebase messaging.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || "BloodBridge";
  const options = {
    body: payload?.notification?.body || "You have a new update.",
    icon: "/blood-drop.svg",
  };

  self.registration.showNotification(title, options);
  console.log("Received background message: ", payload);
});