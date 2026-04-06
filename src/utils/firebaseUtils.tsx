import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, type Messaging } from "firebase/messaging";
import { FirebaseConfigCredentials } from "../config/appConfig";

const firebaseConfig = {
    apiKey: FirebaseConfigCredentials.apiKey,
    authDomain: FirebaseConfigCredentials.authDomain,
    projectId: FirebaseConfigCredentials.projectId,
    storageBucket: FirebaseConfigCredentials.storageBucket,
    messagingSenderId: FirebaseConfigCredentials.messagingSenderId,
    appId: FirebaseConfigCredentials.appId,
    measurementId: FirebaseConfigCredentials.measurementId
};

const vapidKey: string = FirebaseConfigCredentials.vapidKey;

const app = initializeApp(firebaseConfig);
export const messaging: Messaging = getMessaging(app);

export const requestFCMToken = async (): Promise<string | null> => {
    try {
        const permission = await Notification.requestPermission();
        
        if (permission === "granted") {
            // 1. Manually register the Service Worker to ensure 'pushManager' exists so that it waits until the browser loads the Service Worker.
            const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
            // 2. CRITICAL: Wait for the Service Worker to be fully active
            // If it's still 'installing' or 'waiting', the pushManager won't be ready yet.
            await navigator.serviceWorker.ready; 
            // 3. Pass the registration object directly to getToken
            const token = await getToken(messaging, { 
                vapidKey, 
                serviceWorkerRegistration: registration 
            });
            
            return token;
        } else {
            console.warn("Notification permission denied");
            return null;
        }
    } catch (err) {
        console.error("Error getting FCM token: ", err);
        throw err;
    }
};

export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
};