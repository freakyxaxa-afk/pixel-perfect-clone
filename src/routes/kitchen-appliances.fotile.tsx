import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import type { CategoryContent } from "@/lib/category-content";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const data: CategoryContent = {
  slug: "kitchen-appliances/fotile",
  eyebrow: "Kitchen Appliances",
  title: "Fotile",
  subtitle:
    "Award-winning Fotile appliances — refined design, quiet power and thoughtful engineering for the modern kitchen.",
  seoTitle: "Fotile Kitchen Appliances — Wood Lab Islamabad",
  seoDescription:
    "Premium Fotile range hoods, hobs, steam ovens and dishwashers integrated into bespoke Wood Lab kitchens.",
  hero: "/category-images/kitchen-appliances/fotile.jpg",
  introImage: "/category-images/kitchen-appliances/fotile.jpg",
  intro:
    "Fotile is regarded as one of the world's leading premium kitchen appliance brands, holding thousands of patents across ventilation, cooking and dishwashing. Every Fotile product is developed at the brand's own R&D centres and design studios, and the range has won some of the industry's most respected awards — iF, Red Dot and IDEA — for both engineering and industrial design. At Wood Lab, we specify Fotile for clients who want a genuinely refined cooking experience without any visual noise.",
  intro2:
    "The signature Fotile range hood uses side-draft extraction to capture smoke and oil at the source before it reaches face height, which keeps the kitchen air noticeably cleaner and lets the hood run at lower, quieter speeds. Steam ovens, combi-steam ovens and built-in dishwashers extend that same philosophy — precise cooking modes, whisper-quiet operation and touch controls behind clean glass fronts. Materials are consistently premium: full stainless steel bodies, tempered glass, soft-close mechanisms and matte finishes that read as architectural rather than appliance-like. Wood Lab integrates the complete Fotile package into your cabinetry, coordinating power, water and ducting so every unit sits perfectly flush. Homeowners choose Fotile with us for its combination of health-focused engineering, restrained design and long-term reliability — appliances that behave quietly in the background of a beautiful kitchen.",
  styles: [],
  materials: [],
  features: [
    { title: "Side-Draft Range Hoods", description: "Signature side-draft design captures smoke and oil at the source for cleaner air." },
    { title: "Steam & Combi Ovens", description: "Precision steam and combi-steam cooking for healthier, more flavourful results." },
    { title: "Built-in Dishwashers", description: "Fully integrated dishwashers with sanitising cycles and near-silent operation." },
    { title: "Induction & Gas Hobs", description: "Responsive induction and high-efficiency gas hobs with sealed, easy-clean surfaces." },
    { title: "Touch Glass Controls", description: "Tempered black glass fronts with responsive touch controls and clear displays." },
    { title: "Quiet Operation", description: "Optimised motors and airflow keep noise levels remarkably low even at full power." },
    { title: "Smart Sensors", description: "Auto-sensing modes adjust extraction and cooking power to real-time conditions." },
    { title: "Award-Winning Design", description: "iF, Red Dot and IDEA-recognised industrial design across the range." },
    { title: "Seamless Integration", description: "Coordinated and installed as part of your bespoke Wood Lab cabinetry." },
  ],
  gallery: [],
  faqs: [],
};

export const Route = createFileRoute("/kitchen-appliances/fotile")({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
