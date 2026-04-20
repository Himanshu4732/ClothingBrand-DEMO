import { useState } from 'react';
import { LogOut, Package, Heart, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  const logoutHandler = () => {
    // Redux logout logic
    window.location.href = '/login';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="col-span-1 border-r border-border min-h-[400px] pr-8">
           <h2 className="font-display text-2xl uppercase tracking-widest mb-8">Data Center</h2>
           
           <nav className="flex flex-col space-y-4 font-mono text-sm uppercase tracking-widest">
              <button 
                 onClick={() => setActiveTab('orders')}
                 className={`flex items-center gap-3 text-left py-2 ${activeTab === 'orders' ? 'text-accent border-l-2 border-accent pl-2' : 'text-muted hover:text-text pl-2'}`}
              >
                 <Package className="w-4 h-4" /> Operations (Orders)
              </button>
              
              <button 
                 onClick={() => setActiveTab('wishlist')}
                 className={`flex items-center gap-3 text-left py-2 ${activeTab === 'wishlist' ? 'text-accent border-l-2 border-accent pl-2' : 'text-muted hover:text-text pl-2'}`}
              >
                 <Heart className="w-4 h-4" /> Targeted (Wishlist)
              </button>
              
              <button 
                 onClick={() => setActiveTab('profile')}
                 className={`flex items-center gap-3 text-left py-2 ${activeTab === 'profile' ? 'text-accent border-l-2 border-accent pl-2' : 'text-muted hover:text-text pl-2'}`}
              >
                 <Settings className="w-4 h-4" /> Parameters (Profile)
              </button>
              
              <button 
                 onClick={logoutHandler}
                 className="flex items-center gap-3 text-left pl-2 py-2 mt-8 text-danger hover:text-red-400 transition-colors"
              >
                 <LogOut className="w-4 h-4" /> Sever Connection
              </button>
           </nav>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-3 lg:pl-8">
           {activeTab === 'orders' && (
             <div>
                <h3 className="font-mono text-lg uppercase tracking-widest mb-6">Operations Log</h3>
                <div className="bg-surface border border-border p-6 text-center text-muted font-mono text-sm">
                   No past operations found. <Link to="/shop" className="text-accent underline underline-offset-4 ml-2">Initiate protocol.</Link>
                </div>
             </div>
           )}

           {activeTab === 'wishlist' && (
             <div>
                <h3 className="font-mono text-lg uppercase tracking-widest mb-6">Targeted Assets</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                   {/* Dummy Wishlist Item */}
                   <div className="border border-border bg-surface/20 group cursor-pointer hover:border-accent transition-colors">
                       <div className="aspect-[4/5] bg-surface relative">
                          <button className="absolute top-2 right-2 p-2 bg-black/50 text-accent hover:text-danger"><Heart className="w-4 h-4 fill-current"/></button>
                       </div>
                       <div className="p-3">
                          <h4 className="font-display uppercase tracking-wider text-sm truncate">Void Cargo Shell</h4>
                          <p className="font-mono text-xs text-muted mt-1">$180.00</p>
                       </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === 'profile' && (
             <div>
                <h3 className="font-mono text-lg uppercase tracking-widest mb-6">Modify Parameters</h3>
                <form className="space-y-6 max-w-md">
                   <input type="text" defaultValue="Guest User" className="w-full px-4 py-3 bg-bg border border-border text-text font-mono text-sm focus:outline-none focus:border-accent" />
                   <input type="email" defaultValue="subject@void.haus" className="w-full px-4 py-3 bg-bg border border-border text-text font-mono text-sm focus:outline-none focus:border-accent" readOnly />
                   <input type="password" placeholder="New Password" className="w-full px-4 py-3 bg-bg border border-border text-text font-mono text-sm focus:outline-none focus:border-accent" />
                   <button type="button" className="bg-accent text-bg px-8 py-3 uppercase font-mono tracking-widest font-bold hover:bg-transparent border-2 border-accent hover:text-accent transition-colors">
                      Update Matrix
                   </button>
                </form>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
