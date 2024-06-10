
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB64PD9gvXdi9KaS--41mUld7Y-OIW8vF8",
    authDomain: "linkup-5af6e.firebaseapp.com",
    projectId: "linkup-5af6e",
    storageBucket: "linkup-5af6e.appspot.com",
    messagingSenderId: "553613041654",
    appId: "1:553613041654:web:7ccf2351e1548bb26db1d7",
    measurementId: "G-5FGSVV27QT"
  };


  const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};