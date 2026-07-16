import { ALL_PRODUCTS } from "@/lib/products";

export type NavLeaf = { label: string; path: string; keywords?: string[] };
export type NavItem = { type: "link"; label: string; path: string; keywords?: string[] };

export const NAV_MENU: NavItem[] = [
  { type: "link", label: "Home", path: "/", keywords: ["home", "start"] },
  { type: "link", label: "Kitchens", path: "/kitchens", keywords: ["kitchens", "modular", "classic", "modern"] },
  { type: "link", label: "Wardrobes", path: "/wardrobes", keywords: ["wardrobes", "closet", "aluminium"] },
  { type: "link", label: "Doors", path: "/doors", keywords: ["doors", "main", "sliding", "engineered"] },
  { type: "link", label: "Interiors", path: "/interiors", keywords: ["interiors", "media walls", "feature walls", "flooring"] },
  { type: "link", label: "Home Furnitures", path: "/home-furnitures", keywords: ["furniture", "home", "laminated", "cushion", "wooden"] },
  { type: "link", label: "Kitchen Appliances", path: "/kitchen-appliances", keywords: ["appliances", "kitchen", "vatti", "fotile", "robam", "bosch"] },
  { type: "link", label: "Kitchen Accessories", path: "/kitchen-accessories", keywords: ["kitchen", "accessories"] },
  { type: "link", label: "Wardrobe Accessories", path: "/wardrobe-accessories", keywords: ["wardrobe", "accessories"] },
  { type: "link", label: "Portfolio", path: "/projects", keywords: ["portfolio", "projects", "gallery", "work"] },
  { type: "link", label: "About Us", path: "/about", keywords: ["about", "us", "company", "story"] },
  { type: "link", label: "Contact Us", path: "/contact", keywords: ["contact", "us", "phone", "email"] },
];

export type SearchEntry = { label: string; path: string; category?: string; haystack: string };

const SUBCATEGORY_ENTRIES: SearchEntry[] = [
  { label: "Modular Kitchen", path: "/kitchens/modular-kitchen", category: "Kitchens", haystack: "modular kitchen kitchens" },
  { label: "Classic Kitchen", path: "/kitchens/classic-kitchen", category: "Kitchens", haystack: "classic kitchen kitchens" },
  { label: "Modern Kitchen", path: "/kitchens/modern-kitchen", category: "Kitchens", haystack: "modern kitchen kitchens" },
  { label: "Wardrobe", path: "/wardrobes/wardrobe", category: "Wardrobes", haystack: "wardrobe fitted bedroom" },
  { label: "Classic Wardrobe", path: "/wardrobes/classic-wardrobe", category: "Wardrobes", haystack: "classic wardrobe" },
  { label: "Aluminium Wardrobe", path: "/wardrobes/aluminium-wardrobe", category: "Wardrobes", haystack: "aluminium aluminum wardrobe" },
  { label: "Walk-in Closet", path: "/wardrobes/walk-in-closet", category: "Wardrobes", haystack: "walk-in closet walkin" },
  { label: "Main Doors", path: "/doors/main-doors", category: "Doors", haystack: "main doors entrance" },
  { label: "Bed & Bathroom Doors", path: "/doors/bed-bathroom-doors", category: "Doors", haystack: "bed bathroom doors" },
  { label: "Engineered Doors", path: "/doors/engineered-doors", category: "Doors", haystack: "engineered doors" },
  { label: "Sliding Doors", path: "/doors/sliding-doors", category: "Doors", haystack: "sliding doors" },
  { label: "Media Walls", path: "/interiors/media-walls", category: "Interiors", haystack: "media walls tv" },
  { label: "Feature Walls", path: "/interiors/feature-walls", category: "Interiors", haystack: "feature walls" },
  { label: "Bed Walls", path: "/interiors/bed-walls", category: "Interiors", haystack: "bed walls headboard" },
  { label: "Wooden Flooring", path: "/interiors/wooden-flooring", category: "Interiors", haystack: "wooden flooring wood floor" },
  { label: "Laminated Furnitures", path: "/home-furnitures/laminated", category: "Home Furnitures", haystack: "laminated furniture" },
  { label: "Cushion Furnitures", path: "/home-furnitures/cushion", category: "Home Furnitures", haystack: "cushion sofa furniture" },
  { label: "Wooden Furnitures", path: "/home-furnitures/wooden", category: "Home Furnitures", haystack: "wooden furniture" },
  { label: "Vatti", path: "/kitchen-appliances/vatti", category: "Kitchen Appliances", haystack: "vatti appliance" },
  { label: "Fotile", path: "/kitchen-appliances/fotile", category: "Kitchen Appliances", haystack: "fotile appliance" },
  { label: "Robam", path: "/kitchen-appliances/robam", category: "Kitchen Appliances", haystack: "robam appliance" },
  { label: "Bosch", path: "/kitchen-appliances/bosch", category: "Kitchen Appliances", haystack: "bosch appliance" },
];

export const SEARCH_INDEX: SearchEntry[] = NAV_MENU.map((item) => ({
  label: item.label,
  path: item.path,
  haystack: [item.label, ...(item.keywords ?? [])].join(" ").toLowerCase(),
})).concat(SUBCATEGORY_ENTRIES).concat([
  { label: "About", path: "/about", haystack: "about company story" },
  { label: "Services", path: "/services", haystack: "services offerings" },
  { label: "Projects", path: "/projects", haystack: "projects portfolio gallery" },
  { label: "FAQ", path: "/faq", haystack: "faq frequently asked questions" },
  { label: "Contact", path: "/contact", haystack: "contact phone email location" },
  { label: "Book Consultation", path: "/book", haystack: "book consultation appointment meeting" },
]).concat(
  ALL_PRODUCTS.map((p) => ({
    label: p.name,
    path: `/design/${p.subcategorySlug}/${p.slug}`,
    category: p.categoryLabel,
    haystack: [p.name, p.categoryLabel, p.parentLabel, p.tagline, p.subcategorySlug.replace(/-/g, " ")]
      .join(" ")
      .toLowerCase(),
  })),
);

export function searchNav(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/);
  return SEARCH_INDEX
    .map((entry) => {
      let score = 0;
      for (const t of tokens) {
        if (entry.haystack.includes(t)) score += 1;
        if (entry.label.toLowerCase().startsWith(t)) score += 2;
      }
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
