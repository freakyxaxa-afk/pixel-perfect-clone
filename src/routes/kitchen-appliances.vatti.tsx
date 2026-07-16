import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetail, categoryHead } from "@/components/CategoryDetail";
import type { CategoryContent } from "@/lib/category-content";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const data: CategoryContent = {
  slug: "kitchen-appliances/vatti",
  eyebrow: "Kitchen Appliances",
  title: "Vatti",
  subtitle:
    "Precision-engineered Vatti cooking appliances integrated seamlessly into your bespoke Wood Lab kitchen.",
  seoTitle: "Vatti Kitchen Appliances — Wood Lab Islamabad",
  seoDescription:
    "Premium Vatti built-in hobs, hoods and ovens integrated into bespoke Wood Lab kitchens in Islamabad.",
  hero: "/category-images/kitchen-appliances/vatti.jpg",
  introImage: "/category-images/kitchen-appliances/vatti.jpg",
  intro:
    "Vatti is one of China's most respected kitchen appliance brands, with over three decades of expertise in gas hobs, range hoods and built-in cooking systems. Every Vatti appliance is engineered around a simple idea: high performance cooking should feel effortless and look beautiful. At Wood Lab, we specify Vatti as a premium option for clients who want dependable everyday cooking backed by strong safety systems and clean, architectural styling.",
  intro2:
    "The Vatti range is defined by powerful extraction, uniform flame distribution and durable stainless steel construction. Tempered glass panels, brushed metal accents and slim silhouettes let each unit sit flush with your cabinetry — nothing bulky, nothing dated. Flame-out protection, child locks and thermal cut-offs are standard, and models are tuned for the higher-pressure gas supplies typical in Pakistani homes. We coordinate Vatti hobs, hoods, built-in ovens and sinks as a matched package, then integrate them into the joinery so ducting, gas lines and power are hidden from view. Homeowners choose Vatti with Wood Lab because it pairs serious cooking performance with a clean look, a genuine manufacturer warranty and local after-sales support — a practical premium upgrade that quietly disappears into a beautifully finished kitchen.",
  styles: [],
  materials: [],
  features: [
    { title: "Built-in Gas Hobs", description: "Tempered glass and stainless steel hobs with even flame distribution and easy-clean surfaces." },
    { title: "Powerful Range Hoods", description: "High-suction chimney hoods that clear steam and oil quickly while running quietly." },
    { title: "Built-in Ovens", description: "Multi-function electric ovens with precise temperature control for baking and roasting." },
    { title: "Flame-Out Safety", description: "Automatic gas cut-off if the flame is extinguished — a critical everyday safeguard." },
    { title: "Child Lock & Touch Controls", description: "Intuitive touch panels with child-lock modes for safe family use." },
    { title: "Premium Stainless Finish", description: "Brushed stainless steel and matte black finishes that pair with any cabinetry." },
    { title: "Quiet Operation", description: "Low-noise motors keep the hood powerful without disturbing the room." },
    { title: "Easy Cleaning", description: "Removable filters and smooth glass tops make routine maintenance effortless." },
    { title: "Full Integration", description: "Specified, supplied and installed as part of your bespoke Wood Lab kitchen." },
  ],
  gallery: [],
  faqs: [],
};

export const Route = createFileRoute("/kitchen-appliances/vatti")({
  head: () => categoryHead(data),
  component: () => <CategoryDetail data={data} />,
});
