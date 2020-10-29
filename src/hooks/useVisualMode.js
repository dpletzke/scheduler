import React, { useState } from "react";

export default function useVisualMode (initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const back = () => { 
    if (mode !== initialMode) history.pop();
    setMode(history[history.length - 1]);
  };

  const transition = (newMode, replace = false) => {
    if (replace) history.pop();
    setHistory(prev => [...prev, newMode]);
    setMode(newMode);
  }

  return {mode, back,  transition};
}