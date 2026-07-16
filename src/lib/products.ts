// Central product/design catalog data for all subcategories.
// 18 subcategories × 8 designs = 144 dedicated design pages.

export type ProductSpec = { label: string; value: string };
export type ProductFeature = { title: string; description: string };
export type Product = {
  slug: string;
  name: string;
  subcategorySlug: string; // e.g. "modular-kitchen"
  categoryLabel: string; // e.g. "Modular Kitchen"
  parentLabel: string; // e.g. "Kitchens"
  image: string; // main image URL
  gallery: string[]; // 3-5 related images
  tagline: string;
  intro: string;
  editorialTitle: string;
  editorial: string[]; // paragraphs
  specs: ProductSpec[];
  features: ProductFeature[];
};

export type Subcategory = {
  slug: string; // "modular-kitchen"
  parentSlug: string; // "kitchens"
  parentLabel: string; // "Kitchens"
  label: string; // "Modular Kitchen"
  pluralLabel: string; // "Modular Kitchens"
  routePath: string; // "/kitchens/modular-kitchen"
  products: Product[];
};

// --------- helpers ---------
const img = (p: string) => "/" + p.replace(/^public\//, "");

function makeProduct(
  parent: { parentSlug: string; parentLabel: string; slug: string; label: string },
  d: {
    slug: string;
    name: string;
    image: string;
    tagline: string;
    intro: string;
    editorialTitle: string;
    editorial: string[];
    specs: ProductSpec[];
    features: ProductFeature[];
    gallery: string[];
  }
): Product {
  return {
    slug: d.slug,
    name: d.name,
    subcategorySlug: parent.slug,
    categoryLabel: parent.label,
    parentLabel: parent.parentLabel,
    image: d.image,
    gallery: d.gallery,
    tagline: d.tagline,
    intro: d.intro,
    editorialTitle: d.editorialTitle,
    editorial: d.editorial,
    specs: d.specs,
    features: d.features,
  };
}

// Shared feature builders
const kitchenFeatures = (extra: string): ProductFeature[] => [
  { title: "Intelligent Storage Planning", description: "Custom drawers, pull-outs and corner solutions tailored to your daily routine." },
  { title: "Soft-Close Premium Hardware", description: "Blum and Hettich fittings for a silent, long-lasting cabinet motion." },
  { title: "Custom Cabinet Sizes", description: "Every module engineered to your site dimensions — no filler panels or dead space." },
  { title: "Integrated Appliance Planning", description: "Ovens, hoods and refrigeration coordinated into the cabinetry layout from day one." },
  { title: "Easy-Maintenance Finishes", description: `${extra} — engineered for humid, high-use kitchens.` },
  { title: "Complete Design & Installation", description: "End-to-end WoodLab execution from 3D design to on-site handover." },
];

const wardrobeFeatures = (extra: string): ProductFeature[] => [
  { title: "Custom Internal Layouts", description: "Hanging, folded, drawers and accessory zones planned to your wardrobe inventory." },
  { title: "Premium Sliding & Hinged Hardware", description: "Silent, precision-engineered runners rated for years of daily cycles." },
  { title: "Floor-to-Ceiling Utilisation", description: "Every millimetre of vertical space converted into usable, dust-free storage." },
  { title: "Integrated LED Lighting", description: "Motion or profile lighting to reveal contents cleanly on opening." },
  { title: "Durable Surface Finishes", description: `${extra} — engineered for humidity, scratches and everyday handling.` },
  { title: "Complete Design & Installation", description: "Site measurement, 3D preview and finished-on-site installation by WoodLab." },
];

const doorFeatures = (extra: string): ProductFeature[] => [
  { title: "Solid Engineered Core", description: "Dimensionally stable core resists warping in extreme temperature and humidity swings." },
  { title: "Premium Concealed Hardware", description: "Cinch-close hinges and heavy-duty locksets from leading global brands." },
  { title: "Custom Sizing & Cutouts", description: "Made-to-measure heights, widths and vision panels for any opening." },
  { title: "Refined Edge Detailing", description: "Clean edge banding or solid lippings that hold their finish for years." },
  { title: "Weather & Impact Ready", description: `${extra} — built for daily traffic without compromise.` },
  { title: "Complete Supply & Installation", description: "Frame, leaf, hardware and finish delivered and installed by WoodLab." },
];

const interiorFeatures = (extra: string): ProductFeature[] => [
  { title: "Bespoke Composition", description: "Every panel proportion is scaled to your wall height and viewing distance." },
  { title: "Concealed Fixings", description: "Clean, screw-free faces with hidden mounting systems for a seamless surface." },
  { title: "Integrated Lighting", description: "Cove, backlit or graze lighting planned into the panelisation from day one." },
  { title: "Premium Surface Materials", description: `${extra} — chosen for texture, longevity and easy upkeep.` },
  { title: "Acoustic-Aware Detailing", description: "Substrates and reveals engineered to soften echo and improve room feel." },
  { title: "Complete Design & Installation", description: "From concept sketch to finished wall by the WoodLab execution team." },
];

const furnitureFeatures = (extra: string): ProductFeature[] => [
  { title: "Made-to-Measure Build", description: "Every piece scaled to your room, ceiling height and circulation." },
  { title: "Premium Hardware & Joinery", description: "Concealed connectors, soft-close movement and long-life hinges." },
  { title: "Durable Everyday Finishes", description: `${extra} — designed for real family use.` },
  { title: "Coordinated Materials", description: "Timber, laminate and upholstery tones curated to your interior scheme." },
  { title: "Integrated Function", description: "Charging points, cable routing, lighting and storage built into the piece." },
  { title: "Complete Design & Delivery", description: "3D preview, factory build, on-site assembly and finishing by WoodLab." },
];

// --------- SUBCATEGORY DEFINITIONS ---------

type ProductSeed = {
  slug: string;
  name: string;
  imageFile: string; // filename inside subcat folder
  layout: string;
  style: string;
  material: string;
  finish: string;
  highlight: string;
};

function buildKitchen(parent: { parentSlug: string; parentLabel: string; slug: string; label: string }, folder: string, seeds: ProductSeed[]): Product[] {
  const gallery = seeds.slice(0, 5).map((s) => img(`public/category-images/${folder}/${s.imageFile}`));
  return seeds.map((s) =>
    makeProduct(parent, {
      slug: s.slug,
      name: s.name,
      image: img(`public/category-images/${folder}/${s.imageFile}`),
      tagline: `${s.style} · ${s.layout}`,
      intro: `Designed for ${s.layout.toLowerCase()} living, the ${s.name} combines intelligent planning, custom cabinetry and premium hardware to create a practical and visually refined ${parent.label.toLowerCase()} environment.`,
      editorialTitle: `Intelligent Space Planning: The ${s.name}`,
      editorial: [
        `The ${s.name} is a purpose-built ${parent.label.toLowerCase()} solution that pairs a ${s.layout.toLowerCase()} footprint with ${s.style.toLowerCase()} styling. WoodLab designs each configuration from the ground up — cabinet by cabinet — so the layout truly fits the way you cook, host and store.`,
        `Cabinetry is manufactured in ${s.material} carcasses with ${s.finish.toLowerCase()} shutter finishes, giving you a surface that resists heat, moisture and the everyday wear of a working kitchen. ${s.highlight}`,
        `Countertops are specified in engineered quartz or solid surface, with matched splashbacks and full height end panels. Under-cabinet LED strips, drawer-interior lighting and profile lighting on tall units are planned into the electrical scheme from day one.`,
        `Every module includes soft-close Blum or Hettich hardware, adjustable levellers and integrated waste, cutlery and spice systems. WoodLab handles the entire journey — 3D design, factory production, site delivery and finished-on-site installation.`,
      ],
      specs: [
        { label: "Layout", value: s.layout },
        { label: "Style", value: s.style },
        { label: "Cabinet Finish", value: s.finish },
        { label: "Countertop", value: "Quartz / Solid Surface Options" },
        { label: "Hardware", value: "Blum / Hettich Soft-Close" },
        { label: "Storage", value: "Custom Modular Storage" },
        { label: "Lighting", value: "Integrated LED Options" },
        { label: "Execution", value: "Complete Design & Installation" },
      ],
      features: kitchenFeatures(s.finish),
      gallery,
    })
  );
}

const modularKitchen: Subcategory = {
  slug: "modular-kitchen",
  parentSlug: "kitchens",
  parentLabel: "Kitchens",
  label: "Modular Kitchen",
  pluralLabel: "Modular Kitchens",
  routePath: "/kitchens/modular-kitchen",
  products: buildKitchen(
    { parentSlug: "kitchens", parentLabel: "Kitchens", slug: "modular-kitchen", label: "Modular Kitchen" },
    "kitchens/modular-kitchen",
    [
      { slug: "luna-l-shaped-kitchen", name: "Luna L-Shaped Modular Kitchen", imageFile: "l-shaped-modular-kitchen.jpg", layout: "L-Shaped", style: "Contemporary Modular", material: "moisture-resistant HDHMR", finish: "Matte Laminate", highlight: "The corner run is fitted with a magic corner pull-out that turns a traditionally dead zone into fully accessible everyday storage." },
      { slug: "nova-u-shaped-kitchen", name: "Nova U-Shaped Modular Kitchen", imageFile: "u-shaped-modular-kitchen.jpg", layout: "U-Shaped", style: "Contemporary Modular", material: "moisture-resistant HDHMR", finish: "Matte Acrylic", highlight: "Three continuous work zones — prep, cook and wash — sit within a single step, keeping the cook triangle exceptionally tight." },
      { slug: "aria-island-kitchen", name: "Aria Island Modular Kitchen", imageFile: "island-modular-kitchen.jpg", layout: "Island", style: "Open-Plan Modular", material: "marine-grade plywood", finish: "Textured Laminate", highlight: "The island doubles as a breakfast bar and secondary prep station, with power and USB integration on the seating side." },
      { slug: "elara-parallel-kitchen", name: "Elara Parallel Modular Kitchen", imageFile: "parallel-kitchen.jpg", layout: "Parallel / Galley", style: "Efficient Modular", material: "moisture-resistant HDHMR", finish: "PU Painted", highlight: "Two parallel runs of cabinetry create separated wet and dry zones — ideal for narrow footprints and rental-friendly plans." },
      { slug: "siena-straight-kitchen", name: "Siena Straight Modular Kitchen", imageFile: "straight-kitchen.jpg", layout: "Straight / One-Wall", style: "Compact Modular", material: "moisture-resistant HDHMR", finish: "Matte Laminate", highlight: "Tall storage columns bookend the run, freeing the counter of appliances while keeping essentials within arm's reach." },
      { slug: "verona-peninsula-kitchen", name: "Verona Peninsula Modular Kitchen", imageFile: "peninsula-kitchen.jpg", layout: "Peninsula", style: "Semi-Open Modular", material: "marine-grade plywood", finish: "Matte Acrylic", highlight: "A peninsula anchor separates the kitchen from the living zone without sealing the space off — perfect for apartments." },
      { slug: "solace-modular-kitchen", name: "Solace Modular Kitchen", imageFile: "solace-warm-woodgrain-kitchen.jpg", layout: "L-Shaped with Tall Unit", style: "Warm Modular", material: "moisture-resistant HDHMR", finish: "Woodgrain Laminate", highlight: "Warm woodgrain shutters are balanced by a stone-look countertop and matte black hardware for a grounded, quietly premium feel." },
      { slug: "axis-modular-kitchen", name: "Axis Modular Kitchen", imageFile: "axis-architectural-kitchen.jpg", layout: "Island with Tall Bank", style: "Architectural Modular", material: "marine-grade plywood", finish: "High-Gloss Acrylic", highlight: "A monolithic tall bank hides the fridge, oven and pantry behind a single continuous plane of cabinetry." },
    ]
  ),
};

const classicKitchen: Subcategory = {
  slug: "classic-kitchen",
  parentSlug: "kitchens",
  parentLabel: "Kitchens",
  label: "Classic Kitchen",
  pluralLabel: "Classic Kitchens",
  routePath: "/kitchens/classic-kitchen",
  products: buildKitchen(
    { parentSlug: "kitchens", parentLabel: "Kitchens", slug: "classic-kitchen", label: "Classic Kitchen" },
    "kitchens/classic-kitchen",
    [
      { slug: "windsor-shaker-kitchen", name: "Windsor Shaker Kitchen", imageFile: "shaker-kitchen.jpg", layout: "L-Shaped", style: "Classic Shaker", material: "moisture-resistant MDF", finish: "PU Painted Shaker", highlight: "The signature five-piece Shaker door is hand-finished on site to a museum-quality paint standard." },
      { slug: "harrow-raised-panel-kitchen", name: "Harrow Raised Panel Kitchen", imageFile: "raised-panel-kitchen.jpg", layout: "U-Shaped", style: "Traditional Raised Panel", material: "moisture-resistant MDF", finish: "PU Painted Raised Panel", highlight: "Deep raised centre panels and traditional cornice detailing recall English country-house cabinetry." },
      { slug: "avalon-classic-white-kitchen", name: "Avalon Classic White Kitchen", imageFile: "classic-white-kitchen.jpg", layout: "L-Shaped Island", style: "Timeless Classic", material: "moisture-resistant MDF", finish: "Satin White PU", highlight: "A pure white palette is warmed by brushed brass hardware and a chunky mitred stone countertop." },
      { slug: "kensington-moulded-kitchen", name: "Kensington Moulded Cabinet Kitchen", imageFile: "moulded-cabinet-kitchen.jpg", layout: "U-Shaped", style: "Ornate Classic", material: "moisture-resistant MDF", finish: "PU Painted Moulded", highlight: "Ornate crown mouldings, plinth detailing and pilasters frame each cabinet run like millwork." },
      { slug: "heritage-kitchen", name: "Heritage Inspired Kitchen", imageFile: "heritage-inspired-kitchen.jpg", layout: "Parallel with Island", style: "Heritage Classic", material: "solid timber frames", finish: "Hand-Rubbed Oil", highlight: "Solid timber frames, glass-fronted upper cabinets and a farmhouse sink give the room a lived-in, heritage feel." },
      { slug: "belmont-traditional-wood-kitchen", name: "Belmont Traditional Wood Kitchen", imageFile: "traditional-wood-kitchen.jpg", layout: "L-Shaped", style: "Traditional Wood", material: "solid timber & veneer", finish: "Stained Natural Wood", highlight: "Rich stained timber and hand-carved detailing anchor the space in classical craftsmanship." },
      { slug: "chester-shaker-kitchen", name: "Chester Shaker Kitchen", imageFile: "chester-shaker-peninsula-kitchen.jpg", layout: "Peninsula", style: "Modern Classic Shaker", material: "moisture-resistant MDF", finish: "PU Painted Shaker", highlight: "A softer palette and slim shaker profile take the classic detail into a modern, family-friendly register." },
      { slug: "regent-classic-kitchen", name: "Regent Classic Kitchen", imageFile: "regent-formal-classic-kitchen.jpg", layout: "U-Shaped Island", style: "Formal Classic", material: "moisture-resistant MDF", finish: "Satin PU Painted", highlight: "Formal cornice work, panelled end returns and a marble-look countertop create a hosting-ready kitchen." },
    ]
  ),
};

const modernKitchen: Subcategory = {
  slug: "modern-kitchen",
  parentSlug: "kitchens",
  parentLabel: "Kitchens",
  label: "Modern Kitchen",
  pluralLabel: "Modern Kitchens",
  routePath: "/kitchens/modern-kitchen",
  products: buildKitchen(
    { parentSlug: "kitchens", parentLabel: "Kitchens", slug: "modern-kitchen", label: "Modern Kitchen" },
    "kitchens/modern-kitchen",
    [
      { slug: "vesta-handleless-kitchen", name: "Vesta Handleless Kitchen", imageFile: "handleless-kitchen.jpg", layout: "Parallel", style: "Handleless Modern", material: "marine-grade plywood", finish: "Matte Fenix-look Laminate", highlight: "Recessed J-channels replace visible handles for an uninterrupted, architectural plane of cabinetry." },
      { slug: "orion-high-gloss-kitchen", name: "Orion High Gloss Kitchen", imageFile: "high-gloss-kitchen.jpg", layout: "L-Shaped Island", style: "High-Gloss Modern", material: "marine-grade plywood", finish: "High-Gloss Acrylic", highlight: "Mirror-finish acrylic shutters bounce light through the space and make compact kitchens feel visibly larger." },
      { slug: "linea-matte-kitchen", name: "Linea Matte Kitchen", imageFile: "matte-kitchen.jpg", layout: "Straight with Tall Bank", style: "Minimal Matte", material: "marine-grade plywood", finish: "Anti-Fingerprint Matte", highlight: "Anti-fingerprint matte shutters keep the space looking gallery-clean even in a working household." },
      { slug: "zenith-integrated-kitchen", name: "Zenith Integrated Kitchen", imageFile: "integrated-kitchen.jpg", layout: "Island", style: "Fully Integrated Modern", material: "marine-grade plywood", finish: "Woodgrain & Matte Mix", highlight: "Every appliance — fridge, dishwasher, ovens, hood — is fully concealed behind cabinetry-matched panels." },
      { slug: "atlas-contemporary-island-kitchen", name: "Atlas Contemporary Island Kitchen", imageFile: "contemporary-island-kitchen.jpg", layout: "Island with Peninsula Seating", style: "Contemporary Modern", material: "marine-grade plywood", finish: "Stone-Look Laminate", highlight: "The sculpted island doubles as a family gathering table with waterfall stone-look ends." },
      { slug: "muse-minimal-kitchen", name: "Muse Minimal Kitchen", imageFile: "minimal-kitchen.jpg", layout: "One-Wall with Tall Bank", style: "Ultra-Minimal Modern", material: "marine-grade plywood", finish: "Micro-Texture Matte", highlight: "A single continuous plane hides everything behind push-to-open doors — no handles, no seams." },
      { slug: "arclight-modern-kitchen", name: "Arclight Modern Kitchen", imageFile: "arclight-backlit-kitchen.jpg", layout: "L-Shaped Island", style: "Backlit Modern", material: "marine-grade plywood", finish: "Matte Laminate with Backlighting", highlight: "Recessed LED grazing under the wall units and above the tall bank turns the cabinetry itself into a light source." },
      { slug: "prisma-modern-kitchen", name: "Prisma Modern Kitchen", imageFile: "prisma-two-tone-kitchen.jpg", layout: "Island", style: "Two-Tone Modern", material: "marine-grade plywood", finish: "High-Gloss + Matte Mix", highlight: "A high-gloss island contrasts with a matte tall bank to give the room clear zones and a sculptural silhouette." },
    ]
  ),
};

// ---- WARDROBES ----
function buildWardrobe(parent: { parentSlug: string; parentLabel: string; slug: string; label: string }, folder: string, seeds: ProductSeed[]): Product[] {
  const gallery = seeds.slice(0, 5).map((s) => img(`public/category-images/${folder}/${s.imageFile}`));
  return seeds.map((s) =>
    makeProduct(parent, {
      slug: s.slug,
      name: s.name,
      image: img(`public/category-images/${folder}/${s.imageFile}`),
      tagline: `${s.style} · ${s.layout}`,
      intro: `The ${s.name} is a bespoke ${parent.label.toLowerCase()} solution engineered for calm, dust-free storage. WoodLab plans every internal zone around your real wardrobe inventory — hanging, folded, drawers, shoes and accessories.`,
      editorialTitle: `Tailored Storage: The ${s.name}`,
      editorial: [
        `The ${s.name} is designed as a permanent piece of architecture rather than a movable cupboard. Carcasses are built in ${s.material} and finished on every visible surface, so both the front elevation and the internal experience feel considered.`,
        `The shutter treatment is ${s.finish.toLowerCase()}, chosen to complement the surrounding bedroom palette and to keep the room feeling wider than it is. ${s.highlight}`,
        `Internal planning is fully customised: adjustable shelves, felt-lined jewellery drawers, tie and belt rails, pull-out trouser hangers and hamper compartments are combined in the exact ratio you actually use.`,
        `Motion-sensor LED profiles reveal the interior on opening. Every runner, hinge and lift mechanism is soft-close and rated for years of daily cycles. WoodLab handles site measurement, 3D preview and complete on-site installation.`,
      ],
      specs: [
        { label: "Type", value: s.layout },
        { label: "Style", value: s.style },
        { label: "Shutter Finish", value: s.finish },
        { label: "Carcass Material", value: s.material },
        { label: "Hardware", value: "Blum / Hettich Soft-Close" },
        { label: "Interior Layout", value: "Fully Customised" },
        { label: "Lighting", value: "Integrated LED Options" },
        { label: "Execution", value: "Complete Design & Installation" },
      ],
      features: wardrobeFeatures(s.finish),
      gallery,
    })
  );
}

const wardrobe: Subcategory = {
  slug: "wardrobe",
  parentSlug: "wardrobes",
  parentLabel: "Wardrobes",
  label: "Wardrobe",
  pluralLabel: "Wardrobes",
  routePath: "/wardrobes/wardrobe",
  products: buildWardrobe(
    { parentSlug: "wardrobes", parentLabel: "Wardrobes", slug: "wardrobe", label: "Wardrobe" },
    "wardrobes/wardrobe",
    [
      { slug: "willow-fitted-wardrobe", name: "Willow Fitted Wardrobe", imageFile: "fitted-wardrobe.jpg", layout: "Fitted Hinged Wardrobe", style: "Contemporary Fitted", material: "moisture-resistant HDHMR", finish: "Matte Laminate", highlight: "Full-height doors and flush handles produce a clean, joinery-like wall of storage." },
      { slug: "monroe-built-in-wardrobe", name: "Monroe Built-in Wardrobe", imageFile: "built-in-wardrobe.jpg", layout: "Built-in Recess Wardrobe", style: "Recessed Built-in", material: "marine-grade plywood", finish: "PU Painted", highlight: "Purpose-built to fit an alcove, the piece reads as architecture rather than furniture." },
      { slug: "atlas-floor-to-ceiling-wardrobe", name: "Atlas Floor to Ceiling Wardrobe", imageFile: "floor-to-ceiling-wardrobe.jpg", layout: "Floor-to-Ceiling Wardrobe", style: "Full-Height Modern", material: "moisture-resistant HDHMR", finish: "Matte Woodgrain", highlight: "Every centimetre from skirting to ceiling is converted into usable storage, with a lift-up loft unit on top." },
      { slug: "hera-hinged-wardrobe", name: "Hera Hinged Wardrobe", imageFile: "hinged-wardrobe.jpg", layout: "Hinged-Door Wardrobe", style: "Panelled Hinged", material: "moisture-resistant HDHMR", finish: "PU Painted Panelled", highlight: "Panelled hinged shutters open fully to reveal the entire interior at a glance — ideal for busy dressing routines." },
      { slug: "prism-two-tone-wardrobe", name: "Prism Two-Tone Wardrobe", imageFile: "two-tone-wardrobe.jpg", layout: "Fitted Hinged Wardrobe", style: "Two-Tone Modern", material: "moisture-resistant HDHMR", finish: "Two-Tone Laminate", highlight: "A darker base band and lighter upper shutters visually lengthen the room while breaking the mass of the wardrobe." },
      { slug: "meridian-bedroom-storage-wall", name: "Meridian Bedroom Storage Wall", imageFile: "bedroom-storage-wall.jpg", layout: "Full Storage Wall", style: "Integrated Bedroom Wall", material: "marine-grade plywood", finish: "Woodgrain + Matte Mix", highlight: "Wardrobe, dresser, TV unit and bedside are unified into a single continuous storage wall." },
      { slug: "verano-fitted-wardrobe", name: "Verano Fitted Wardrobe", imageFile: "verano-fitted-wardrobe.jpg", layout: "Fitted Hinged Wardrobe", style: "Minimal Fitted", material: "moisture-resistant HDHMR", finish: "Micro-Texture Matte", highlight: "A micro-texture matte finish hides fingerprints and everyday marks in a busy family bedroom." },
      { slug: "eton-built-in-wardrobe", name: "Eton Built-in Wardrobe", imageFile: "eton-built-in-wardrobe.jpg", layout: "Built-in Recess Wardrobe", style: "Classic Built-in", material: "moisture-resistant MDF", finish: "PU Painted Shaker", highlight: "Slim shaker doors and antique brass handles bring a classic register to the built-in format." },
    ]
  ),
};

const classicWardrobe: Subcategory = {
  slug: "classic-wardrobe",
  parentSlug: "wardrobes",
  parentLabel: "Wardrobes",
  label: "Classic Wardrobe",
  pluralLabel: "Classic Wardrobes",
  routePath: "/wardrobes/classic-wardrobe",
  products: buildWardrobe(
    { parentSlug: "wardrobes", parentLabel: "Wardrobes", slug: "classic-wardrobe", label: "Classic Wardrobe" },
    "wardrobes/classic-wardrobe",
    [
      { slug: "windsor-shaker-wardrobe", name: "Windsor Shaker Wardrobe", imageFile: "shaker-wardrobe.jpg", layout: "Hinged Shaker Wardrobe", style: "Classic Shaker", material: "moisture-resistant MDF", finish: "PU Painted Shaker", highlight: "The classic five-piece Shaker door is finished in a soft, hand-rubbed satin paint." },
      { slug: "harrow-raised-panel-wardrobe", name: "Harrow Raised Panel Wardrobe", imageFile: "raised-panel-wardrobe.jpg", layout: "Hinged Raised Panel Wardrobe", style: "Traditional Raised Panel", material: "moisture-resistant MDF", finish: "PU Painted Raised Panel", highlight: "Deep raised centre panels and traditional cornice detailing create a heritage bedroom silhouette." },
      { slug: "kensington-moulded-wardrobe", name: "Kensington Moulded Wardrobe", imageFile: "moulded-wardrobe.jpg", layout: "Hinged Moulded Wardrobe", style: "Ornate Classic", material: "moisture-resistant MDF", finish: "PU Painted Moulded", highlight: "Ornate cornice, plinth and pilaster millwork turn the wardrobe into a formal bedroom centrepiece." },
      { slug: "avalon-painted-classic-wardrobe", name: "Avalon Painted Classic Wardrobe", imageFile: "painted-classic-wardrobe.jpg", layout: "Hinged Classic Wardrobe", style: "Painted Classic", material: "moisture-resistant MDF", finish: "Satin PU Painted", highlight: "A soft, hand-mixed paint colour is complemented by antique brass knobs and long pull handles." },
      { slug: "belmont-traditional-wood-wardrobe", name: "Belmont Traditional Wood Wardrobe", imageFile: "traditional-wood-wardrobe.jpg", layout: "Hinged Wood Wardrobe", style: "Traditional Wood", material: "solid timber & veneer", finish: "Stained Natural Wood", highlight: "Stained solid timber, hand-carved detailing and traditional locks anchor the design in classical craftsmanship." },
      { slug: "regent-fluted-panel-wardrobe", name: "Regent Fluted Panel Wardrobe", imageFile: "fluted-panel-wardrobe.jpg", layout: "Hinged Fluted Wardrobe", style: "Fluted Classic", material: "moisture-resistant MDF", finish: "PU Painted Fluted", highlight: "Vertical fluting on each shutter adds texture and shadow while keeping the wardrobe visually calm." },
      { slug: "chester-shaker-wardrobe", name: "Chester Shaker Wardrobe", imageFile: "chester-shaker-wardrobe.jpg", layout: "Hinged Shaker Wardrobe", style: "Modern Classic Shaker", material: "moisture-resistant MDF", finish: "PU Painted Shaker", highlight: "A softer profile shaker door works well in transitional interiors that mix classic and modern furniture." },
      { slug: "richmond-moulded-wardrobe", name: "Richmond Moulded Wardrobe", imageFile: "richmond-moulded-wardrobe.jpg", layout: "Hinged Moulded Wardrobe", style: "Refined Classic", material: "moisture-resistant MDF", finish: "PU Painted Moulded", highlight: "Delicate, restrained mouldings suit hotel-inspired master suites without becoming ornate." },
    ]
  ),
};

const aluminiumWardrobe: Subcategory = {
  slug: "aluminium-wardrobe",
  parentSlug: "wardrobes",
  parentLabel: "Wardrobes",
  label: "Aluminium Wardrobe",
  pluralLabel: "Aluminium Wardrobes",
  routePath: "/wardrobes/aluminium-wardrobe",
  products: buildWardrobe(
    { parentSlug: "wardrobes", parentLabel: "Wardrobes", slug: "aluminium-wardrobe", label: "Aluminium Wardrobe" },
    "wardrobes/aluminium-wardrobe",
    [
      { slug: "onyx-black-aluminium-wardrobe", name: "Onyx Black Aluminium Frame Wardrobe", imageFile: "black-aluminium-frame-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe", style: "Black Aluminium & Glass", material: "extruded aluminium profile", finish: "Powder-Coated Black Frame", highlight: "Slim black aluminium profiles frame smoked glass shutters for a wardrobe that reads like a designer showcase." },
      { slug: "veil-smoked-glass-wardrobe", name: "Veil Smoked Glass Sliding Wardrobe", imageFile: "smoked-glass-sliding-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe", style: "Smoked Glass Sliding", material: "extruded aluminium profile", finish: "Smoked Tempered Glass", highlight: "Smoked glass conceals the interior enough for privacy while still hinting at what's inside." },
      { slug: "aurum-bronze-glass-wardrobe", name: "Aurum Bronze Glass Wardrobe", imageFile: "bronze-glass-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe", style: "Bronze Glass & Aluminium", material: "extruded aluminium profile", finish: "Bronze Tinted Glass", highlight: "Warm bronze glass paired with champagne aluminium profiles gives the room a soft, luxurious glow." },
      { slug: "clarity-clear-glass-wardrobe", name: "Clarity Clear Glass Wardrobe", imageFile: "clear-glass-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe", style: "Clear Glass Display", material: "extruded aluminium profile", finish: "Clear Tempered Glass", highlight: "Clear glass shutters turn the wardrobe into a curated display — ideal for boutique-style dressing zones." },
      { slug: "lumen-led-aluminium-wardrobe", name: "Lumen LED Aluminium Wardrobe", imageFile: "led-lit-aluminium-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe with LED", style: "Backlit Aluminium & Glass", material: "extruded aluminium profile", finish: "Backlit Fluted Glass", highlight: "Integrated LED profiles in the aluminium framework wash the fluted glass with a soft, ambient glow." },
      { slug: "mirage-mirrored-aluminium-wardrobe", name: "Mirage Mirrored Aluminium Wardrobe", imageFile: "mirrored-aluminium-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe", style: "Mirror & Aluminium", material: "extruded aluminium profile", finish: "Full-Height Mirror", highlight: "Full-height mirror shutters double as a dressing mirror and visually expand the bedroom footprint." },
      { slug: "silhouette-aluminium-wardrobe", name: "Silhouette Aluminium Wardrobe", imageFile: "silhouette-aluminium-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe", style: "Slim Profile Aluminium", material: "extruded aluminium profile", finish: "Anodised Aluminium Frame", highlight: "An ultra-slim anodised aluminium profile keeps the frame almost invisible against the glass panels." },
      { slug: "eclipse-aluminium-wardrobe", name: "Eclipse Aluminium Wardrobe", imageFile: "eclipse-aluminium-wardrobe.jpg", layout: "Sliding Aluminium Profile Wardrobe", style: "Dark Aluminium & Smoked Glass", material: "extruded aluminium profile", finish: "Matte Black & Smoked Glass", highlight: "A moody combination of matte black aluminium and smoked glass built for contemporary primary suites." },
    ]
  ),
};

const walkInCloset: Subcategory = {
  slug: "walk-in-closet",
  parentSlug: "wardrobes",
  parentLabel: "Wardrobes",
  label: "Walk-in Closet",
  pluralLabel: "Walk-in Closets",
  routePath: "/wardrobes/walk-in-closet",
  products: buildWardrobe(
    { parentSlug: "wardrobes", parentLabel: "Wardrobes", slug: "walk-in-closet", label: "Walk-in Closet" },
    "wardrobes/walk-in-closet",
    [
      { slug: "atelier-boutique-dressing-room", name: "Atelier Boutique Dressing Room", imageFile: "boutique-dressing-room.jpg", layout: "Full Walk-in Dressing Room", style: "Boutique Dressing Room", material: "marine-grade plywood", finish: "Woodgrain + Matte Mix", highlight: "Open shelving, display drawers and lit hanging rails make the room feel like a personal boutique." },
      { slug: "manor-luxury-boutique-closet", name: "Manor Luxury Boutique Closet", imageFile: "luxury-boutique-closet.jpg", layout: "Full Walk-in Closet", style: "Luxury Boutique", material: "marine-grade plywood", finish: "Veneered Warm Wood", highlight: "A central island, upholstered bench and vanity zone elevate the closet into a dressing suite." },
      { slug: "prism-island-walk-in-closet", name: "Prism Island Walk-in Closet", imageFile: "island-walk-in-closet.jpg", layout: "Walk-in Closet with Island", style: "Modern Island Closet", material: "marine-grade plywood", finish: "Matte Laminate", highlight: "A central drawer island doubles as jewellery storage and a folding surface." },
      { slug: "vitrine-glass-cabinet-closet", name: "Vitrine Glass Cabinet Closet", imageFile: "glass-cabinet-closet.jpg", layout: "Walk-in Closet with Glass Vitrines", style: "Glass Display Closet", material: "extruded aluminium & glass", finish: "Aluminium Frame Glass Vitrines", highlight: "Glass-fronted vitrines display bags, watches and shoes as a curated collection." },
      { slug: "duo-his-and-hers-closet", name: "Duo His & Hers Closet", imageFile: "his-hers-closet.jpg", layout: "Split Walk-in Closet", style: "His-and-Hers Zoned", material: "marine-grade plywood", finish: "Two-Tone Woodgrain", highlight: "Two zoned walls give each partner their own hanging, drawer and shoe planning without compromise." },
      { slug: "haven-compact-walk-in-closet", name: "Haven Compact Walk-in Closet", imageFile: "compact-walk-in-closet.jpg", layout: "Compact Walk-in Closet", style: "Compact Walk-in", material: "moisture-resistant HDHMR", finish: "Light Woodgrain Laminate", highlight: "A space-efficient U-shaped layout fits a full walk-in experience into a smaller footprint." },
      { slug: "salon-dressing-room", name: "Salon Dressing Room", imageFile: "salon-dressing-room.jpg", layout: "Full Walk-in Dressing Room", style: "Salon-Style Dressing Room", material: "marine-grade plywood", finish: "Painted PU with Mirror", highlight: "A large lit vanity, upholstered stool and mirrored panels turn the closet into a getting-ready salon." },
      { slug: "regent-luxury-closet", name: "Regent Luxury Closet", imageFile: "regent-luxury-closet.jpg", layout: "Full Walk-in Closet", style: "Formal Luxury Closet", material: "marine-grade plywood", finish: "Veneered Warm Wood", highlight: "Warm veneers, brushed metal detailing and a leather-topped island give the closet a five-star hotel feel." },
    ]
  ),
};

// ---- DOORS ----
function buildDoor(parent: { parentSlug: string; parentLabel: string; slug: string; label: string }, folder: string, seeds: ProductSeed[]): Product[] {
  const gallery = seeds.slice(0, 5).map((s) => img(`public/category-images/${folder}/${s.imageFile}`));
  return seeds.map((s) =>
    makeProduct(parent, {
      slug: s.slug,
      name: s.name,
      image: img(`public/category-images/${folder}/${s.imageFile}`),
      tagline: `${s.style} · ${s.layout}`,
      intro: `The ${s.name} is a made-to-measure ${parent.label.toLowerCase().replace(" doors", " door")} built to survive daily use without losing its finish. WoodLab engineers every leaf, frame and hardware set from scratch to match your opening exactly.`,
      editorialTitle: `Considered Engineering: The ${s.name}`,
      editorial: [
        `The ${s.name} is built around a dimensionally stable ${s.material} core, which resists warping in the temperature and humidity swings this climate throws at doors. The result is a leaf that keeps operating cleanly for years, not months.`,
        `The face is finished in ${s.finish.toLowerCase()}, chosen for its ${s.style.toLowerCase()} character and its ability to handle knocks, dust and cleaning. ${s.highlight}`,
        `Frames are made from matched material with concealed anchor systems, so nothing on the visible face gives the fixings away. Hardware — hinges, locksets and closers — is drawn from leading global brands and specified for the actual weight of the leaf.`,
        `WoodLab supplies the door as a complete package: leaf, frame, architrave, hardware, finish and installation. Site measurement, dry-fit and final finishing are all handled by our own execution team.`,
      ],
      specs: [
        { label: "Door Type", value: s.layout },
        { label: "Style", value: s.style },
        { label: "Core", value: s.material },
        { label: "Finish", value: s.finish },
        { label: "Hardware", value: "Premium Concealed Hinges & Locksets" },
        { label: "Frame", value: "Matched Timber / Engineered Frame" },
        { label: "Sizing", value: "Fully Custom" },
        { label: "Execution", value: "Complete Supply & Installation" },
      ],
      features: doorFeatures(s.finish),
      gallery,
    })
  );
}

const mainDoors: Subcategory = {
  slug: "main-doors",
  parentSlug: "doors",
  parentLabel: "Doors",
  label: "Main Doors",
  pluralLabel: "Main Doors",
  routePath: "/doors/main-doors",
  products: buildDoor(
    { parentSlug: "doors", parentLabel: "Doors", slug: "main-doors", label: "Main Doors" },
    "doors/main-doors",
    [
      { slug: "sovereign-solid-wood-main-door", name: "Sovereign Solid Wood Main Door", imageFile: "solid-wood-main-door.jpg", layout: "Solid Wood Entrance", style: "Timeless Solid Wood", material: "solid seasoned timber", finish: "Hand-Polished Melamine", highlight: "A statement solid wood leaf with visible timber grain and heavy-duty concealed hinges." },
      { slug: "monolith-pivot-entrance-door", name: "Monolith Pivot Entrance Door", imageFile: "pivot-entrance-door.jpg", layout: "Pivot Entrance Door", style: "Architectural Pivot", material: "engineered timber core", finish: "Veneered Timber", highlight: "An oversized pivot opening delivers a dramatic entrance experience with soft-close pivot hardware." },
      { slug: "twin-double-entrance-door", name: "Twin Double Entrance Door", imageFile: "double-entrance-door.jpg", layout: "Double-Leaf Entrance Door", style: "Grand Double Entry", material: "engineered timber core", finish: "Veneered Timber", highlight: "A symmetrical double-leaf entrance perfect for wider villa openings and heritage-style facades." },
      { slug: "atrium-glass-wood-entrance", name: "Atrium Glass & Wood Entrance", imageFile: "glass-wood-entrance.jpg", layout: "Glass-Panelled Entrance Door", style: "Modern Glass & Wood", material: "engineered timber core", finish: "Veneered Timber + Tempered Glass", highlight: "A tempered glass vision panel washes the entry lobby with daylight without compromising security." },
      { slug: "linea-modern-statement-door", name: "Linea Modern Statement Door", imageFile: "modern-statement-door.jpg", layout: "Flush Modern Entrance Door", style: "Contemporary Statement", material: "engineered timber core", finish: "Matte Laminate with Metal Inlay", highlight: "Slim metal inlays break the flush face into a modern architectural composition." },
      { slug: "heritage-carved-main-door", name: "Heritage Carved Traditional Door", imageFile: "carved-traditional-door.jpg", layout: "Carved Traditional Door", style: "Carved Heritage", material: "solid seasoned timber", finish: "Stained & Hand-Polished", highlight: "Traditional hand-carved motifs are set into a solid timber frame for a heritage-inspired entrance." },
      { slug: "regent-solid-wood-main-door", name: "Regent Solid Wood Main Door", imageFile: "regent-solid-wood-main-door.jpg", layout: "Solid Wood Entrance", style: "Formal Solid Wood", material: "solid seasoned timber", finish: "Dark Stained Polish", highlight: "A darker, formal stain and brass hardware suit heritage-inspired villa entrances." },
      { slug: "axis-pivot-entrance-door", name: "Axis Pivot Entrance Door", imageFile: "axis-pivot-entrance-door.jpg", layout: "Pivot Entrance Door", style: "Minimal Pivot", material: "engineered timber core", finish: "Micro-Texture Matte", highlight: "A minimal matte pivot leaf with no visible hardware for a purely architectural entrance." },
    ]
  ),
};

const bedBathroomDoors: Subcategory = {
  slug: "bed-bathroom-doors",
  parentSlug: "doors",
  parentLabel: "Doors",
  label: "Bed & Bathroom Doors",
  pluralLabel: "Bed & Bathroom Doors",
  routePath: "/doors/bed-bathroom-doors",
  products: buildDoor(
    { parentSlug: "doors", parentLabel: "Doors", slug: "bed-bathroom-doors", label: "Bed & Bathroom Doors" },
    "doors/bed-bathroom-doors",
    [
      { slug: "linea-flush-door", name: "Linea Flush Interior Door", imageFile: "flush-door.jpg", layout: "Flush Interior Door", style: "Clean Modern Flush", material: "engineered timber core", finish: "Matte Laminate", highlight: "A perfectly flat flush face suits contemporary corridors where doors should recede visually." },
      { slug: "aria-panel-bedroom-door", name: "Aria Panel Bedroom Door", imageFile: "panel-door.jpg", layout: "Panelled Interior Door", style: "Modern Panelled", material: "engineered timber core", finish: "PU Painted Panelled", highlight: "Slim panels and PU paintwork strike a balance between classical proportion and modern crispness." },
      { slug: "sable-veneered-door", name: "Sable Veneered Interior Door", imageFile: "veneered-door.jpg", layout: "Veneered Interior Door", style: "Warm Veneered", material: "engineered timber core", finish: "Natural Wood Veneer", highlight: "Natural wood veneer warms up corridors and coordinates cleanly with wooden flooring." },
      { slug: "prism-grooved-slab-door", name: "Prism Grooved Slab Door", imageFile: "grooved-slab-door.jpg", layout: "Grooved Slab Interior Door", style: "Grooved Slab", material: "engineered timber core", finish: "Grooved Laminate", highlight: "Vertical grooves add texture and rhythm without any applied moulding." },
      { slug: "spa-bathroom-door", name: "Spa Bathroom Door", imageFile: "bathroom-door.jpg", layout: "Water-Resistant Bathroom Door", style: "Spa Bathroom", material: "moisture-resistant HDHMR core", finish: "Waterproof Laminate", highlight: "A fully waterproof laminate face and moisture-resistant core stand up to bathroom humidity." },
      { slug: "atlas-modern-interior-door", name: "Atlas Modern Interior Door", imageFile: "modern-interior-door.jpg", layout: "Flush Interior Door", style: "Modern Minimal", material: "engineered timber core", finish: "Matte Laminate with Metal Handle", highlight: "A minimal matte face is paired with a slim metal handle for a hotel-corridor feel." },
      { slug: "onyx-flush-door", name: "Onyx Flush Interior Door", imageFile: "onyx-flush-door.jpg", layout: "Flush Interior Door", style: "Dark Modern Flush", material: "engineered timber core", finish: "Dark Matte Laminate", highlight: "A darker flush face reads as architecture, especially against pale corridor walls." },
      { slug: "chalet-panel-door", name: "Chalet Panel Bedroom Door", imageFile: "chalet-panel-door.jpg", layout: "Panelled Interior Door", style: "Warm Panelled", material: "engineered timber core", finish: "PU Painted Soft Colour", highlight: "Soft-colour PU panelling suits calm, hospitality-style bedroom corridors." },
    ]
  ),
};

const engineeredDoors: Subcategory = {
  slug: "engineered-doors",
  parentSlug: "doors",
  parentLabel: "Doors",
  label: "Engineered Doors",
  pluralLabel: "Engineered Doors",
  routePath: "/doors/engineered-doors",
  products: buildDoor(
    { parentSlug: "doors", parentLabel: "Doors", slug: "engineered-doors", label: "Engineered Doors" },
    "doors/engineered-doors",
    [
      { slug: "core-engineered-flush-door", name: "Core Engineered Flush Door", imageFile: "engineered-flush-door.jpg", layout: "Engineered Flush Door", style: "Engineered Flush", material: "engineered stile-and-rail core", finish: "Factory-Applied Laminate", highlight: "A pre-engineered flush leaf built for consistent quality across large-project door schedules." },
      { slug: "vellum-veneered-engineered-door", name: "Vellum Veneered Engineered Door", imageFile: "veneered-engineered-door.jpg", layout: "Engineered Veneered Door", style: "Veneered Engineered", material: "engineered stile-and-rail core", finish: "Factory-Applied Veneer", highlight: "Factory-applied veneer gives a perfectly consistent grain across every leaf on the project." },
      { slug: "atelier-factory-finished-door", name: "Atelier Factory-Finished Door", imageFile: "factory-finished-door.jpg", layout: "Engineered Factory-Finished Door", style: "Factory-Finished", material: "engineered stile-and-rail core", finish: "Factory-Applied PU Paint", highlight: "A fully factory-finished leaf arrives site-ready — no on-site painting, no over-spray on adjacent finishes." },
      { slug: "muse-laminated-engineered-door", name: "Muse Laminated Engineered Door", imageFile: "laminated-engineered-door.jpg", layout: "Engineered Laminated Door", style: "Laminated Engineered", material: "engineered stile-and-rail core", finish: "High-Pressure Laminate", highlight: "A high-pressure laminate face resists scratches and cleaning agents in high-traffic corridors." },
      { slug: "prism-grooved-engineered-door", name: "Prism Grooved Engineered Door", imageFile: "prism-grooved-engineered-door.jpg", layout: "Engineered Grooved Slab Door", style: "Grooved Engineered", material: "engineered stile-and-rail core", finish: "Grooved Laminate", highlight: "Precision-milled vertical grooves add architectural texture to an engineered leaf." },
      { slug: "silence-acoustic-engineered-door", name: "Silence Acoustic Engineered Door", imageFile: "acoustic-engineered-door.jpg", layout: "Acoustic Engineered Door", style: "Acoustic-Rated", material: "acoustic engineered core", finish: "Factory-Applied Veneer", highlight: "An acoustic-rated core softens sound transfer — ideal for offices, studios and master suites." },
      { slug: "atlas-engineered-flush-door", name: "Atlas Engineered Flush Door", imageFile: "atlas-engineered-flush-door.jpg", layout: "Engineered Flush Door", style: "Modern Engineered Flush", material: "engineered stile-and-rail core", finish: "Matte Laminate", highlight: "A modern matte laminate face pairs well with concealed frame systems for a seamless corridor look." },
      { slug: "orion-veneered-engineered-door", name: "Orion Veneered Engineered Door", imageFile: "orion-veneered-engineered-door.jpg", layout: "Engineered Veneered Door", style: "Book-Matched Veneered", material: "engineered stile-and-rail core", finish: "Book-Matched Wood Veneer", highlight: "Book-matched veneering across the leaf creates a mirrored grain effect prized in premium interiors." },
    ]
  ),
};

const slidingDoors: Subcategory = {
  slug: "sliding-doors",
  parentSlug: "doors",
  parentLabel: "Doors",
  label: "Sliding Doors",
  pluralLabel: "Sliding Doors",
  routePath: "/doors/sliding-doors",
  products: buildDoor(
    { parentSlug: "doors", parentLabel: "Doors", slug: "sliding-doors", label: "Sliding Doors" },
    "doors/sliding-doors",
    [
      { slug: "glide-glass-sliding-door", name: "Glide Glass Sliding Door", imageFile: "glass-sliding-door.jpg", layout: "Top-Hung Glass Sliding Door", style: "Modern Glass Slider", material: "extruded aluminium frame", finish: "Aluminium Frame + Tempered Glass", highlight: "Top-hung hardware carries the full weight of the leaf so the floor stays flush and clear." },
      { slug: "prairie-barn-sliding-door", name: "Prairie Barn Style Sliding Door", imageFile: "barn-style-sliding-door.jpg", layout: "Exposed-Rail Barn Sliding Door", style: "Barn-Style Slider", material: "solid timber leaf", finish: "Stained Timber", highlight: "An exposed steel rail becomes a design feature above the door — perfect for characterful loft rooms." },
      { slug: "willow-wooden-sliding-door", name: "Willow Wooden Sliding Door", imageFile: "wooden-sliding-door.jpg", layout: "Concealed-Track Wooden Sliding Door", style: "Warm Wooden Slider", material: "engineered timber core", finish: "Wood Veneer", highlight: "A concealed top track keeps the wooden leaf as the only visible element for a calm, warm look." },
      { slug: "recede-pocket-sliding-door", name: "Recede Pocket Sliding Door", imageFile: "pocket-sliding-door.jpg", layout: "Pocket Sliding Door", style: "Fully Concealed Pocket", material: "engineered timber core", finish: "Painted / Laminated Face", highlight: "The leaf slides fully into a wall cavity when open, freeing the room of any door swing." },
      { slug: "divide-sliding-room-divider", name: "Divide Sliding Room Divider", imageFile: "sliding-room-divider.jpg", layout: "Large Sliding Room Divider", style: "Room-Dividing Slider", material: "extruded aluminium frame", finish: "Aluminium Frame + Fluted Glass", highlight: "A tall sliding partition separates spaces on demand without sacrificing daylight." },
      { slug: "onyx-aluminium-sliding-door", name: "Onyx Aluminium Sliding Door", imageFile: "aluminium-sliding-door.jpg", layout: "Aluminium Profile Sliding Door", style: "Slim Aluminium Slider", material: "extruded aluminium profile", finish: "Powder-Coated Aluminium + Glass", highlight: "Slim aluminium profiles frame the glass with a minimal visible sightline." },
      { slug: "atrium-glass-sliding-door", name: "Atrium Glass Sliding Door", imageFile: "atrium-glass-sliding-door.jpg", layout: "Top-Hung Glass Sliding Door", style: "Bright Glass Slider", material: "extruded aluminium frame", finish: "Aluminium Frame + Clear Glass", highlight: "Clear glass shares daylight between rooms while still creating a defined boundary." },
      { slug: "chalet-barn-sliding-door", name: "Chalet Barn Sliding Door", imageFile: "chalet-barn-sliding-door.jpg", layout: "Exposed-Rail Barn Sliding Door", style: "Warm Barn Slider", material: "solid timber leaf", finish: "Natural Oiled Timber", highlight: "A softer, oiled timber finish takes the barn slider into calmer, hospitality-style bedrooms." },
    ]
  ),
};

// ---- INTERIORS ----
function buildInterior(parent: { parentSlug: string; parentLabel: string; slug: string; label: string }, folder: string, seeds: ProductSeed[]): Product[] {
  const gallery = seeds.slice(0, 5).map((s) => img(`public/category-images/${folder}/${s.imageFile}`));
  return seeds.map((s) =>
    makeProduct(parent, {
      slug: s.slug,
      name: s.name,
      image: img(`public/category-images/${folder}/${s.imageFile}`),
      tagline: `${s.style} · ${s.layout}`,
      intro: `The ${s.name} is a bespoke ${parent.label.toLowerCase()} composition built to give the room a defined visual anchor. WoodLab plans every panel proportion, reveal and lighting cove around the actual dimensions of your wall.`,
      editorialTitle: `A Considered Surface: The ${s.name}`,
      editorial: [
        `The ${s.name} treats an ordinary wall as an opportunity to bring in texture, rhythm and light. The composition is designed as a ${s.layout.toLowerCase()} in a ${s.style.toLowerCase()} register — proportioned to the wall it sits on, not fetched from a catalogue.`,
        `The panelisation is executed in ${s.material}, finished in ${s.finish.toLowerCase()}. ${s.highlight}`,
        `Mounting is fully concealed — no visible screws, no clashing joins. Coves and reveals are planned into the electrical scheme so the lighting integrates cleanly, without surface-mounted profiles or accessories.`,
        `WoodLab handles the full journey from concept sketch, technical drawings and site measurement through to factory production and installation. The finished wall is a permanent architectural element, built to age well.`,
      ],
      specs: [
        { label: "Composition", value: s.layout },
        { label: "Style", value: s.style },
        { label: "Panel Material", value: s.material },
        { label: "Finish", value: s.finish },
        { label: "Lighting", value: "Integrated Cove / Backlit Options" },
        { label: "Fixings", value: "Concealed Mounting System" },
        { label: "Sizing", value: "Fully Custom to Wall" },
        { label: "Execution", value: "Complete Design & Installation" },
      ],
      features: interiorFeatures(s.finish),
      gallery,
    })
  );
}

const mediaWalls: Subcategory = {
  slug: "media-walls",
  parentSlug: "interiors",
  parentLabel: "Interiors",
  label: "Media Walls",
  pluralLabel: "Media Walls",
  routePath: "/interiors/media-walls",
  products: buildInterior(
    { parentSlug: "interiors", parentLabel: "Interiors", slug: "media-walls", label: "Media Walls" },
    "interiors/media-walls",
    [
      { slug: "linea-fluted-media-wall", name: "Linea Fluted Panel Media Wall", imageFile: "fluted-panel-media-wall.jpg", layout: "Fluted Panel TV Wall", style: "Fluted Modern", material: "acoustic MDF fluted panels", finish: "Micro-Texture Matte", highlight: "Vertical fluting behind the TV softens on-screen reflections and adds subtle shadow play." },
      { slug: "hearth-fireplace-media-wall", name: "Hearth Fireplace Media Wall", imageFile: "fireplace-media-wall.jpg", layout: "Fireplace + TV Feature Wall", style: "Fireplace Media", material: "engineered stone + timber", finish: "Stone-Look + Woodgrain", highlight: "A recessed electric fireplace and TV are integrated into a single sculptural wall." },
      { slug: "float-floating-tv-unit", name: "Float Floating TV Unit Wall", imageFile: "floating-tv-unit.jpg", layout: "Floating Media Console Wall", style: "Floating Modern", material: "engineered timber", finish: "Wall-Mounted Woodgrain Console", highlight: "A cantilevered wall-hung console keeps the floor clear beneath, exaggerating the room's proportions." },
      { slug: "shelf-integrated-shelving-wall", name: "Shelf Integrated Shelving Media Wall", imageFile: "integrated-shelving-wall.jpg", layout: "Media Wall with Shelving", style: "Shelved Modern", material: "engineered timber + steel", finish: "Woodgrain + Powder-Coated Steel", highlight: "Open shelving flanks the TV, turning the media wall into a display space for objects and books." },
      { slug: "marbled-marble-look-media-wall", name: "Marbled Marble-Look Media Wall", imageFile: "marble-look-media-wall.jpg", layout: "Slab Marble-Look TV Wall", style: "Marble-Look Modern", material: "engineered stone slab", finish: "Book-Matched Marble-Look", highlight: "Book-matched large-format slabs make the wall read as a single sculptural piece of stone." },
      { slug: "warmth-wooden-panel-media-wall", name: "Warmth Wooden Panel Media Wall", imageFile: "wooden-panel-media-wall.jpg", layout: "Wooden Panelled TV Wall", style: "Warm Wooden", material: "engineered wooden panels", finish: "Natural Wood Veneer", highlight: "Warm veneered panels envelop the TV so the screen recedes into the composition when off." },
      { slug: "arc-fluted-media-wall", name: "Arc Fluted Media Wall", imageFile: "arc-fluted-media-wall.jpg", layout: "Fluted Panel TV Wall", style: "Backlit Fluted", material: "acoustic MDF fluted panels", finish: "Backlit Matte Painted", highlight: "Recessed LED grazing behind the fluting turns the wall into a soft light source at night." },
      { slug: "gallery-shelving-media-wall", name: "Gallery Shelving Media Wall", imageFile: "gallery-shelving-media-wall.jpg", layout: "Media Wall with Display Shelving", style: "Gallery Shelved", material: "engineered timber + steel", finish: "Two-Tone Wood & Matte", highlight: "Display niches and shelves are lit individually to highlight collected objects around the TV." },
    ]
  ),
};

const featureWalls: Subcategory = {
  slug: "feature-walls",
  parentSlug: "interiors",
  parentLabel: "Interiors",
  label: "Feature Walls",
  pluralLabel: "Feature Walls",
  routePath: "/interiors/feature-walls",
  products: buildInterior(
    { parentSlug: "interiors", parentLabel: "Interiors", slug: "feature-walls", label: "Feature Walls" },
    "interiors/feature-walls",
    [
      { slug: "arc-backlit-feature-wall", name: "Arc Backlit Feature Wall", imageFile: "backlit-feature-wall.jpg", layout: "Backlit Panelled Feature Wall", style: "Backlit Modern", material: "engineered MDF panels", finish: "Painted PU with Backlighting", highlight: "Grazing LED behind each panel turns the wall into a soft, sculpted light source." },
      { slug: "linea-fluted-wooden-wall", name: "Linea Fluted Wooden Wall", imageFile: "fluted-wooden-wall.jpg", layout: "Fluted Wooden Feature Wall", style: "Fluted Wood", material: "acoustic wooden fluted panels", finish: "Natural Wood Veneer", highlight: "Vertical wooden flutes bring warmth, texture and gentle acoustic softening." },
      { slug: "grove-slatted-wood-wall", name: "Grove Slatted Wood Wall", imageFile: "slatted-wood-wall.jpg", layout: "Slatted Wooden Feature Wall", style: "Slatted Wood", material: "solid timber slats on acoustic backing", finish: "Natural Timber", highlight: "Open timber slats over an acoustic backing tame room echo while creating rhythm." },
      { slug: "muse-decorative-panel-wall", name: "Muse Decorative Panel Wall", imageFile: "decorative-panel-wall.jpg", layout: "Decorative Panelled Feature Wall", style: "Decorative Panelled", material: "engineered MDF panels", finish: "Painted PU Decorative", highlight: "Decorative panel patterns are drawn to the room's proportions rather than fetched off a catalogue." },
      { slug: "quarry-stone-texture-wall", name: "Quarry Stone Texture Wall", imageFile: "stone-texture-wall.jpg", layout: "Stone-Texture Feature Wall", style: "Textured Stone", material: "engineered stone-look panels", finish: "Natural Stone-Look Texture", highlight: "Deep textured stone-look panels catch cove lighting to reveal shadow relief across the wall." },
      { slug: "silk-textured-plaster-wall", name: "Silk Textured Plaster Wall", imageFile: "textured-plaster-wall.jpg", layout: "Hand-Applied Textured Plaster", style: "Textured Plaster", material: "hand-applied venetian-style plaster", finish: "Micro-Textured Plaster", highlight: "Hand-applied plaster gives the wall a soft, silk-like depth that flat paint can never reach." },
      { slug: "arcadia-fluted-wooden-wall", name: "Arcadia Fluted Wooden Wall", imageFile: "arcadia-fluted-wooden-wall.jpg", layout: "Fluted Wooden Feature Wall", style: "Warm Fluted Wood", material: "acoustic wooden fluted panels", finish: "Warm Wood Veneer", highlight: "A warmer veneer tone brings the fluted wall into calm, hospitality-style rooms." },
      { slug: "canvas-decorative-panel-wall", name: "Canvas Decorative Panel Wall", imageFile: "canvas-decorative-panel-wall.jpg", layout: "Decorative Panelled Feature Wall", style: "Refined Decorative", material: "engineered MDF panels", finish: "PU Painted Soft Tones", highlight: "A restrained decorative grid in soft PU tones suits formal living and dining rooms." },
    ]
  ),
};

const bedWalls: Subcategory = {
  slug: "bed-walls",
  parentSlug: "interiors",
  parentLabel: "Interiors",
  label: "Bed Walls",
  pluralLabel: "Bed Walls",
  routePath: "/interiors/bed-walls",
  products: buildInterior(
    { parentSlug: "interiors", parentLabel: "Interiors", slug: "bed-walls", label: "Bed Walls" },
    "interiors/bed-walls",
    [
      { slug: "arc-backlit-bed-wall", name: "Arc Backlit Bed Wall", imageFile: "backlit-bed-wall.png", layout: "Backlit Panelled Bed Wall", style: "Backlit Modern", material: "engineered MDF panels", finish: "PU Painted with Backlighting", highlight: "A cove of LED behind the headboard wall wraps the bed in a soft, sleep-friendly light." },
      { slug: "linea-fluted-bed-wall", name: "Linea Fluted Bed Wall", imageFile: "fluted-bed-wall.png", layout: "Fluted Bed Wall", style: "Fluted Modern", material: "acoustic MDF fluted panels", finish: "Micro-Texture Matte", highlight: "Vertical flutes behind the bed create a calm, quietly luxurious backdrop." },
      { slug: "canopy-extended-headboard-wall", name: "Canopy Extended Headboard Wall", imageFile: "extended-headboard-wall.png", layout: "Extended Headboard Feature Wall", style: "Extended Headboard", material: "engineered MDF panels", finish: "Woodgrain + Upholstery", highlight: "The headboard extends the full wall width and wraps into flanking bedside niches." },
      { slug: "aria-panelled-headboard-wall", name: "Aria Panelled Headboard Wall", imageFile: "panelled-headboard-wall.png", layout: "Panelled Headboard Wall", style: "Panelled Refined", material: "engineered MDF panels", finish: "PU Painted Panelled", highlight: "Slim panels behind the bed give the wall gentle depth without visual weight." },
      { slug: "willow-wooden-headboard-wall", name: "Willow Wooden Headboard Wall", imageFile: "wooden-headboard-wall.png", layout: "Wooden Headboard Wall", style: "Warm Wooden", material: "engineered wooden panels", finish: "Natural Wood Veneer", highlight: "Warm veneers turn the wall into a natural material anchor for the master suite." },
      { slug: "silk-upholstered-bed-wall", name: "Silk Upholstered Bed Wall", imageFile: "upholstered-bed-wall.png", layout: "Upholstered Bed Wall", style: "Upholstered Luxe", material: "upholstered acoustic panels", finish: "Premium Fabric Upholstery", highlight: "Upholstered panels add softness, acoustic comfort and a hotel-suite feel." },
      { slug: "muse-fluted-bed-wall", name: "Muse Fluted Bed Wall", imageFile: "muse-fluted-bed-wall.png", layout: "Fluted Bed Wall", style: "Warm Fluted", material: "acoustic wooden fluted panels", finish: "Warm Wood Veneer", highlight: "A warmer wood-tone fluting brings texture without cooling the bedroom palette." },
      { slug: "atlas-extended-headboard-wall", name: "Atlas Extended Headboard Wall", imageFile: "atlas-extended-headboard-wall.png", layout: "Extended Headboard Feature Wall", style: "Architectural Extended Headboard", material: "engineered MDF panels", finish: "Two-Tone Painted", highlight: "Two-tone panelling around the headboard creates architectural framing for the bed." },
    ]
  ),
};

const woodenFlooring: Subcategory = {
  slug: "wooden-flooring",
  parentSlug: "interiors",
  parentLabel: "Interiors",
  label: "Wooden Flooring",
  pluralLabel: "Wooden Flooring",
  routePath: "/interiors/wooden-flooring",
  products: buildInterior(
    { parentSlug: "interiors", parentLabel: "Interiors", slug: "wooden-flooring", label: "Wooden Flooring" },
    "interiors/wooden-flooring",
    [
      { slug: "atelier-herringbone-flooring", name: "Atelier Herringbone Flooring", imageFile: "herringbone-flooring.png", layout: "Herringbone Pattern Flooring", style: "Classic Herringbone", material: "engineered wood planks", finish: "Matte Lacquered Wood", highlight: "The classic herringbone pattern adds craft, movement and value to any room." },
      { slug: "prism-chevron-flooring", name: "Prism Chevron Flooring", imageFile: "chevron-flooring.png", layout: "Chevron Pattern Flooring", style: "Modern Chevron", material: "engineered wood planks", finish: "Matte Lacquered Wood", highlight: "Sharp chevron mitres create a directional pattern that stretches the room visually." },
      { slug: "linea-wide-plank-flooring", name: "Linea Wide Plank Flooring", imageFile: "wide-plank-flooring.png", layout: "Wide Plank Flooring", style: "Wide Plank Modern", material: "engineered wood planks", finish: "Matte Lacquered Wood", highlight: "Extra-wide planks reduce joint lines and let the timber grain read as an unbroken surface." },
      { slug: "grove-natural-oak-flooring", name: "Grove Natural Oak Flooring", imageFile: "natural-oak-flooring.png", layout: "Plank Oak Flooring", style: "Natural Oak", material: "engineered European oak planks", finish: "Natural Oiled Oak", highlight: "European oak in a natural oiled finish adds warmth without darkening the room." },
      { slug: "core-engineered-wood-flooring", name: "Core Engineered Wood Flooring", imageFile: "engineered-wood-flooring.png", layout: "Engineered Plank Flooring", style: "Engineered Modern", material: "multi-ply engineered wood", finish: "Matte Lacquered Wood", highlight: "A multi-ply engineered core keeps the plank dimensionally stable through humidity swings." },
      { slug: "heritage-solid-wood-flooring", name: "Heritage Solid Wood Flooring", imageFile: "solid-wood-flooring.png", layout: "Solid Plank Flooring", style: "Solid Timber Heritage", material: "solid seasoned timber", finish: "Traditional Waxed Timber", highlight: "Solid seasoned timber can be sanded back and refinished multiple times over its lifespan." },
      { slug: "atlas-chevron-flooring", name: "Atlas Chevron Flooring", imageFile: "atlas-chevron-flooring.png", layout: "Chevron Pattern Flooring", style: "Bold Chevron", material: "engineered wood planks", finish: "Dark Stained Chevron", highlight: "A darker stain deepens the chevron pattern for dramatic living spaces." },
      { slug: "verano-wide-plank-flooring", name: "Verano Wide Plank Flooring", imageFile: "verano-wide-plank-flooring.png", layout: "Wide Plank Flooring", style: "Sun-Bleached Wide Plank", material: "engineered wood planks", finish: "Sun-Bleached Oak", highlight: "A sun-bleached oak finish keeps rooms feeling bright and coastal-relaxed." },
    ]
  ),
};

// ---- HOME FURNITURES ----
function buildFurniture(parent: { parentSlug: string; parentLabel: string; slug: string; label: string }, folder: string, seeds: ProductSeed[]): Product[] {
  const gallery = seeds.slice(0, 5).map((s) => img(`public/category-images/${folder}/${s.imageFile}`));
  return seeds.map((s) =>
    makeProduct(parent, {
      slug: s.slug,
      name: s.name,
      image: img(`public/category-images/${folder}/${s.imageFile}`),
      tagline: `${s.style} · ${s.layout}`,
      intro: `The ${s.name} is a made-to-measure ${parent.label.toLowerCase()} piece designed to sit inside your interior scheme rather than compete with it. WoodLab tailors the proportions, finish and function to your room.`,
      editorialTitle: `Bespoke Function: The ${s.name}`,
      editorial: [
        `The ${s.name} is engineered as a permanent piece of the room. The construction is built on a ${s.material} carcass, with every joint concealed and every visible edge properly detailed.`,
        `The surface treatment is ${s.finish.toLowerCase()}, chosen to complement the room's overall palette and to survive real family use. ${s.highlight}`,
        `Every internal element — drawers, shelves, cable management, lighting — is planned around the objects you actually store and the way you actually use the piece. Nothing is ornamental for its own sake.`,
        `WoodLab handles the complete process: 3D preview, factory build, on-site assembly and finishing. The piece is delivered ready to use, with all hardware pre-installed and adjusted.`,
      ],
      specs: [
        { label: "Type", value: s.layout },
        { label: "Style", value: s.style },
        { label: "Carcass Material", value: s.material },
        { label: "Finish", value: s.finish },
        { label: "Hardware", value: "Blum / Hettich Soft-Close" },
        { label: "Sizing", value: "Fully Custom" },
        { label: "Coordination", value: "Matched to Interior Scheme" },
        { label: "Execution", value: "Complete Design & Delivery" },
      ],
      features: furnitureFeatures(s.finish),
      gallery,
    })
  );
}

const laminatedFurniture: Subcategory = {
  slug: "laminated",
  parentSlug: "home-furnitures",
  parentLabel: "Home Furnitures",
  label: "Laminated Furnitures",
  pluralLabel: "Laminated Furnitures",
  routePath: "/home-furnitures/laminated",
  products: buildFurniture(
    { parentSlug: "home-furnitures", parentLabel: "Home Furnitures", slug: "laminated", label: "Laminated Furnitures" },
    "home-furnitures/laminated",
    [
      { slug: "nova-laminated-bed", name: "Nova Laminated Bed", imageFile: "laminated-bed.png", layout: "Upholstered-Head Laminated Bed", style: "Modern Laminated Bed", material: "moisture-resistant HDHMR", finish: "Matte Laminate", highlight: "A slim laminated frame is paired with a soft upholstered headboard for daily comfort." },
      { slug: "orion-laminated-tv-unit", name: "Orion Laminated TV Unit", imageFile: "laminated-tv-unit.png", layout: "Wall-Hung Laminated TV Unit", style: "Modern Laminated Media", material: "moisture-resistant HDHMR", finish: "Matte Laminate", highlight: "A wall-hung format keeps the floor clear and integrates cleanly with a full media wall." },
      { slug: "atlas-laminated-storage-cabinet", name: "Atlas Laminated Storage Cabinet", imageFile: "laminated-storage-cabinet.png", layout: "Floor-Standing Laminated Storage", style: "Modern Laminated Storage", material: "moisture-resistant HDHMR", finish: "Woodgrain Laminate", highlight: "A tall storage cabinet planned with adjustable shelving and soft-close doors." },
      { slug: "linea-laminated-study-desk", name: "Linea Laminated Study Desk", imageFile: "laminated-study-desk.png", layout: "Wall-Facing Study Desk", style: "Minimal Study Desk", material: "moisture-resistant HDHMR", finish: "Matte Laminate", highlight: "A minimal desk with integrated cable channel and pedestal drawer unit." },
      { slug: "harbor-modular-storage-wall", name: "Harbor Modular Storage Wall", imageFile: "modular-storage-wall.png", layout: "Full Modular Storage Wall", style: "Full-Height Modular", material: "moisture-resistant HDHMR", finish: "Woodgrain + Matte Mix", highlight: "A floor-to-ceiling modular wall that combines display, storage and integrated screens." },
      { slug: "junior-laminated-kids-room", name: "Junior Laminated Kids Room Set", imageFile: "kids-room-furniture.png", layout: "Kids Bedroom Furniture Set", style: "Playful Laminated Kids", material: "moisture-resistant HDHMR", finish: "Matte Laminate with Accent Colours", highlight: "Rounded edges, safe hardware and playful accent colours built for a real kids room." },
      { slug: "muse-laminated-bed", name: "Muse Laminated Bed", imageFile: "muse-laminated-bed.png", layout: "Storage-Base Laminated Bed", style: "Storage Laminated Bed", material: "moisture-resistant HDHMR", finish: "Matte Laminate", highlight: "Hydraulic storage under the mattress reclaims a full wardrobe's worth of hidden storage." },
      { slug: "prism-laminated-tv-unit", name: "Prism Laminated TV Unit", imageFile: "prism-laminated-tv-unit.png", layout: "Floor-Standing Laminated TV Unit", style: "Two-Tone Laminated Media", material: "moisture-resistant HDHMR", finish: "Two-Tone Laminate", highlight: "A two-tone body integrates open display shelving with closed cable-management storage." },
    ]
  ),
};

const cushionFurniture: Subcategory = {
  slug: "cushion",
  parentSlug: "home-furnitures",
  parentLabel: "Home Furnitures",
  label: "Cushion Furnitures",
  pluralLabel: "Cushion Furnitures",
  routePath: "/home-furnitures/cushion",
  products: buildFurniture(
    { parentSlug: "home-furnitures", parentLabel: "Home Furnitures", slug: "cushion", label: "Cushion Furnitures" },
    "home-furnitures/cushion",
    [
      { slug: "linea-three-seater-sofa", name: "Linea Three-Seater Sofa", imageFile: "three-seater-sofa.png", layout: "Three-Seater Sofa", style: "Modern Upholstered", material: "engineered hardwood frame", finish: "Premium Upholstery Fabric", highlight: "A slim, tailored profile suits open living rooms without overwhelming the space." },
      { slug: "atlas-sectional-sofa", name: "Atlas Sectional Sofa", imageFile: "sectional-sofa.png", layout: "L-Shaped Sectional Sofa", style: "Contemporary Sectional", material: "engineered hardwood frame", finish: "Premium Upholstery Fabric", highlight: "A generous L-shaped sectional planned around your TV wall and living room proportions." },
      { slug: "muse-accent-armchair", name: "Muse Accent Armchair", imageFile: "accent-armchair.png", layout: "Statement Accent Armchair", style: "Sculpted Accent", material: "engineered hardwood frame", finish: "Premium Upholstery Fabric", highlight: "A sculpted profile makes this armchair a design statement in a living room or master suite." },
      { slug: "chalet-lounge-chair", name: "Chalet Lounge Chair", imageFile: "lounge-chair.png", layout: "Reclined Lounge Chair", style: "Relaxed Lounge", material: "engineered hardwood frame", finish: "Premium Upholstery Fabric", highlight: "A reclined lounge chair sized for real relaxation next to a window or reading corner." },
      { slug: "muse-ottoman-bench", name: "Muse Ottoman Bench", imageFile: "ottoman-bench.png", layout: "Upholstered Bench / Ottoman", style: "Upholstered Bench", material: "engineered hardwood frame", finish: "Premium Upholstery Fabric", highlight: "A footboard or entry bench with hidden internal storage under a hinged upholstered lid." },
      { slug: "silk-upholstered-bed", name: "Silk Upholstered Bed", imageFile: "upholstered-bed.png", layout: "Upholstered Storage Bed", style: "Upholstered Luxe Bed", material: "engineered hardwood frame", finish: "Premium Upholstery Fabric", highlight: "A tall upholstered headboard and side panels wrap the bed in a hotel-suite feel." },
      { slug: "aurora-sectional-sofa", name: "Aurora Sectional Sofa", imageFile: "aurora-sectional-sofa.png", layout: "L-Shaped Sectional Sofa", style: "Family Sectional", material: "engineered hardwood frame", finish: "Stain-Resistant Fabric", highlight: "A stain-resistant fabric and deep, family-scale seating built for daily living rooms." },
      { slug: "muse-lounge-chair", name: "Muse Lounge Chair", imageFile: "muse-lounge-chair.png", layout: "Reclined Lounge Chair", style: "Sculpted Lounge", material: "engineered hardwood frame", finish: "Premium Upholstery Fabric", highlight: "A more sculpted lounge chair profile for design-forward living rooms." },
    ]
  ),
};

const woodenFurniture: Subcategory = {
  slug: "wooden",
  parentSlug: "home-furnitures",
  parentLabel: "Home Furnitures",
  label: "Wooden Furnitures",
  pluralLabel: "Wooden Furnitures",
  routePath: "/home-furnitures/wooden",
  products: buildFurniture(
    { parentSlug: "home-furnitures", parentLabel: "Home Furnitures", slug: "wooden", label: "Wooden Furnitures" },
    "home-furnitures/wooden",
    [
      { slug: "willow-wooden-bed", name: "Willow Wooden Bed", imageFile: "wooden-bed.png", layout: "Solid Wood Bed", style: "Warm Wooden Bed", material: "solid seasoned timber", finish: "Natural Timber Polish", highlight: "A solid wood frame with a warm natural polish that ages beautifully over time." },
      { slug: "grove-wooden-dining-table", name: "Grove Wooden Dining Table", imageFile: "wooden-dining-table.png", layout: "Solid Wood Dining Table", style: "Family Dining", material: "solid seasoned timber", finish: "Matte Lacquered Wood", highlight: "A generous family dining table sized to your room and daily seating requirement." },
      { slug: "atlas-wooden-cabinet", name: "Atlas Wooden Cabinet", imageFile: "wooden-cabinet.png", layout: "Tall Wooden Storage Cabinet", style: "Warm Wooden Storage", material: "engineered timber & veneer", finish: "Natural Wood Veneer", highlight: "A tall wooden cabinet with adjustable shelving, ideal for dining or hallway storage." },
      { slug: "linea-wooden-console-table", name: "Linea Wooden Console Table", imageFile: "wooden-console-table.png", layout: "Wooden Console Table", style: "Slim Wooden Console", material: "solid seasoned timber", finish: "Matte Lacquered Wood", highlight: "A slim console for the entryway, living room or behind a sofa." },
      { slug: "muse-wooden-side-table", name: "Muse Wooden Side Table", imageFile: "wooden-side-table.png", layout: "Wooden Side Table", style: "Sculpted Side Table", material: "solid seasoned timber", finish: "Natural Timber Polish", highlight: "A sculpted side table designed to pair with lounge chairs and sofas at proper armrest height." },
      { slug: "chalet-wooden-sideboard", name: "Chalet Wooden Sideboard", imageFile: "wooden-sideboard.png", layout: "Wooden Sideboard", style: "Warm Wooden Sideboard", material: "engineered timber & veneer", finish: "Natural Wood Veneer", highlight: "A dining or living sideboard that combines display shelving with closed storage." },
      { slug: "verano-wooden-dining-table", name: "Verano Wooden Dining Table", imageFile: "verano-wooden-dining-table.png", layout: "Solid Wood Dining Table", style: "Coastal Wooden Dining", material: "solid seasoned timber", finish: "Sun-Bleached Timber", highlight: "A sun-bleached finish suits coastal-relaxed dining rooms without darkening the space." },
      { slug: "regent-wooden-cabinet", name: "Regent Wooden Cabinet", imageFile: "regent-wooden-cabinet.png", layout: "Tall Wooden Storage Cabinet", style: "Formal Wooden Storage", material: "engineered timber & veneer", finish: "Dark Stained Veneer", highlight: "A darker stained veneer suits formal dining rooms and library-style studies." },
    ]
  ),
};

// ---- REGISTRY ----
export const SUBCATEGORIES: Subcategory[] = [
  modularKitchen, classicKitchen, modernKitchen,
  wardrobe, classicWardrobe, aluminiumWardrobe, walkInCloset,
  mainDoors, bedBathroomDoors, engineeredDoors, slidingDoors,
  mediaWalls, featureWalls, bedWalls, woodenFlooring,
  laminatedFurniture, cushionFurniture, woodenFurniture,
];

export const SUBCATEGORY_BY_SLUG: Record<string, Subcategory> = Object.fromEntries(
  SUBCATEGORIES.map((s) => [s.slug, s])
);

export const ALL_PRODUCTS: Product[] = SUBCATEGORIES.flatMap((s) => s.products);

export function findProduct(subcategorySlug: string, productSlug: string): Product | undefined {
  const sub = SUBCATEGORY_BY_SLUG[subcategorySlug];
  if (!sub) return undefined;
  return sub.products.find((p) => p.slug === productSlug);
}

export function productPath(p: Product): string {
  return `/design/${p.subcategorySlug}/${p.slug}`;
}
