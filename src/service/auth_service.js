import firebase from "firebase";
import firebaseApp from "./firebase";
class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    return firebaseApp.auth().signInWithPopup(authProvider);
  }
  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged((user) => {
      // user 는 onAuthStateChanged가 가지고 있는 변수
      // 로그인이 안되어있을 때 null이 들어감
      onUserChanged(user);
    });
  }
  // onAuthChange -> login에서 호출됨 , 콜백함수를 매개변수로 받음 (콜백함수는 user가 true일시 goToMaker 함수를 호출.)
  logout() {
    firebase.auth().signOut();
  }
}

export default AuthService;
