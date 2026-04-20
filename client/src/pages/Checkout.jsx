import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart } from '../store/cartSlice';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import MagneticButton from '../components/ui/MagneticButton';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [formData, setFormData] = useState({
    email: '', phone: '', name: '', address: '', address2: '', city: '', state: '', zip: '',
  });

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const shippingCost = shippingMethod === 'express' ? 25 : 0;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const total = subtotal + shippingCost;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && cartItems.length === 0) {
      toast.error('Your cart is empty. Add items before checking out.');
      return;
    }
    setStep(step + 1);
  };

  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    navigate('/order-confirmation/VH-' + Date.now().toString(36).toUpperCase());
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Background ambient light */}
      <div className="fixed top-[20%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest mb-12 relative z-10">Secure Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        {/* Left: Checkout Form Steps */}
        <div className="w-full lg:w-2/3">
          {/* Step Indicator */}
          <div className="flex mb-10 pb-4 border-b border-border/50 font-mono text-xs tracking-widest uppercase relative">
            <div className="absolute bottom-[-1px] left-0 h-[1px] bg-accent transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
            {['Shipping', 'Delivery', 'Payment'].map((label, i) => (
              <div key={i} className="flex-1 flex flex-col sm:flex-row items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step > i + 1 ? 'bg-accent text-bg shadow-[0_0_10px_rgba(184,255,87,0.3)]' : step === i + 1 ? 'border border-accent text-accent bg-accent/10' : 'border border-border/50 text-muted bg-surface/30'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </span>
                <span className={`mt-2 sm:mt-0 ${step >= i + 1 ? 'text-accent' : 'text-muted'}`}>{label}</span>
              </div>
            ))}
          </div>

          <div className="bg-surface/20 border border-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl shadow-black/40 min-h-[400px]">
             <AnimatePresence mode="wait">
               {/* Step 1: Shipping */}
               {step === 1 && (
                 <motion.form key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNextStep} className="space-y-6">
                   <h2 className="font-mono text-xl uppercase tracking-widest mb-6">Contact & Shipping</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Email Address" className="bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                     <input name="phone" value={formData.phone} onChange={handleChange} required type="text" placeholder="Phone Number" className="bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                   </div>
                   <div className="grid grid-cols-1 gap-6 mt-6">
                     <input name="name" value={formData.name} onChange={handleChange} required type="text" placeholder="Full Name" className="bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                     <input name="address" value={formData.address} onChange={handleChange} required type="text" placeholder="Address Line 1" className="bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                     <input name="address2" value={formData.address2} onChange={handleChange} type="text" placeholder="Address Line 2 (Optional)" className="bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                     <input name="city" value={formData.city} onChange={handleChange} required type="text" placeholder="City" className="col-span-2 bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                     <input name="state" value={formData.state} onChange={handleChange} required type="text" placeholder="State" className="bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                     <input name="zip" value={formData.zip} onChange={handleChange} required type="text" placeholder="ZIP" className="bg-surface/50 border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                   </div>
                   
                   <div className="flex justify-end pt-8">
                     <MagneticButton type="submit" className="bg-text text-bg px-10 py-4 uppercase font-mono tracking-[0.3em] text-xs font-bold hover:bg-accent transition-colors rounded-full flex items-center gap-3">
                       Continue <ArrowRight className="w-4 h-4" />
                     </MagneticButton>
                   </div>
                 </motion.form>
               )}

               {/* Step 2: Delivery */}
               {step === 2 && (
                 <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                   <h2 className="font-mono text-xl uppercase tracking-widest mb-6">Delivery Method</h2>
                   <div className="space-y-4">
                     <label
                       className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${shippingMethod === 'standard' ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(184,255,87,0.1)]' : 'border-border/50 bg-surface/40 hover:border-accent/50'}`}
                       onClick={() => setShippingMethod('standard')}
                     >
                       <div className="flex items-center gap-4">
                         <div className={`w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center ${shippingMethod === 'standard' ? 'border-accent' : 'border-muted'}`}>
                           {shippingMethod === 'standard' && <div className="w-3 h-3 rounded-full bg-accent" />}
                         </div>
                         <div>
                           <p className="font-mono text-sm tracking-widest uppercase">Standard Shipping</p>
                           <p className="font-mono text-xs text-muted mt-1 shadow-none">5-7 Business Days</p>
                         </div>
                       </div>
                       <span className="font-mono text-sm uppercase tracking-widest text-accent font-bold">Free</span>
                     </label>
                     <label
                       className={`flex items-center justify-between p-6 rounded-2xl border cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(184,255,87,0.1)]' : 'border-border/50 bg-surface/40 hover:border-accent/50'}`}
                       onClick={() => setShippingMethod('express')}
                     >
                       <div className="flex items-center gap-4">
                         <div className={`w-5 h-5 rounded-full border flex flex-shrink-0 items-center justify-center ${shippingMethod === 'express' ? 'border-accent' : 'border-muted'}`}>
                           {shippingMethod === 'express' && <div className="w-3 h-3 rounded-full bg-accent" />}
                         </div>
                         <div>
                           <p className="font-mono text-sm tracking-widest uppercase">Express Priority</p>
                           <p className="font-mono text-xs text-muted mt-1 shadow-none">1-2 Business Days</p>
                         </div>
                       </div>
                       <span className="font-mono text-sm uppercase tracking-widest text-accent font-bold">$25</span>
                     </label>
                   </div>
                   <div className="flex justify-between pt-8">
                     <button onClick={() => setStep(1)} className="text-muted px-6 py-4 uppercase font-mono text-xs tracking-widest hover:text-text transition-colors flex items-center gap-2">
                       <ArrowLeft className="w-4 h-4" /> Back
                     </button>
                     <MagneticButton onClick={handleNextStep} className="bg-text text-bg px-10 py-4 uppercase font-mono tracking-[0.3em] text-xs font-bold hover:bg-accent transition-colors rounded-full flex items-center gap-3">
                       Proceed <ArrowRight className="w-4 h-4" />
                     </MagneticButton>
                   </div>
                 </motion.div>
               )}

               {/* Step 3: Payment */}
               {step === 3 && (
                 <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                   <h2 className="font-mono text-xl uppercase tracking-widest mb-6">Payment</h2>
                   
                   <div className="p-8 rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-md space-y-6 shadow-inner">
                     <div className="flex justify-between items-center mb-2">
                        <p className="font-mono text-xs text-muted uppercase tracking-widest">Card Details (Demo Mode)</p>
                        <div className="flex gap-2">
                           <div className="w-8 h-5 bg-accent/20 rounded shadow" />
                           <div className="w-8 h-5 bg-blue-500/20 rounded shadow" />
                        </div>
                     </div>
                     <input type="text" placeholder="Card Number" defaultValue="4242 4242 4242 4242" className="w-full bg-bg border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                     <div className="grid grid-cols-2 gap-4">
                       <input type="text" placeholder="MM/YY" defaultValue="12/28" className="bg-bg border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                       <input type="text" placeholder="CVC" defaultValue="123" className="bg-bg border border-border/50 rounded-full px-6 py-4 focus:outline-none focus:border-accent text-sm font-mono text-text transition-all" />
                     </div>
                   </div>

                   <div className="flex justify-between pt-8">
                     <button onClick={() => setStep(2)} className="text-muted px-6 py-4 uppercase font-mono text-xs tracking-widest hover:text-text transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                     </button>
                     <MagneticButton onClick={handlePlaceOrder} className="bg-accent text-bg px-10 py-4 uppercase font-mono tracking-[0.3em] text-xs font-bold hover:bg-white transition-colors rounded-full shadow-[0_0_20px_rgba(184,255,87,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                       Pay ${total.toFixed(2)}
                     </MagneticButton>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </div>

        {/* Right: Order Summary Panel */}
        <div className="w-full lg:w-1/3">
          <div className="bg-surface/20 border border-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-xl sticky top-28">
            <h2 className="font-mono text-lg uppercase tracking-widest mb-8 border-b border-border/40 pb-4">Order Summary</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-mono text-sm text-muted mb-4 opacity-70">Your cart is empty.</p>
                <Link to="/shop" className="text-accent underline underline-offset-4 font-mono text-xs uppercase tracking-widest hover:text-white transition-colors">
                  Browse Gear
                </Link>
              </div>
            ) : (
              <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-surface/30 p-3 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group">
                    <div className="w-16 h-20 bg-surface rounded-xl overflow-hidden flex-shrink-0">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs uppercase tracking-widest truncate text-text group-hover:text-accent transition-colors">{item.name}</p>
                      <p className="font-mono text-[10px] text-muted mt-1 uppercase tracking-widest">Sz: {item.size} | Qty: {item.qty}</p>
                      <p className="font-mono text-sm text-text mt-1">${(item.price * item.qty).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart({ product: item.product, size: item.size }))}
                      className="text-muted hover:text-danger p-2 bg-bg/50 rounded-full transition-colors opacity-50 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-border/40 pt-6 space-y-4 font-mono text-xs uppercase tracking-widest text-muted">
              <div className="flex justify-between">
                <span>Subtotal</span><span className="text-text">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span><span className="text-text">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
            </div>

            <div className="border-t border-border/40 mt-6 pt-6 flex justify-between font-mono text-xl uppercase tracking-widest text-accent font-bold drop-shadow-[0_0_8px_rgba(184,255,87,0.4)]">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
