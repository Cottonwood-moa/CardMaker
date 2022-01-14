import firebaseApp from "./firebase";
class CardRepository {
  syncCards(getUserId, onUpdate) {
    const ref = firebaseApp.database().ref(`${getUserId}/cards`);
    console.log(getUserId);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }
  saveCard(getUserId, card) {
    firebaseApp.database().ref(`${getUserId}/cards/${card.id}`).set(card);
  }
  removeCard(getUserId, card) {
    firebaseApp.database().ref(`${getUserId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
