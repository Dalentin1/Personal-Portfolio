import React, { useEffect, useRef } from 'react';

/**
 * AnimatedBackground Component
 * 
 * Creates a "Constellation" or "Particle Network" effect using HTML5 Canvas.
 * This component runs outside the main React render loop for performance,
 * using `requestAnimationFrame` to update particle positions.
 */
const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Canvas Initialization
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to fill the window
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration for the animation
    const particles: Particle[] = [];
    const particleCount = 70; // Number of dots
    const connectionDistance = 150; // Max distance to draw a line between dots
    const mouseDistance = 200; // Radius of mouse influence

    // Mouse state tracking
    let mouse = { x: 0, y: 0 };

    // Event Listeners
    // 1. Resize: Update canvas dimensions to keep drawing sharp
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // 2. Mouse Move: Update coordinate for particle interaction
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    /**
     * Particle Class
     * Represents a single dot in the network.
     */
    class Particle {
      x: number;
      y: number;
      vx: number; // Velocity X
      vy: number; // Velocity Y
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Random velocity between -0.25 and 0.25
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        // Randomly assign Blue (primary) or Indigo (secondary) colors
        this.color = Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(99, 102, 241, ';
      }

      /**
       * Update position based on velocity and mouse interaction
       */
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wall bouncing logic: Invert velocity if hitting a screen edge
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse Interaction Logic
        // Calculate distance between particle and mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If mouse is close, push particle away gently
        if (distance < mouseDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouseDistance - distance) / mouseDistance;
            // Apply force to velocity (push away)
            this.vx -= forceDirectionX * force * 0.05;
            this.vy -= forceDirectionY * force * 0.05;
        }
      }

      /**
       * Render the particle to the canvas
       */
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '0.5)'; // Add alpha for transparency
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    /**
     * Animation Loop
     * Clears canvas and redraws scene every frame.
     */
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Draw connections (The Constellation Effect)
        // Nested loop to compare every particle with every other particle
        for (let j = index; j < particles.length; j++) {
          const dx = particles[index].x - particles[j].x;
          const dy = particles[index].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // If close enough, draw a line
          if (distance < connectionDistance) {
            ctx.beginPath();
            // Opacity decreases as distance increases (fade out effect)
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / connectionDistance})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(particles[index].x, particles[index].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      // Fixed position ensures it stays behind content while scrolling
      // Pointer events none ensures clicks pass through to content below
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
    />
  );
};

export default AnimatedBackground;
