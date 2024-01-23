import { useState, useEffect, useRef, useCallback } from "react";
import { Wrapper, CounterText, Button, Label, Input } from "./Components";

const getInitailCounter = () =>
  new Promise((res) => {
    setTimeout(() => res(10), 1000);
  });

export const CounterPage = () => {
  const [initialCounter, setInitialCounter] = useState(0);
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    setLoading(true);
    getInitailCounter().then((initialCounter) => {
      setLoading(false);
      setInitialCounter(initialCounter);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      inputEl.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    let id;
    setCounter(initialCounter);
    id = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter > 0 ? prevCounter - 1 : prevCounter
      );
    }, 1000);

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [initialCounter]);

  const decrement = useCallback(() => {
    setCounter((prevCounter) => prevCounter - 1);
  }, [setCounter]);

  const increment = useCallback(() => {
    setCounter((prevCounter) => prevCounter + 1);
  }, [setCounter]);

  const handleChange = useCallback(
    (e) => {
      setInitialCounter(e.target.value);
    },
    [setInitialCounter]
  );

  if (loading) return <Wrapper>Loading...</Wrapper>;
  return (
    <Wrapper>
      <CounterText>{counter}</CounterText>
      <div>
        <Button onClick={decrement}>-1</Button>
        <Button onClick={increment}>+1</Button>
      </div>
      <Label>
        <span>Initial Counter</span>
        <Input ref={inputEl} value={initialCounter} onChange={handleChange} />
      </Label>
    </Wrapper>
  );
};

export default CounterPage;
