import type { SVGProps } from "react";

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.7c-1.2.1-2.4-.2-3.5-.8v5.9c0 3.4-2.4 5.8-5.6 5.8-2.9 0-5.3-2.2-5.3-5.1 0-3.1 2.6-5.3 6-4.9v2.9c-.5-.2-1-.2-1.5-.1-1.1.2-1.9 1.1-1.8 2.3.1 1.1 1 2 2.1 2 1.3 0 2.2-1 2.2-2.5V3h3.4z" />
    </svg>
  );
}
