import React, { useState } from 'react';

interface NavbarProps {
  onNavigate?: (targetId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [activeItem, setActiveItem] = useState('Overview');

  const navItems = [
    { label: 'Architecture', target: '#about' },
    { label: 'Neural Vision', target: '#features' },
    { label: 'Mission Control', target: '#dashboard' },
    { label: 'Orbital Grid', target: '#satellite' },
    { label: 'Model Lab', target: '#lab' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string, label: string) => {
    e.preventDefault();
    setActiveItem(label);
    if (onNavigate) {
      onNavigate(target.replace('#', ''));
    } else {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
      <nav
        aria-label="Main Navigation"
        className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-x border-white/[0.08] backdrop-blur-md flex items-center"
      >
        <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target, item.label)}
              style={{
                color: activeItem === item.label ? '#E1E0CC' : 'rgba(225, 224, 204, 0.8)',
              }}
              className="text-[10px] sm:text-xs md:text-sm tracking-wider uppercase transition-colors duration-200 hover:text-[#E1E0CC] whitespace-nowrap cursor-pointer font-medium relative group"
            >
              {item.label}
              {activeItem === item.label && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#DEDBC8] rounded-full" />
              )}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
