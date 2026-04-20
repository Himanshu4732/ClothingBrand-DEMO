import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderConfirmation = () => {
  const { id } = useParams();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="w-24 h-24 rounded-full border-4 border-accent flex items-center justify-center mx-auto mb-8 relative">
           <span className="text-accent text-4xl">✓</span>
           {/* Decorative rings */}
           <div className="absolute inset-0 border-2 border-accent/20 rounded-full scale-[1.2] animate-ping" style={{ animationDuration: '3s' }}></div>
        </div>
        
        <h1 className="text-5xl font-display uppercase tracking-widest mb-4 text-text">Order Confirmed.</h1>
        <p className="font-mono text-muted tracking-widest uppercase text-sm mb-2">We've received your transmission.</p>
        
        <div className="bg-surface border border-border p-6 mt-12 mb-12 flex flex-col sm:flex-row justify-between text-left gap-6 font-mono">
           <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Order #</p>
              <p className="text-lg text-text tracking-widest">{id}</p>
           </div>
           <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Status</p>
              <p className="text-lg text-accent tracking-widest uppercase">Processing</p>
           </div>
           <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Est. Delivery</p>
              <p className="text-lg text-text tracking-widest uppercase">Oct 24 - Oct 28</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
           <Link to="/shop" className="bg-transparent text-text border-2 border-border hover:border-text transition-colors px-8 py-3 tracking-widest uppercase font-mono text-sm">
              Continue Descent
           </Link>
           <Link to="/" className="bg-accent text-bg border-2 border-accent hover:bg-transparent hover:text-accent transition-colors font-bold px-8 py-3 tracking-widest uppercase font-mono text-sm">
              Track Order via Link
           </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
