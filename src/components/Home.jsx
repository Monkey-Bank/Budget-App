import React, { useState, useEffect } from 'react';
import BudgetSetting from './BudgetSetting';
import MonthlySummary from './MonthlySummary';
import ExpenseList from './ExpenseList';

const Home = () => {
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : {};
  });

  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('items');
    return saved ? JSON.parse(saved) : [];
  });

  const [places, setPlaces] = useState(() => {
    const saved = localStorage.getItem('places');
    return saved
      ? JSON.parse(saved)
      : ['スーパーマーケット', 'コンビニ', 'レストラン', '病院', '薬局'];
  });

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  return (
    <>
      <div className="justify-center md:flex grid-cols-2 gap-25">
        <BudgetSetting budgets={budgets} setBudgets={setBudgets} />
        <MonthlySummary budgets={budgets} items={items} />
      </div>
      <ExpenseList items={items} setItems={setItems} places={places} />
    </>
  );
};

export default Home;
