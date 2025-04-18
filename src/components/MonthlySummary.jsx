import React from 'react';

const MonthlySummary = ({ budgets, items }) => {
  return (
    <div className="bg-yellow-100">
      <h3>月ごとの支出と残額</h3>
      <ul>
        {Object.entries(budgets).map(([month, budget]) => {
          const monthlyTotal = items
            .filter((item) => item.date.startsWith(month))
            .reduce((sum, item) => sum + Number(item.price), 0);
          const remaining = budget - monthlyTotal;
          return (
            <li key={month}>
              {month}：合計 {monthlyTotal} 円 ／ 残り {remaining} 円
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MonthlySummary;
