import React, { useState } from 'react';
import {
  Input,
  Button,
  Flex,
  NumberInput,
  NativeSelect,
} from '@chakra-ui/react';

const ExpenseList = ({ items, setItems, places }) => {
  const [formData, setFormData] = useState({ place: '', price: '', date: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({ place: '', price: '', date: '' });

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
    <div style={{ marginTop: '20px' }}>
      <form onSubmit={handleAdd}>
        <input
          size="xs"
          width="150px"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
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
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="支出金額"
        />
        円
        <button size="xs" colorPalette="blue" type="submit">
          ＋
        </button>
      </form>

      <h3>入力一覧</h3>
      <ul>
        {[...items]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((item, index) => (
            <li key={index}>
              {editIndex === index ? (
                <select>
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
                  円
                  <button
                    size="xs"
                    colorPalette="blue"
                    onClick={() => handleSave(index)}
                  >
                    保存
                  </button>
                  <button
                    size="xs"
                    colorPalette="gray"
                    variant="subtle"
                    onClick={handleCancel}
                  >
                    キャンセル
                  </button>
                </>
              ) : (
                <>
                  {item.date}｜{item.place}：{item.price} 円
                  <button
                    size="xs"
                    colorPalette="green"
                    onClick={() => handleEditClick(index)}
                  >
                    ↺
                  </button>
                  <button
                    size="xs"
                    colorPalette="red"
                    onClick={() => handleDelete(index)}
                  >
                    ー
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
