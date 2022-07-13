import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh7Un3RGhme85bROYmxYoETR75pydLLOI",
  authDomain: "wheres-wally-game.firebaseapp.com",
  projectId: "wheres-wally-game",
  storageBucket: "wheres-wally-game.appspot.com",
  messagingSenderId: "682674230381",
  appId: "1:682674230381:web:01a0f82b0bbc03269e9b64",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
