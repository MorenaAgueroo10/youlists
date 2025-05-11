import React from "react";

export const Playmodal = ({ isActive, video, setIsActive }) => {
  const { name, url } = video;
  const modalClass = isActive ? "active" : "";

  const getYoutubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(url);

  return (
    <section className={`modal ${modalClass}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={name}
        width="100%"
        height="315"
      ></iframe>
      <button className="btnclose" onClick={() => setIsActive(false)}>
        Close
      </button>
    </section>
  );
};
