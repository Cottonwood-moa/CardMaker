import { firebaseAuth, githubProvider, googleProvider } from "./firebase";
class AuthService {
  login(providerName) {
    const authProvider = this.getProvider(providerName);
    return firebaseAuth.signInWithPopup(authProvider);
  }
  logout() {
    firebaseAuth.signOut();
  }
  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged((user) => {
      // user 는 onAuthStateChanged가 가지고 있는 변수
      // 로그인이 안되어있을 때 null이 들어감
      onUserChanged(user);
    });
  }
  // onAuthChange -> login에서 호출됨 , 콜백함수를 매개변수로 받음 (콜백함수는 user가 true일시 goToMaker 함수를 호출.)
  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return googleProvider;
      case "Github":
        return githubProvider;
      default:
        throw new Error(`not supported provider:${providerName}`);
    }
  }
}

export default AuthService;
