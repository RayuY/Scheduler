import { useState } from "react"


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  // updates the history state array to decide which appointment component to show 
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

  // when axios fails, cleans the action and error history, reset state back to before axios call
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
