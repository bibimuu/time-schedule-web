import firebase from 'firebase';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDlX2pTNVfmHNgwxDfK8No75aETZc4kcs0',
  authDomain: 'time-schedules-web.firebaseapp.com',
  databaseURL: 'https://time-schedules-web.firebaseio.com',
  projectId: 'time-schedules-web',
  storageBucket: 'time-schedules-web.appspot.com',
  messagingSenderId: '671864420635',
  appId: '1:671864420635:web:029aed93102e5b33d3bbbe',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
