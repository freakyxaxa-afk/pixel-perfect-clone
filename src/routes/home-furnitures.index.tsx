import { createFileRoute } from "@tanstack/react-router";
import { MainCategoryPage, type CategoryTile } from "@/components/MainCategoryPage";

const tiles: CategoryTile[] = [
  { label: 'Laminated Furnitures', image: '/category-images/home-furnitures/laminated/hero.png', to: '/home-furnitures/laminated' },
  { label: 'Cushion Furnitures', image: '/category-images/home-furnitures/cushion/hero.png', to: '/home-furnitures/cushion' },
  { label: 'Wooden Furnitures', image: '/category-images/home-furnitures/wooden/hero.png', to: '/home-furnitures/wooden' }
];

export const Route = createFileRoute("/home-furnitures/")({
  head: () => ({
    meta: [
      { title: 'Home Furnitures — WoodLab Islamabad' },
      { name: "description", content: 'Laminated, cushion and wooden home furniture designed and delivered by WoodLab.' },
      { property: "og:title", content: 'Home Furnitures — WoodLab Islamabad' },
      { property: "og:description", content: 'Laminated, cushion and wooden home furniture designed and delivered by WoodLab.' },
    ],
  }),
  component: () => (
    <MainCategoryPage
      eyebrow='Home Furnitures'
      title='Home Furnitures'
      subtitle='Laminated, cushion and solid wooden furniture for every room.'
      tiles={tiles}
    />
  ),
});
