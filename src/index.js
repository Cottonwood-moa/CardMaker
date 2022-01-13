import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_uploader";
import ImageFileInput from "./components/image_file_input/image_file_input";

const authService = new AuthService();
const imageUploader = new ImageUploader();
const FileInput = (props) => {
  return <ImageFileInput {...props} imageUploader={imageUploader} />;
};
// 기능구현을 위해 service 폴더에 image_upload 로직을 구현했다.
// imageUploader 생성자를 ImageFileInput 컴포넌트까지 에스컬레이팅 (props로 계속 전달)해줘야 하는데
// 만약 injection이 계속 추가된다고 가정하면 추가하는 injection을 계속 내려보내줘야 하고
// 거기엔 injection 외에 다른 props들이 존재하기 때문에 가독성을 떨어뜨리고 거쳐야하는 컴포넌트들도 수정을 해야 하기 때문에 효율도 좋지않다.
// 그렇기 때문에 imageUploader를 prop으로 받는 컴포넌트 자체를 에스컬레이팅 해준다.
// 여기서 컴포넌트를 다시 한번 컴포넌트로 굳이 감싼 이유는 확장성을 위해서다.

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} FileInput={FileInput} />
  </React.StrictMode>,
  document.getElementById("root")
);
