import React from 'react';

// Defines the structure for a Skill item used in the Skills section
export interface Skill {
  name: string;      // Display name of the skill (e.g., "React")
  level: number;     // Proficiency percentage (0-100)
  category: 'frontend' | 'mobile' | 'styles'; // Grouping category
  icon?: React.ReactNode; // Optional Lucide icon component
}

// Defines the structure for a Project card
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];    // Array of tech stack tags (e.g., ["Next.js", "TypeScript"])
  imageUrl: string;  // URL for the project thumbnail
  link: string;      // URL for the project link/demo
}

// Defines the structure for Navigation items
export interface NavItem {
  label: string; // Text to display in the menu
  href: string;  // Anchor ID (e.g., "#about")
}
