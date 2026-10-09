import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4_VAWEOEFGehwtOj7DUZU3zt_VNcMa74",
  authDomain: "diadpc.firebaseapp.com",
  projectId: "diadpc",
  storageBucket: "diadpc.firebasestorage.app",
  messagingSenderId: "431368218029",
  appId: "1:431368218029:web:93f1c531cf89276938ad24",
  measurementId: "G-0H8V0WJ5W0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const db = getFirestore(app);
export { app, analytics };
