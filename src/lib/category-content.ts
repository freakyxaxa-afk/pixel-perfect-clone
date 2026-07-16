// Central content + curated imagery for every subcategory page.
// Image URLs are stable Unsplash photo IDs chosen to match each category's
// exact visual subject. When a truly matching image cannot be sourced,
// prefer to leave a slot empty rather than mis-cast a shot.

const U = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type StyleCard = { title: string; description: string; image: string };
export type ProcessStep = { title: string; description: string };
export type FAQ = { q: string; a: string };

export type CategoryContent = {
  slug: string;
  eyebrow: string;
  title: string;
  h1?: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  hero: string;
  introImage: string;
  intro: string;
  intro2?: string;
  styles: StyleCard[];
  materials: string[];
  features: { title: string; description: string }[];
  gallery: string[];
  process?: ProcessStep[];
  whyChoose?: string[];
  faqs: FAQ[];
};

type ExactImageSet = {
  hero: string;
  introImage: string;
  styles: Record<string, string>;
  gallery: string[];
};

export const INTERIOR_CATEGORY_IMAGES: Record<string, string> = {
  "interiors/media-walls": "/category-images/interiors/media-walls/hero.jpg",
  "interiors/feature-walls": "/category-images/interiors/feature-walls/hero-photo.jpg",
  "interiors/bed-walls": "/category-images/interiors/bed-walls/hero-photo.jpg",
  "interiors/wooden-flooring": "/category-images/interiors/wooden-flooring/hero-photo.jpg",
};

const exactAsset = (path: string) => `/category-images/${path}`;
const slugifyTitle = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const makeExactSet = (
  slug: string,
  titles: string[],
  extension: "jpg" | "png",
): ExactImageSet => ({
  hero: exactAsset(`${slug}/hero.${extension}`),
  introImage: exactAsset(`${slug}/hero.${extension}`),
  styles: Object.fromEntries(
    titles.map((title) => [
      title,
      exactAsset(`${slug}/${slugifyTitle(title)}.${extension}`),
    ]),
  ),
  gallery: [...titles, ...titles]
    .slice(0, 8)
    .map((title) => exactAsset(`${slug}/${slugifyTitle(title)}.${extension}`)),
});

const DEFAULT_PROCESS: ProcessStep[] = [
  { title: "Consultation", description: "We visit your space, understand your lifestyle and align on scope, style and budget." },
  { title: "Design & Planning", description: "Detailed 3D drawings, layouts and material boards are prepared for your approval." },
  { title: "Material Selection", description: "Handpick premium boards, laminates, veneers, stones and hardware from trusted brands." },
  { title: "Production & Execution", description: "In-house manufacturing at our Islamabad workshop ensures precise, factory-grade quality." },
  { title: "Installation & Finishing", description: "Skilled installers assemble and finish on-site with a strict quality check at every step." },
  { title: "Handover", description: "Final walk-through, cleaning and after-care guidance — ready to enjoy for years to come." },
];

const DEFAULT_WHY = [
  "Complete in-house design, manufacturing and execution",
  "35+ years of craftsmanship in Islamabad",
  "Premium boards, imported hardware and luxury finishes",
  "Bespoke solutions tailored to your space and lifestyle",
  "Transparent pricing with detailed drawings before production",
  "On-time delivery with a dedicated project manager",
];

// ─────────────────────────────────────────────────────────────────
// KITCHENS
// ─────────────────────────────────────────────────────────────────

const modularKitchen: CategoryContent = {
  slug: "kitchens/modular-kitchen",
  eyebrow: "Kitchens",
  title: "Modular Kitchen",
  subtitle: "Precision-engineered modular kitchens with intelligent storage and premium finishes.",
  seoTitle: "Modular Kitchen Design in Islamabad | WoodLab",
  seoDescription:
    "Bespoke modular kitchens in Islamabad and Rawalpindi — soft-close hardware, pull-out storage and tall pantry systems, designed and executed end-to-end by WoodLab.",
  hero: "/category-images/kitchens/modular-kitchen/hero.jpg",
  introImage: "/category-images/kitchens/modular-kitchen/hero.jpg",
  intro:
    "Our modular kitchens combine bespoke cabinetry, imported hardware and premium worktops to deliver a workspace that is beautiful, efficient and built to last. Every module is planned around the way you cook, store and entertain.",
  intro2:
    "From tall pantry columns to magic-corner units and deep pot drawers, every centimetre is engineered for a smooth daily workflow.",
  styles: [
    { title: "L-Shaped Modular Kitchen", description: "Efficient corner layout that opens the room while maximising counter space.", image: U("1556911220-bff31c812dba") },
    { title: "U-Shaped Modular Kitchen", description: "A wrap-around workstation with abundant storage on three sides.", image: U("1556912173-3bb406ef7e77") },
    { title: "Island Modular Kitchen", description: "A central island for prep, seating and social cooking.", image: U("1556909114-f6e7ad7d3136") },
    { title: "Parallel Kitchen", description: "Two facing runs — the classic professional-chef layout.", image: U("1600607687920-4e2a09cf159d") },
    { title: "Straight Kitchen", description: "Single-line kitchens for apartments and open-plan homes.", image: U("1556911220-bff31c812dba") },
    { title: "Peninsula Kitchen", description: "An attached island that anchors the kitchen to the living space.", image: U("1556912167-f556f1f39fdf") },
  ],
  materials: ["High-density MDF cores", "PU & acrylic lacquers", "German soft-close hinges & runners", "Quartz & marble worktops", "Anti-fingerprint laminates", "Recessed LED strips"],
  features: [
    { title: "Soft-Close Everything", description: "Silent, damped drawers and doors on every module." },
    { title: "Magic Corner Units", description: "Reclaim every dead corner with pull-out steel baskets." },
    { title: "Tall Pantry Columns", description: "Floor-to-ceiling storage for groceries and appliances." },
    { title: "Concealed Task Lighting", description: "Recessed LEDs under every wall unit." },
    { title: "Integrated Appliances", description: "Ovens, hobs, hoods and refrigerators built seamlessly in." },
    { title: "Deep Pot Drawers", description: "Heavy-load runners engineered for cookware and utensils." },
  ],
  gallery: [
    U("1560448204-e02f11c3d0e2"),
    U("1560448204-e02f11c3d0e2"),
    U("1556909114-f6e7ad7d3136"),
    U("1584622650111-993a426fbf0a"),
    U("1618221118493-9cfa1a1c00da"),
    U("1560448204-e02f11c3d0e2"),
    U("1556909114-f6e7ad7d3136"),
    U("1560448204-e02f11c3d0e2"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "How long does a modular kitchen take?", a: "Typical projects take 3–5 weeks from approved design to installation, depending on scale and finish." },
    { q: "Do you handle plumbing and electrical?", a: "Yes — our team coordinates all wet points, exhausts and electrical rough-ins as part of the fit-out." },
    { q: "Which board material do you use?", a: "Premium moisture-resistant MDF or 18mm marine-grade ply, finished in PU, acrylic or high-pressure laminate." },
    { q: "Can I mix classic and modern modules?", a: "Absolutely. Many clients blend shaker fronts with handleless base units for a transitional look." },
    { q: "Do you provide a warranty?", a: "Yes — a written warranty covers cabinet structure and hardware for extended peace of mind." },
    { q: "Do you serve Rawalpindi?", a: "We regularly deliver and install across Islamabad and Rawalpindi." },
  ],
};

