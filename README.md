# DevPortfolio Pro

A high-performance, responsive, and visually stunning developer portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## ❓ Is this a Next.js Application?

**Technically, no.** This specific code is running as a **React Single Page Application (SPA)** (like Vite or Create-React-App). 

**Why?** 
This live preview environment requires an `index.html` entry point to render in the browser immediately. Next.js uses server-side rendering and a file-system based router that cannot run in this specific client-side previewer.

**HOWEVER**, the code is written with **Next.js 14 architecture** in mind. I have structured `App.tsx` and `Layout.tsx` to mimic the App Router pattern perfectly.

## ⚡ Migration to Next.js

If you want to deploy this as a real Next.js app, follow these simple steps:

1.  **Initialize Next.js**:
    ```bash
    npx create-next-app@latest my-portfolio --typescript --tailwind --eslint
    ```

2.  **Move Components**:
    Copy the `components/` folder and `utils/` folder into your new project.

3.  **Setup Layout (`app/layout.tsx`)**:
    Copy the code from `components/Layout.tsx` into `app/layout.tsx`.
    *Note: You will need to move the `Navbar` and `Footer` imports.*

4.  **Setup Page (`app/page.tsx`)**:
    Copy the code from `App.tsx` (inside the `<Layout>` tags) into `app/page.tsx`.

5.  **Add "use client"**:
    Since we use Framer Motion and `useState`, add the `"use client";` directive to the top of `components/Navbar.tsx`, `components/Hero.tsx`, etc.

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

- **`App.tsx`**: Acts as `page.tsx`.
- **`components/Layout.tsx`**: Acts as `layout.tsx`.
- **`components/`**: UI components.
- **`utils/smoothScroll.ts`**: Helper function for handling anchor link clicks.

## 🎨 Deep Dive: Animated Background (`AnimatedBackground.tsx`)

The background features a "constellation" effect where particles float and connect with lines when close to each other.

### How it works:

1.  **Canvas Setup**: A `<canvas>` element covers the entire screen (`fixed inset-0`). It sits at `z-index: 0` so content floats above it.
2.  **Particle Class**:
    - Each dot is an instance of the `Particle` class.
    - Properties: `x`, `y` (position), `vx`, `vy` (velocity), `size`, and `color`.
    - **Update Logic**: Each frame, `x` adds `vx` and `y` adds `vy`. If a particle hits a wall, its velocity is inverted (`vx *= -1`), making it bounce.
3.  **Mouse Interaction**:
    - We track mouse coordinates.
    - Inside `update()`, we calculate the distance between the particle and the mouse.
    - If `distance < 200px`, we apply a repulsion force, pushing the particle away from the cursor. This creates a playful interactive effect.
4.  **The Constellation Effect (Draw Loop)**:
    - We use a nested loop to compare every particle with every other particle.
    - `Math.sqrt(dx*dx + dy*dy)` calculates the distance between two particles.
    - If the distance is less than `150px`, we draw a line between them.
    - **Dynamic Opacity**: The line's alpha (transparency) is calculated as `1 - (distance / maxDistance)`. This means lines fade out smoothly as particles move apart, rather than snapping off.