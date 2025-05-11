import React, { useState, useEffect } from "react";
import { Playmodal } from "./Playmodal";
import { VideoCard } from "./VideoCard";
import Swal from "sweetalert2";

export const VideosList = () => {
  const videosInLocalStorage = () => {
    const data = localStorage.getItem("videos");
    return data ? JSON.parse(data) : [];
  };

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [videos, setVideos] = useState(videosInLocalStorage());
  const [filteredVideos, setFilteredVideos] = useState([]);

  function AddSongs() {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;

    if (name === "" || url === "") {
      Swal.fire({
        title: "Error!",
        text: "Todos los campos deben estar completos",
        icon: "error",
      });
      return;
    }

    const isRepeated = videos.some((video) => video.url === url);
    if (isRepeated) {
      Swal.fire({
        title: "Error!",
        text: "Este enlace ya fue añadido",
        icon: "error",
      });
      return;
    }

    if (!youtubeRegex.test(url)) {
      Swal.fire({
        title: "Error!",
        text: "URL no válida. Solo se aceptan enlaces de YouTube",
        icon: "error",
      });
      return;
    }

    const newVideo = { name: name, url: url, count: 0 };

    setVideos([...videos, newVideo]);
    Swal.fire({
      title: "¡Éxito!",
      text: "La canción fue agregada con exito",
      icon: "success",
    });
    setName("");
    setUrl("");
  }

  const orderVideos = () => {
    const sortedVideos = [...videos].sort((a, b) => b.count - a.count);
    setVideos(sortedVideos);
  };

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    if (searchSong !== "") {
      const results = videos.filter((video) =>
        video.name.toLowerCase().includes(searchSong.toLowerCase())
      );
      setFilteredVideos(results);
    } else {
      setFilteredVideos(videos);
    }
  }, [searchSong, videos]);

  return (
    <>
      <section className="form-song">
        <section className="form">
          <div className="inputs-container">
            <input
              className="myinput-link"
              type="text"
              placeholder="Ingresa cancion a buscar"
              onChange={(e) => setSearchSong(e.target.value)}
            />
            <article className="container-button">
              <input
                className="myinput-link"
                type="text"
                placeholder="Nombre del video"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </article>
            <article className="container-button">
              <input
                type="text"
                className="myinput-link"
                placeholder="youtube.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <span className="link-icon"></span>
            </article>
          </div>

          <button className="button2" onClick={AddSongs}>
            Agregar
          </button>
        </section>
        <button className="btnorder" onClick={orderVideos}>
          Ordenar
        </button>
        <section className="video">
          {filteredVideos.map((video, index) => (
            <VideoCard
              video={video}
              key={index}
              videos={videos}
              setVideos={setVideos}
              index={index}
            />
          ))}
        </section>
      </section>
    </>
  );
};
