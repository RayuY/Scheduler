import { useState } from "react"


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (stateMode, replace = false) => {

    setMode(stateMode)
    
    setHistory((prev) => {
      const newhistory = [...prev];
      if (replace) {
        newhistory[newhistory.length - 1] = stateMode;
      } else {
        newhistory.push(stateMode);
      }
      return newhistory
    });
  };

  const back = () => {
    const prevMode = [...history][(history.length - 2)];

    if (history.length > 1) {
      setMode(prevMode);
    }
    setHistory((prev) => {
      const newhistory = [...prev];
      newhistory.pop()
      return newhistory;
    });
  }

  return {
    mode,
    transition,
    back
  };
}