const classicKitchen: CategoryContent = {
  slug: "kitchens/classic-kitchen",
  eyebrow: "Kitchens",
  title: "Classic Kitchen",
  subtitle: "Timeless shaker and raised-panel kitchens with heritage detailing.",
  seoTitle: "Classic Kitchen Design in Islamabad | WoodLab",
  seoDescription:
    "Traditional shaker, raised-panel and moulded kitchens in Islamabad — hand-finished cabinetry, warm woods and classic hardware by WoodLab.",
  hero: "/category-images/kitchens/classic-kitchen/hero.jpg",
  introImage: "/category-images/kitchens/classic-kitchen/hero.jpg",
  intro:
    "Classic kitchens designed with heritage profiles, decorative mouldings and warm hardwood tones. Every door is crafted for depth, shadow and a truly timeless character.",
  intro2:
    "From painted shaker fronts to raised-panel doors in stained oak, our classic kitchens age gracefully and become the heart of the home.",
  styles: [
    { title: "Shaker Kitchen", description: "Clean five-piece doors with a quiet, enduring elegance.", image: U("1565538810643-b5bdb714032a") },
    { title: "Raised Panel Kitchen", description: "Sculpted centre panels for depth and rich shadow lines.", image: U("1556909172-54557c7e4fb7") },
    { title: "Traditional Wood Kitchen", description: "Warm-stained hardwoods with hand-finished detailing.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Classic White Kitchen", description: "Painted shaker cabinetry with brass or bronze hardware.", image: U("1600585154526-990dced4db0d") },
    { title: "Moulded Cabinet Kitchen", description: "Crown mouldings, plinths and decorative pilasters.", image: U("1584622650111-993a426fbf0a") },
    { title: "Heritage Inspired Kitchen", description: "English country detailing tailored for modern homes.", image: U("1550581190-9c1c48d21d6c") },
  ],
  materials: ["Solid hardwood door frames", "Hand-applied stains & lacquers", "Painted MDF panels", "Brass & bronze hardware", "Marble & granite countertops", "Carved cornices & pilasters"],
  features: [
    { title: "Hand-Finished Detailing", description: "Doors are hand-sanded, stained and lacquered in stages." },
    { title: "Decorative Mouldings", description: "Crown, base and light-rail mouldings for architectural depth." },
    { title: "Classic Hardware", description: "Antique brass, brushed bronze and porcelain knobs." },
    { title: "Warm Wood Tones", description: "Rich oak, walnut and mahogany finishes." },
    { title: "Glass Display Uppers", description: "Mullioned doors with internal display lighting." },
    { title: "Furniture-Style Panels", description: "End panels detailed like fine cabinetry." },
  ],
  gallery: [
    U("1556909172-54557c7e4fb7"),
    U("1565538810643-b5bdb714032a"),
    U("1584622650111-993a426fbf0a"),
    U("1550581190-9c1c48d21d6c"),
    U("1618221118493-9cfa1a1c00da"),
    U("1600585154526-990dced4db0d"),
    U("1556912167-f556f1f39fdf"),
    U("1583845112239-97ef1341b271"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Which timber do you recommend for classic kitchens?", a: "Oak and ash offer beautiful grain for stains, while painted MDF gives a smooth, timeless finish." },
    { q: "Can I get classic detailing on a modern layout?", a: "Yes — transitional kitchens marry shaker doors with modern islands and integrated appliances." },
    { q: "Are painted finishes durable?", a: "Our multi-coat PU paint system is highly durable, washable and resistant to yellowing." },
    { q: "Do you offer glazed display cabinets?", a: "Yes, with mullioned doors and internal LED lighting to showcase glassware and china." },
    { q: "How is a classic kitchen priced?", a: "Pricing depends on wood species, finishing, hardware and detailing — we share a detailed quotation after site measurement." },
  ],
};

const modernKitchen: CategoryContent = {
  slug: "kitchens/modern-kitchen",
  eyebrow: "Kitchens",
  title: "Modern Kitchen",
  subtitle: "Handleless, minimal kitchens engineered for a truly contemporary lifestyle.",
  seoTitle: "Modern Kitchen Design in Islamabad | WoodLab",
  seoDescription:
    "Handleless, matte and high-gloss modern kitchens in Islamabad and Rawalpindi — integrated appliances and clean architectural lines by WoodLab.",
  hero: "/category-images/kitchens/modern-kitchen/hero.jpg",
  introImage: "/category-images/kitchens/modern-kitchen/hero.jpg",
  intro:
    "Clean lines, seamless finishes and intelligent storage — our modern kitchens are designed to feel effortless while performing beautifully every day.",
  intro2:
    "Handleless push-to-open cabinetry, integrated columns and monolithic islands create an architectural, gallery-like atmosphere.",
  styles: [
    { title: "Handleless Kitchen", description: "Push-to-open or J-profile doors with an uninterrupted façade.", image: U("1615529182904-14819c35db37") },
    { title: "Matte Kitchen", description: "Soft-touch matte lacquers in stone, sand and graphite tones.", image: U("1556912173-3bb406ef7e77") },
    { title: "High Gloss Kitchen", description: "Reflective acrylic fronts that amplify light and space.", image: U("1556912173-3bb406ef7e77") },
    { title: "Minimal Kitchen", description: "Reduced palette, hidden storage and monolithic worktops.", image: U("1556912173-3bb406ef7e77") },
    { title: "Integrated Kitchen", description: "Fully built-in appliances behind matching cabinet fronts.", image: U("1556912167-f556f1f39fdf") },
    { title: "Contemporary Island Kitchen", description: "Sculptural islands with waterfall stone worktops.", image: U("1556912167-f556f1f39fdf") },
  ],
  materials: ["Fenix & acrylic lacquers", "Sintered stone worktops", "Anti-fingerprint matte finishes", "Push-to-open tip-on hardware", "Integrated LED profiles", "Aluminium J-profile handles"],
  features: [
    { title: "Push-to-Open Doors", description: "Handle-free façades with tip-on mechanisms." },
    { title: "Integrated Appliances", description: "Column ovens, tall fridges and hidden dishwashers." },
    { title: "Sintered Stone Tops", description: "Ultra-thin, heat and scratch resistant worktops." },
    { title: "Recessed LED Lighting", description: "Concealed strips inside plinths, uppers and shelves." },
    { title: "Monolithic Islands", description: "Waterfall stone or matching lacquer down to the floor." },
    { title: "Hidden Storage Walls", description: "Full-height cabinet walls with jib doors and pantries." },
  ],
  gallery: [
    U("1615529182904-14819c35db37"),
    U("1560448204-e02f11c3d0e2"),
    U("1556912173-3bb406ef7e77"),
    U("1560448204-e02f11c3d0e2"),
    U("1556912167-f556f1f39fdf"),
    U("1560448204-e02f11c3d0e2"),
    U("1556909114-f6e7ad7d3136"),
    U("1584622650111-993a426fbf0a"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Are handleless kitchens practical?", a: "Yes — push-to-open and J-profile systems are engineered for daily use and are extremely durable." },
    { q: "Which stone works best for modern worktops?", a: "Sintered stone and engineered quartz offer the cleanest lines, seamless joins and outstanding durability." },
    { q: "Can I integrate imported appliances?", a: "We work with Bosch, Fotile, Robam, Vatti and other premium brands as part of every build." },
    { q: "Is matte or gloss easier to maintain?", a: "Anti-fingerprint matte lacquers are the easiest — gloss looks stunning but shows marks more readily." },
    { q: "Do you build waterfall islands?", a: "Yes, with mitred stone edges and perfectly matched veining." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// WARDROBES
// ─────────────────────────────────────────────────────────────────

const wardrobe: CategoryContent = {
  slug: "wardrobes/wardrobe",
  eyebrow: "Wardrobes",
  title: "Wardrobe",
  subtitle: "Simple, contemporary fitted wardrobes for everyday bedrooms.",
  seoTitle: "Wardrobe Design in Islamabad | WoodLab",
  seoDescription:
    "Clean, practical fitted wardrobes in Islamabad — floor-to-ceiling storage, hinged and sliding options, tailored to your bedroom by WoodLab.",
  hero: "/category-images/wardrobes/wardrobe/hero.jpg",
  introImage: "/category-images/wardrobes/wardrobe/hero.jpg",
  intro:
    "Everyday wardrobes designed for calm, uncluttered bedrooms. Clean shutters, generous internal storage and finishes that quietly complement any room.",
  intro2:
    "From floor-to-ceiling hinged wardrobes to built-in alcove units, our standard wardrobes are the workhorse of a beautifully organised home.",
  styles: [
    { title: "Fitted Wardrobe", description: "Built-in from wall to wall for a seamless, integrated look.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Hinged Wardrobe", description: "Traditional hinged shutters with quality soft-close hinges.", image: U("1595515106969-1ce29566ff1c") },
    { title: "Floor-to-Ceiling Wardrobe", description: "Full-height storage that uses every inch of the room.", image: U("1583845112239-97ef1341b271") },
    { title: "Built-In Wardrobe", description: "Custom built into alcoves and awkward corners.", image: U("1560448204-e02f11c3d0e2") },
    { title: "Two-Tone Wardrobe", description: "Soft neutral fronts paired with wood-tone accents.", image: U("1600585154526-990dced4db0d") },
    { title: "Bedroom Storage Wall", description: "A full wall of storage integrated with the bed wall.", image: U("1618221118493-9cfa1a1c00da") },
  ],
  materials: ["Moisture-resistant MDF", "PU & PVC-wrapped fronts", "Wood-effect laminates", "Soft-close hinges", "Chrome & aluminium rails", "Fabric drawer inserts"],
  features: [
    { title: "Custom Internal Layouts", description: "Hanging, shelving and drawer zones planned around your wardrobe." },
    { title: "Soft-Close Hinges", description: "Silent, damped shutters for daily calm." },
    { title: "Full-Height Doors", description: "Floor-to-ceiling shutters for maximum storage." },
    { title: "Integrated Handles", description: "Slim recessed profiles for a clean façade." },
    { title: "Concealed Lighting", description: "Optional LED strips inside hanging sections." },
    { title: "Neutral Finishes", description: "Soft whites, greys and warm wood tones." },
  ],
  gallery: [
    U("1595515106969-1ce29566ff1c"),
    U("1616486338812-3dadae4b4ace"),
    U("1583845112239-97ef1341b271"),
    U("1560448204-e02f11c3d0e2"),
    U("1600585154526-990dced4db0d"),
    U("1618221118493-9cfa1a1c00da"),
    U("1616486338812-3dadae4b4ace"),
    U("1615529182904-14819c35db37"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "How is a fitted wardrobe measured?", a: "We visit your bedroom, measure precisely and prepare a drawing that accounts for skirting, cornices and any out-of-square walls." },
    { q: "Hinged vs. sliding — which is better?", a: "Hinged doors give full access and are cost-effective; sliding doors save floor space in tighter rooms." },
    { q: "Can I customise the internal layout?", a: "Yes — every wardrobe is planned around your hanging, folding, shoe and accessory needs." },
    { q: "How long does installation take?", a: "Most fitted wardrobes are installed within 1–2 days once manufactured." },
    { q: "Do you offer wood-look finishes?", a: "Yes, premium wood-effect laminates and PVC-wrapped fronts are available in many shades." },
  ],
};

const classicWardrobe: CategoryContent = {
  slug: "wardrobes/classic-wardrobe",
  eyebrow: "Wardrobes",
  title: "Classic Wardrobe",
  subtitle: "Traditional panelled wardrobes with decorative detailing and warm timber tones.",
  seoTitle: "Classic Wardrobes in Islamabad | WoodLab",
  seoDescription:
    "Timeless classic wardrobes with raised panels, decorative mouldings and premium hardware — designed and built in Islamabad by WoodLab.",
  hero: "/category-images/wardrobes/classic-wardrobe/hero.jpg",
  introImage: "/category-images/wardrobes/classic-wardrobe/hero.jpg",
  intro:
    "Heritage-inspired wardrobes with panelled shutters, decorative profiles and warm hardwood tones. Every piece is crafted to feel like fine furniture built into the room.",
  intro2:
    "Raised panels, carved cornices and antique brass hardware bring depth and character that a plain wardrobe simply cannot match.",
  styles: [
    { title: "Raised Panel Wardrobe", description: "Sculpted centre panels with elegant shadow lines.", image: U("1615529182904-14819c35db37") },
    { title: "Shaker Wardrobe", description: "Five-piece doors with quiet, enduring proportions.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Moulded Wardrobe", description: "Crown mouldings, plinths and decorative trims.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Traditional Wood Wardrobe", description: "Warm-stained oak, walnut or mahogany.", image: U("1595515106969-1ce29566ff1c") },
    { title: "Painted Classic Wardrobe", description: "Multi-coat painted finishes over solid detailing.", image: U("1583845112239-97ef1341b271") },
    { title: "Fluted Panel Wardrobe", description: "Vertical fluted detailing with classic proportions.", image: U("1560448204-e02f11c3d0e2") },
  ],
  materials: ["Solid hardwood frames", "Painted MDF panels", "Hand-applied stains", "Antique brass hardware", "Carved cornices & plinths", "Fabric-lined internals"],
  features: [
    { title: "Panelled Shutters", description: "Raised or recessed centre panels with authentic profiles." },
    { title: "Decorative Mouldings", description: "Crown, base and light-rail mouldings for architectural depth." },
    { title: "Classic Hardware", description: "Antique brass, brushed bronze and porcelain knobs." },
    { title: "Hand-Finished Wood", description: "Multi-stage stain and lacquer applied by hand." },
    { title: "Furniture-Style Ends", description: "End panels detailed to match cabinet-grade furniture." },
    { title: "Fabric-Lined Drawers", description: "Soft fabric drawer bases for delicate garments." },
  ],
  gallery: [
    U("1615529182904-14819c35db37"),
    U("1616486338812-3dadae4b4ace"),
    U("1583845112239-97ef1341b271"),
    U("1560448204-e02f11c3d0e2"),
    U("1595515106969-1ce29566ff1c"),
    U("1616486338812-3dadae4b4ace"),
    U("1600585154526-990dced4db0d"),
    U("1618221118493-9cfa1a1c00da"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Which timber suits a classic wardrobe best?", a: "Oak, walnut and ash all take stain beautifully; painted finishes work equally well on MDF." },
    { q: "Are the mouldings truly hand-crafted?", a: "Yes — mouldings are cut, mitred and applied by our joiners for authentic depth." },
    { q: "Can I mix classic exteriors with modern interiors?", a: "Absolutely. Panelled fronts often conceal fully modern interior organisation." },
    { q: "How is a classic wardrobe finished?", a: "Multiple coats of stain and PU or hand-applied paint, sanded between coats for a furniture-grade result." },
    { q: "Do you offer glazed or mirrored inserts?", a: "Yes — bevelled mirrors and glazed panels are popular options on classic designs." },
  ],
};

const aluminiumWardrobe: CategoryContent = {
  slug: "wardrobes/aluminium-wardrobe",
  eyebrow: "Wardrobes",
  title: "Aluminium Wardrobe",
  subtitle: "Slim aluminium-framed wardrobes with glass shutters and integrated lighting.",
  seoTitle: "Aluminium Wardrobes in Islamabad | WoodLab",
  seoDescription:
    "Modern aluminium-framed sliding and hinged wardrobes with smoked, clear and bronze glass — designed and installed in Islamabad by WoodLab.",
  hero: "/category-images/wardrobes/aluminium-wardrobe/hero.jpg",
  introImage: "/category-images/wardrobes/aluminium-wardrobe/hero.jpg",
  intro:
    "Contemporary aluminium-framed wardrobes engineered for durability, precision and style. Slim metal profiles frame glass or panel inserts for an architectural finish.",
  intro2:
    "Anti-jump rollers, damped sliders and integrated LEDs make everyday use effortless.",
  styles: [
    { title: "Smoked Glass Sliding Wardrobe", description: "Dark tinted glass framed in slim black aluminium.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Clear Glass Wardrobe", description: "Transparent shutters ideal for walk-in style setups.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Bronze Glass Wardrobe", description: "Warm bronze-tinted panels for a luxurious tone.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Black Aluminium Frame Wardrobe", description: "Matte black profiles with an industrial edge.", image: U("1615529182904-14819c35db37") },
    { title: "Mirrored Aluminium Wardrobe", description: "Full-height mirror shutters framed in aluminium.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "LED-Lit Aluminium Wardrobe", description: "Integrated LEDs behind glass for a display effect.", image: U("1560448204-e02f11c3d0e2") },
  ],
  materials: ["Anodised aluminium profiles", "Smoked, clear & bronze glass", "Mirror inserts", "Anti-jump sliding rollers", "Damped soft-close sliders", "LED profile lighting"],
  features: [
    { title: "Slim Aluminium Frames", description: "Minimal profile widths for a refined architectural look." },
    { title: "Anti-Jump Rollers", description: "Precision-engineered sliders that stay on track for years." },
    { title: "Soft-Close Sliding", description: "Damped mechanisms bring doors gently to rest." },
    { title: "Integrated LED Lighting", description: "Backlit shelves and hanging sections behind glass." },
    { title: "Glass Options", description: "Smoked, clear, bronze, frosted or mirror inserts." },
    { title: "Custom Heights", description: "Full floor-to-ceiling engineering with silent tracks." },
  ],
  gallery: [
    U("1616486338812-3dadae4b4ace"),
    U("1618221118493-9cfa1a1c00da"),
    U("1615529182904-14819c35db37"),
    U("1616486338812-3dadae4b4ace"),
    U("1618221118493-9cfa1a1c00da"),
    U("1560448204-e02f11c3d0e2"),
    U("1583845112239-97ef1341b271"),
    U("1616486338812-3dadae4b4ace"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Are aluminium wardrobes durable?", a: "Yes — anodised aluminium profiles resist rust and warping and last for decades with minimal maintenance." },
    { q: "Is the glass safe?", a: "We use toughened safety glass on all sliding and hinged shutters." },
    { q: "Which glass tint is most popular?", a: "Smoked grey and bronze are the two most popular tints in bedrooms." },
    { q: "Do sliding doors take space away from the room?", a: "No — sliding doors run within the wardrobe footprint and actually save floor space." },
    { q: "Can I mix aluminium and wooden fronts?", a: "Yes — mixed façades are a beautiful way to blend warmth with modernity." },
  ],
};

const walkInCloset: CategoryContent = {
  slug: "wardrobes/walk-in-closet",
  eyebrow: "Wardrobes",
  title: "Walk-in Closet",
  subtitle: "Boutique-style dressing rooms designed exclusively around your wardrobe.",
  seoTitle: "Walk-in Closet Design in Islamabad | WoodLab",
  seoDescription:
    "Luxury walk-in closets and dressing rooms in Islamabad — island storage, glass display units, integrated lighting and bespoke internal organisation by WoodLab.",
  hero: "/category-images/wardrobes/walk-in-closet/hero.jpg",
  introImage: "/category-images/wardrobes/walk-in-closet/hero.jpg",
  intro:
    "From island storage to glass display cabinets and feature lighting — every walk-in closet is designed as a private, curated retreat. Enter your dressing room and everything is exactly where it should be.",
  intro2:
    "We plan every zone — hanging, folding, shoes, bags, jewellery and accessories — around the way you actually get dressed.",
  styles: [
    { title: "Island Walk-in Closet", description: "Central dressing island with drawers and a stone top.", image: U("1595515106969-1ce29566ff1c") },
    { title: "Boutique Dressing Room", description: "Open hanging with glass display panels and LEDs.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Glass Cabinet Closet", description: "Glazed cabinets for bags, watches and accessories.", image: U("1615529182904-14819c35db37") },
    { title: "His & Hers Closet", description: "Two symmetrical zones with a shared central island.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Compact Walk-in Closet", description: "Efficient U-shape closets for smaller rooms.", image: U("1560448204-e02f11c3d0e2") },
    { title: "Luxury Boutique Closet", description: "Backlit shelving, mirrored panels and velvet drawers.", image: U("1618221118493-9cfa1a1c00da") },
  ],
  materials: ["Fabric-wrapped drawers", "Backlit glass shelving", "Leather-lined jewellery trays", "Chrome & brass rails", "Stone-topped islands", "Full-height mirrors"],
  features: [
    { title: "Central Dressing Island", description: "Storage below, stone top above — the heart of the closet." },
    { title: "Glass Display Cabinets", description: "Backlit shelves to showcase bags, watches and shoes." },
    { title: "Shoe & Bag Zones", description: "Angled shoe shelves and bag cubbies planned to size." },
    { title: "Jewellery Drawers", description: "Velvet-lined inserts with soft-close runners." },
    { title: "Feature Lighting", description: "Cove and spot lighting for a boutique atmosphere." },
    { title: "Dressing Mirrors", description: "Full-height mirrors integrated into the layout." },
  ],
  gallery: [
    U("1595515106969-1ce29566ff1c"),
    U("1616486338812-3dadae4b4ace"),
    U("1615529182904-14819c35db37"),
    U("1616486338812-3dadae4b4ace"),
    U("1560448204-e02f11c3d0e2"),
    U("1618221118493-9cfa1a1c00da"),
    U("1618221118493-9cfa1a1c00da"),
    U("1583845112239-97ef1341b271"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "How much space do I need for a walk-in closet?", a: "A comfortable U-shape needs about 6–8 ft width; larger dressing rooms benefit from a central island." },
    { q: "Should I go for open or closed storage?", a: "A blend usually works best — open hanging for daily items, glazed cabinets for accessories." },
    { q: "Can you add an island in smaller rooms?", a: "Yes — we design slim islands specifically for compact walk-ins." },
    { q: "Do you offer jewellery and watch storage?", a: "Velvet-lined drawers, watch rolls and lockable inserts are all available." },
    { q: "How is lighting handled?", a: "Layered — ambient cove lighting, spot lighting on displays and integrated LEDs in shelves." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// DOORS
// ─────────────────────────────────────────────────────────────────

const mainDoors: CategoryContent = {
  slug: "doors/main-doors",
  eyebrow: "Doors",
  title: "Main Doors",
  subtitle: "Grand entrance doors crafted in solid hardwood with premium hardware.",
  seoTitle: "Main Entrance Doors in Islamabad | WoodLab",
  seoDescription:
    "Solid hardwood main entrance doors — pivot, double and statement fronts with premium locks. Designed and installed across Islamabad and Rawalpindi.",
  hero: U("1615529182904-14819c35db37"),
  introImage: U("1615529182904-14819c35db37"),
  intro:
    "The main door sets the tone for the entire home. Ours are built in solid hardwood with custom stains, heavy-duty hinges and premium locking systems for a truly grand first impression.",
  intro2:
    "From carved traditional doors to sleek modern pivots, every entrance is engineered to withstand the elements and last for generations.",
  styles: [
    { title: "Solid Wood Main Door", description: "Heavy hardwood construction with hand-carved detailing.", image: U("1615529182904-14819c35db37") },
    { title: "Pivot Entrance Door", description: "Oversized pivots for a dramatic modern entrance.", image: U("1615529182904-14819c35db37") },
    { title: "Double Entrance Door", description: "Symmetrical double doors for grand foyers.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Carved Traditional Door", description: "Hand-carved panels in warm hardwood tones.", image: U("1600585154526-990dced4db0d") },
    { title: "Modern Statement Door", description: "Minimal slab doors with hidden hardware.", image: U("1615529182904-14819c35db37") },
    { title: "Glass & Wood Entrance", description: "Wood with side-light glazing for a bright foyer.", image: U("1584622650111-993a426fbf0a") },
  ],
  materials: ["Solid teak, oak & walnut", "Marine-grade weatherproof PU", "Heavy-duty ball-bearing hinges", "Premium multi-point locks", "Brass & bronze pull handles", "Weather seals"],
  features: [
    { title: "Solid Hardwood Cores", description: "Kiln-dried timber for maximum stability." },
    { title: "Custom Carving", description: "Traditional carvings or minimal grooved detailing." },
    { title: "Multi-Point Locking", description: "High-security locking systems from trusted brands." },
    { title: "Weather Sealed", description: "Weather stripping and marine-grade finishes." },
    { title: "Custom Stains", description: "Any wood tone matched to your façade." },
    { title: "Statement Hardware", description: "Long pull handles in brass, bronze or matt black." },
  ],
  gallery: [
    U("1560448204-e02f11c3d0e2"),
    U("1560448204-e02f11c3d0e2"),
    U("1618221118493-9cfa1a1c00da"),
    U("1600585154526-990dced4db0d"),
    U("1560448204-e02f11c3d0e2"),
    U("1584622650111-993a426fbf0a"),
    U("1550581190-9c1c48d21d6c"),
    U("1583845112239-97ef1341b271"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Which wood is best for a main door?", a: "Teak is the classic choice for its stability and weather resistance; oak and walnut are excellent premium alternatives." },
    { q: "Are your doors weatherproof?", a: "Yes — we finish exterior doors with marine-grade PU and fit weather seals around the frame." },
    { q: "Can I get a pivot door?", a: "Yes, we install heavy-duty pivots up to 2.7 m tall for a dramatic entrance." },
    { q: "What locking systems do you offer?", a: "Multi-point locks, smart digital locks and traditional deadbolts from premium brands." },
    { q: "How long does installation take?", a: "Once manufactured, a main door is typically installed and finished within a day." },
  ],
};

const bedBathDoors: CategoryContent = {
  slug: "doors/bed-bathroom-doors",
  eyebrow: "Doors",
  title: "Bed & Bathroom Doors",
  subtitle: "Refined interior doors tuned for privacy, quiet and everyday elegance.",
  seoTitle: "Bedroom & Bathroom Doors in Islamabad | WoodLab",
  seoDescription:
    "Interior doors for bedrooms and bathrooms — flush, panel and modern designs with silent hinges and moisture-safe finishes. Islamabad & Rawalpindi.",
  hero: U("1615529182904-14819c35db37"),
  introImage: U("1616486338812-3dadae4b4ace"),
  intro:
    "Designed for daily use, our bedroom and bathroom doors combine acoustic comfort, moisture-safe finishes and refined detailing to complement any interior scheme.",
  intro2:
    "From modern flush doors to panelled classics, every door is hung on silent hinges with precise reveals.",
  styles: [
    { title: "Flush Door", description: "Clean minimal doors with a seamless finish.", image: U("1615529182904-14819c35db37") },
    { title: "Panel Door", description: "Classic panelled doors in painted or stained wood.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Modern Interior Door", description: "Full-height slab doors with concealed hinges.", image: U("1615529182904-14819c35db37") },
    { title: "Bathroom Door", description: "Moisture-resistant cores with waterproof finishes.", image: U("1584622650111-993a426fbf0a") },
    { title: "Grooved Slab Door", description: "Minimal reveal grooves for architectural detail.", image: U("1615529182904-14819c35db37") },
    { title: "Veneered Door", description: "Warm veneers with book-matched grain.", image: U("1583845112239-97ef1341b271") },
  ],
  materials: ["Engineered stable cores", "Moisture-resistant edging", "Painted or veneered faces", "Silent soft-close hinges", "Acoustic seals", "Concealed hardware"],
  features: [
    { title: "Silent Soft-Close Hinges", description: "Damped hinges for quiet, gentle closing." },
    { title: "Acoustic Comfort", description: "Solid cores reduce sound transfer between rooms." },
    { title: "Moisture-Safe Finishes", description: "Waterproof edging and finishes for bathrooms." },
    { title: "Concealed Hinges", description: "Clean reveals with hardware hidden from view." },
    { title: "Custom Heights", description: "Standard or full-height doors up to ceiling." },
    { title: "Matching Frames", description: "Frames and architraves finished to match the door." },
  ],
  gallery: [
    U("1560448204-e02f11c3d0e2"),
    U("1616486338812-3dadae4b4ace"),
    U("1560448204-e02f11c3d0e2"),
    U("1584622650111-993a426fbf0a"),
    U("1615529182904-14819c35db37"),
    U("1583845112239-97ef1341b271"),
    U("1600585154526-990dced4db0d"),
    U("1560448204-e02f11c3d0e2"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Are your bathroom doors moisture-safe?", a: "Yes — moisture-resistant cores and waterproof edge sealing extend life in humid environments." },
    { q: "Do you offer full-height doors?", a: "Yes, doors up to ceiling height with concealed hinges for a very modern look." },
    { q: "Can bedroom doors reduce noise?", a: "Solid engineered cores and acoustic seals meaningfully reduce sound transfer." },
    { q: "What finishes are available?", a: "Painted lacquers, wood veneers, laminates and PVC wraps in a wide colour range." },
    { q: "Do you supply frames too?", a: "Yes, we supply and install matching frames, architraves and hardware." },
  ],
};

const engineeredDoors: CategoryContent = {
  slug: "doors/engineered-doors",
  eyebrow: "Doors",
  title: "Engineered Doors",
  subtitle: "Factory-built engineered doors combining stability, silence and premium finishes.",
  seoTitle: "Engineered Doors in Islamabad | WoodLab",
  seoDescription:
    "Engineered flush, veneered and laminated doors built for stability, sound insulation and premium finishing. Islamabad & Rawalpindi.",
  hero: U("1615529182904-14819c35db37"),
  introImage: U("1615529182904-14819c35db37"),
  intro:
    "Precision-built engineered doors pair a stable core with premium veneered surfaces to deliver silence, strength and a flawless finish over the long term.",
  intro2:
    "Because engineered doors are dimensionally stable, they do not warp or swell like solid slabs — perfect for our climate.",
  styles: [
    { title: "Engineered Flush Door", description: "Smooth veneered or laminated flush doors.", image: U("1615529182904-14819c35db37") },
    { title: "Veneered Engineered Door", description: "Warm natural wood veneers over a stable core.", image: U("1615529182904-14819c35db37") },
    { title: "Laminated Engineered Door", description: "Durable HPL surfaces in wood or solid tones.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Grooved Slab Door", description: "Reveal-grooved engineered slabs for detail.", image: U("1615529182904-14819c35db37") },
    { title: "Acoustic Engineered Door", description: "Denser cores for meaningful sound reduction.", image: U("1583845112239-97ef1341b271") },
    { title: "Factory-Finished Door", description: "Painted or stained under controlled conditions.", image: U("1560448204-e02f11c3d0e2") },
  ],
  materials: ["Tubular or solid engineered cores", "Natural wood veneers", "High-pressure laminates", "Edge-banded profiles", "Concealed hinges", "Acoustic seals"],
  features: [
    { title: "Dimensional Stability", description: "Engineered cores resist warping and swelling." },
    { title: "Premium Veneers", description: "Book-matched natural wood surfaces." },
    { title: "Sound Insulation", description: "Denser cores lower noise transfer." },
    { title: "Factory Finished", description: "Painted or lacquered in controlled conditions." },
    { title: "Consistent Quality", description: "Every door produced to identical spec." },
    { title: "Wide Finish Range", description: "Wood tones, solid colours and metallics." },
  ],
  gallery: [
    U("1615529182904-14819c35db37"),
    U("1560448204-e02f11c3d0e2"),
    U("1616486338812-3dadae4b4ace"),
    U("1560448204-e02f11c3d0e2"),
    U("1583845112239-97ef1341b271"),
    U("1560448204-e02f11c3d0e2"),
    U("1584622650111-993a426fbf0a"),
    U("1616486338812-3dadae4b4ace"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Why choose engineered over solid doors?", a: "Engineered doors resist warping, deliver a more consistent finish and often insulate sound better than solid slabs." },
    { q: "Are engineered doors durable?", a: "Yes — the layered core structure is extremely stable and long-lasting when properly finished." },
    { q: "Can they be flush and full-height?", a: "Absolutely — full-height flush engineered doors with concealed hinges are one of our most popular products." },
    { q: "Which finishes are available?", a: "Natural wood veneers, HPL laminates and painted lacquers." },
    { q: "Do you provide factory finishing?", a: "Yes — we can pre-finish doors in our workshop before installation." },
  ],
};

const slidingDoors: CategoryContent = {
  slug: "doors/sliding-doors",
  eyebrow: "Doors",
  title: "Sliding Doors",
  subtitle: "Effortless sliding systems that reclaim space and add architectural drama.",
  seoTitle: "Sliding Doors in Islamabad | WoodLab",
  seoDescription:
    "Sliding room dividers, pocket doors and glass sliders in Islamabad — smooth hardware and premium panels for modern homes and offices by WoodLab.",
  hero: U("1618221118493-9cfa1a1c00da"),
  introImage: U("1616486338812-3dadae4b4ace"),
  intro:
    "From full-height room dividers to concealed cavity systems, our sliding doors glide effortlessly on premium hardware and complement any interior.",
  intro2:
    "Sliding doors save floor space, open up sight lines and create flexible living zones without compromising on privacy.",
  styles: [
    { title: "Glass Sliding Door", description: "Framed or frameless glass panels for bright interiors.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Aluminium Sliding Door", description: "Slim aluminium frames with glass or panel inserts.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Wooden Sliding Door", description: "Solid or veneered wood panels on top-hung tracks.", image: U("1615529182904-14819c35db37") },
    { title: "Pocket Sliding Door", description: "Doors that slide fully into the wall cavity.", image: U("1583845112239-97ef1341b271") },
    { title: "Sliding Room Divider", description: "Full-height dividers for open-plan spaces.", image: U("1560448204-e02f11c3d0e2") },
    { title: "Barn-Style Sliding Door", description: "Exposed track hardware with statement panels.", image: U("1560448204-e02f11c3d0e2") },
  ],
  materials: ["Aluminium & steel tracks", "Anti-jump rollers", "Toughened & frosted glass", "Solid & veneered wood panels", "Soft-close dampers", "Concealed hardware"],
  features: [
    { title: "Smooth Top-Hung Systems", description: "Silent rollers on precision aluminium tracks." },
    { title: "Soft-Close Mechanisms", description: "Damped stops at both ends of the run." },
    { title: "Space Saving", description: "No door swing — perfect for tighter rooms." },
    { title: "Pocket & Cavity Systems", description: "Doors that disappear into the wall." },
    { title: "Panel Options", description: "Wood, laminate, glass, mirror or aluminium inserts." },
    { title: "Custom Heights", description: "Full floor-to-ceiling sliders engineered to fit." },
  ],
  gallery: [
    U("1618221118493-9cfa1a1c00da"),
    U("1616486338812-3dadae4b4ace"),
    U("1615529182904-14819c35db37"),
    U("1583845112239-97ef1341b271"),
    U("1560448204-e02f11c3d0e2"),
    U("1560448204-e02f11c3d0e2"),
    U("1616486338812-3dadae4b4ace"),
    U("1616486338812-3dadae4b4ace"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Do sliding doors seal well?", a: "Our systems include brush and rubber seals for effective privacy and reduced sound transfer." },
    { q: "Can sliders be full-height?", a: "Yes — we engineer full floor-to-ceiling sliding doors up to 3 m tall." },
    { q: "Which is better: cavity or wall-mounted?", a: "Cavity (pocket) doors disappear into the wall for the cleanest look; wall-mounted is easier to retrofit." },
    { q: "Are glass sliders safe?", a: "Yes — we use toughened safety glass on all sliding systems." },
    { q: "Can I get bi-parting sliders?", a: "Yes, two panels sliding from a central point are ideal for wider openings." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// INTERIORS
// ─────────────────────────────────────────────────────────────────

const mediaWalls: CategoryContent = {
  slug: "interiors/media-walls",
  eyebrow: "Interiors",
  title: "Media Walls",
  subtitle: "Statement TV walls with warm wood, backlit shelving and concealed storage.",
  seoTitle: "TV Media Wall Design in Islamabad | WoodLab",
  seoDescription:
    "Luxury TV media walls in Islamabad — wooden panels, floating units and concealed cable management. Designed and installed by WoodLab.",
  hero: U("1615529182904-14819c35db37"),
  introImage: U("1600585154526-990dced4db0d"),
  intro:
    "Bespoke media walls combining warm wooden panels, backlit shelving and concealed cable management to turn any living room into a cinematic experience.",
  intro2:
    "Every wall is drawn full-height, with hidden power routing, integrated soundbar cavities and floating storage.",
  styles: [
    { title: "Wooden Panel Media Wall", description: "Warm veneered panels framing the TV.", image: U("1615529182904-14819c35db37") },
    { title: "Floating TV Unit", description: "Wall-mounted units for a light, floating look.", image: U("1600585154526-990dced4db0d") },
    { title: "Marble-Look Media Wall", description: "Stone or porcelain slabs with LED accents.", image: U("1550581190-9c1c48d21d6c") },
    { title: "Fluted Panel Media Wall", description: "Vertical fluted timber for texture and rhythm.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Integrated Shelving Wall", description: "Open shelves and closed storage combined.", image: U("1584622650111-993a426fbf0a") },
    { title: "Fireplace Media Wall", description: "Electric fireplace + TV in one architectural feature.", image: U("1615529182904-14819c35db37") },
  ],
  materials: ["Natural wood veneers", "Fluted timber panels", "Porcelain slab cladding", "Backlit LED profiles", "Integrated soundbar cavities", "Concealed cable trunking"],
  features: [
    { title: "Concealed Cable Management", description: "All wiring routed inside the wall assembly." },
    { title: "Backlit Shelves", description: "LED strips wash the wall behind display shelves." },
    { title: "Wooden Panel Backdrop", description: "Warm veneer or fluted timber framing the TV." },
    { title: "Integrated Storage", description: "Closed cabinets for devices, open shelves for décor." },
    { title: "Soundbar Integration", description: "Cavities and grilles built in from day one." },
    { title: "Full-Height Design", description: "Floor-to-ceiling for a truly architectural feel." },
  ],
  gallery: [
    U("1615529182904-14819c35db37"),
    U("1600585154526-990dced4db0d"),
    U("1550581190-9c1c48d21d6c"),
    U("1618221118493-9cfa1a1c00da"),
    U("1584622650111-993a426fbf0a"),
    U("1560448204-e02f11c3d0e2"),
    U("1616486338812-3dadae4b4ace"),
    U("1583845112239-97ef1341b271"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Can you conceal all cables?", a: "Yes — power and AV cabling is routed inside the wall assembly, exiting exactly where needed." },
    { q: "Do you integrate soundbars?", a: "We build in soundbar cavities and grilles to keep the look clean while preserving audio quality." },
    { q: "Can I have a fireplace and TV together?", a: "Yes — electric fireplaces integrated below or beside the TV are a very popular option." },
    { q: "How long does installation take?", a: "A media wall typically installs in 3–5 days after manufacturing." },
    { q: "Which finishes work best?", a: "Warm veneers and fluted timber create depth; stone slabs give a bold, luxurious feel." },
  ],
};

const featureWalls: CategoryContent = {
  slug: "interiors/feature-walls",
  eyebrow: "Interiors",
  title: "Feature Walls",
  subtitle: "Signature walls that shape the mood of an entire room.",
  seoTitle: "Feature Wall Design in Islamabad | WoodLab",
  seoDescription:
    "Fluted wood, stone-look and decorative feature walls in Islamabad — designed and installed by WoodLab for luxury homes and offices.",
  hero: "/category-images/interiors/feature-walls/hero-photo.jpg",
  introImage: U("1550581190-9c1c48d21d6c"),
  intro:
    "From fluted timber and stone to sculpted plaster, our feature walls create depth, texture and a distinctive focal point in any space.",
  intro2:
    "Feature walls transform corridors, living rooms and headboard walls without a full renovation.",
  styles: [
    { title: "Fluted Wooden Wall", description: "Vertical fluted timber panels for warm rhythm.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Decorative Panel Wall", description: "Framed panels with mouldings and paint.", image: U("1550581190-9c1c48d21d6c") },
    { title: "Stone Texture Wall", description: "Porcelain or natural stone slab feature walls.", image: U("1600585154526-990dced4db0d") },
    { title: "Slatted Wood Wall", description: "Spaced timber slats with a linear rhythm.", image: U("1615529182904-14819c35db37") },
    { title: "Backlit Feature Wall", description: "Panels with backlit LED profiles.", image: U("1584622650111-993a426fbf0a") },
    { title: "Textured Plaster Wall", description: "Hand-applied plaster for a soft sculptural feel.", image: U("1616486338812-3dadae4b4ace") },
  ],
  materials: ["Fluted timber panels", "MDF panelling & mouldings", "Porcelain slab cladding", "WPC decorative panels", "LED accent lighting", "Textured plasters"],
  features: [
    { title: "Custom Scale & Profiles", description: "Panel sizes and profiles drawn for your space." },
    { title: "Backlit Accent Detailing", description: "Concealed LEDs behind panels or reveals." },
    { title: "Warm Timber Tones", description: "Real wood veneers in oak, walnut and teak tones." },
    { title: "Textured Finishes", description: "Fluted, ribbed, textured plaster or stone." },
    { title: "Architectural Framing", description: "Mouldings and shadow gaps create depth." },
    { title: "Full-Height Impact", description: "Floor-to-ceiling feature walls for maximum drama." },
  ],
  gallery: [
    U("1618221118493-9cfa1a1c00da"),
    U("1550581190-9c1c48d21d6c"),
    U("1600585154526-990dced4db0d"),
    U("1615529182904-14819c35db37"),
    U("1584622650111-993a426fbf0a"),
    U("1560448204-e02f11c3d0e2"),
    U("1616486338812-3dadae4b4ace"),
    U("1583845112239-97ef1341b271"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Which room suits a feature wall best?", a: "Living rooms, entrances, bedrooms and offices — anywhere a focal point elevates the space." },
    { q: "Can I combine wood and stone?", a: "Yes, mixed-material feature walls are one of our most requested designs." },
    { q: "Are fluted panels durable?", a: "Very — we use engineered timber panels finished with a hard-wearing PU lacquer." },
    { q: "Can I add LED lighting?", a: "Yes, we route power and integrate LED profiles into the panels." },
    { q: "How long does installation take?", a: "Most feature walls install within 2–3 days after manufacturing." },
  ],
};

const bedWalls: CategoryContent = {
  slug: "interiors/bed-walls",
  eyebrow: "Interiors",
  title: "Bed Walls",
  subtitle: "Sculpted bed walls that anchor the bedroom in quiet luxury.",
  seoTitle: "Bed Wall & Headboard Design in Islamabad | WoodLab",
  seoDescription:
    "Full-height bed walls and upholstered headboards with panelling, wood and integrated lighting — Islamabad by WoodLab.",
  hero: "/category-images/interiors/bed-walls/hero-photo.jpg",
  introImage: U("1616486338812-3dadae4b4ace"),
  intro:
    "Full-height bed walls combining panelled joinery, upholstered accents and integrated lighting to create a truly hotel-grade bedroom moment.",
  intro2:
    "Extended headboards, bedside niches and concealed reading lights turn the wall behind the bed into the room's defining feature.",
  styles: [
    { title: "Upholstered Bed Wall", description: "Fabric-panelled headboard walls with quilted detail.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Wooden Headboard Wall", description: "Full-height veneered panels behind the bed.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Fluted Bed Wall", description: "Vertical fluted timber for rhythm and warmth.", image: U("1615529182904-14819c35db37") },
    { title: "Panelled Headboard Wall", description: "Framed panels with mouldings and paint.", image: U("1583845112239-97ef1341b271") },
    { title: "Extended Headboard Wall", description: "Continuous wall with integrated bedside tables.", image: U("1600585154526-990dced4db0d") },
    { title: "Backlit Bed Wall", description: "Concealed LEDs for a soft ambient glow.", image: U("1616486338812-3dadae4b4ace") },
  ],
  materials: ["Upholstered fabric panels", "Timber veneers", "Fluted MDF panels", "Concealed LED profiles", "Integrated bedside lighting", "Mouldings & trims"],
  features: [
    { title: "Integrated Bedside Lighting", description: "Wall-mounted reading lights built into the panels." },
    { title: "Concealed Niches", description: "Hidden storage or display niches within the wall." },
    { title: "Upholstered Inserts", description: "Fabric or leather panels for softness at the headboard." },
    { title: "Panelled Timber Joinery", description: "Full-height veneer or paint-grade panels." },
    { title: "Backlit Reveals", description: "Concealed LEDs wash the wall for a soft ambience." },
    { title: "Bespoke Proportions", description: "Wall scaled precisely to your bed size and ceiling." },
  ],
  gallery: [
    U("1618221118493-9cfa1a1c00da"),
    U("1616486338812-3dadae4b4ace"),
    U("1615529182904-14819c35db37"),
    U("1583845112239-97ef1341b271"),
    U("1600585154526-990dced4db0d"),
    U("1616486338812-3dadae4b4ace"),
    U("1550581190-9c1c48d21d6c"),
    U("1560448204-e02f11c3d0e2"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Do I need to replace my bed?", a: "No — we design the wall around your existing bed, though a matching bed is available if you'd like a full set." },
    { q: "Can lighting be integrated?", a: "Yes — reading lights, backlit reveals and cove lighting are all popular options." },
    { q: "Which finish is best?", a: "Warm wood veneers, fluted timber and upholstered panels each create a different mood; we help you pick the right one." },
    { q: "How long does it take?", a: "Most bed walls install in 3–4 days after manufacturing." },
    { q: "Can bedside tables be built in?", a: "Yes — extended headboard walls with integrated bedside tables are one of our signature designs." },
  ],
};

const woodenFlooring: CategoryContent = {
  slug: "interiors/wooden-flooring",
  eyebrow: "Interiors",
  title: "Wooden Flooring",
  subtitle: "Premium engineered and solid wood floors for warm, timeless interiors.",
  seoTitle: "Wooden Flooring in Islamabad | WoodLab",
  seoDescription:
    "Engineered, solid, herringbone and chevron wooden flooring in Islamabad — supplied and installed by WoodLab.",
  hero: "/category-images/interiors/wooden-flooring/hero-photo.jpg",
  introImage: U("1585128792020-803d29415281"),
  intro:
    "Beautiful, hard-wearing wooden floors that bring warmth and character to any interior. From wide oak planks to intricate herringbone, our floors are supplied and expertly installed.",
  intro2:
    "Engineered constructions are stable in our climate, while solid wood remains the ultimate premium choice for signature rooms.",
  styles: [
    { title: "Engineered Wood Flooring", description: "Multi-layer stability with a real wood top layer.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Herringbone Flooring", description: "Classic angled pattern with timeless appeal.", image: U("1585128792020-803d29415281") },
    { title: "Chevron Flooring", description: "V-shaped continuous lines for a couture look.", image: U("1550581190-9c1c48d21d6c") },
    { title: "Wide Plank Flooring", description: "Wide, long planks for a modern minimal look.", image: U("1618221118493-9cfa1a1c00da") },
    { title: "Solid Wood Flooring", description: "Pure timber planks for maximum authenticity.", image: U("1615529182904-14819c35db37") },
    { title: "Natural Oak Flooring", description: "Classic light oak in matte natural finish.", image: U("1600585154526-990dced4db0d") },
  ],
  materials: ["Engineered oak & walnut", "Solid hardwood planks", "UV-cured lacquers", "Natural oiled finishes", "Acoustic underlays", "Precision-milled tongue & groove"],
  features: [
    { title: "Real Wood Top Layer", description: "Genuine timber surface, not printed." },
    { title: "Stable Engineered Cores", description: "Multi-layer plywood cores prevent movement." },
    { title: "Wide & Long Planks", description: "Fewer joins, a calmer look." },
    { title: "Herringbone & Chevron", description: "Traditional patterns cut with precision." },
    { title: "Acoustic Underlay", description: "Reduces footfall sound and adds comfort." },
    { title: "Refinishable Surface", description: "Can be sanded and re-lacquered to renew." },
  ],
  gallery: [
    U("1616486338812-3dadae4b4ace"),
    U("1560448204-e02f11c3d0e2"),
    U("1550581190-9c1c48d21d6c"),
    U("1618221118493-9cfa1a1c00da"),
    U("1615529182904-14819c35db37"),
    U("1600585154526-990dced4db0d"),
    U("1584622650111-993a426fbf0a"),
    U("1583845112239-97ef1341b271"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Engineered or solid — which should I pick?", a: "Engineered wood is more stable in our climate and typically the better choice; solid wood is the ultimate premium option." },
    { q: "Can I use wooden flooring in kitchens?", a: "Yes with a hard-wearing lacquer, though we recommend care around wet zones." },
    { q: "Is herringbone installation more expensive?", a: "Yes — herringbone and chevron take longer to install and cost more, but the visual impact is exceptional." },
    { q: "Do you handle sub-floor preparation?", a: "Yes — we assess, level and prepare the sub-floor as part of the installation." },
    { q: "Can wooden floors be refinished?", a: "Solid and thick-veneer engineered floors can be sanded and re-lacquered several times over their life." },
  ],
};

// ─────────────────────────────────────────────────────────────────
// HOME FURNITURES
// ─────────────────────────────────────────────────────────────────

const laminatedFurniture: CategoryContent = {
  slug: "home-furnitures/laminated",
  eyebrow: "Home Furnitures",
  title: "Laminated Furnitures",
  subtitle: "Contemporary custom furniture in high-pressure laminates.",
  seoTitle: "Laminated Furniture Design in Islamabad | WoodLab",
  seoDescription:
    "Laminated TV units, storage, desks and beds — durable, contemporary custom furniture built by WoodLab in Islamabad.",
  hero: "/category-images/home-furnitures/laminated/hero.png",
  introImage: "/category-images/home-furnitures/laminated/hero.png",
  intro:
    "Laminated furniture pairs a stable engineered core with a durable high-pressure laminate surface. The result is contemporary, easy-care furniture available in an enormous range of colours and textures.",
  intro2:
    "Perfect for TV units, wardrobes, home offices and children's rooms.",
  styles: [
    { title: "Laminated TV Unit", description: "Wall-mounted or free-standing media units.", image: U("1615529182904-14819c35db37") },
    { title: "Laminated Storage Cabinet", description: "Tall storage units with laminated fronts.", image: U("1583845112239-97ef1341b271") },
    { title: "Laminated Study Desk", description: "Home office desks with cable management.", image: U("1560448204-e02f11c3d0e2") },
    { title: "Laminated Bed", description: "Platform beds with integrated storage.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Kids' Room Furniture", description: "Durable, easy-to-clean laminated furniture.", image: U("1616486338812-3dadae4b4ace") },
    { title: "Modular Storage Wall", description: "Full-wall laminated storage systems.", image: U("1618221118493-9cfa1a1c00da") },
  ],
  materials: ["High-pressure laminates", "Moisture-resistant MDF cores", "Wood-effect & solid tones", "Edge-banded profiles", "Soft-close hardware", "Metal leg options"],
  features: [
    { title: "Scratch-Proof Finishes", description: "HPL surfaces resist daily wear and cleaning." },
    { title: "Huge Colour Range", description: "Solid tones, wood effects, stone effects and textures." },
    { title: "Easy Maintenance", description: "Wipe-clean surfaces stay looking new." },
    { title: "Modular Units", description: "Combine standard modules into custom layouts." },
    { title: "Great Value", description: "Premium look at a very sensible cost." },
    { title: "Consistent Quality", description: "Factory-finished for a reliable, uniform result." },
  ],
  gallery: [
    U("1615529182904-14819c35db37"),
    U("1583845112239-97ef1341b271"),
    U("1560448204-e02f11c3d0e2"),
    U("1616486338812-3dadae4b4ace"),
    U("1616486338812-3dadae4b4ace"),
    U("1618221118493-9cfa1a1c00da"),
    U("1600585154526-990dced4db0d"),
    U("1584622650111-993a426fbf0a"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "How durable are laminates?", a: "HPL laminates are highly scratch and stain resistant and hold their finish for many years." },
    { q: "Can laminates look like wood?", a: "Yes — modern wood-effect laminates are extremely realistic with tactile textures." },
    { q: "Are laminated pieces water-resistant?", a: "Surfaces are water-resistant; cores are moisture-resistant. We recommend not soaking edges." },
    { q: "Are they good for kids' rooms?", a: "Yes — easy to clean, hard-wearing and available in bright colours." },
    { q: "How is laminated furniture priced?", a: "Very competitively vs veneer or solid wood, with a huge range of finishes to choose from." },
  ],
};

const cushionFurniture: CategoryContent = {
  slug: "home-furnitures/cushion",
  eyebrow: "Home Furnitures",
  title: "Cushion Furnitures",
  subtitle: "Deeply comfortable upholstered pieces tailored to your home.",
  seoTitle: "Sofa & Upholstered Furniture in Islamabad | WoodLab",
  seoDescription:
    "Custom sofas, sectionals, lounge chairs and upholstered beds in Islamabad — hardwood frames and premium fabrics by WoodLab.",
  hero: "/category-images/home-furnitures/cushion/hero.png",
  introImage: "/category-images/home-furnitures/cushion/hero.png",
  intro:
    "Custom sofas, sectionals and lounge chairs — hand-built frames, high-resilience foams and premium fabrics deliver comfort you can feel.",
  intro2:
    "Choose the shape, size, fabric and firmness — every cushion piece is made to order in our Islamabad workshop.",
  styles: [
    { title: "Sectional Sofa", description: "Modular L or U-shape sectionals sized to your room.", image: U("1555041469-a586c61ea9bc") },
    { title: "Three-Seater Sofa", description: "Classic three-seater in your choice of fabric.", image: U("1540574163026-643ea20ade25") },
    { title: "Lounge Chair", description: "Statement lounge chairs with deep comfort.", image: U("1540574163026-643ea20ade25") },
    { title: "Upholstered Bed", description: "Fabric or leather beds with quilted headboards.", image: U("1505693416388-ac5ce068fe85") },
    { title: "Ottoman & Bench", description: "Upholstered benches and ottomans in matching fabrics.", image: U("1493663284031-b7e3aefcae8e") },
    { title: "Accent Armchair", description: "Statement occasional chairs in bold fabrics.", image: U("1550581190-9c1c48d21d6c") },
  ],
  materials: ["Kiln-dried hardwood frames", "High-resilience foam", "Feather-fibre toppers", "Premium linens, velvets & leathers", "Reinforced webbing", "Metal-glide sofa beds"],
  features: [
    { title: "Hardwood Inner Frames", description: "Solid frames engineered to last decades." },
    { title: "High-Resilience Foam", description: "Comfort that keeps its shape over years of use." },
    { title: "Custom Fabrics", description: "Linens, velvets, cottons and leathers — your choice." },
    { title: "Modular Layouts", description: "Sectional combinations sized to your room." },
    { title: "Removable Covers", description: "Zip-off covers on many designs for easy care." },
    { title: "Made to Measure", description: "Dimensions tailored to your exact plan." },
  ],
  gallery: [
    U("1555041469-a586c61ea9bc"),
    U("1540574163026-643ea20ade25"),
    U("1560448204-e02f11c3d0e2"),
    U("1505693416388-ac5ce068fe85"),
    U("1493663284031-b7e3aefcae8e"),
    U("1550581190-9c1c48d21d6c"),
    U("1519710164239-da123dc03ef4"),
    U("1524758631624-e2822e304c36"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Can I choose the exact size?", a: "Yes — every cushion piece is made to the dimensions of your room." },
    { q: "Which fabric is best?", a: "Linen for a soft casual look, velvet for luxury, leather for durability. We help you pick and can order swatches." },
    { q: "How firm can the seats be?", a: "You choose — soft, medium or firm foam densities are available." },
    { q: "Do you offer removable covers?", a: "Many of our designs come with zip-off, washable covers." },
    { q: "How long does a custom sofa take?", a: "Typically 4–6 weeks depending on fabric availability and complexity." },
  ],
};

const woodenFurniture: CategoryContent = {
  slug: "home-furnitures/wooden",
  eyebrow: "Home Furnitures",
  title: "Wooden Furnitures",
  subtitle: "Solid and veneered wood furniture where craftsmanship takes centre stage.",
  seoTitle: "Solid Wood Furniture in Islamabad | WoodLab",
  seoDescription:
    "Solid and veneered wooden furniture — dining tables, beds, consoles and cabinets crafted in Islamabad by WoodLab.",
  hero: "/category-images/home-furnitures/wooden/hero.png",
  introImage: "/category-images/home-furnitures/wooden/hero.png",
  intro:
    "Wooden furniture where the timber is the hero — solid and veneered pieces built the traditional way and finished to bring out the natural grain.",
  intro2:
    "From dining tables to consoles, cabinets and beds — every piece is joined, sanded and finished by hand.",
  styles: [
    { title: "Wooden Dining Table", description: "Solid hardwood tables in oak, walnut and teak.", image: U("1493663284031-b7e3aefcae8e") },
    { title: "Wooden Bed", description: "Solid wood beds with hand-detailed headboards.", image: U("1524758631624-e2822e304c36") },
    { title: "Wooden Console Table", description: "Statement consoles for hallways and living rooms.", image: U("1519710164239-da123dc03ef4") },
    { title: "Wooden Cabinet", description: "Storage cabinets with hand-finished wood fronts.", image: U("1560448204-e02f11c3d0e2") },
    { title: "Wooden Side Table", description: "Bedside and occasional tables in solid wood.", image: U("1540574163026-643ea20ade25") },
    { title: "Wooden Sideboard", description: "Sideboards and buffets with grain-matched fronts.", image: U("1555041469-a586c61ea9bc") },
  ],
  materials: ["Solid oak, walnut, teak & ash", "Natural wood veneers", "Hand-applied stains", "PU & natural oil finishes", "Solid brass hardware", "Traditional joinery"],
  features: [
    { title: "Solid Timber Construction", description: "Real wood, not printed or foil-wrapped." },
    { title: "Traditional Joinery", description: "Dowels, dominoes and mortise-and-tenon joints." },
    { title: "Hand-Applied Finishes", description: "Multi-stage stain and lacquer for depth." },
    { title: "Natural Grain Detail", description: "Book-matched veneers and grain-matched fronts." },
    { title: "Premium Hardware", description: "Brass and bronze handles and hinges." },
    { title: "Made to Order", description: "Custom sizes, finishes and detailing." },
  ],
  gallery: [
    U("1493663284031-b7e3aefcae8e"),
    U("1524758631624-e2822e304c36"),
    U("1519710164239-da123dc03ef4"),
    U("1560448204-e02f11c3d0e2"),
    U("1540574163026-643ea20ade25"),
    U("1555041469-a586c61ea9bc"),
    U("1505693416388-ac5ce068fe85"),
    U("1550581190-9c1c48d21d6c"),
  ],
  process: DEFAULT_PROCESS,
  whyChoose: DEFAULT_WHY,
  faqs: [
    { q: "Which wood should I choose for a dining table?", a: "Oak and walnut are the most popular; teak is exceptional for its stability and warmth." },
    { q: "Is solid wood or veneer better?", a: "Solid wood is the ultimate premium option; veneers over stable cores can be more practical for large panels." },
    { q: "Are your finishes food-safe?", a: "Yes — dining tables receive a food-safe lacquer or a natural oil finish." },
    { q: "How long does a custom piece take?", a: "Typically 4–8 weeks depending on complexity and finishing." },
    { q: "Do you match existing furniture?", a: "Yes — we stain and finish samples until we match your existing pieces closely." },
  ],
};

// ─────────────────────────────────────────────────────────────────

const EXACT_IMAGE_SETS: Record<string, ExactImageSet> = {
  "kitchens/modular-kitchen": makeExactSet("kitchens/modular-kitchen", ["L-Shaped Modular Kitchen", "U-Shaped Modular Kitchen", "Island Modular Kitchen", "Parallel Kitchen", "Straight Kitchen", "Peninsula Kitchen"], "jpg"),
  "kitchens/classic-kitchen": makeExactSet("kitchens/classic-kitchen", ["Shaker Kitchen", "Raised Panel Kitchen", "Traditional Wood Kitchen", "Classic White Kitchen", "Moulded Cabinet Kitchen", "Heritage Inspired Kitchen"], "jpg"),
  "kitchens/modern-kitchen": makeExactSet("kitchens/modern-kitchen", ["Handleless Kitchen", "Matte Kitchen", "High Gloss Kitchen", "Minimal Kitchen", "Integrated Kitchen", "Contemporary Island Kitchen"], "jpg"),
  "wardrobes/wardrobe": makeExactSet("wardrobes/wardrobe", ["Fitted Wardrobe", "Hinged Wardrobe", "Floor-to-Ceiling Wardrobe", "Built-In Wardrobe", "Two-Tone Wardrobe", "Bedroom Storage Wall"], "jpg"),
  "wardrobes/classic-wardrobe": makeExactSet("wardrobes/classic-wardrobe", ["Raised Panel Wardrobe", "Shaker Wardrobe", "Moulded Wardrobe", "Traditional Wood Wardrobe", "Painted Classic Wardrobe", "Fluted Panel Wardrobe"], "jpg"),
  "wardrobes/aluminium-wardrobe": makeExactSet("wardrobes/aluminium-wardrobe", ["Smoked Glass Sliding Wardrobe", "Clear Glass Wardrobe", "Bronze Glass Wardrobe", "Black Aluminium Frame Wardrobe", "Mirrored Aluminium Wardrobe", "LED-Lit Aluminium Wardrobe"], "jpg"),
  "wardrobes/walk-in-closet": makeExactSet("wardrobes/walk-in-closet", ["Island Walk-in Closet", "Boutique Dressing Room", "Glass Cabinet Closet", "His & Hers Closet", "Compact Walk-in Closet", "Luxury Boutique Closet"], "jpg"),
  "doors/main-doors": makeExactSet("doors/main-doors", ["Solid Wood Main Door", "Pivot Entrance Door", "Double Entrance Door", "Carved Traditional Door", "Modern Statement Door", "Glass & Wood Entrance"], "jpg"),
  "doors/bed-bathroom-doors": makeExactSet("doors/bed-bathroom-doors", ["Flush Door", "Panel Door", "Modern Interior Door", "Bathroom Door", "Grooved Slab Door", "Veneered Door"], "jpg"),
  "doors/engineered-doors": makeExactSet("doors/engineered-doors", ["Engineered Flush Door", "Veneered Engineered Door", "Laminated Engineered Door", "Grooved Slab Door", "Acoustic Engineered Door", "Factory-Finished Door"], "jpg"),
  "doors/sliding-doors": makeExactSet("doors/sliding-doors", ["Glass Sliding Door", "Aluminium Sliding Door", "Wooden Sliding Door", "Pocket Sliding Door", "Sliding Room Divider", "Barn-Style Sliding Door"], "jpg"),
  "interiors/media-walls": { ...makeExactSet("interiors/media-walls", ["Wooden Panel Media Wall", "Floating TV Unit", "Marble-Look Media Wall", "Fluted Panel Media Wall", "Integrated Shelving Wall", "Fireplace Media Wall"], "jpg"), hero: INTERIOR_CATEGORY_IMAGES["interiors/media-walls"], introImage: INTERIOR_CATEGORY_IMAGES["interiors/media-walls"] },
  "interiors/feature-walls": { ...makeExactSet("interiors/feature-walls", ["Fluted Wooden Wall", "Decorative Panel Wall", "Stone Texture Wall", "Slatted Wood Wall", "Backlit Feature Wall", "Textured Plaster Wall"], "png"), hero: INTERIOR_CATEGORY_IMAGES["interiors/feature-walls"], introImage: INTERIOR_CATEGORY_IMAGES["interiors/feature-walls"] },
  "interiors/bed-walls": { ...makeExactSet("interiors/bed-walls", ["Upholstered Bed Wall", "Wooden Headboard Wall", "Fluted Bed Wall", "Panelled Headboard Wall", "Extended Headboard Wall", "Backlit Bed Wall"], "png"), hero: INTERIOR_CATEGORY_IMAGES["interiors/bed-walls"], introImage: INTERIOR_CATEGORY_IMAGES["interiors/bed-walls"] },
  "interiors/wooden-flooring": { ...makeExactSet("interiors/wooden-flooring", ["Engineered Wood Flooring", "Herringbone Flooring", "Chevron Flooring", "Wide Plank Flooring", "Solid Wood Flooring", "Natural Oak Flooring"], "png"), hero: INTERIOR_CATEGORY_IMAGES["interiors/wooden-flooring"], introImage: INTERIOR_CATEGORY_IMAGES["interiors/wooden-flooring"] },
  "home-furnitures/laminated": makeExactSet("home-furnitures/laminated", ["Laminated TV Unit", "Laminated Storage Cabinet", "Laminated Study Desk", "Laminated Bed", "Kids' Room Furniture", "Modular Storage Wall"], "png"),
  "home-furnitures/cushion": makeExactSet("home-furnitures/cushion", ["Sectional Sofa", "Three-Seater Sofa", "Lounge Chair", "Upholstered Bed", "Ottoman & Bench", "Accent Armchair"], "png"),
  "home-furnitures/wooden": makeExactSet("home-furnitures/wooden", ["Wooden Dining Table", "Wooden Bed", "Wooden Console Table", "Wooden Cabinet", "Wooden Side Table", "Wooden Sideboard"], "png"),
};

const applyExactImages = (data: CategoryContent): CategoryContent => {
  const imageSet = EXACT_IMAGE_SETS[data.slug];
  if (!imageSet) return data;

  return {
    ...data,
    hero: imageSet.hero,
    introImage: imageSet.introImage,
    styles: data.styles.map((style) => ({
      ...style,
      image: imageSet.styles[style.title] ?? style.image,
    })),
    gallery: imageSet.gallery,
  };
};

const RAW_CATEGORY_CONTENT: Record<string, CategoryContent> = {
  "kitchens/modular-kitchen": modularKitchen,
  "kitchens/classic-kitchen": classicKitchen,
  "kitchens/modern-kitchen": modernKitchen,
  "wardrobes/wardrobe": wardrobe,
  "wardrobes/classic-wardrobe": classicWardrobe,
  "wardrobes/aluminium-wardrobe": aluminiumWardrobe,
  "wardrobes/walk-in-closet": walkInCloset,
  "doors/main-doors": mainDoors,
  "doors/bed-bathroom-doors": bedBathDoors,
  "doors/engineered-doors": engineeredDoors,
  "doors/sliding-doors": slidingDoors,
  "interiors/media-walls": mediaWalls,
  "interiors/feature-walls": featureWalls,
  "interiors/bed-walls": bedWalls,
  "interiors/wooden-flooring": woodenFlooring,
  "home-furnitures/laminated": laminatedFurniture,
  "home-furnitures/cushion": cushionFurniture,
  "home-furnitures/wooden": woodenFurniture,
};

export const CATEGORY_CONTENT: Record<string, CategoryContent> = Object.fromEntries(
  Object.entries(RAW_CATEGORY_CONTENT).map(([key, data]) => [key, applyExactImages(data)]),
) as Record<string, CategoryContent>;