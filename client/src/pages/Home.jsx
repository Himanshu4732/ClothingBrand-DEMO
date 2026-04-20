import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Minus, ChevronDown } from 'lucide-react';
import { mockProducts } from '../data/mockProducts';

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

/* ─── Animated Section Wrapper ─── */
const AnimSection = ({ children, className = '', variants = fadeUp, custom = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  const featuredProducts = mockProducts.slice(0, 3);

  return (
    <div className="w-full overflow-hidden bg-bg">

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <img
            src="/images/hero-editorial.png"
            alt="VOIDHAUS Editorial"
            className="w-full h-[120%] object-cover object-center opacity-30 mt-[-10%]"
            onError={(e) => { e.target.src = '/images/void_cargo_shell.png'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/40 to-bg" />
        </motion.div>

        {/* Optimized Static Grain */}
        <div className="absolute inset-0 z-10 opacity-5 pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '150px 150px'
          }}
        />

        <div className="relative z-20 text-center px-4 flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 60 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[1px] bg-accent mb-8 origin-top"
          />

          <motion.h1
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[11rem] font-display font-medium uppercase tracking-tight leading-[0.85] mb-6 text-text mix-blend-difference"
          >
            Wear The<br />Silence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-accent font-mono tracking-[0.4em] uppercase text-xs md:text-sm mb-12"
          >
            FW25 Generation — Initialized
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 w-full justify-center"
          >
            <Link
              to="/shop"
              className="group relative overflow-hidden bg-accent text-bg px-10 py-4 uppercase font-mono tracking-widest text-xs font-bold border-2 border-accent transition-all duration-500 rounded-full"
            >
              <span className="relative z-10 transition-colors group-hover:text-accent">[ Enter Collection ]</span>
              <div className="absolute inset-0 h-full w-full bg-bg -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-muted tracking-[0.4em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-accent animate-bounce" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — MARQUEE
      ═══════════════════════════════════════════════════════════ */}
      <div className="border-y border-border/30 bg-surface/20 backdrop-blur-md text-text py-4 overflow-hidden whitespace-nowrap flex select-none relative z-30">
        <div className="animate-marquee font-mono text-xs tracking-[0.3em] font-bold uppercase inline-block text-muted">
          Free Worldwide Shipping Over $200 &nbsp;&nbsp;///&nbsp;&nbsp; No Restocks &nbsp;&nbsp;///&nbsp;&nbsp; Stay Cryptic &nbsp;&nbsp;///&nbsp;&nbsp; FW25 Loading &nbsp;&nbsp;///&nbsp;&nbsp; 
          Free Worldwide Shipping Over $200 &nbsp;&nbsp;///&nbsp;&nbsp; No Restocks &nbsp;&nbsp;///&nbsp;&nbsp; Stay Cryptic &nbsp;&nbsp;///&nbsp;&nbsp; FW25 Loading &nbsp;&nbsp;///&nbsp;&nbsp; 
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — EDITORIAL SPLIT
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <AnimSection>
            <div className="relative group overflow-hidden border border-border/50 rounded-3xl shadow-2xl shadow-accent/5">
              <img
                src="/images/monolith_hoodie.png"
                alt="VOIDHAUS Editorial"
                className="w-full aspect-[4/5] object-cover filter grayscale hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[0.16,1,0.3,1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                 <span className="font-mono text-xs text-text border border-text/20 px-3 py-1 uppercase tracking-[0.3em] backdrop-blur-md">FW25 / Sector 1</span>
              </div>
            </div>
          </AnimSection>

          <AnimSection className="flex flex-col justify-center">
            <span className="font-mono text-xs text-accent uppercase tracking-[0.5em] mb-6 flex items-center gap-4">
               <span className="w-8 h-[1px] bg-accent" /> Manifesto
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display uppercase tracking-widest leading-[1.1] mb-8">
              Engineered<br />For The<br /><span className="text-transparent border-text" style={{WebkitTextStroke: '1px #666'}}>Void.</span>
            </h2>
            <p className="font-mono text-sm text-muted leading-[2.2] tracking-wider max-w-md mb-12">
              We don't design for trends. We engineer garments for a generation that moves
              through concrete landscapes and digital frequencies with equal indifference.
              Every stitch is intentional. Every silhouette, a statement of calculated silence.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-text hover:text-accent transition-colors group w-fit pb-2 border-b border-border hover:border-accent"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </AnimSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3.5 — BRAND ORIGIN
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-surface/5 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimSection className="order-2 lg:order-1 flex flex-col justify-center">
              <span className="font-mono text-xs text-accent uppercase tracking-[0.5em] mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-accent" /> Origin
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-widest leading-[1.1] mb-8">
                Born in the<br />Concrete.
              </h2>
              <p className="font-mono text-sm text-muted leading-[2] tracking-wider mb-8">
                VOIDHAUS was conceptualized in the underground brutalist architecture of Neo-Tokyo. 
                We observed a disconnect between technical, durable gear and high-end fashion silhouettes.
              </p>
              <p className="font-mono text-sm text-text leading-[2] tracking-wider mb-10">
                Our first collection shattered that boundary. The result is a monolithic aesthetic combining extreme 
                weather resilience with runway-ready structuring.
              </p>
              <Link to="/about" className="inline-block bg-surface border border-border/50 hover:border-accent text-text px-8 py-3 rounded-full font-mono text-xs uppercase tracking-[0.3em] transition-all hover:shadow-[0_0_15px_rgba(184,255,87,0.15)] w-fit">
                Read History
              </Link>
            </AnimSection>
            
            <AnimSection className="order-1 lg:order-2">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-accent/5 border border-white/5">
                <img 
                  src="/images/brand_origin_v2.png" 
                  alt="Brand Origin" 
                  className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-[2s] ease-[0.16,1,0.3,1]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8 font-mono text-[10px] tracking-widest text-muted uppercase flex justify-between border-t border-border/50 pt-4">
                  <span>Archivo // 001</span>
                  <span>Class: Editorial</span>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — FEATURED PRODUCTS
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-border/30 bg-surface/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimSection className="flex justify-between items-end mb-16">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-[0.4em] mb-4 block">/// Curated</span>
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest">New Arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted hover:text-accent transition-colors pb-1 border-b border-transparent hover:border-accent"
            >
              View Grid <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimSection>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product, i) => (
              <motion.div key={i} variants={fadeUp} className="group relative">
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="relative aspect-[3/4] bg-surface/30 border border-border/50 overflow-hidden mb-6 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-[0.16,1,0.3,1]"
                    />
                    <div className="absolute top-4 left-4 font-mono text-[9px] bg-bg/90 backdrop-blur-md px-3 py-1.5 uppercase tracking-[0.3em] text-accent border border-accent/20">
                      {product.category}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display uppercase tracking-widest text-lg group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                    <div className="flex justify-between items-center w-full">
                       <span className="font-mono text-sm text-muted">${product.price}</span>
                       <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-text transition-colors">Select Size</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4.5 — ENVIRONMENTAL IMPACT
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimSection>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/5 bg-surface/30 backdrop-blur-md p-2">
               <div className="rounded-3xl overflow-hidden relative">
                 <img 
                   src="/images/impact_core_v2.png" 
                   alt="Zero Waste Engineering" 
                   className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-[2s] ease-[0.16,1,0.3,1]"
                 />
                 <div className="absolute top-4 right-4 bg-bg/80 backdrop-blur-md rounded-full px-4 py-1.5 border border-accent/20 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-accent">Live Node</span>
                 </div>
               </div>
            </div>
          </AnimSection>

          <AnimSection className="flex flex-col justify-center">
            <span className="font-mono text-xs text-accent uppercase tracking-[0.5em] mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent" /> Data Core
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-widest leading-[1.1] mb-12">
              Sustainable<br />Engineering.
            </h2>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div className="border-l border-accent/30 pl-6">
                <p className="font-mono text-3xl text-text mb-2">95%</p>
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase">Recycled Tactical Fabrics</p>
              </div>
              <div className="border-l border-accent/30 pl-6">
                <p className="font-mono text-3xl text-text mb-2">100%</p>
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase">Carbon Negative Transit</p>
              </div>
              <div className="border-l border-accent/30 pl-6">
                <p className="font-mono text-3xl text-text mb-2">&lt;3%</p>
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase">Textile Waste Ratio</p>
              </div>
              <div className="border-l border-accent/30 pl-6">
                <p className="font-mono text-3xl text-text mb-2">0</p>
                <p className="font-mono text-[10px] text-muted tracking-widest uppercase">Toxic Dye Effluents</p>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — BRAND PILLARS (Glassmorphism)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimSection className="text-center mb-20">
            <span className="font-mono text-xs text-muted uppercase tracking-[0.5em] mb-4 block">System Core</span>
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest mt-2">Built Different.</h2>
          </AnimSection>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                num: '001',
                title: 'Zero-Waste Engineering',
                desc: 'Every pattern cut is computationally optimized. Our waste ratio sits below 3.2%, transcending industry standards.',
              },
              {
                num: '002',
                title: 'Ethical Construction',
                desc: 'Factories operate under strict living-wage mandates. Every person who touches the garment is paid to live securely.',
              },
              {
                num: '003',
                title: 'Designed to Endure',
                desc: 'We engineer for years, not seasons. Synthetic stressors test every seam. Longevity over sheer aesthetics.',
              },
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeUp} className="h-full">
                <div className="group relative border border-border/40 p-10 bg-surface/20 backdrop-blur-xl hover:bg-surface/40 hover:border-accent/30 transition-all duration-500 h-full flex flex-col isolation-auto rounded-3xl shadow-xl shadow-black/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
                  <span className="font-mono text-accent/60 text-xs tracking-[0.4em] mb-8 font-bold">// {pillar.num}</span>
                  <h3 className="font-display text-2xl uppercase tracking-widest mb-4 group-hover:text-accent transition-colors duration-300">{pillar.title}</h3>
                  <p className="font-mono text-sm text-muted/80 leading-[2] tracking-wide">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-border/30 bg-surface/5 relative overflow-hidden">
        {/* Geometric Background Element */}
        <div className="absolute -right-[20%] -top-[20%] w-[50%] h-[150%] border border-accent/10 rotate-12 pointer-events-none" />
        <div className="absolute -left-[10%] top-[40%] w-[30%] h-[2px] bg-accent/20 pointer-events-none mix-blend-overlay" />
        
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <AnimSection variants={fadeUp}>
            <span className="font-mono text-xs text-accent uppercase tracking-[0.5em] mb-6 block">Transmission</span>
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-widest mb-8 leading-[1.1]">
              Connect To<br />The Network.
            </h2>
            <p className="font-mono text-sm text-muted tracking-widest mb-12 max-w-md mx-auto leading-[2]">
              Secure early access to drops and prototype releases. Encrypted comms only. No spam.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-0 max-w-xl mx-auto relative group"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="ADDRESS@VOID.NET"
                className="flex-1 bg-surface/50 backdrop-blur-md border border-border/50 px-6 py-5 font-mono text-xs focus:outline-none focus:border-accent text-text tracking-[0.2em] uppercase transition-colors rounded-t-3xl sm:rounded-l-full sm:rounded-tr-none"
                required
              />
              <button
                type="submit"
                className="bg-text text-bg px-10 py-5 uppercase font-mono tracking-[0.3em] text-xs font-bold hover:bg-accent border border-border/50 transition-all duration-300 flex items-center gap-3 justify-center mt-4 sm:mt-0 rounded-b-3xl sm:rounded-r-full sm:rounded-bl-none"
              >
                Sync <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </AnimSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
