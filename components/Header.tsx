
import React from 'react';
import { ShoppingBag, Search, Menu, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onOpenChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onOpenChat }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button className="sm:hidden p-2 -ml-2 text-slate-600">
              <Menu size={24} />
            </button>
            <a href="#/" className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight font-serif text-slate-900">HOMIE PRO</span>
            </a>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#/category/Bedding" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Bedding</a>
            <a href="#/category/Lighting" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Lighting</a>
            <a href="#/category/Decor" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Decor</a>
            <a href="#/category/Furniture" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Furniture</a>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenChat}
              className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold hover:bg-indigo-100 transition-colors"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            
            <button className="p-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <Search size={22} />
            </button>
            
            <button className="hidden sm:block p-2 text-slate-600 hover:text-indigo-600 transition-colors">
              <User size={22} />
            </button>
            
            <button 
              onClick={onCartClick}
              className="p-2 text-slate-600 hover:text-indigo-600 transition-colors relative"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
