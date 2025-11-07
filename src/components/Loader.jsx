import React from "react";

export default function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Generating audio...</p>
    </div>
  );
}