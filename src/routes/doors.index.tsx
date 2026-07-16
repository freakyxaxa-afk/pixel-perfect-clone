import { createFileRoute } from "@tanstack/react-router";
import { MainCategoryPage, type CategoryTile } from "@/components/MainCategoryPage";

const tiles: CategoryTile[] = [
  { label: 'Main Doors', image: '/category-images/doors/main-doors/hero.jpg', to: '/doors/main-doors' },
  { label: 'Bed & Bathroom Doors', image: '/category-images/doors/bed-bathroom-doors/hero.jpg', to: '/doors/bed-bathroom-doors' },
  { label: 'Engineered Doors', image: '/category-images/doors/engineered-doors/hero.jpg', to: '/doors/engineered-doors' },
  { label: 'Sliding Doors', image: '/category-images/doors/sliding-doors/hero.jpg', to: '/doors/sliding-doors' }
];

export const Route = createFileRoute("/doors/")({
  head: () => ({
    meta: [
      { title: 'Doors — WoodLab Islamabad' },
      { name: "description", content: 'Bespoke main, bedroom, bathroom, engineered and sliding doors designed and installed by WoodLab.' },
      { property: "og:title", content: 'Doors — WoodLab Islamabad' },
      { property: "og:description", content: 'Bespoke main, bedroom, bathroom, engineered and sliding doors designed and installed by WoodLab.' },
    ],
  }),
  component: () => (
    <MainCategoryPage
      eyebrow='Doors'
      title='Doors'
      subtitle='Main entrance doors, bedroom & bathroom doors, engineered doors and sliding doors.'
      tiles={tiles}
    />
  ),
});
