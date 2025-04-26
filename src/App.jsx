import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import PlaceManager from './components/PlaceManager';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/place-manager" element={<PlaceManagerWrapper />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// 🟢 ラップして props を渡すようにする
const PlaceManagerWrapper = () => {
  const [places, setPlaces] = useState(() => {
    const saved = localStorage.getItem('places');
    return saved
      ? JSON.parse(saved)
      : ['スーパーマーケット', 'コンビニ', 'レストラン', '病院', '薬局'];
  });

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places));
  }, [places]);

  return <PlaceManager places={places} setPlaces={setPlaces} />;
};

export default App;
