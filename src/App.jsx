import React, { useState } from "react";
import "./App.css";
import VoiceSelector from "./components/VoiceSelector";
import Loader from "./components/Loader";
import AudioPlayer from "./components/AudioPlayer";

export default function App() {
  const [text, setText] = useState("");
  // Set initial state to the default voice
  const [voice, setVoice] = useState({ name: "Linda", lang: "en-us" });
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // NOTE: Ensure your .env file has REACT_APP_VOICERSS_KEY set!
  const API_KEY = process.env.REACT_APP_VOICERSS_KEY || "";

  const generateSpeech = async () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }
    if (!API_KEY) {
      alert("API Key is missing! Please set REACT_APP_VOICERSS_KEY in your .env file.");
      return;
    }

    setLoading(true);
    setAudioUrl(null);

    try {
      const params = new URLSearchParams({
        key: API_KEY,
        src: text,
        hl: voice.lang,
        v: voice.name,
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
      });

      const response = await fetch(`https://api.voicerss.org/?${params}`);
      const blob = await response.blob();

      if (blob.type === "audio/mpeg" && blob.size > 0) {
        setAudioUrl(URL.createObjectURL(blob));
      } else {
        // VoiceRSS API often returns error messages as text/xml blobs
        const errorText = await blob.text();
        console.error("API Error:", errorText);
        alert("Error generating audio. Check API key or text length.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to VoiceRSS API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🎙️ VivoSpeech</h1>
      <p className="subtitle">AI-Powered Text to Speech Converter</p>

      <textarea
        placeholder="Type your text here (max 500 chars)..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={500}
      ></textarea>

      <VoiceSelector voice={voice} setVoice={setVoice} />

      <button onClick={generateSpeech} disabled={loading || !text.trim()}>
        {loading ? "Generating Audio..." : "💎 Generate Premium Audio"}
      </button>

      {loading && <Loader />}

      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      <footer>
        <p>© 2025 VivoSpeech</p>
      </footer>
    </div>
  );
}