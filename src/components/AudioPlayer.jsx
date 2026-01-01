import React from "react";

export default function AudioPlayer({ audioUrl }) {
  const downloadAudio = () => {
    // Note: audioUrl is a temporary object URL created by URL.createObjectURL(blob)
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "vivospeech_output.mp3";
    
    // Required for proper triggering in some browsers
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the temporary URL to free up memory
    window.URL.revokeObjectURL(audioUrl); 
  };

  return (
    <div className="audio-section">
      <audio controls src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
      <button className="download-btn" onClick={downloadAudio}>
         ⬇️ Download Audio
      </button>
    </div>
  );
}
