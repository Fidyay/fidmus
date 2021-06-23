import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


firebase.initializeApp({
  apiKey: "AIzaSyDOEsW0YWaCBhkCMXKNyRvhDrALTDcCvCw",
  authDomain: "fidmus-bf22a.firebaseapp.com",
  projectId: "fidmus-bf22a",
  storageBucket: "fidmus-bf22a.appspot.com",
  messagingSenderId: "679766465900",
  appId: "1:679766465900:web:2398a45d6dc9bd5a16e749",
  measurementId: "G-KKCMGBR7T3"
});


const auth = firebase.auth()
const firestore = firebase.firestore()

const FirebaseContext = createContext()

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <FirebaseContext.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <Provider store={store}>
      <App />
    </Provider>
    </FirebaseContext.Provider>
  </BrowserRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

export {FirebaseContext, firestore}
