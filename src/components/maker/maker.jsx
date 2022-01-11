import React, { useEffect, useState } from "react";
import styles from "./maker.module.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Preview from "../preview/preview";
import Editor from "../editor/editor";
import { useNavigate } from "react-router-dom";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Cottonwood",
      company: "moa",
      theme: "light",
      title: "Software Engineer",
      email: "geon0529@gmail.com",
      message: "go for it",
      fileName: "Cottonwood",
      fileURL: null,
    },
    {
      id: "2",
      name: "Cottonwood2",
      company: "moa",
      theme: "dark",
      title: "Software Engineer",
      email: "geon0529@gmail.com",
      message: "go for it",
      fileName: "Cottonwood",
      fileURL: null,
    },
    {
      id: "3",
      name: "Cottonwood3",
      company: "moa",
      theme: "colorful",
      title: "Software Engineer",
      email: "geon0529@gmail.com",
      message: "go for it",
      fileName: "Cottonwood",
      fileURL: "",
    },
  ]);
  const navigate = new useNavigate();
  const onLogout = () => {
    authService.logout();
  };
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        navigate("/");
      }
    });
  });
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
