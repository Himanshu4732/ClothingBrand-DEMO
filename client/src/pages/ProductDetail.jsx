import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingBag, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { mockProducts } from '../data/mockProducts';

const ProductDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  
  const product = mockProducts.find(p => p.slug === slug) || mockProducts[0];
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor.name,
      qty: 1
    }));
    toast.success(`${product.name} added to void.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="font-mono text-xs uppercase tracking-widest text-muted mb-8">
        Home {'>'} Shop {'>'} {product.name}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image Gallery */}
        <div className="flex gap-4 h-[600px]">
          <div className="hidden md:flex flex-col gap-4 w-24">
             {/* Thumbs */}
             <div className="w-full h-32 bg-surface border border-accent cursor-pointer">
                <img src={product.image} alt="thumb" className="w-full h-full object-cover" />
             </div>
             <div className="w-full h-32 bg-surface border border-border cursor-pointer hover:border-text transition-colors"></div>
          </div>
          <div className="flex-1 bg-surface border border-border flex items-center justify-center overflow-hidden">
             {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
             ) : (
                <span className="text-muted font-mono tracking-widest text-sm">PRODUCT IMAGE</span>
             )}
          </div>
        </div>

        {/* Right: Info Panel */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-display uppercase tracking-wider mb-2">{product.name}</h1>
          <p className="font-mono text-xl mb-6">${product.price}</p>
          
          <div className="mb-6">
             <p className="font-mono text-sm text-muted mb-2 uppercase tracking-widest">Color</p>
             <div className="flex gap-3">
                {product.colors.map(color => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${selectedColor.name === color.name ? 'border-accent' : 'border-transparent hover:border-text'}`} 
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
             </div>
          </div>

          <div className="mb-8">
             <div className="flex justify-between items-center mb-2">
                <p className="font-mono text-sm text-muted uppercase tracking-widest">Size</p>
                <button className="font-mono text-xs uppercase text-text hover:text-accent transition-colors underline underline-offset-4">Size Guide</button>
             </div>
             <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`border py-2 text-sm font-mono transition-colors ${selectedSize === size ? 'border-accent text-accent bg-accent/10' : 'border-border hover:border-accent hover:text-accent'}`}
                  >
                    {size}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex gap-4">
            <button onClick={handleAddToCart} className="flex-1 bg-accent text-bg border-2 border-accent py-4 uppercase font-mono tracking-widest font-bold hover:bg-transparent hover:text-accent transition-all duration-300 flex items-center justify-center gap-2">
               <ShoppingBag className="w-5 h-5" /> Add To Cart
            </button>
            <button className="p-4 border-2 border-border hover:border-text transition-colors flex items-center justify-center text-muted hover:text-text">
               <Heart className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-12 border-t border-border pt-8 space-y-4 font-mono text-sm text-muted leading-relaxed">
             <p>{product.description}</p>
             <p className="uppercase tracking-widest pt-4">Material & Care</p>
             <ul className="list-disc pl-4 space-y-1">
                {product.materials.map((mat, i) => <li key={i}>{mat}</li>)}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
