import { useState, useEffect } from "react";
import { Wrapper, CounterText, Button, Label, Input } from "./Components";

const getInitailCounter = () => new Promise((res) => {
  setTimeout(() => res(10), 1000)
})

export const CounterPage = () => {
  const [initialCounter, setInitialCounter] = useState(10);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let id
    getInitailCounter().then((initialCounter) => {
      setCounter(initialCounter);
      id = setInterval(() => {
        setCounter((prevCounter) =>
          prevCounter > 0 ? prevCounter - 1 : prevCounter
        );
      }, 1000);
    });
    
    
    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, []);

  return (
    <Wrapper>
      <CounterText>{counter}</CounterText>
      <div>
        <Button onClick={() => setCounter((prevCounter) => prevCounter - 1)}>
          -1
        </Button>
        <Button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
          +1
        </Button>
      </div>
      <Label>
        <span>Initial Counter</span>
        <Input
          value={initialCounter}
          onChange={(event) => setInitialCounter(event.target.value)}
        />
      </Label>
    </Wrapper>
  );
};

export default CounterPage;
