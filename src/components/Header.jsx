import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Header = () => (
  <header>
    <div className="flex justify-around items-center h-30 ">
      <div className="flex items-center">
        <img src={logo} className="h-15" />
        <h1 className="text-3xl font-bold ml-4">Budget App</h1>
      </div>

      <nav className="flex justify-between items-center">
        <Link
          to="/"
          className="hover:text-gray-400 duration-200 ease-initial bg-slate-100 rounded-xl shadow-md p-2 mr-5"
        >
          Home
        </Link>
        <Link
          to="/place-manager"
          className="hover:text-gray-400 duration-200 ease-initial bg-slate-100 rounded-xl shadow-md p-2"
        >
          支出場所の編集
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;
