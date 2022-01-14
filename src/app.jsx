import styles from "./app.module.css";
import Login from "./components/login/login";
import Maker from "./components/maker/maker";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App({ authService, FileInput, cardRepository }) {
  const [getUserId, setGetUserId] = useState();
  const getId = (userId) => {
    setGetUserId(userId);
  };

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login authService={authService} getId={getId} />}
          />
          <Route
            path="/maker"
            element={
              <Maker
                authService={authService}
                FileInput={FileInput}
                getUserId={getUserId}
                setGetUserId={setGetUserId}
                cardRepository={cardRepository}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
