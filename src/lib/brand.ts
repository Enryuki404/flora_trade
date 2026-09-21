import type { CSSProperties } from "react";

export type BrandId = "floratrade" | "orchidnest" | "orchidloka" | "orchidgardenia";

export type LogoType = "text" | "monogram" | "icon";

export interface BrandConfig {
  id: BrandId;
  name: string;
  domain: string;
  tagline: string;
  colors: {
    primary: string;
    primaryHover: string;
    accent: string;
    light: string;
  };
  logo: {
    type: LogoType;
    text: string;
    subtext: string;
  };
}

export const brands: BrandConfig[] = [
  {
    id: "floratrade",
    name: "FloraTrade",
    domain: "floratrade.id",
    tagline: "NUSANTARA",
    colors: {
      primary: "#0F7A4B",
      primaryHover: "#0D6A41",
      accent: "#34D399",
      light: "#ECFDF5",
    },
    logo: {
      type: "icon",
      text: "🌿",
      subtext: "Nusantara",
    },
  },
  {
    id: "orchidnest",
    name: "OrchidNest",
    domain: "orchidnest.com",
    tagline: "NEST • BREED • BLOOM",
    colors: {
      primary: "#B7791F",
      primaryHover: "#9C6519",
      accent: "#FDE68A",
      light: "#FFFBEB",
    },
    logo: {
      type: "icon",
      text: "🪺",
      subtext: "Orchid Nest",
    },
  },
  {
    id: "orchidloka",
    name: "OrchidLoka",
    domain: "orchidloka.com",
    tagline: "ARCHIVE OF RARE ORCHIDS",
    colors: {
      primary: "#1B3A4B",
      primaryHover: "#152E3C",
      accent: "#E6A87A",
      light: "#F0F4F6",
    },
    logo: {
      type: "monogram",
      text: "◯",
      subtext: "LOKA",
    },
  },
  {
    id: "orchidgardenia",
    name: "OrchidGardenia",
    domain: "orchidgardenia.com",
    tagline: "GARDENIA ATELIER",
    colors: {
      primary: "#9B6B7A",
      primaryHover: "#845C69",
      accent: "#F3D1D8",
      light: "#FDF2F4",
    },
    logo: {
      type: "monogram",
      text: "G",
      subtext: "gardenia",
    },
  },
];

export const brandMap: Record<BrandId, BrandConfig> = {
  floratrade: brands[0],
  orchidnest: brands[1],
  orchidloka: brands[2],
  orchidgardenia: brands[3],
};

export const DEFAULT_BRAND_ID: BrandId = "floratrade";

export function getBrand(id: string): BrandConfig {
  return brandMap[id as BrandId] ?? brandMap[DEFAULT_BRAND_ID];
}

// Helper: CSS variables for theming (SSR safe fallback = DEFAULT)
export function getBrandCSSVars(brand: BrandConfig): CSSProperties {
  return {
    ["--brand-primary" as string]: brand.colors.primary,
    ["--brand-primary-hover" as string]: brand.colors.primaryHover,
    ["--brand-accent" as string]: brand.colors.accent,
    ["--brand-light" as string]: brand.colors.light,
  } as CSSProperties;
}

// Helper: inline styles using brand with 300ms transition — use for CTA, badges, links
export function getBrandStyles(brand: BrandConfig) {
  return {
    primaryBg: { backgroundColor: brand.colors.primary, transition: "background-color 300ms ease, border-color 300ms ease, color 300ms ease" } as CSSProperties,
    primaryText: { color: brand.colors.primary, transition: "color 300ms ease" } as CSSProperties,
    accentText: { color: brand.colors.accent, transition: "color 300ms ease" } as CSSProperties,
    accentBg: { backgroundColor: brand.colors.accent, transition: "background-color 300ms ease" } as CSSProperties,
    lightBg: { backgroundColor: brand.colors.light, transition: "background-color 300ms ease" } as CSSProperties,
    gradient: { background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryHover})`, transition: "background 300ms ease" } as CSSProperties,
  };
}

// Theme-aware CSS vars — brand primary unchanged, surface/bg/text adapt per theme
export function getThemeCSSVars(theme: "light" | "dark"): CSSProperties {
  if (theme === "dark") {
    return {
      ["--bg" as string]: "#0c0a09",
      ["--surface" as string]: "#1c1917",
      ["--text" as string]: "#f5f5f4",
      ["--muted" as string]: "#a8a29e",
      ["--border" as string]: "#292524",
    } as CSSProperties;
  }
  return {
    ["--bg" as string]: "#fefcf8",
    ["--surface" as string]: "#ffffff",
    ["--text" as string]: "#1c1917",
    ["--muted" as string]: "#57534e",
    ["--border" as string]: "#e7e5e4",
  } as CSSProperties;
}

// Utility: hex to rgba for hero overlay
export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
