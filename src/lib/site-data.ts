import kitchen from "@/assets/kitchen-cabinets.jpg";
import wardrobes from "@/assets/wardrobes.jpg";
import doors from "@/assets/wooden-doors.jpg";
import polish from "@/assets/wooden-polish.jpg";
import wallPaint from "@/assets/wall-paint.jpg";
import interiorDesign from "@/assets/interior-designing.jpg";
import office from "@/assets/office-decor.jpg";
import ceiling from "@/assets/false-ceiling.jpg";
import lamination from "@/assets/lamination.jpg";
import mediaWall from "@/assets/media-wall.jpg";
import closets from "@/assets/walk-in-closets.jpg";
import vanities from "@/assets/vanities.jpg";
import renovation from "@/assets/home-renovation.jpg";
import wpc from "@/assets/wpc-panels.jpg";

export const COMPANY = {
  name: "Wood Lab Islamabad (PVT.) LTD",
  shortName: "Wood Lab Islamabad",
  tagline: "Traditional & Modern Interior Solutions",
  phone: "0305 5865757",
  phoneIntl: "923055865757",
  email: "woodlabislamabad@gmail.com",
  rating: "4.2",
  reviewsCount: "27+",
  since: "1990",
  address: [
    "Golra Service Road, Street No 1",
    "near Nazim-ud-din Road",
    "F-11/1, Islamabad",
    "Pakistan",
  ],
  addressLine: "Golra Service Road, Street No 1, near Nazim-ud-din Road, F-11/1 Islamabad",
  facebook:
    "https://www.facebook.com/people/Wood-Lab-Islamabad-Pvt-Ltd/100086234383136/",
  instagram: "https://www.instagram.com/islamabadwoodlab/",
  youtube: "https://www.youtube.com/@woodlabislamabad6397",
  tiktok: "https://www.tiktok.com/@woodlabislamabad8",
  // Canonical Google Maps business listing for Wood Lab Islamabad Pvt.Ltd
  // CID resolved from Google Maps place record (do not change without re-verifying).
  mapCid: "4098202193882672959",
  mapPlaceUrl: "https://maps.google.com/?cid=4098202193882672959",
  mapEmbed:
    "https://www.google.com/maps?q=Wood+Lab+Islamabad+Pvt.Ltd,+Golra+Service+Road,+Street+No+1,+F-11%2F1+Islamabad&z=17&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Wood+Lab+Islamabad+Pvt.Ltd,+Golra+Service+Road,+Street+No+1,+F-11%2F1+Islamabad&destination_cid=4098202193882672959",
  hours: [
    { day: "Wednesday", time: "9 AM – 9 PM" },
    { day: "Thursday", time: "9 AM – 9 PM" },
    { day: "Friday", time: "Closed", closed: true },
    { day: "Saturday", time: "9 AM – 9 PM" },
    { day: "Sunday", time: "9 AM – 9 PM" },
    { day: "Monday", time: "9 AM – 9 PM" },
    { day: "Tuesday", time: "9 AM – 9 PM" },
  ],
};

export type Service = {
  slug: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  benefits: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "kitchen-cabinets",
    title: "Kitchen Cabinets",
    image: kitchen,
    description:
      "Bespoke modular kitchens engineered for beauty and everyday performance, with premium finishes and smart storage.",
    features: ["Handleless modular design", "Soft-close hardware", "Marble & quartz tops"],
    benefits: ["Maximised storage", "Effortless daily use", "Lasting elegance"],
  },
  {
    slug: "wardrobes",
    title: "Wardrobes",
    image: wardrobes,
    description:
      "Modern walk-in and sliding wardrobes with integrated LED lighting and tailored internal organisation.",
    features: ["Integrated LED lighting", "Custom compartments", "Sliding & hinged options"],
    benefits: ["Clutter-free living", "Boutique feel", "Space optimised"],
  },
  {
    slug: "wooden-doors",
    title: "Wooden Doors",
    image: doors,
    description:
      "Premium solid wooden entrance and interior doors crafted with rich grain detail and precise joinery.",
    features: ["Solid hardwood cores", "Custom grain & stains", "Precision hinges & locks"],
    benefits: ["Grand first impression", "Superior durability", "Sound insulation"],
  },
  {
    slug: "wooden-polish",
    title: "Wooden Polish",
    image: polish,
    description:
      "Professional polishing and refinishing that restores and elevates the natural depth of every timber surface.",
    features: ["PU & melamine finishes", "Grain enhancement", "Matte to high-gloss"],
    benefits: ["Renewed surfaces", "Scratch resistance", "Timeless shine"],
  },
  {
    slug: "wall-paint",
    title: "Home Wall Paint & Decorative Work",
    image: wallPaint,
    description:
      "Feature walls, textured finishes and decorative accent lighting that give every room a signature mood.",
    features: ["Texture & stucco work", "Accent lighting", "Premium emulsions"],
    benefits: ["Distinctive interiors", "Rich ambience", "Flawless coverage"],
  },
  {
    slug: "office-decor",
    title: "Office Décor",
    image: office,
    description:
      "Executive office interiors that balance authority and warmth with custom wood paneling and joinery.",
    features: ["Custom paneling", "Executive furniture", "Meeting & reception fit-out"],
    benefits: ["Professional image", "Productive spaces", "Brand-aligned design"],
  },
  {
    slug: "false-ceiling",
    title: "False Ceiling",
    image: ceiling,
    description:
      "Modern gypsum ceilings with concealed cove lighting for depth, drama and a refined overhead finish.",
    features: ["Gypsum & POP designs", "Hidden LED coves", "Acoustic options"],
    benefits: ["Layered ambience", "Concealed wiring", "Elegant proportions"],
  },
  {
    slug: "lamination-furniture",
    title: "Lamination Furniture",
    image: lamination,
    description:
      "Contemporary laminated furniture combining durable surfaces with sleek, modern aesthetics.",
    features: ["High-pressure laminates", "Modular units", "Scratch-proof finishes"],
    benefits: ["Easy maintenance", "Modern look", "Great value"],
  },
  {
    slug: "media-wall",
    title: "Media Wall",
    image: mediaWall,
    description:
      "Luxury TV media walls with wooden panels, ambient backlighting and integrated storage.",
    features: ["Wooden panel backdrop", "Concealed cable management", "Backlit shelving"],
    benefits: ["Statement centrepiece", "Tidy tech setup", "Cinematic feel"],
  },
  {
    slug: "walk-in-closets",
    title: "Walk-in Closets",
    image: closets,
    description:
      "Elegant walk-in dressing rooms designed like a private boutique, tailored to your wardrobe.",
    features: ["Island storage", "Glass display units", "Feature lighting"],
    benefits: ["Luxurious routine", "Organised display", "Personal sanctuary"],
  },
  {
    slug: "vanities",
    title: "Vanities",
    image: vanities,
    description:
      "Luxury bathroom vanities pairing moisture-resistant cabinetry with stone tops and backlit mirrors.",
    features: ["Water-resistant builds", "Stone countertops", "Backlit mirrors"],
    benefits: ["Spa-like feel", "Durable finish", "Ample storage"],
  },
  {
    slug: "home-renovation",
    title: "Home Renovation",
    image: renovation,
    description:
      "Complete home renovations delivered end to end — from structural updates to the final styling.",
    features: ["Full project management", "Space planning", "Turnkey delivery"],
    benefits: ["Transformed home", "Single point of contact", "Increased value"],
  },
  {
    slug: "wpc-wall-panels",
    title: "WPC Wall Panels",
    image: wpc,
    description:
      "Premium WPC decorative wall panels offering the warmth of wood with modern low-maintenance durability.",
    features: ["Fluted WPC panels", "Water & termite resistant", "Quick installation"],
    benefits: ["Modern texture", "Long lifespan", "Low upkeep"],
  },
];

