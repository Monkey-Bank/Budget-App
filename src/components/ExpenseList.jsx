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
    setFormData({ place: '', price: '', date: '' });
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
    <div className="max-w-4xl bg-slate-100 rounded-xl shadow-md m-auto my-10 p-10 mb-20">
      <h3 className="text-xl font-bold">支出一覧</h3>
      <form onSubmit={handleAdd}>
        <div className="flex flex-wrap gap-4 items-center my-6">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="rounded bg-white"
          />
          <select
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="rounded w-35 bg-white"
          >
            <option value="" disabled>
              例：スーパー
            </option>
            {places.map((place, idx) => (
              <option key={idx} value={place}>
                {place}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
            placeholder="例：3000"
            className="rounded w-30 bg-white"
          />
          <span>円</span>
          <button type="submit">
            <i className="fa-solid fa-square-plus cursor-pointer text-sky-500 text-2xl hover:text-sky-300"></i>
          </button>
        </div>
      </form>

      <ul className="space-y-2 bg-white p-4 rounded shadow-inner border-t border-slate-200">
        <div className="grid grid-cols-4 font-bold text-gray-800 border-b border-gray-200">
          <div>日付</div>
          <div>場所</div>
          <div>金額</div>
          <div className="ml-14">操作</div>
        </div>

        {[...items]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-4 items-center border-b border-slate-200 my-4"
            >
              {editId === item.id ? (
                <>
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                    className="rounded text-lime-600"
                  />
                  <select
                    name="place"
                    value={editData.place}
                    onChange={handleEditChange}
                    className="rounded text-lime-600"
                  >
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
                    className="rounded text-lime-600"
                  />
                  <div className="flex gap-2 justify-center">
                    <button onClick={handleSave} className="mx-2">
                      <i className="fa-solid fa-download text-base cursor-pointer text-lime-600 hover:text-lime-400"></i>
                    </button>
                    <button onClick={handleCancel}>
                      <i className="fa-solid fa-ban text-lg cursor-pointer text-red-600 hover:text-red-400"></i>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{item.date}</span>
                  <span>{item.place}</span>
                  <span className="">{item.price} 円</span>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditClick(item.id)}
                      className="mx-2"
                    >
                      <i className="fa-regular fa-pen-to-square cursor-pointer text-lg text-lime-600 hover:text-lime-400"></i>
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
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

export default ExpenseList;
