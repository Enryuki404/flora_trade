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
