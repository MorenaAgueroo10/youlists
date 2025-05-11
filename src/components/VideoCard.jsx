import React from "react";
import { useState, useEffect } from "react";
import { Playmodal } from "./Playmodal";

export const VideoCard = ({ video, setVideos, videos, index }) => {
  const [isActive, setIsActive] = useState(false);

  const modalActive = () => {
    setIsActive(true);
    setVideos(
      videos.map((s) => {
        if (s.url === video.url) {
          return { ...s, count: s.count + 1 };
        }

        return s;
      })
    );
  };

  const deleteVideo = (url) => {
    const newArray = videos.filter((video) => video.url !== url);
    setVideos([...newArray]);
  };

  useEffect(() => {
    localStorage.setItem("videos", JSON.stringify(videos));
  }, [videos]);

  return (
    <>
      <article className="video-cargado">
        <h2>
          {index + 1}. {video.name}
        </h2>
        <h3>visualizaciones: {video.count}</h3>
        <div className="buttons-card-container">
          <button onClick={modalActive} disabled={isActive ? "disabled" : ""}>
            <ion-icon name="play-outline"></ion-icon>
          </button>
          <button onClick={() => deleteVideo(video.url)}>
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      </article>
      <Playmodal isActive={isActive} video={video} setIsActive={setIsActive} />
    </>
  );
};
