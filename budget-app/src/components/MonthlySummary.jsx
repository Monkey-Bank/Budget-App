import React from 'react';

const MonthlySummary = ({ budgets, items }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3>月ごとの支出と残額</h3>
      {Object.entries(budgets).map(([month, budget]) => {
        const monthlyTotal = items
          .filter((item) => item.date.startsWith(month))
          .reduce((sum, item) => sum + Number(item.price), 0);
        const remaining = budget - monthlyTotal;
        return (
          <div key={month}>
            <strong>{month}</strong>：合計 {monthlyTotal} 円 ／ 残り {remaining}{' '}
            円
          </div>
        );
      })}
    </div>
  );
};

export default MonthlySummary;
