import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Component for single navigation links
const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative font-semibold tracking-wider uppercase text-sm transition-colors duration-300 ${
          isActive ? 'text-[#003782]' : 'text-slate-200 hover:text-[#003782]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={`absolute bottom-[-6px] left-0 w-full h-0.5 bg-[#003782] transform transition-transform duration-300 ${
              isActive ? 'scale-x-100' : 'scale-x-0'
            }`}
          />
        </>
      )}
    </NavLink>
  );
};

// Component for links inside a dropdown
const DropdownLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({isActive}) => `block w-full text-left px-4 py-2 text-sm ${isActive ? 'text-white bg-[#003782]' : 'text-slate-300 hover:bg-[#0a192f] hover:text-white'}`}
    >
        {children}
    </NavLink>
);

// Component for dropdown navigation items (for desktop)
const DropdownNavItem: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const childPaths = React.Children.map(children, child => 
        React.isValidElement(child) && child.props.to ? child.props.to : null
    ) || [];
    
    const isActive = childPaths.some(path => path && location.pathname.startsWith(path));

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className={`flex items-center gap-1 relative font-semibold tracking-wider uppercase text-sm transition-colors duration-300 ${
                isActive ? 'text-[#003782]' : 'text-slate-200 hover:text-[#003782]'
            }`}>
                <span>{title}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>
            <span
                className={`absolute bottom-[-6px] left-0 w-full h-0.5 bg-[#003782] transform transition-transform duration-300 ${
                isActive ? 'scale-x-100' : 'scale-x-0'
                }`}
            />
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-[#061121] rounded-md shadow-lg py-1 z-10 transition-all duration-300 transform ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                {children}
            </div>
        </div>
    );
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navStructure = [
    { type: 'link', to: '/noticias', name: 'Noticias' },
    { 
        type: 'dropdown', 
        name: 'El Club', 
        children: [
            { to: '/el-club', name: 'Historia' },
            { to: '/instalaciones', name: 'Instalaciones' },
            { to: '/plantilla', name: 'Plantilla' },
            { to: '/galeria', name: 'Galería' },
        ]
    },
    { type: 'link', to: '/abonate', name: 'Abónate' },
    { type: 'link', to: '/patrocinio', name: 'Patrocinio' },
    { type: 'link', to: '/contacto', name: 'Contacto' },
  ];

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'bg-[#0a192f]/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-baseline gap-2 group transition-all duration-300">
          <span className="text-3xl font-light text-white tracking-[0.2em] font-['Teko'] group-hover:tracking-[0.25em] transition-all duration-300">CBMARBELLA</span>
          <span className="text-sm font-light text-slate-400">1975</span>
        </NavLink>
        <div className="hidden md:flex items-center space-x-8">
          {navStructure.map(item => {
            if (item.type === 'dropdown') {
              return (
                <DropdownNavItem key={item.name} title={item.name}>
                  {item.children.map(child => (
                    <DropdownLink key={child.to} to={child.to}>{child.name}</DropdownLink>
                  ))}
                </DropdownNavItem>
              )
            }
            return <NavItem key={item.to} to={item.to}>{item.name}</NavItem>
          })}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none z-50 relative">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen bg-[#0a192f] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col items-center justify-center space-y-6 text-center`}
      >
        {navStructure.map((item, index) => (
          <div key={item.name || item.to} style={{ animationDelay: `${index * 100}ms` }} className={`w-full px-8 transform transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            {item.type === 'link' ? (
              <NavLink
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-3xl font-['Teko'] uppercase tracking-wider py-2 ${isActive ? 'text-[#003782]' : 'text-slate-200'}`
                }
              >
                {item.name}
              </NavLink>
            ) : (
              <div>
                  <button
                  onClick={() => toggleMobileDropdown(item.name)}
                  className="w-full flex items-center justify-center gap-2 text-3xl font-['Teko'] uppercase tracking-wider py-2 text-slate-200"
                >
                  <span>{item.name}</span>
                  <svg className={`w-6 h-6 transition-transform duration-300 ${openMobileDropdown === item.name ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
                {openMobileDropdown === item.name && (
                  <div className="mt-2 space-y-2 bg-[#061121]/50 rounded-md py-2">
                      {item.children.map(child => (
                        <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block text-2xl font-['Teko'] uppercase tracking-wider ${isActive ? 'text-[#003782]' : 'text-slate-300'}`
                        }
                      >
                        {child.name}
                      </NavLink>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;