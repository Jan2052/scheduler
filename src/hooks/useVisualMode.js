import {useState} from 'react';

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
    if (history.length > 1) {
      setHistory((prev) => {
        const newHistory = [...prev];
        newHistory.pop();
        setMode(newHistory[newHistory.length - 1]);
      });
    }
  };

  return {mode, transition, back};
};

