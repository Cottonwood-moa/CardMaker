import React, { useEffect } from "react";
import Footer from "../footer/footer";
import Header from "../header/header";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
const Login = ({ authService, getId }) => {
  const navigate = new useNavigate();
  const goToMaker = (userId) => {
    navigate({
      pathname: "/maker",
      state: { id: userId },
    });
    getId(userId);
  };
  const onLogin = (event) => {
    authService //
      .login(event.currentTarget.textContent)
      .then((data) => goToMaker(data.user.uid));
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      // user 는 auth_service.js 에서 내려오는 변수
      user && goToMaker(user.uid);
    });
  });
  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
