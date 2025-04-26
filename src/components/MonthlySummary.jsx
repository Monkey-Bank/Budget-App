import React from 'react';

const MonthlySummary = ({ budgets, items }) => {
  const currentMonth = new Date().toISOString().slice(0, 7); // "2025-04" の形式
  const currentBudget = budgets[currentMonth] || 0;

  const currentMonthItems = items.filter((item) =>
    item.date.startsWith(currentMonth)
  );
  const currentMonthTotal = currentMonthItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );
  const currentRemaining = currentBudget - currentMonthTotal;

  return (
    <div className="bg-slate-100 my-10 mx-10 p-10 rounded-xl shadow-md md:w-130">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold mt-9">月ごとの支出と残高</h3>
        <div>
          <h4 className="text-sm text-right">今月の支出と残高</h4>
          <div className="mb-6 p-3 pb-4 bg-white rounded shadow-inner border-t border-gray-200 ">
            <div className="mb-2">
              <span className="text-sm">支出：</span>
              <span className=" text-right text-3xl font-medium underline decoration-1 underline-offset-5 text-sky-500">
                {currentMonthTotal}
              </span>
              円
            </div>
            <div>
              <span className="text-sm">残高：</span>
              <span className="text-right text-3xl font-medium underline decoration-1 underline-offset-5 text-sky-500">
                {currentRemaining}
              </span>
              円
            </div>
          </div>
        </div>
      </div>

      {/* 全体のリスト */}
      <ul className="bg-white p-4 rounded shadow-inner space-y-2 border-t border-gray-200">
        <div className="grid grid-cols-3 font-bold border-b border-gray-200">
          <div>月</div>
          <div>支出</div>
          <div>残高</div>
        </div>

        {Object.entries(budgets).map(([month, budget]) => {
          const monthlyTotal = items
            .filter((item) => item.date.startsWith(month))
            .reduce((sum, item) => sum + Number(item.price), 0);
          const remaining = budget - monthlyTotal;
          return (
            <li
              key={month}
              className="grid grid-cols-3 border-b border-gray-200 my-4"
            >
              <div>{month}</div>
              <div>{monthlyTotal} 円</div>
              <div>{remaining} 円</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MonthlySummary;
