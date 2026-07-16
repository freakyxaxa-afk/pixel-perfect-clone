import { createFileRoute } from "@tanstack/react-router";
import { MainCategoryPage, type CategoryTile } from "@/components/MainCategoryPage";

const tiles: CategoryTile[] = [
  { label: 'Wardrobe', image: '/category-images/wardrobes/wardrobe/hero.jpg', to: '/wardrobes/wardrobe' },
  { label: 'Classic Wardrobe', image: '/category-images/wardrobes/classic-wardrobe/hero.jpg', to: '/wardrobes/classic-wardrobe' },
  { label: 'Aluminium Wardrobe', image: '/category-images/wardrobes/aluminium-wardrobe/hero.jpg', to: '/wardrobes/aluminium-wardrobe' },
  { label: 'Walk-in Closet', image: '/category-images/wardrobes/walk-in-closet/hero.jpg', to: '/wardrobes/walk-in-closet' }
];

export const Route = createFileRoute("/wardrobes/")({
  head: () => ({
    meta: [
      { title: 'Wardrobes — WoodLab Islamabad' },
      { name: "description", content: 'Bespoke fitted, classic, aluminium and walk-in wardrobes designed and installed by WoodLab in Islamabad.' },
      { property: "og:title", content: 'Wardrobes — WoodLab Islamabad' },
      { property: "og:description", content: 'Bespoke fitted, classic, aluminium and walk-in wardrobes designed and installed by WoodLab in Islamabad.' },
    ],
  }),
  component: () => (
    <MainCategoryPage
      eyebrow='Wardrobes'
      title='Wardrobes'
      subtitle='Fitted, classic, aluminium and walk-in wardrobes — tailored to your bedroom.'
      tiles={tiles}
    />
  ),
});
