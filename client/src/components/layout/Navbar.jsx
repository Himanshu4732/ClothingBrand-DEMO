import { Link } from 'react-router-dom';
import { ShoppingBag, UserCircle, Search, Menu, X, Sparkles } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartDrawer } from '../../store/cartSlice';
import { useState } from 'react';
import EasterEgg from '../ui/EasterEgg';
import MagneticButton from '../ui/MagneticButton';

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMesmerize, setShowMesmerize] = useState(false);

  return (
    <>
      <EasterEgg isActive={showMesmerize} onClose={() => setShowMesmerize(false)} />
      <nav className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[90%] max-w-7xl z-50 bg-bg/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:bg-bg/60">
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-display tracking-[0.2em] uppercase font-bold text-text">
                VoidHaus<span className="text-accent text-xs align-top">™</span>
              </Link>
            </div>

            {/* Center Links (Desktop) */}
            <div className="hidden md:flex space-x-8">
              <Link to="/shop" className="text-sm font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors">
                Collection
              </Link>
              <Link to="/shop?category=new" className="text-sm font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors">
                New Drops
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-5">
              <MagneticButton onClick={() => setShowMesmerize(!showMesmerize)} className={`transition-colors ${showMesmerize ? 'text-accent drop-shadow-[0_0_8px_rgba(184,255,87,0.8)]' : 'text-muted hover:text-accent'}`}>
                <Sparkles className="w-5 h-5" />
              </MagneticButton>
              <button className="text-muted hover:text-accent transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/login" className="text-muted hover:text-accent transition-colors">
                <UserCircle className="w-5 h-5" />
              </Link>
              <button
                onClick={() => dispatch(toggleCartDrawer(true))}
                className="text-muted hover:text-accent transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-bg text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden text-muted hover:text-text transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden">
          <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-2xl font-mono uppercase tracking-widest text-text hover:text-accent transition-colors">
            Collection
          </Link>
          <Link to="/shop?category=new" onClick={() => setMobileOpen(false)} className="text-2xl font-mono uppercase tracking-widest text-text hover:text-accent transition-colors">
            New Drops
          </Link>
          <Link to="/login" onClick={() => setMobileOpen(false)} className="text-2xl font-mono uppercase tracking-widest text-text hover:text-accent transition-colors">
            Account
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
