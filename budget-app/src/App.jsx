import React, { useState, useEffect } from 'react'; // ← 追加
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/Home';
import PlaceManager from './components/PlaceManager';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/place-manager" element={<PlaceManagerWrapper />} />
      </Routes>
      <Footer />
    </>
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
