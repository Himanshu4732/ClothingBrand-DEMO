import { useState, useEffect } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { 
  Users, DollarSign, Package, Tag, ShieldCheck, 
  X, Activity, ArrowUpRight, ArrowDownRight, RefreshCcw, Zap, ArrowRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import MagneticButton from '../../components/ui/MagneticButton';

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductModal, setShowProductModal] = useState(false);
  const [feed, setFeed] = useState([
    { id: 1, text: 'Order VH-992 Authorized', time: 'Just now', type: 'success' },
    { id: 2, text: 'Restock Alert: Monolith Hoodie', time: '2m ago', type: 'warning' },
    { id: 3, text: 'New User: 0xVoid... connected', time: '5m ago', type: 'info' },
    { id: 4, text: 'Payment Failed: Order VH-991', time: '12m ago', type: 'danger' },
    { id: 5, text: 'System Maintenance Scheduled', time: '1h ago', type: 'info' },
  ]);

  // Simulated Realtime
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvents = [
        'Order VH-' + Math.floor(Math.random() * 900 + 100) + ' Authorized',
        'New User Node Connected',
        'Inventory Sync Completed',
        'High Traffic Detected in Tokyo Region'
      ];
      setFeed(prev => {
        const newFeed = [{
          id: Date.now(),
          text: randomEvents[Math.floor(Math.random() * randomEvents.length)],
          time: 'Just now',
          type: Math.random() > 0.8 ? 'info' : 'success'
        }, ...prev.slice(0, 4)];
        return newFeed;
      });
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Complex Analytics Data
  const revenueData = [
    { name: '01', revenue: 4000, traffic: 2400 },
    { name: '02', revenue: 3000, traffic: 1398 },
    { name: '03', revenue: 5500, traffic: 9800 },
    { name: '04', revenue: 2000, traffic: 3908 },
    { name: '05', revenue: 8000, traffic: 4800 },
    { name: '06', revenue: 12000, traffic: 3800 },
    { name: '07', revenue: 9500, traffic: 4300 },
  ];

  const categoryData = [
    { name: 'Jackets', value: 45 },
    { name: 'Techwear', value: 30 },
    { name: 'Footwear', value: 15 },
    { name: 'Accessories', value: 10 },
  ];

  const radarData = [
    { subject: 'Views', A: 120, fullMark: 150 },
    { subject: 'Cart', A: 98, fullMark: 150 },
    { subject: 'Purchased', A: 86, fullMark: 150 },
    { subject: 'Returns', A: 12, fullMark: 150 },
    { subject: 'Restocks', A: 40, fullMark: 150 },
  ];

  const COLORS = ['#B8FF57', '#9CA3AF', '#4B5563', '#1F1F1F'];

  const handleInitProduct = (e) => {
    e.preventDefault();
    setShowProductModal(false);
    toast.success('Product initialized successfully to mainnet.');
  };

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden py-20">
      {/* Ambient Glows */}
      <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-border/40 pb-6 gap-6">
           <div className="flex items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-display uppercase tracking-widest text-text drop-shadow-lg">Core Command</h1>
              <span className="px-4 py-2 bg-accent/10 rounded-full border border-accent/40 text-accent font-mono text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(184,255,87,0.2)]">
                 <ShieldCheck className="w-4 h-4" /> Root Access
              </span>
           </div>
           <div className="flex items-center gap-4 text-muted font-mono text-xs uppercase tracking-widest">
              <span className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#B8FF57]" /> Network Online
              </span>
              <span className="hidden sm:inline-block px-4 py-1.5 border border-border/40 rounded-full bg-surface/30">
                 Latency: 24ms
              </span>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          
          {/* Futuristic Sidebar Navigation */}
          <div className="lg:col-span-1">
             <nav className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest sticky top-24">
                {[
                  { id: 'overview', icon: Activity, label: 'Analytics' },
                  { id: 'products', icon: Package, label: 'Inventory' },
                  { id: 'users', icon: Users, label: 'Network' },
                  { id: 'coupons', icon: Tag, label: 'Promotions' },
                ].map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)} 
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 w-full text-left ${
                      activeTab === tab.id 
                      ? 'bg-accent/10 border border-accent/40 text-accent shadow-[0_0_15px_rgba(184,255,87,0.1)]' 
                      : 'bg-surface/20 border border-white/5 text-muted hover:bg-surface/40 hover:text-text hover:border-white/10'
                    }`}
                  >
                     <tab.icon className="w-5 h-5" /> 
                     {tab.label}
                  </button>
                ))}
             </nav>
          </div>

          {/* Complex Data Content Area */}
          <div className="lg:col-span-5">
             {activeTab === 'overview' && (
               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  
                  {/* KPI Cluster */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {[
                       { label: 'Gross Volume', val: '$44,204', inc: '+12.5%', type: 'up' },
                       { label: 'Active Sessions', val: '1,204', inc: '+5.2%', type: 'up' },
                       { label: 'Conversion Rate', val: '4.8%', inc: '-0.3%', type: 'down' },
                       { label: 'Global Returns', val: '1.2%', inc: '-2.1%', type: 'up' }, // Down is good for returns
                     ].map((kpi, i) => (
                       <motion.div key={i} variants={itemVariants} className="bg-surface/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl hover:border-accent/30 transition-all group overflow-hidden relative">
                          <div className="absolute -right-4 -top-4 w-16 h-16 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/20 transition-all pointer-events-none" />
                          <p className="font-mono text-[10px] text-muted uppercase tracking-[0.2em] mb-4">{kpi.label}</p>
                          <p className="font-display text-4xl text-text drop-shadow mb-2 group-hover:text-accent transition-colors">{kpi.val}</p>
                          <div className={`flex items-center gap-1 font-mono text-xs ${kpi.type === 'up' ? 'text-accent' : 'text-danger'}`}>
                            {kpi.type === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {kpi.inc} <span className="text-muted ml-1 uppercase">vs Last Week</span>
                          </div>
                       </motion.div>
                     ))}
                  </div>

                  {/* Main Data Graphs */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Revenue & Traffic AreaChart */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-surface/20 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl h-[450px] flex flex-col">
                       <div className="flex justify-between items-center mb-6">
                         <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Network Throughput (7D)</h3>
                         <div className="flex gap-4 items-center">
                            <span className="flex items-center gap-2 font-mono text-[10px] uppercase text-text"><div className="w-2 h-2 rounded-full bg-accent" /> Revenue</span>
                            <span className="flex items-center gap-2 font-mono text-[10px] uppercase text-text"><div className="w-2 h-2 rounded-full bg-blue-400" /> Traffic</span>
                         </div>
                       </div>
                       <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                             <defs>
                               <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#B8FF57" stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor="#B8FF57" stopOpacity={0}/>
                               </linearGradient>
                               <linearGradient id="colorTraf" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.2}/>
                                 <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                               </linearGradient>
                             </defs>
                             <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                             <XAxis dataKey="name" stroke="#666" tick={{fill: '#888', fontFamily: 'monospace', fontSize: 10}} axisLine={false} tickLine={false} />
                             <YAxis stroke="#666" tick={{fill: '#888', fontFamily: 'monospace', fontSize: 10}} axisLine={false} tickLine={false} />
                             <Tooltip 
                               contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontFamily: 'monospace' }} 
                               itemStyle={{textTransform: 'uppercase', fontSize: '12px'}}
                             />
                             <Area type="monotone" dataKey="traffic" stroke="#60A5FA" strokeWidth={2} fillOpacity={1} fill="url(#colorTraf)" />
                             <Area type="monotone" dataKey="revenue" stroke="#B8FF57" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                          </AreaChart>
                       </ResponsiveContainer>
                    </motion.div>

                    {/* Sales Topology Pie & Radar Cluster */}
                    <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
                      <motion.div variants={itemVariants} className="bg-surface/20 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl h-[215px] flex flex-col relative overflow-hidden">
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">Category Output</h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={categoryData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value" stroke="none">
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontFamily: 'monospace' }} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-6">
                          <span className="font-mono text-xs font-bold text-text drop-shadow">4</span>
                        </div>
                      </motion.div>

                      <motion.div variants={itemVariants} className="bg-surface/20 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex-1 relative flex flex-col justify-center">
                         <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted absolute top-6 left-6">Engagement Matrix</h3>
                         <ResponsiveContainer width="100%" height="90%" className="mt-4">
                           <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData}>
                             <PolarGrid stroke="#ffffff10" />
                             <PolarAngleAxis dataKey="subject" tick={{fill: '#888', fontSize: 9, fontFamily: 'monospace'}} />
                             <Radar name="Metrics" dataKey="A" stroke="#B8FF57" fill="#B8FF57" fillOpacity={0.2} />
                             <Tooltip contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontFamily: 'monospace' }} />
                           </RadarChart>
                         </ResponsiveContainer>
                      </motion.div>
                    </div>
                  </div>

                  {/* Activity Feed & Detailed Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div variants={itemVariants} className="bg-surface/20 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
                       <div className="flex justify-between items-center mb-6">
                         <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> Live System Feed</h3>
                       </div>
                       <div className="space-y-4">
                         {feed.map((event) => (
                           <div key={event.id} className="flex justify-between items-center bg-bg/50 p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-colors">
                              <div className="flex items-center gap-3">
                                 <div className={`w-2 h-2 rounded-full ${
                                   event.type === 'success' ? 'bg-accent shadow-[0_0_8px_#B8FF57]' : 
                                   event.type === 'danger' ? 'bg-danger shadow-[0_0_8px_#FF4646]' : 
                                   event.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                                 }`} />
                                 <span className="font-mono text-xs uppercase text-text">{event.text}</span>
                              </div>
                              <span className="font-mono text-[10px] text-muted uppercase">{event.time}</span>
                           </div>
                         ))}
                       </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-surface/20 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
                        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-6">Conversion Funnel</h3>
                        <ResponsiveContainer width="100%" height={260}>
                           <BarChart data={[
                             { name: 'Visitors', count: 12000 },
                             { name: 'Engaged', count: 8500 },
                             { name: 'Cart', count: 4200 },
                             { name: 'Checkout', count: 1800 },
                             { name: 'Purchase', count: 1040 },
                           ]} layout="vertical" margin={{top: 0, right: 30, left: 10, bottom: 0}}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                              <XAxis type="number" stroke="#666" tick={{fill: '#888', fontFamily: 'monospace', fontSize: 10}} axisLine={false} tickLine={false} />
                              <YAxis dataKey="name" type="category" stroke="#666" tick={{fill: '#fff', fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase'}} axisLine={false} tickLine={false} />
                              <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontFamily: 'monospace' }} />
                              <Bar dataKey="count" fill="#B8FF57" radius={[0, 4, 4, 0]} barSize={20} />
                           </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                  </div>

               </motion.div>
             )}

             {/* Modern Inventory Manifest */}
             {activeTab === 'products' && (
               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-surface/20 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl font-mono">
                  <div className="flex justify-between items-center mb-8 border-b border-border/40 pb-6">
                     <h3 className="text-sm uppercase tracking-widest text-text">Inventory Manifest</h3>
                     <MagneticButton 
                       onClick={() => setShowProductModal(true)}
                       className="bg-accent text-bg px-6 py-3 rounded-full text-xs uppercase font-bold tracking-[0.2em] hover:bg-white shadow-[0_0_15px_rgba(184,255,87,0.2)] transition-all flex items-center gap-2"
                     >
                        Initialize Core <ArrowRight className="w-3 h-3" />
                     </MagneticButton>
                  </div>
                  <div className="overflow-x-auto custom-scrollbar">
                     <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
                        <thead className="bg-bg/40 text-[10px] uppercase tracking-[0.2em] text-muted">
                           <tr>
                              <th className="px-6 py-4 rounded-tl-2xl font-normal">Hash ID</th>
                              <th className="px-6 py-4 font-normal">Designation</th>
                              <th className="px-6 py-4 font-normal">MSRP</th>
                              <th className="px-6 py-4 font-normal">Network Status</th>
                              <th className="px-6 py-4 font-normal text-right rounded-tr-2xl">Override</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {[
                             { id: '#1DA', name: 'Void Cargo Shell', price: '$180.00', stock: 12, status: 'stable' },
                             { id: '#1DB', name: 'Monolith Hoodie', price: '$120.00', stock: 0, status: 'critical' },
                             { id: '#1DC', name: 'Nebula Runners', price: '$240.00', stock: 5, status: 'low' },
                             { id: '#1DD', name: 'Static Tee', price: '$60.00', stock: 145, status: 'stable' },
                           ].map((item, idx) => (
                             <tr key={idx} className="hover:bg-bg/60 transition-colors group">
                                <td className="px-6 py-5 text-muted text-xs">{item.id}</td>
                                <td className="px-6 py-5 text-text">{item.name}</td>
                                <td className="px-6 py-5 tracking-widest text-muted">{item.price}</td>
                                <td className="px-6 py-5">
                                   <span className={`px-3 py-1.5 rounded-full text-[9px] uppercase tracking-widest border flex items-center w-fit gap-2 ${
                                     item.status === 'stable' ? 'bg-accent/10 border-accent/30 text-accent' :
                                     item.status === 'low' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' :
                                     'bg-danger/10 border-danger/30 text-danger'
                                   }`}>
                                     <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                        item.status === 'stable' ? 'bg-accent' : item.status === 'low' ? 'bg-yellow-400' : 'bg-danger'
                                     }`} />
                                     {item.status === 'critical' ? 'Offline' : `Units: ${item.stock}`}
                                   </span>
                                </td>
                                <td className="px-6 py-5 text-right space-x-4 text-[10px] uppercase tracking-widest">
                                   <button className="text-muted hover:text-accent transition-colors">Patch</button>
                                   <button className="text-muted hover:text-danger transition-colors">Purge</button>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </motion.div>
             )}

             {/* Placeholder for Network / Protocol Promos */}
             {(activeTab === 'users' || activeTab === 'coupons') && (
               <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-surface/20 backdrop-blur-xl border border-white/5 rounded-3xl p-12 text-center text-muted font-mono text-sm uppercase tracking-widest h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                  <RefreshCcw className="w-12 h-12 mb-6 text-accent animate-spin-slow opacity-20" />
                  <p className="relative z-10">[ Protocol <span className="text-accent mx-2">{activeTab}</span> Awaiting Uplink ]</p>
                  <p className="text-[10px] mt-4 opacity-50 relative z-10">Data packet fragmented. Retrying connection...</p>
                  
                  {/* Glitch visuals */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none mix-blend-overlay" />
               </motion.div>
             )}
          </div>
        </div>

        {/* Futuristic Modal Overlay */}
        {showProductModal && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/80 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="bg-surface/60 border border-white/10 backdrop-blur-2xl rounded-[2rem] w-full max-w-lg p-8 shadow-2xl shadow-accent/5 relative"
             >
                <button 
                  onClick={() => setShowProductModal(false)}
                  className="absolute top-6 right-6 text-muted hover:text-text bg-bg p-2 rounded-full transition-all hover:scale-110 border border-white/5"
               >
                  <X className="w-4 h-4" />
               </button>
               <h2 className="font-display text-2xl uppercase tracking-widest mb-2 text-text">Initialize Node</h2>
               <p className="font-mono text-[10px] text-muted tracking-[0.2em] uppercase mb-8">Inject new schematic to distributed ledger</p>

               <form onSubmit={handleInitProduct} className="space-y-5">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Designation</label>
                    <input required type="text" placeholder="Signal Matrix Tee" className="w-full bg-bg/50 border border-white/5 rounded-2xl p-4 font-mono text-xs focus:outline-none focus:border-accent text-text transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Fiat Value</label>
                      <input required type="number" min="0" placeholder="0.00" className="w-full bg-bg/50 border border-white/5 rounded-2xl p-4 font-mono text-xs focus:outline-none focus:border-accent text-text transition-colors" />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Sector</label>
                      <select className="w-full bg-bg/50 border border-white/5 rounded-2xl p-4 font-mono text-xs focus:outline-none focus:border-accent text-text transition-colors appearance-none scrollbar-hide">
                         <option>Apparel</option>
                         <option>Footwear</option>
                         <option>Hardware</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-2">Encrypted Manifest</label>
                    <textarea rows="3" placeholder="Input specifications..." className="w-full bg-bg/50 border border-white/5 rounded-2xl p-4 font-mono text-xs focus:outline-none focus:border-accent text-text resize-none transition-colors custom-scrollbar"></textarea>
                  </div>
                  <div className="pt-4">
                     <MagneticButton type="submit" className="w-full bg-accent text-bg py-4 rounded-full uppercase font-mono tracking-[0.3em] text-xs font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(184,255,87,0.3)]">
                       Compile & Inject
                     </MagneticButton>
                  </div>
               </form>
             </motion.div>
           </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
