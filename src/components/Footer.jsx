import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2F4156] text-[#F5EFEB] w-full h-10 md:h-15 flex items-center justify-around px-6">
      <p className="text-sm">© 2025 Budget App</p>
      <div className="flex space-x-4">
        <a
          href="https://x.com/monkeybank11"
          aria-label="Xアイコン"
          className="hover:text-[#567C8D] transition"
        >
          <i className="fab fa-x-twitter text-xl"></i>
        </a>
        <a
          href="https://github.com/Monkey-Bank"
          aria-label="GitHubアイコン"
          className="hover:text-[#567C8D] transition"
        >
          <i className="fab fa-github text-xl"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
