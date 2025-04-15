import React, { useState } from 'react';

const PlaceManager = ({ places, setPlaces }) => {
  const [newPlace, setNewPlace] = useState('');

  const handleAddPlace = () => {
    if (newPlace && !places.includes(newPlace)) {
      setPlaces([...places, newPlace]);
      setNewPlace('');
    }
  };

  const handleDeletePlace = (placeToDelete) => {
    setPlaces(places.filter((p) => p !== placeToDelete));
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>場所の管理</h4>
      <input
        value={newPlace}
        onChange={(e) => setNewPlace(e.target.value)}
        placeholder="新しい場所を追加"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddPlace();
          }
        }}
      />
      <button type="button" onClick={handleAddPlace}>
        ＋
      </button>

      <ul>
        {places.map((place, idx) => (
          <li key={idx}>
            {place}
            <button onClick={() => handleDeletePlace(place)}>ー</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceManager;
