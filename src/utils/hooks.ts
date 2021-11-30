import axios from "axios";
import { useRef, useEffect } from "react";

const noop = () => {};

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(noop);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (delay) {
      const id = setInterval(tick, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}

export async function getParsedFeed(url: String) {
  const res = await axios.post(`http://localhost:5000/index?url=${url}`);
  return res.data;
}
