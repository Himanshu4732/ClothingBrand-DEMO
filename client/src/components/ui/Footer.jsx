import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-display tracking-[0.2em] uppercase font-bold text-text mb-4">
              VoidHaus<span className="text-accent text-xs align-top">™</span>
            </h3>
            <p className="font-mono text-xs text-muted leading-relaxed uppercase tracking-wider">
              Wear The Silence.<br />Dark luxury for the generation<br />that rejects the algorithm.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Navigate</h4>
            <ul className="space-y-3 font-mono text-sm">
              <li><Link to="/shop" className="text-text hover:text-accent transition-colors tracking-wider">Collection</Link></li>
              <li><Link to="/shop?category=new" className="text-text hover:text-accent transition-colors tracking-wider">New Drops</Link></li>
              <li><Link to="/account" className="text-text hover:text-accent transition-colors tracking-wider">Account</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Information</h4>
            <ul className="space-y-3 font-mono text-sm">
              <li><span className="text-text hover:text-accent transition-colors tracking-wider cursor-pointer">Shipping & Returns</span></li>
              <li><span className="text-text hover:text-accent transition-colors tracking-wider cursor-pointer">Size Guide</span></li>
              <li><span className="text-text hover:text-accent transition-colors tracking-wider cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Connect</h4>
            <ul className="space-y-3 font-mono text-sm">
              <li><span className="text-text hover:text-accent transition-colors tracking-wider cursor-pointer">Instagram</span></li>
              <li><span className="text-text hover:text-accent transition-colors tracking-wider cursor-pointer">Twitter / X</span></li>
              <li><span className="text-text hover:text-accent transition-colors tracking-wider cursor-pointer">contact@void.haus</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted tracking-widest">© 2025 VOIDHAUS™. ALL RIGHTS RESERVED.</p>
          <p className="font-mono text-xs text-muted tracking-widest">ENGINEERED IN THE VOID.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
