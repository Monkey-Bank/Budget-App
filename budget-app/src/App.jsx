import './App.css';
import Budget from './components/Budget';
import Header from './components/header';
import List from './components/List';

function App() {
  return (
    <>
      <Header />
      <Budget />
      <List />
    </>
  );
}

export default App;

// 1か月の金額設定
// 使った場所をプルダウンから選択、金額を入力後、追加ボタンを押してリストに追加
// 使った額の合計
// 残りの合計

//金額設定や使った場所を編集できる
