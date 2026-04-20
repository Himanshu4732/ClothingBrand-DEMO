import { useEffect, useRef } from 'react';

const EasterEgg = ({ isActive, onClose }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particlesArray = [];
    const numberOfParticles = Math.min((width * height) / 12000, 200); // HARD-CAP for extreme smoothness
    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    
    window.addEventListener('resize', handleResize);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.baseSize = this.size;
            // The accent color #B8FF57 => rgba(184, 255, 87, x)
            this.color = `rgba(${100 + Math.random()*155}, 255, ${50 + Math.random()*100}, ${Math.random()})`;
            this.weight = Math.random() * 1.5 + 0.5;
            this.directionX = Math.random() * 2 - 1;
        }
        update() {
            if (this.y > height) {
                this.y = 0 - this.size;
                this.x = Math.random() * width;
                this.weight = Math.random() * 1.5 + 0.5;
            }
            this.weight += 0.01;
            this.y += this.weight;
            this.x += this.directionX;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    const init = () => {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    };
    init();

    const animate = () => {
        ctx.clearRect(0, 0, width, height); // Extreme performance boost over fillRect trails
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    };
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none mix-blend-screen transition-opacity duration-1000 ease-in-out">
        <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default EasterEgg;
