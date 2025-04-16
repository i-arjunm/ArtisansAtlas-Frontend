import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Palette, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const { state: cartState } = useCart();
  const { state: authState } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const itemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Palette className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-display font-semibold text-primary">Artisans Atlas</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center px-6">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for artisan products..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            
            <Link to="/blog" className="text-text-primary hover:text-primary transition-colors">
              Blog
            </Link>
            <Link to={authState.isAuthenticated ? "/account" : "/auth/login"}>
              <User className="h-6 w-6 text-primary" />
            </Link>
            <Link to="/cart" className="flex items-center">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-primary" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cta text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;