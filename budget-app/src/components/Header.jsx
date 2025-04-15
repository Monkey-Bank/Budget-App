import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Budget App</h1>
    <nav>
      <Link to="/">Home</Link> | <Link to="/place-manager">場所の管理</Link>
    </nav>
  </header>
);

export default Header;
