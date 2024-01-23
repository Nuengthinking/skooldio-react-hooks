import { useState, useEffect } from "react";

const getInitailCounter = () =>
  new Promise((res) => {
    setTimeout(() => res(10), 1000);
  });

export const useApi = () => {
  const [initialCounter, setInitialCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getInitailCounter().then((initialCounter) => {
      setLoading(false);
      setInitialCounter(initialCounter);
    });
  }, []);
  return { loading, initialCounter, setInitialCounter };
};
