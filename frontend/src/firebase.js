import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRfPLS7b59hPrJ9I3qgEPO08ZkDSLSvr0",
  authDomain: "mydemo-71f56.firebaseapp.com",
  projectId: "mydemo-71f56",
  storageBucket: "mydemo-71f56.appspot.com",
  messagingSenderId: "728088660131",
  appId: "1:728088660131:web:2d0d68dee8edb3672e5716",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
