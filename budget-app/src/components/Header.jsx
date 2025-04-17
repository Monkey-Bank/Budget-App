import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <div className="flex justify-around items-center h-20 bg-emerald-200">
      <h1 className="text-3xl font-bold">Budget App</h1>
      <nav className="flex justify-between items-center w-45">
        <Link to="/" className="hover:text-gray-400 duration-200 ease-initial">
          Home
        </Link>
        <Link
          to="/place-manager"
          className="hover:text-gray-400 duration-200 ease-initial "
        >
          支出場所の編集
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
