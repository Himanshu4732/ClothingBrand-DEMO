import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProducts } from '../data/mockProducts';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  },
};

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Jackets', 'Hoodies', 'Footwear', 'Accessories'];

  const filteredProducts = activeCategory === 'All' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-bg pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-border/50 pb-8">
          <h1 className="text-5xl md:text-6xl font-display uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-text to-muted">
            Collection
          </h1>
          <div className="flex gap-4 mt-4 md:mt-0 items-center">
             <span className="text-muted font-mono text-xs uppercase tracking-widest bg-surface/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
               Showing {filteredProducts.length} Results
             </span>
          </div>
        </div>
        
        {/* Modern Pill Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-md ${
                activeCategory === cat 
                ? 'bg-accent text-bg shadow-[0_0_15px_rgba(184,255,87,0.4)] border border-accent flex-grow-0' 
                : 'bg-surface/30 text-muted border border-border/50 hover:border-accent hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <Link to={`/product/${product.slug}`} className="group block relative rounded-3xl overflow-hidden bg-surface/20 border border-white/5 hover:border-accent/50 transition-all duration-500 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-accent/10 backdrop-blur-xl">
                    <div className="aspect-[4/5] bg-surface relative overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] opacity-90 group-hover:opacity-100" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted font-mono text-xs tracking-widest">NO IMAGE</div>
                      )}
                      <div className="absolute top-4 left-4 font-mono text-[9px] bg-bg/80 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-[0.3em] text-accent border border-accent/30 shadow-lg">
                        {product.category}
                      </div>
                      
                      {/* Hover Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500" />
                    </div>
                    
                    <div className="p-6 flex justify-between items-end relative z-10">
                      <div>
                          <h3 className="font-display uppercase tracking-wider text-xl group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                          <p className="font-mono text-xs text-muted mt-2 tracking-widest">{product.colors?.length || 1} COLORS</p>
                      </div>
                      <span className="font-mono text-sm bg-surface/50 border border-border/50 px-4 py-2 rounded-full text-text group-hover:bg-text group-hover:text-bg transition-colors duration-300">
                        ${product.price}
                      </span>
                    </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Shop;
