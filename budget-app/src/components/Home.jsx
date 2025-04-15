import React, { useState, useEffect } from 'react';

const Home = () => {
  //金額の設定、使用と残高
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('budgets');
    return saved ? JSON.parse(saved) : {};
  });

  //月別予算設定
  const [selectedMonth, setSelectedMonth] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');

  //月別予算設定
  const [editingMonth, setEditingMonth] = useState(null);
  const [editingAmount, setEditingAmount] = useState('');

  //月別予算設定
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
  //ここまで

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets));
  }, [budgets]);

  const handleSetBudget = () => {
    if (selectedMonth && budgetAmount) {
      setBudgets({ ...budgets, [selectedMonth]: Number(budgetAmount) });
      setSelectedMonth('');
      setBudgetAmount('');
    }
  };

  //リスト表示
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
  const [formData, setFormData] = useState({ place: '', price: '', date: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ place: '', price: '', date: '' });
  const [newPlace, setNewPlace] = useState('');

  // 🟢 初回読み込み時に localStorage から復元
  useEffect(() => {
    const savedItems = localStorage.getItem('items');
    const savedPlaces = localStorage.getItem('places');
    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedPlaces) setPlaces(JSON.parse(savedPlaces));
  }, []);

  // 🟡 items の変更時に保存
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // 🟡 places の変更時に保存
  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  const handleAddPlace = () => {
    if (newPlace && !places.includes(newPlace)) {
      setPlaces([...places, newPlace]);
      setNewPlace('');
    }
  };

  const handleDeletePlace = (placeToDelete) => {
    setPlaces(places.filter((p) => p !== placeToDelete));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.place || !formData.price || !formData.date) return;
    setItems([...items, formData]);
    setFormData({ place: '', price: '', date: '' });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData(items[index]);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = (index) => {
    const updated = [...items];
    updated[index] = editData;
    setItems(updated);
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
    if (editIndex === index) setEditIndex(null);
  };

  return (
    <>
      <div style={{ marginTop: '30px' }}>
        <h3>月別予算設定</h3>

        <input
          size="xs"
          width="150px"
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

        <button onClick={handleSetBudget}>＋</button>

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
                  <button onClick={() => handleEditBudget(month)}>↺</button>
                  <button onClick={() => handleDeleteBudget(month)}>ー</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>月ごとの支出と残額</h3>
        {Object.entries(budgets).map(([month, budget]) => {
          const monthlyTotal = items
            .filter((item) => item.date.startsWith(month))
            .reduce((sum, item) => sum + Number(item.price), 0);
          const remaining = budget - monthlyTotal;
          return (
            <div key={month}>
              <strong>{month}</strong>：合計 {monthlyTotal} 円 ／ 残り{' '}
              {remaining} 円
            </div>
          );
        })}
      </div>

      <form onSubmit={handleAdd}>
        {/* 日付を最初に */}
        <input
          size="xs"
          width="150px"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {/* 次に場所 */}
        <select name="place" value={formData.place} onChange={handleChange}>
          <option value="" disabled>
            場所を選択
          </option>
          {places.map((place, idx) => (
            <option key={idx} value={place}>
              {place}
            </option>
          ))}
        </select>
        {/* 金額 */}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="支出金額"
        />
        円<button type="submit">＋</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>入力一覧</h3>
        <ul>
          {[...items]
            .sort((a, b) => new Date(a.date) - new Date(b.date)) // 日付順にソート
            .map((item, index) => (
              <li key={index}>
                {editIndex === index ? (
                  <>
                    <input
                      size="xs"
                      width="150px"
                      type="date"
                      name="date"
                      value={editData.date}
                      onChange={handleEditChange}
                    />
                    <select
                      name="place"
                      value={editData.place}
                      onChange={handleEditChange}
                    >
                      <option value="" disabled>
                        場所を選択
                      </option>
                      {places.map((place, idx) => (
                        <option key={idx} value={place}>
                          {place}
                        </option>
                      ))}
                    </select>
                    <input
                      name="price"
                      value={editData.price}
                      onChange={handleEditChange}
                      placeholder="支出金額"
                    />
                    円<button onClick={() => handleSave(index)}>保存</button>
                    <button onClick={handleCancel}>キャンセル</button>
                  </>
                ) : (
                  <>
                    {item.date}｜{item.place}：{item.price} 円
                    <button onClick={() => handleEditClick(index)}>↺</button>
                    <button onClick={() => handleDelete(index)}>ー</button>
                  </>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
