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
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />
      <input
        type="number"
        placeholder="設定金額"
        value={budgetAmount}
        onChange={(e) => setBudgetAmount(e.target.value)}
      />
      <button onClick={handleSetBudget}>
        <i className="fa-solid fa-plus"></i>
      </button>

      <ul>
        {Object.entries(budgets).map(([month, amount]) => (
          <li key={month}>
            {editingMonth === month ? (
              <>
                {month}：
                <input
                  type="number"
                  value={editingAmount}
                  onChange={(e) => setEditingAmount(e.target.value)}
                />
                円<button onClick={handleSaveBudget}>保存</button>
                <button onClick={handleCancelBudgetEdit}>キャンセル</button>
              </>
            ) : (
              <>
                {month}：{amount} 円
                <button onClick={() => handleEditBudget(month)}>
                  <i className="fa-regular fa-pen-to-square"></i>
                </button>
                <button onClick={() => handleDeleteBudget(month)}>
                  <i className="fa-solid fa-trash"></i>
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
