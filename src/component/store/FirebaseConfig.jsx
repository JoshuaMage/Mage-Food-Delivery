import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGKBxAJKNXsa9hsDQ_lWLuTdPLmhmOgXI",
  authDomain: "mage-food-delivery-61f67.firebaseapp.com",
  projectId: "mage-food-delivery-61f67",
  storageBucket: "mage-food-delivery-61f67.appspot.com",
  messagingSenderId: "147254352385",
  appId: "1:147254352385:web:27c8eb0635f92bd121be00"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
