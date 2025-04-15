import React, { useState, useEffect } from 'react';
import PlaceManager from './PlaceManager';
import {
  Portal,
  Select,
  createListCollection,
  NativeSelect,
  NumberInput,
  Input,
  Flex,
  Button,
} from '@chakra-ui/react';
import { LightMode } from '@/components/ui/color-mode';

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
      <LightMode>
        <div style={{ marginTop: '30px' }}>
          <h3>月別予算設定</h3>
          <Flex align="center">
            <Input
              size="xs"
              width="150px"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
            <NumberInput.Root width="150px" size="xs">
              <NumberInput.Input
                type="number"
                placeholder="設定金額"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
              />
            </NumberInput.Root>
            <Button size="xs" colorPalette="blue" onClick={handleSetBudget}>
              ＋
            </Button>
          </Flex>

          <ul>
            {Object.entries(budgets).map(([month, amount]) => (
              <li key={month}>
                {editingMonth === month ? (
                  <>
                    <Flex align="center">
                      {month}：
                      <NumberInput.Root width="150px" size="xs">
                        <NumberInput.Input
                          type="number"
                          value={editingAmount}
                          onChange={(e) => setEditingAmount(e.target.value)}
                        />
                      </NumberInput.Root>
                      円
                      <Button
                        size="xs"
                        colorPalette="blue"
                        onClick={handleSaveBudget}
                      >
                        保存
                      </Button>
                      <Button
                        size="xs"
                        colorPalette="gray"
                        variant="surface"
                        onClick={handleCancelBudgetEdit}
                      >
                        キャンセル
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Flex align="center">
                      {month}：{amount} 円
                      <Button
                        size="xs"
                        colorPalette="green"
                        onClick={() => handleEditBudget(month)}
                      >
                        ↺
                      </Button>
                      <Button
                        size="xs"
                        colorPalette="red"
                        onClick={() => handleDeleteBudget(month)}
                      >
                        ー
                      </Button>
                    </Flex>
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
          <Flex align="center">
            {/* 日付を最初に */}
            <Input
              size="xs"
              width="150px"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
            {/* 次に場所 */}
            <NativeSelect.Root size="sm" width="150px">
              <NativeSelect.Field
                name="place"
                value={formData.place}
                onChange={handleChange}
              >
                <option value="" disabled>
                  場所を選択
                </option>
                {places.map((place, idx) => (
                  <option key={idx} value={place}>
                    {place}
                  </option>
                ))}
              </NativeSelect.Field>
            </NativeSelect.Root>
            {/* 金額 */}
            <NumberInput.Root size="xs" width="150px">
              <NumberInput.Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="支出金額"
              />
            </NumberInput.Root>
            円
            <Button size="xs" colorPalette="blue" type="submit">
              ＋
            </Button>
          </Flex>
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
                      <Flex align="center">
                        <Input
                          size="xs"
                          width="150px"
                          type="date"
                          name="date"
                          value={editData.date}
                          onChange={handleEditChange}
                        />
                        <NativeSelect.Root size="sm" width="150px">
                          <NativeSelect.Field
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
                          </NativeSelect.Field>
                        </NativeSelect.Root>
                        <NumberInput.Root width="150px" size="xs">
                          <NumberInput.Input
                            name="price"
                            value={editData.price}
                            onChange={handleEditChange}
                            placeholder="支出金額"
                          />
                        </NumberInput.Root>
                        円
                        <Button
                          size="xs"
                          colorPalette="blue"
                          onClick={() => handleSave(index)}
                        >
                          保存
                        </Button>
                        <Button
                          size="xs"
                          colorPalette="gray"
                          variant="subtle"
                          onClick={handleCancel}
                        >
                          キャンセル
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex align="center">
                        {item.date}｜{item.place}：{item.price} 円
                        <Button
                          size="xs"
                          colorPalette="green"
                          onClick={() => handleEditClick(index)}
                        >
                          ↺
                        </Button>
                        <Button
                          size="xs"
                          colorPalette="red"
                          onClick={() => handleDelete(index)}
                        >
                          ー
                        </Button>
                      </Flex>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </LightMode>
    </>
  );
};

export default Home;
