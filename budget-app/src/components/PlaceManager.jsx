import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { LightMode } from '@/components/ui/color-mode';

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
      <LightMode>
        <h4>場所の管理</h4>
        <Input
          width="150px"
          size="xs"
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
        <Button
          size="xs"
          colorPalette="blue"
          type="button"
          onClick={handleAddPlace}
        >
          ＋
        </Button>

        <ul>
          {places.map((place, idx) => (
            <li key={idx}>
              {place}
              <Button
                size="xs"
                colorPalette="red"
                onClick={() => handleDeletePlace(place)}
              >
                ー
              </Button>
            </li>
          ))}
        </ul>
      </LightMode>
    </div>
  );
};

export default PlaceManager;
