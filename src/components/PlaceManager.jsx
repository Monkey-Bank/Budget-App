import React, { useState } from 'react';

const PlaceManager = ({ places, setPlaces }) => {
  const [newPlace, setNewPlace] = useState('');

  const handleAddPlace = () => {
    if (newPlace.trim() && !places.includes(newPlace)) {
      setPlaces([...places, newPlace.trim()]);
      setNewPlace('');
    }
  };

  const handleDeletePlace = (placeToDelete) => {
    setPlaces(places.filter((p) => p !== placeToDelete));
  };

  return (
    <div className="bg-slate-100 my-10 p-10 rounded-xl shadow-md md:w-130 m-auto">
      <h4 className="text-xl font-bold mb-4">支出場所の編集</h4>

      {/* 入力エリア */}
      <div className="my-6 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="例：美容院"
          className="rounded bg-white px-3 py-1"
          value={newPlace}
          onChange={(e) => setNewPlace(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddPlace();
            }
          }}
        />
        <button onClick={handleAddPlace}>
          <i className="fa-solid fa-square-plus cursor-pointer text-2xl text-sky-500 hover:text-sky-300"></i>
        </button>
      </div>

      {/* 一覧表示 */}
      <ul className="space-y-2 bg-white p-6 rounded shadow-inner border-t border-slate-200">
        {places.map((place, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center text-gray-700 border-b border-slate-200 pb-1"
          >
            {place}
            <button onClick={() => handleDeletePlace(place)}>
              <i className="fa-solid fa-trash text-lg text-red-600 hover:text-red-400 cursor-pointer"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceManager;
