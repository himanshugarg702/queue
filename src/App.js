import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import './app.css'
const App = () => {
  const [counters, setCounters] = useState([
    { id: 'C1', items: 5 },
    { id: 'C2', items: 3 },
    { id: 'C3', items: 7 },
    { id: 'C4', items: 2 },
    { id: 'C5', items: 4 },
  ]);

  const [queue, setQueue] = useState([]);

  // ... (Previous code)

const moveCustomerToQueue = (counterId) => {
  const counterIndex = counters.findIndex(counter => counter.id === counterId);
  if (counterIndex !== -1) {
    const customer = counters[counterIndex];
    const newCounters = [...counters];
    newCounters.splice(counterIndex, 1);
    setCounters(newCounters);
    setQueue(prevQueue => [...prevQueue, customer]);
  }
};

const updateItems = () => {
  setCounters(prevCounters =>
    prevCounters.map(counter => ({
      ...counter,
      items: counter.items > 0 ? counter.items - 1 : 0,
    }))
  );

  setQueue(prevQueue =>
    prevQueue.map(customer => ({
      ...customer,
      items: customer.items > 0 ? customer.items - 1 : 0,
    }))
  );
};
// ... (Previous code)

const addCustomerToCounter = () => {
  if (queue.length > 0 && counters.length > 0) { // Check if counters array is not empty
    const leastItemsCounter = counters.reduce((minCounter, counter) =>
      counter.items < minCounter.items ? counter : minCounter
    );

    const newQueue = [...queue];
    const addedCustomer = newQueue.shift(); // Remove the first customer from the queue
    setQueue(newQueue);

    const updatedCounters = counters.map(counter =>
      counter.id === leastItemsCounter.id
        ? { ...counter, items: addedCustomer.items }
        : counter
    );

    setCounters(updatedCounters);
  }
};

// Add this inside the useEffect to call addCustomerToCounter when a customer leaves a counter
useEffect(() => {
  addCustomerToCounter();
}, [counters]);

// ... (Rest of the code)

  useEffect(() => {
    const interval = setInterval(() => {
      updateItems();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="app">
      <div className="counters">
        {counters.map((counter) => (
          <Counter key={counter.id} counter={counter} moveCustomerToQueue={moveCustomerToQueue} />
        ))}
      </div>
      <div className="queue">
      <div className="queue-header">Queue</div>
      {queue.map((customer, index) => (
        <div key={index} className="queue-customer">
          <div className="queue-triangle">{customer.items}</div>
          Customer {index + 1}
        </div>
      ))}
    </div>
    </div>
  );
};

export default App;
