import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import type { CategoryContent } from "@/lib/category-content";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const data: CategoryContent = {
  slug: "kitchen-appliances/bosch",
  eyebrow: "Kitchen Appliances",
  title: "Bosch",
  subtitle:
    "Iconic German engineering — Bosch built-in appliances integrated seamlessly into a bespoke Wood Lab kitchen.",
  seoTitle: "Bosch Kitchen Appliances — Wood Lab Islamabad",
  seoDescription:
    "Genuine Bosch built-in ovens, hobs, dishwashers and refrigeration integrated into bespoke Wood Lab kitchens.",
  hero: "/category-images/kitchen-appliances/bosch.jpg",
  introImage: "/category-images/kitchen-appliances/bosch.jpg",
  intro:
    "Bosch is one of the most trusted names in home appliances worldwide, backed by more than a century of German engineering and rigorous factory testing. Every Bosch appliance is designed to run reliably for years, with the kind of quiet precision the brand is known for. At Wood Lab, Bosch is our benchmark choice for clients who want a fully European built-in kitchen — coordinated ovens, hobs, dishwashers and refrigeration that all speak the same visual and mechanical language.",
  intro2:
    "The Bosch built-in range covers everything a modern kitchen needs: pyrolytic and multi-function ovens, induction and gas hobs, compact microwaves and combi-steam ovens, near-silent dishwashers and fully integrated fridge-freezers. Materials are consistently premium — stainless steel fronts, tempered glass, soft-close hinges and precision-machined controls that feel substantial to use. Energy efficiency is a Bosch signature: EcoSilence Drive motors, heat-pump drying, ActiveWater management and Class A rated ovens keep running costs low over the life of the appliance. Home Connect enables remote monitoring and diagnostics on selected models, so you can preheat an oven or check a dishwasher cycle from your phone. Wood Lab plans every service run — power, water, drainage and ventilation — at design stage, then installs, levels and commissions each unit to Bosch's specification. The result is a kitchen where the appliances disappear into the architecture, work quietly for years, and are backed by Bosch's global service network.",
  styles: [],
  materials: [],
  features: [
    { title: "Built-in Ovens", description: "Multi-function and pyrolytic self-cleaning ovens with precise temperature control." },
    { title: "Induction & Gas Hobs", description: "Flex induction zones and sealed gas hobs with responsive controls." },
    { title: "Combi-Steam & Microwave", description: "Compact combi-steam ovens and built-in microwaves in matched dimensions." },
    { title: "Silent Dishwashers", description: "EcoSilence Drive dishwashers with near-silent operation and efficient drying." },
    { title: "Integrated Refrigeration", description: "Fully integrated fridge-freezers hidden behind matching cabinetry fronts." },
    { title: "Warming Drawers", description: "Slim warming drawers for plates, food and gentle low-temperature cooking." },
    { title: "Home Connect", description: "Wi-Fi enabled remote control, diagnostics and recipe support on selected models." },
    { title: "Energy Efficient", description: "Class A rated efficiency with heat-pump and EcoSilence technologies." },
    { title: "Global Warranty & Service", description: "Genuine Bosch warranty and worldwide service network, coordinated by Wood Lab." },
  ],
  gallery: [],
  faqs: [],
};

export const Route = createFileRoute("/kitchen-appliances/bosch")({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
