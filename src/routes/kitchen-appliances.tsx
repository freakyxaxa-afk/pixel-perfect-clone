import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/kitchen-appliances")({
  component: () => <Outlet />,
});
