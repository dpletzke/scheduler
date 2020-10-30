import React, { useState } from "react";

export default function useVisualMode (initialMode) {
  const initialState = { mode:initialMode, history:[initialMode] };
  const [state, setState] = useState(initialState);

  const back = () => { 
    setState(prev => {
      if (prev.history.length <= 1) return prev;
      else return {
        mode:prev.history[1],
        history: prev.history.slice(1)
      }
    });
  };

  const transition = (newMode, replace = false) => {
    setState(prev => {
      const adjustedHistory = replace ? prev.history.slice(1) : prev.history;
       return {
        mode: newMode,
        history: [newMode, ...adjustedHistory]
      }
    });

  }

  return {mode: state.mode, back,  transition};
}