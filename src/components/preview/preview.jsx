import React from "react";
import styles from "./preview.module.css";
import Card from "../card/card";

const Preview = ({ cards }) => {
  return (
    <section className={styles.preview}>
      <h1 className={styles.title}>Card Maker</h1>
      {Object.keys(cards).map((key) => (
        <Card key={key} card={cards[key]} />
      ))}
    </section>
  );
};

export default Preview;
