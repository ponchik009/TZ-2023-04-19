import { useRef } from "react";

export const useDebounce = (f: Function, delay: number) => {
  let timer = useRef<NodeJS.Timeout | null>(null);

  return (...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => f(...args), delay);
  };
};
