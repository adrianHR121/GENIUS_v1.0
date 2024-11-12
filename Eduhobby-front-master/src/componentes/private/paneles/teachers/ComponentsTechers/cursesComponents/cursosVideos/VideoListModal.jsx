import React from 'react';

const VideoListModal = ({ videoIds, onClose, isOpen }) => {
  if (!isOpen) return null; // No renderizar si no está abierto

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <h2>Videos</h2>
      <ul>
        {videoIds.map((videoId) => (
          <li key={videoId}>
            Video ID: {videoId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoListModal;