import * as firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyAI2floG38-3TXkcW6SRxMMCVv7-lFbcvw",
    authDomain: "my-lesson-d2e84.firebaseapp.com",
    databaseURL: "https://my-lesson-d2e84.firebaseio.com",
    projectId: "my-lesson-d2e84",
    storageBucket: "my-lesson-d2e84.appspot.com",
    messagingSenderId: "1065289732420",
    appId: "1:1065289732420:web:f6c643591ffd3014ec4711"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);