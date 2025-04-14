import React, { useRef, useState } from 'react';

const List = () => {
  const [places, setPlaces] = useState([
    'コンビニ',
    'スーパー',
    'レストラン',
    '病院',
    '薬局',
  ]);

  const [payments, setPayments] = useState([]);

  const budgetListRef = useRef();
  const placeListRef = useRef();

  const handleAddList = () => {
    const budgetList = budgetListRef.current.value;
    setPayments((prevPayments) => {
      return [...prevPayments, { id: '1', name: budgetList }];
    });
    budgetListRef.current.value = null;

    const placeList = placeListRef.current.value;
    console.log(placeList);
    setPlaces((prevPlaces) => {
      return [...prevPlaces, { id: '9', name: placeList }];
    });
    placeListRef.current.value = null;
  };

  return (
    //プルダウンの情報をリストに追加
    <>
      <div>
        <p>使った場所</p>
        <select ref={placeListRef}>
          {places.map((place) => {
            return <option key={place}>{place}</option>;
          })}
        </select>
      </div>

      <div>
        <p>使った金額</p>
        <input ref={budgetListRef} />円
        <button onClick={handleAddList}>追加</button>
      </div>

      <div>
        <p>場所：</p>
        <p>
          {places.map((place) => {
            return <option key={place.id}>{place.name}</option>;
          })}
        </p>

        <p>金額：</p>
        <p>
          {payments.map((payment) => {
            return <option key={payment.id}>{payment.name}</option>;
          })}
        </p>
      </div>
    </>
  );
};

export default List;
