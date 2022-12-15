import React, { useEffect, useRef, useState } from 'react'
import './styles/styleCamera.css'

const Camera = () => {

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

   // la que va
   const asd = () => {
      let constraints = { video: {
        facingMode: "environment",
        width: 700
      }  
      } ;
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


  useEffect(() => {
      asd();
  }, [videoRef]);

  const takePhoto = () => {
      const width = 514;
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
  return (
    <section className='container-takeAPhoto'>
    <div className='container-camera-canva'>

    <div className="camera">
    <video ref={videoRef}></video>
    <button onClick={takePhoto} className="bnt-capturar">Capturar</button>
    </div>

  <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
    <canvas ref={photoRef}></canvas>
    <button onClick={closePhoto} className="bnt-capturar">Sacar otra foto</button>
  </div>

    </div>
</section>
  )
}

export default Camera