export const SERVICE_NAMES = SERVICES.map((s) => s.title);

export const REVIEWS = [
  {
    name: "Muhammad Ali",
    stars: 5,
    text: "Excellent experience with Wood Lab Islamabad. Professional staff, premium workmanship, and beautiful finishing.",
  },
  {
    name: "Shabnam",
    stars: 5,
    text: "Our home renovation turned out exactly how we imagined. Highly professional team and excellent communication.",
  },
  {
    name: "Muhammad Azaan",
    stars: 5,
    text: "Outstanding craftsmanship and attention to detail. The kitchen and media wall look absolutely stunning.",
  },
  {
    name: "Jiya Kayani",
    stars: 5,
    text: "They transformed our interior beautifully with modern designs and premium quality materials.",
  },
  {
    name: "Yasin Khan",
    stars: 5,
    text: "Excellent quality work, timely delivery, and very cooperative team.",
  },
  {
    name: "Rubah Rahman",
    stars: 5,
    text: "Their designers understood exactly what we wanted. The final result exceeded our expectations.",
  },
  {
    name: "Hell Gaming",
    stars: 5,
    text: "Very professional from consultation to installation. Highly recommended for premium interiors.",
  },
];

export const FAQS = [
  {
    q: "Do you design custom kitchens?",
    a: "Yes. Every kitchen is designed from scratch around your space, lifestyle and budget — from layout and cabinetry to finishes, lighting and countertops.",
  },
  {
    q: "Do you provide complete home renovation?",
    a: "Absolutely. We handle turnkey renovations end to end, from structural work and electrical to woodwork, ceilings, painting and final styling.",
  },
  {
    q: "Can you customize wardrobes?",
    a: "All our wardrobes are fully bespoke — sliding or hinged, with tailored internal organisation, integrated lighting and finishes of your choice.",
  },
  {
    q: "Do you install WPC wall panels?",
    a: "Yes, we supply and professionally install premium WPC decorative wall panels that are water and termite resistant with a long lifespan.",
  },
  {
    q: "How do I book a consultation?",
    a: "Use our Book Consultation page or the WhatsApp button. Share a few details and our team will contact you to schedule a visit.",
  },
  {
    q: "Do you work outside Islamabad?",
    a: "Our workshop is based in Islamabad, and we take on select projects in nearby cities. Contact us with your location and we'll advise.",
  },
  {
    q: "How long does a project take?",
    a: "Timelines depend on scope. A single kitchen or wardrobe typically takes 2–4 weeks, while full renovations are planned with a detailed schedule.",
  },
];

export const STATS = [
  { value: 350, suffix: "+", label: "Projects Completed" },
  { value: 280, suffix: "+", label: "Happy Clients" },
  { value: 4.2, suffix: "★", label: "Google Rating", decimals: 1 },
  { value: 35, suffix: "+", label: "Years of Experience" },
];

export const WHY_CHOOSE = [
  "Premium Materials",
  "Experienced Craftsmen",
  "Luxury Finishing",
  "Modern Designs",
  "Affordable Pricing",
  "Timely Delivery",
  "Professional Team",
  "Attention to Detail",
  "Customer Satisfaction",
];

export function buildWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${COMPANY.phoneIntl}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
