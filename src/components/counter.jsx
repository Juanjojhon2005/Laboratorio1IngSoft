
import React, { useState } from 'react';

export default function Counter() {
  const [initialValue, setInitialValue] = useState(0);
  const [counter, setCounter] = useState(0);
  const [step, setStep] = useState(1);

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setStep(Number.isNaN(value) ? 1 : value);
  };

  const handleInitialValueChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const validValue = Number.isNaN(value) ? 0 : value;
    setInitialValue(validValue);
    setCounter(validValue);
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Contador</h2>
      <p>Valor actual: {counter}</p>

      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <button onClick={() => setCounter(counter - 1)}>-1</button>

      <br /><br />

      <input
        type="number"
        placeholder="Valor personalizado"
        onChange={handleStepChange}
      />
      <button onClick={() => setCounter(counter + step)}>+N</button>
      <button onClick={() => setCounter(counter - step)}>-N</button>

      <br /><br />

      <input
        type="number"
        placeholder="Valor inicial"
        onChange={handleInitialValueChange}
      />
      <button onClick={() => setCounter(initialValue)}>Resetear</button>
    </div>
  );
}
