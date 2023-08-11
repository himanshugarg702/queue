import React from 'react';

const Counter = ({ counter, moveCustomerToQueue }) => {
  const { id, items } = counter;

  const leaveCounter = () => {
    if (items > 0) {
      return; // Prevent leaving if items are still remaining
    }
  
    moveCustomerToQueue(id);
  };
  

  return (
    <div className="counter">
      <div className="counter-label">{id}</div>
      <div className="customer-triangle">{items}</div>
      <button onClick={leaveCounter}>Leave Counter</button>
    </div>
  );
};

export default Counter;
