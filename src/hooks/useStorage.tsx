import React from "react";
import { currencyStorage } from "../common/Types";

const useStorage = (
  key: string,
  defaultValue = [],
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
): [
  currencyStorage[],
  React.Dispatch<React.SetStateAction<currencyStorage[]>>
] => {
  const [state, setState] = React.useState<currencyStorage[]>(() => {
    if (typeof window !== "undefined") {
      const valueInLocalStorage = window.localStorage.getItem(key);
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage);
      }
    }
    return defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
};

export default useStorage;
