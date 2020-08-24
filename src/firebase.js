import Rebase from 're-base';
import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyCZfHglLCCguOR4mYDiYHtnyk7HhDXZlZ4",
  authDomain: "spotifysocialmediamanager.firebaseapp.com",
  databaseURL: "https://spotifysocialmediamanager.firebaseio.com"
});

const database = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default database;