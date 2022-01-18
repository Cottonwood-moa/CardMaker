import React, { useEffect, useState } from "react";
import styles from "./maker.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Preview from "../preview/preview";
import Editor from "../editor/editor";
import { useNavigate } from "react-router-dom";

const Maker = ({
  authService,
  FileInput,
  getUserId,
  setGetUserId,
  cardRepository,
}) => {
  const [cards, setCards] = useState({});
  const navigate = useNavigate();
  // =====================================================
  // const updateCard = (card) => {
  //   const updated = { ...cards };s
  //   updated[card.id] = card;
  //   setCards(updated);
  // };
  // const test = useLocation();
  const createOrUpdateCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(getUserId, card);
  };
  // 주석된 로직으로 하면 cards가 오래된 상태일 가능성이 있다.(예를들어 몇 번 추가/변경하고 난 다음 cards 객체에 들어있는 데이터)
  // update 할때는 가장 최근에 변경된 cards 의 데이터를 복사해야 함으로 setCards안에 콜백 함수를 호출해서 setCards가 호출된 그 시점에서 cards를 복사하여 그 문제를 해결한다.
  // updated[card.id] = card 에서 updated[card.id]가 없다면 만들어서 할당이 되기 때문에 add 기능도 같이 사용할 수 있다.
  // =====================================================
  const deleteCard = (card) => {
    setCards((cards) => {
      const updated = { ...cards };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(getUserId, card);
  };
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    if (!getUserId) {
      authService.onAuthChange((user) => {
        if (user) {
          setGetUserId(user.uid);
        } else {
          navigate("/");
        }
      });
    }
    const stopSync = cardRepository.syncCards(getUserId, (cards) => {
      setCards(cards);
    });
    return () => {
      stopSync();
    };
  }, [getUserId, cardRepository, navigate, setGetUserId, authService]);

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setGetUserId(user.uid);
      } else {
        navigate("/");
      }
    });
  }, [authService, setGetUserId, navigate]);

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
