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

  return (
    <div
      style={{ margin: '40px auto', padding: '30px' }}
      className="max-w-xl bg-slate-100 rounded-xl shadow-md"
    >
      <h3 className="text-2xl font-bold mb-4">月別予算設定</h3>

      <div
        style={{ margin: '10px 0' }}
        className="flex flex-wrap gap-4 items-center"
      >
        <input
          style={{ backgroundColor: 'white' }}
          type="month"
          className="rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
        <input
          style={{ backgroundColor: 'white' }}
          type="number"
          placeholder="設定金額"
          className="rounded"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
        />
        <button onClick={handleSetBudget}>
          <i
            className="fa-solid fa-square-plus text-xl text-sky-500 hover:text-sky-300"
            style={{ margin: '10px 0' }}
          ></i>
        </button>
      </div>

      <ul className="space-y-4 bg-white p-4 rounded shadow-inner">
        {Object.entries(budgets).map(([month, amount]) => (
          <li
            key={month}
            style={{ margin: '5px 0' }}
            className="flex items-center justify-between"
          >
            {editingMonth === month ? (
              <>
                <span className="text-gray-700">
                  {month}：
                  <input
                    style={{ backgroundColor: '#eee8aa' }}
                    type="number"
                    className="w-20"
                    value={editingAmount}
                    onChange={(e) => setEditingAmount(e.target.value)}
                  />
                  円
                </span>
                <span className="space-x-2">
                  <button
                    onClick={handleSaveBudget}
                    style={{ margin: '0 10px' }}
                  >
                    <i className="fa-solid fa-download text-xl text-lime-600 hover:text-lime-400"></i>
                  </button>
                  <button onClick={handleCancelBudgetEdit}>
                    <i className="fa-solid fa-ban text-xl text-red-600 hover:text-red-400"></i>
                  </button>
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-800">
                  {month}：{amount} 円
                </span>
                <span className="space-x-2">
                  <button
                    onClick={() => handleEditBudget(month)}
                    style={{ margin: '0 10px' }}
                  >
                    <i className="fa-regular fa-pen-to-square text-xl text-lime-600 hover:text-lime-400"></i>
                  </button>
                  <button onClick={() => handleDeleteBudget(month)}>
                    <i className="fa-solid fa-trash text-xl text-red-600 hover:text-red-400"></i>
                  </button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSetting;
