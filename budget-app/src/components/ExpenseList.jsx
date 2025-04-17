import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ExpenseList = ({ items, setItems, places }) => {
  const [formData, setFormData] = useState({
    id: '',
    place: '',
    price: '',
    date: '',
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    id: '',
    place: '',
    price: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.place || !formData.price || !formData.date) return;
    const newItem = { id: uuidv4(), ...formData }; // ✅ IDを付ける
    setItems([...items, newItem]);
    setFormData({ place: '', price: '', date: '' }); // idはリセット不要
  };

  const handleEditClick = (id) => {
    const target = items.find((item) => item.id === id);
    setEditId(id);
    setEditData(target);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = items.map((item) =>
      item.id === editId ? { ...editData, id: editId } : item
    );
    setItems(updated);
    setEditId(null);
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <div className="flex">
          <div className="bg-sky-100">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="bg-sky-100">
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
          </div>
          <div className="bg-sky-100">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="支出金額"
            />
          </div>
          円
          <button type="submit">
            <i className="fa-solid fa-square-plus text-sky-500 text-xl hover:text-sky-300"></i>
          </button>
        </div>
      </form>

      <h3>入力一覧</h3>
      <ul>
        {[...items]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((item) => (
            <li key={item.id}>
              {editId === item.id ? (
                <>
                  <input
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
                  <button onClick={handleSave}>
                    <i className="fa-solid fa-download text-lime-600 hover:text-lime-400"></i>
                  </button>
                  <button onClick={handleCancel}>
                    <i className="fa-solid fa-ban text-red-600 hover:text-red-400"></i>
                  </button>
                </>
              ) : (
                <>
                  {item.date}｜{item.place}：{item.price} 円
                  <button onClick={() => handleEditClick(item.id)}>
                    <i className="fa-regular fa-pen-to-square text-lime-600 hover:text-lime-400"></i>
                  </button>
                  <button onClick={() => handleDelete(item.id)}>
                    <i className="fa-solid fa-trash text-red-600 hover:text-red-400"></i>
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
