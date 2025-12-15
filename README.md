# DevPortfolio Pro

A high-performance, responsive, and visually stunning developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Smooth Scrolling Navigation**: Custom implementation ensuring perfect offset handling for fixed headers on both Desktop and Mobile.
- **Dynamic Particle Background**: A custom HTML5 Canvas implementation creating a "Constellation" effect that reacts to mouse movement.
- **Responsive Design**: Fully adaptive layout that works seamlessly from mobile phones to large desktop screens.
- **Framer Motion Animations**:
  - Staggered text entrances.
  - Scroll-triggered progress bars.
  - Hover effects on project cards.
  - Mobile menu drawer animations.

## 📂 File Structure Overview

│
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json (if using TypeScript)
├── .gitignore
│
└── src/
├── main.tsx <-- React entry point
├── App.tsx <-- Main application component
├── index.css <-- Global styles
│
├── components/
│ ├── About.tsx
│ ├── AnimatedBackground.tsx
│ ├── Contact.tsx
│ ├── Header.tsx
│ ├── Hero.tsx
│ ├── Layout.tsx
│ ├── Projects.tsx
│ ├── Skills.tsx
│
└── utils/
└── smoothScroll.ts

## 🎨 Deep Dive: Animated Background (`AnimatedBackground.tsx`)

The background features a "constellation" effect where particles float and connect with lines when close to each other.

### How it works: ````

1. **Canvas Setup**: A `<canvas>` element covers the entire screen (`fixed inset-0`). It sits at `z-index: 0` so content floats above it.
2. **Particle Class**:

   - Each dot is an instance of the `Particle` class.
   - Properties: `x`, `y` (position), `vx`, `vy` (velocity), `size`, and `color`.
   - **Update Logic**: Each frame, `x` adds `vx` and `y` adds `vy`. If a particle hits a wall, its velocity is inverted (`vx *= -1`), making it bounce.

3. **Mouse Interaction**:
   - We track mouse coordinates.
   - Inside `update()`, we calculate the distance between the particle and the mouse.
   - If `distance < 200px`, we apply a repulsion force, pushing the particle away from the cursor. This creates a playful interactive effect.
4. **The Constellation Effect (Draw Loop)**:
   - We use a nested loop to compare every particle with every other particle.
   - `Math.sqrt(dx*dx + dy*dy)` calculates the distance between two particles.
   - If the distance is less than `150px`, we draw a line between them.
   - **Dynamic Opacity**: The line's alpha (transparency) is calculated as `1 - (distance / maxDistance)`. This means lines fade out smoothly as particles move apart, rather than snapping off.
