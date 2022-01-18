import { firebaseDatabase } from "./firebase";
class CardRepository {
  syncCards(getUserId, onUpdate) {
    const ref = firebaseDatabase.ref(`${getUserId}/cards`);
    ref.on("value", (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
    return () => ref.off();
  }
  saveCard(getUserId, card) {
    firebaseDatabase.ref(`${getUserId}/cards/${card.id}`).set(card);
  }
  removeCard(getUserId, card) {
    firebaseDatabase.ref(`${getUserId}/cards/${card.id}`).remove();
  }
}

export default CardRepository;
