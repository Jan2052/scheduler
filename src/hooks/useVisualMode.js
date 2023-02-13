import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.lengh < 2) {
      setMode(history[0])
    }

    if (history.length >= 2) {
      setMode(history[history.length - 2]);
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
    }
  };

  return { mode, transition, back };
};

