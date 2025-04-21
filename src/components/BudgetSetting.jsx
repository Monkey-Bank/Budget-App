import React, { useState } from 'react';

const BudgetSetting = ({ budgets, setBudgets }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [editingMonth, setEditingMonth] = useState(null);
  const [editingAmount, setEditingAmount] = useState('');

  const handleSetBudget = () => {
    if (selectedMonth && budgetAmount) {
      setBudgets({ ...budgets, [selectedMonth]: Number(budgetAmount) });
      setSelectedMonth('');
      setBudgetAmount('');
    }
  };

  const handleEditBudget = (month) => {
    setEditingMonth(month);
    setEditingAmount(budgets[month]);
  };

  const handleSaveBudget = () => {
    if (editingMonth && editingAmount) {
      setBudgets({ ...budgets, [editingMonth]: Number(editingAmount) });
      setEditingMonth(null);
      setEditingAmount('');
    }
  };

  const handleCancelBudgetEdit = () => {
    setEditingMonth(null);
    setEditingAmount('');
  };

  const handleDeleteBudget = (month) => {
    const updated = { ...budgets };
    delete updated[month];
    setBudgets(updated);
  };

  const currentMonth = new Date().toISOString().slice(0, 7); // "2025-04"の形式
  const currentBudget = budgets[currentMonth] || 0;

  return (
    <div className="bg-slate-100 my-10 p-10 rounded-xl shadow-md md:w-130">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold content-center">月別予算設定</h3>
        <div>
          <p className="text-sm text-right">今月の設定金額</p>
          <p className="text-3xl font-medium underline decoration-1 underline-offset-5 text-sky-500 p-3 bg-white rounded shadow-inner border-t border-gray-200">
            {currentBudget}円
          </p>
        </div>
      </div>

      <div className="my-6 flex flex-wrap gap-4 items-center">
        <input
          type="month"
          className="rounded bg-white"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
        <input
          type="number"
          placeholder="例：50000"
          className="rounded bg-white"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSetBudget();
            }
          }}
        />
        円
        <button onClick={handleSetBudget}>
          <i className="fa-solid fa-square-plus cursor-pointer text-2xl text-sky-500 hover:text-sky-300"></i>
        </button>
      </div>

      <ul className="bg-white p-4 rounded shadow-inner space-y-2 border-t border-slate-200 ">
        {/* ヘッダー */}
        <li className="grid grid-cols-3 font-bold text-gray-700 border-b border-slate-200">
          <span>月</span>
          <span>設定金額</span>
          <span className="m-auto">操作</span>
        </li>

        {Object.entries(budgets).map(([month, amount]) => (
          <li
            key={month}
            className="grid grid-cols-3 items-center border-b border-slate-200 my-4"
          >
            {editingMonth === month ? (
              <>
                <div className="text-gray-700">{month}</div>

                <div>
                  <input
                    type="number"
                    className="w-20 rounded text-lime-600"
                    value={editingAmount}
                    onChange={(e) => setEditingAmount(e.target.value)}
                  />{' '}
                  円
                </div>

                <div className="flex justify-center gap-2">
                  <button onClick={handleSaveBudget} className="mx-2">
                    <i className="fa-solid fa-download cursor-pointer text-base text-lime-600 hover:text-lime-400"></i>
                  </button>
                  <button onClick={handleCancelBudgetEdit}>
                    <i className="fa-solid fa-ban cursor-pointer text-lg text-red-600 hover:text-red-400"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-gray-800">{month}</div>

                <div className="text-gray-800">{amount} 円</div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleEditBudget(month)}
                    className="mx-2"
                  >
                    <i className="fa-regular fa-pen-to-square cursor-pointer text-lg text-lime-600 hover:text-lime-400"></i>
                  </button>
                  <button onClick={() => handleDeleteBudget(month)}>
                    <i className="fa-solid fa-trash cursor-pointer text-lg text-red-600 hover:text-red-400"></i>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSetting;
