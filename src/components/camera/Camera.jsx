import React, { useEffect, useRef, useState } from 'react'

const Camera = () => {

    const videoRef = useRef(null);
    const photoRef = useRef(null);
  
    const [hasPhoto, setHasPhoto] = useState(false);
  
    const getVideo = () => {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            facingMode: { exact: "environment" },
          })
          .then((stream) => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
          })
          .catch((err) => console.log(err));
      }
    };
  
    const asd = () => {
      let constraints = { video: true,  facingMode: { exact: "environment" } };
  
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (mediaStream) {
          var video = videoRef.current;
          video.srcObject = mediaStream;
          video.onloadedmetadata = function (e) {
            video.play();
          };
        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    };
  
    const takePhoto = () => {
      const width = 414;
      const height = width / (16 / 9);
      let video = videoRef.current;
      let photo = photoRef.current;
  
      photo.width = width;
      photo.height = height;
  
      let context = photo.getContext("2d");
      context.drawImage(video, 0, 0, width, height);
      setHasPhoto(true);
    };
  
    const closePhoto = () => {
      let photo = photoRef.current;
      let context = photo.getContext("2d");
      context.clearRect(0, 0, photo.width, photo.height);
      setHasPhoto(false);
    };
  
    useEffect(() => {
        getVideo();
    }, [videoRef]);
  return (
    <div className='App'>
        <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>Capturar</button>
      </div>
      <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>Close</button>
      </div>
    </div>
  )
}

export default Camera