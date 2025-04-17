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
    <div>
      <h3>月別予算設定</h3>
      <div className="flex">
        <div className="bg-sky-100 ">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        <div className="bg-sky-100 hover:bg-white">
          <input
            type="number"
            placeholder="設定金額"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
          />
        </div>

        <button onClick={handleSetBudget}>
          <i className="fa-solid fa-square-plus text-sky-500 text-2xl hover:text-sky-300"></i>
        </button>
      </div>

      <ul>
        {Object.entries(budgets).map(([month, amount]) => (
          <li key={month}>
            {editingMonth === month ? (
              <>
                {month}：
                <input
                  className="underline"
                  type="number"
                  value={editingAmount}
                  onChange={(e) => setEditingAmount(e.target.value)}
                />
                円
                <button onClick={handleSaveBudget}>
                  <i className="fa-solid fa-download text-lime-600 hover:text-lime-400"></i>
                </button>
                <button onClick={handleCancelBudgetEdit}>
                  <i className="fa-solid fa-ban text-red-600 hover:text-red-400"></i>
                </button>
              </>
            ) : (
              <>
                {month}：{amount} 円
                <button onClick={() => handleEditBudget(month)}>
                  <i className="fa-regular fa-pen-to-square text-xl text-lime-600 hover:text-lime-400"></i>
                </button>
                <button onClick={() => handleDeleteBudget(month)}>
                  <i className="fa-solid fa-trash text-xl text-red-600 hover:text-red-400"></i>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetSetting;
