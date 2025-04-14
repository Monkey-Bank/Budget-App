import React from 'react';

let amounts = [
  10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
];

const Budget = () => {
  return (
    <>
      <div>
        <p>金額設定</p>
        <select>
          {amounts.map((amount) => {
            return <option key={amount}>{amount}</option>;
          })}
        </select>
      </div>

      <div>
        <p>使った金額：20000円</p>
        <p>残りの金額：50000円</p>
      </div>
    </>
  );
};

export default Budget;
