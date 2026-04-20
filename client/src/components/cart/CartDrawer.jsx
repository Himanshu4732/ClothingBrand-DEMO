import { useSelector, useDispatch } from 'react-redux';
import { toggleCartDrawer } from '../../store/cartSlice';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { isOpen, cartItems } = useSelector((state) => state.cart);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
        onClick={() => dispatch(toggleCartDrawer(false))}
      />
      
      <div 
        className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border z-[70] flex flex-col animation-slide-in-right transform transition-transform duration-300"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-2xl uppercase tracking-widest">Your Void</h2>
          <button 
            onClick={() => dispatch(toggleCartDrawer(false))}
            className="text-muted hover:text-accent transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted space-y-4">
               <p className="font-mono text-sm tracking-widest uppercase">The void is empty.</p>
               <Link 
                 to="/shop" 
                 onClick={() => dispatch(toggleCartDrawer(false))}
                 className="text-accent underline underline-offset-4 decoration-accent/50 hover:decoration-accent transition-all font-mono text-xs"
               >
                 ENTER COLLECTION
               </Link>
            </div>
          ) : (
             <div className="space-y-4">
               {cartItems.map((item, idx) => (
                 <div key={idx} className="flex gap-4 border-b border-border pb-4">
                   <div className="w-20 h-24 bg-surface border border-border">
                     {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                   </div>
                   <div className="flex-1 flex flex-col justify-between py-1">
                     <div>
                       <h3 className="font-mono text-sm uppercase tracking-widest">{item.name}</h3>
                       <p className="font-mono text-xs text-muted mt-1">{item.color} / {item.size}</p>
                     </div>
                     <div className="flex justify-between items-center w-full">
                       <span className="font-mono text-sm">${item.price}</span>
                       <button onClick={() => {
                          import('../../store/cartSlice').then(({removeFromCart}) => {
                             dispatch(removeFromCart({ product: item.product, size: item.size }));
                          });
                       }} className="text-muted hover:text-danger">
                         <X className="w-4 h-4" />
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-border bg-bg/50">
            <div className="flex justify-between mb-6 font-mono text-sm uppercase tracking-widest">
               <span>Subtotal</span>
               <span>${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</span>
            </div>
            <Link 
               to="/checkout"
               onClick={() => dispatch(toggleCartDrawer(false))}
               className="w-full flex items-center justify-center bg-accent text-bg border-2 border-accent py-4 uppercase font-mono tracking-widest font-bold hover:bg-transparent hover:text-accent transition-all duration-300"
            >
               Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
