import React, { useEffect, useRef, useState } from "react";
import "./styles/styleCamera.css";

const Camera = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const [photoCapture, setPhotoCapture] = useState([]);

  const [esAndroid, setEsAndroid] = useState(false);

  const [esIphone, setEsIphone] = useState(false);


  // para detectar desde que dispositivo se esta viendo la aplicacion, IOS, Android, etc.
  // const esIosAndroid = () => {
  //   let userAgent = navigator.userAgent || navigator.vendor || window.opera;
  //   if (/android/i.test(userAgent)) {
  //     setEsAndroid(!esAndroid);
  //   } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
  //     setEsIphone(!esIphone);
  //   }
  // }

  

  // funcion que abre la camara
  const getVideo = () => {
    let constraints = {
      video: {
        facingMode: "environment",
        width: 500,
        height: 400,
      },
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        var video = videoRef.current;
        video.srcObject = mediaStream;
        const track = mediaStream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });
  };

  // probando que me devuelva un file
  console.log(photoCapture);

  let imageCapture;
  const takePhoto = () => {
    imageCapture?.takePhoto()
      .then((blob) => {
        //convierto lo que me trae el blob a un file, para procesarlo en el useDropzone
        const file = new File([blob], "photofrentedni", {
          type: blob.type,
        });
        // el blob es un objeto, similar a un archivo de datos PERO sin procesar.
        // en blob estan los datos de la imagen cargada. Estos datos los guardo en un estado.
        setPhotoCapture([file]);
      })
      .then((imageBitmap) => console.log(imageBitmap))
      .catch((err) => console.log(err));

    // esto es para que se muestre la imagen en la etiqueta canva.
    const width = 400;
    const height = 400;
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
    // esIosAndroid()
    getVideo();  
  }, []);
  

  return (
    <section className="container-takeAPhoto">
      <div className="container-camera-canva">
          <div className="container-mobile">

            <div className="camera">
              <video ref={videoRef}></video>
              <button onClick={takePhoto} className="bnt-capturar">
                Capturar
              </button>
            </div>

            <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
              <canvas ref={photoRef}></canvas>
              <button onClick={closePhoto} className="bnt-capturar">
                Sacar otra foto
              </button>
            </div>
          </div>

      </div>
    </section>
  );
};

export default Camera;
