import { Template } from "@/types/cv-types";
// Classic
import ClassicBlack from "@/components/cv-templates/Classic/ClassicBlack"
import ClassicBlue from "@/components/cv-templates/Classic/ClassicBlue"

// Corporate
import { CorporateModern } from "@/components/cv-templates/Corporate/CorporateModern"
import { CorporateFormal } from "@/components/cv-templates/Corporate/CorporateFormal"

// Creative
import { CreativeColorful } from "@/components/cv-templates/Creative/CreativeColorful"
import { CreativePortfolio } from "@/components/cv-templates/Creative/CreativePortfolio"

// Elegant
import { ElegantContrast } from "@/components/cv-templates/Elegant/ElegantContrast"
import { ElegantSerif } from "@/components/cv-templates/Elegant/ElegantSerif"

// Minimal
import MinimalSerif from "@/components/cv-templates/Minimal/MinimalSerif"
import MinimalWhite from "@/components/cv-templates/Minimal/MinimalWhite"

// Modern
import ModernGrid from "@/components/cv-templates/Modern/ModernGrid"
import ModernDark from "@/components/cv-templates/Modern/ModernDark"
import ModernLight from "@/components/cv-templates/Modern/ModernLight"

const templates = [
    // Modern
    {
      id: "modern-light",
      name: "Modern Light",
      description: "Clean and contemporary design",
      component: ModernLight,
      previewUrl: "/templates/modern-light",
      componentPath: "@/components/cv-templates/ModernLight",
      category: "Modern",
      type: "Modern",
      aiPrompt: "A clean and professional layout ideal for modern tech roles like developers, designers, or marketers. Prioritizes clarity and white space."
    },
    {
      id: "modern-dark",
      name: "Modern Dark",
      description: "Clean and contemporary design",
      component: ModernDark,
      previewUrl: "/templates/modern-dark",
      componentPath: "@/components/cv-templates/ModernDark",
      category: "Modern",
      type: "Modern",
      aiPrompt: "Dark-themed modern layout suitable for roles in tech, design, or startups. Offers sleek style with high contrast for readability."
    },
    {
      id: "modern-grid",
      name: "Modern Grid",
      description: "Clean and contemporary design",
      component: ModernGrid,
      previewUrl: "/templates/modern-grid",
      componentPath: "@/components/cv-templates/ModernGrid",
      category: "Modern",
      type: "Modern",
      aiPrompt: "Grid-based modern resume with structured alignment, great for data analysts, developers, or roles requiring visual organization."
    },
  
    // Minimal
    {
      id: "minimal-white",
      name: "Minimal White",
      description: "Simple and elegant layout",
      component: MinimalWhite,
      previewUrl: "/templates/minimal-white",
      componentPath: "@/components/cv-templates/MinimalWhite",
      category: "Minimal",
      type: "Minimal",
      aiPrompt: "Ultra-clean and minimal layout for job seekers in corporate, legal, or administrative fields. Best when you want a no-nonsense presentation."
    },
    {
      id: "minimal-serif",
      name: "Minimal Serif",
      description: "Simple and elegant layout",
      component: MinimalSerif,
      previewUrl: "/templates/minimal-serif",
      componentPath: "@/components/templates/MinimalSerif",
      category: "Minimal",
      type: "Minimal",
      aiPrompt: "Minimalist layout using serif typography, great for editorial, academic, or writing roles where elegance and subtlety matter."
    },
  
    // Classic
    {
      id: "classic-blue",
      name: "Classic Blue",
      description: "Traditional professional style",
      component: ClassicBlue,
      previewUrl: "/templates/classic-blue",
      componentPath: "@/components/templates/ClassicBlue",
      category: "Classic",
      type: "Classic",
      aiPrompt: "Traditional resume layout with blue highlights. Ideal for finance, consulting, or administrative positions in conservative industries."
    },
    {
      id: "classic-black",
      name: "Classic Black",
      description: "Traditional professional style",
      component: ClassicBlack,
      previewUrl: "/templates/classic-black",
      componentPath: "@/components/templates/ClassicBlack",
      category: "Classic",
      type: "Classic",
      aiPrompt: "No-frills classic resume with black & white tones. Perfect for senior-level professionals or roles in government or law."
    },
  
    // Creative
    {
      id: "creative-portfolio",
      name: "Creative Portfolio",
      description: "Stylish and bold format for creatives",
      component: CreativePortfolio,
      previewUrl: "/templates/creative-portfolio",
      componentPath: "@/components/templates/CreativePortfolio",
      category: "Creative",
      type: "Creative",
      aiPrompt: "Portfolio-inspired format great for designers, artists, or photographers. Showcases personality, visuals, and creativity upfront."
    },
    {
      id: "creative-colorful",
      name: "Creative Colorful",
      description: "Stylish and bold format for creatives",
      component: CreativeColorful,
      previewUrl: "/templates/creative-colorful",
      componentPath: "@/components/templates/CreativeColorful",
      category: "Creative",
      type: "Creative",
      aiPrompt: "Bold and colorful layout for creatives, marketers, and content creators. Meant to stand out and reflect a vibrant personality."
    },
  
    // Corporate/Professional
    {
      id: "corporate-formal",
      name: "Corporate Formal",
      description: "Formal layout for business professionals",
      component: CorporateFormal,
      previewUrl: "/templates/corporate-formal",
      componentPath: "@/components/templates/CorporateFormal",
      category: "Corporate",
      type: "Professional",
      aiPrompt: "Structured, clean layout perfect for corporate environments. Suits roles in HR, finance, operations, or business management."
    },
    {
      id: "corporate-modern",
      name: "Corporate Modern",
      description: "Formal layout for business professionals",
      component: CorporateModern,
      previewUrl: "/templates/corporate-modern",
      componentPath: "@/components/templates/CorporateModern",
      category: "Corporate",
      type: "Professional",
      aiPrompt: "Combines corporate formality with a modern look. Great for business consultants, project managers, and client-facing roles."
    },
  
    // Elegant
    {
      id: "elegant-serif",
      name: "Elegant Serif",
      description: "Sleek design with refined typography",
      component: ElegantSerif,
      previewUrl: "/templates/elegant-serif",
      componentPath: "@/components/templates/ElegantSerif",
      category: "Elegant",
      type: "Elegant",
      aiPrompt: "Elegant layout with refined serif typography. Ideal for editorial, architecture, or fashion-related roles where presentation matters."
    },
    {
      id: "elegant-contrast",
      name: "Elegant Contrast",
      description: "Sleek design with refined typography",
      component: ElegantContrast,
      previewUrl: "/templates/elegant-contrast",
      componentPath: "@/components/templates/ElegantContrast",
      category: "Elegant",
      type: "Elegant",
      aiPrompt: "High-contrast elegant resume with strong typography hierarchy. Great for creative professionals or executives seeking visual authority."
    }
]  
export { templates };