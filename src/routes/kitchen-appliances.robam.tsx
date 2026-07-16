import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import type { CategoryContent } from "@/lib/category-content";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const data: CategoryContent = {
  slug: "kitchen-appliances/robam",
  eyebrow: "Kitchen Appliances",
  title: "Robam",
  subtitle:
    "Robam — pioneers of the modern range hood and a benchmark for high-performance built-in cooking.",
  seoTitle: "Robam Kitchen Appliances — Wood Lab Islamabad",
  seoDescription:
    "Robam premium built-in hoods, hobs, steam ovens and dishwashers integrated into bespoke Wood Lab kitchens.",
  hero: "/category-images/kitchen-appliances/robam.jpg",
  introImage: "/category-images/kitchen-appliances/robam.jpg",
  intro:
    "Founded in 1979, Robam is one of the largest and most established kitchen appliance manufacturers in the world, credited with developing the very first Chinese range hood. Today Robam is publicly listed and operates some of the industry's most advanced automated factories, producing millions of premium units a year. At Wood Lab, we recommend Robam to clients who want serious, professional-grade cooking performance in a domestic setting — especially those who cook heavily and need genuine ventilation.",
  intro2:
    "Robam's engineering advantage is most obvious in extraction. The brand's high-airflow hoods, curved oil-collection channels and dual-motor systems are specifically tuned for high-heat, high-oil cooking, and they remove steam and grease faster than almost anything else on the market. Built-in ovens, steam ovens, disinfection cabinets and integrated stove-plus-steamer units extend the same philosophy: sealed cavities, precise electronics and heavy-gauge stainless construction. Finishes are consistently modern — matte black tempered glass, brushed stainless and slim recessed handles — so the appliances integrate cleanly into contemporary cabinetry. Wood Lab plans the ducting, gas and power routes at design stage so every Robam unit sits flush and vents efficiently, and we handle installation, commissioning and warranty registration end-to-end. Homeowners choose Robam with us because it delivers professional-grade extraction and cooking power in a package that still looks tailored and understated inside a bespoke kitchen.",
  styles: [],
  materials: [],
  features: [
    { title: "High-Airflow Range Hoods", description: "Dual-motor extraction engineered for heavy, high-heat cooking styles." },
    { title: "Built-in Gas & Induction Hobs", description: "Precision burners and induction zones with sealed, easy-clean surfaces." },
    { title: "Built-in Ovens", description: "Multi-function electric ovens with even heat distribution for consistent results." },
    { title: "Steam Ovens", description: "Pure-steam and combi-steam cooking for healthier meals and better texture." },
    { title: "Integrated Dishwashers", description: "Full-size and slim dishwashers with sanitising cycles and quiet operation." },
    { title: "Disinfection Cabinets", description: "UV and high-heat sterilisation cabinets built into your cabinetry run." },
    { title: "Heavy-Gauge Stainless Steel", description: "Robust stainless bodies and tempered glass fronts built for daily use." },
    { title: "Touch Controls & Timers", description: "Clear digital displays, delay timers and one-touch cooking programs." },
    { title: "Manufacturer Warranty", description: "Genuine Robam warranty and after-sales support handled through Wood Lab." },
  ],
  gallery: [],
  faqs: [],
};

export const Route = createFileRoute("/kitchen-appliances/robam")({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
