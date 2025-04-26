import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Header = () => (
  <header className="bg-[#2F4156] text-[#F5EFEB] shadow-md">
    <div className="flex justify-around items-center md:px-6 md:py-4">
      {/* ロゴ + タイトル */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Budget Logo" className="h-12" />
        <h1 className="text-xl md:text-3xl font-bold">Budget App</h1>
      </div>

      {/* ナビゲーション */}
      <nav className="flex space-x-4">
        <Link
          to="/"
          className="bg-[#C8D9E6] text-[#2F4156] text-xs md:text-base font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#567C8D] hover:text-white transition"
        >
          Home
        </Link>
        <Link
          to="/place-manager"
          className="bg-[#C8D9E6] text-[#2F4156] text-xs md:text-base font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#567C8D] hover:text-white transition"
        >
          支出場所の編集
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
