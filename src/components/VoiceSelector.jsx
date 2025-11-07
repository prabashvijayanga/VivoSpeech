import React from "react";

const voiceData = [
  { name: "Linda", lang: "en-us", gender: "F", desc: "Clear American English - Neutral accent" },
  { name: "Amy", lang: "en-gb", gender: "F", desc: "British English - Received Pronunciation" },
  { name: "Harry", lang: "en-gb", gender: "M", desc: "British English - Authoritative tone" },
  { name: "Mike", lang: "en-us", gender: "M", desc: "American English - Strong masculine voice" },
];

export default function VoiceSelector({ voice, setVoice }) {
  const handleVoiceSelect = (v) => {
    setVoice(v);
  };

  return (
    <div className="voice-selector">
      <h3>🗣️ Available Voices</h3>
      <div className="voice-options-grid">
        {voiceData.map((v) => (
          <div
            key={v.name}
            className={`voice-card ${voice.name === v.name ? "selected" : ""}`}
            onClick={() => handleVoiceSelect(v)}
          >
            <div className="voice-icon">
              {v.gender === "F" ? "♀️" : "♂️"}
            </div>
            <div className="voice-details">
              <h4>{v.name} ({v.lang})</h4>
              <p>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}