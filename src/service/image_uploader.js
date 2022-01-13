class ImageUploader {
  async upload(file) {
    const data = new FormData();
    //FormData 인터페이스는 form 필드와 그 값을 나타내는 일련의 key/value 쌍을 쉽게 생성할 수 있는 방법을 제공합니다.
    // 또한 XMLHttpRequest.send() (en-US) 메서드를 사용하여 쉽게 전송할 수 있습니다. ---> 노드에서 실행했을때 콘솔에는 FormData is not defined 가 뜬다.
    // 실제로 통신은 잘됨.
    // 객체를 통신할 때 json으로 변환해서 보내야 하는 걸 생략해주는 느낌으로 이해하자
    data.append("file", file);
    data.append("upload_preset", "t1vybx3b");
    console.log(data);
    const result = await fetch(
      "https://api.cloudinary.com/v1_1/dznxhgek6/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    return await result.json();
  }
}
/*
POST 요청은 보통 정보를 API 서버에 제공할 때 사용한다. body나 params 를 통해 데이터를 통신하는데
요청과 동시에 위처럼 변수에 담으면 받아올 수도 있다.
*/
export default ImageUploader;
