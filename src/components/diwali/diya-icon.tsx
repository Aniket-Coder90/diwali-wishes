import { cn } from "@/lib/utils";

export default function DiyaIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", className)}
    >
      <path d="M12 2a4 4 0 0 0-4 4c0 1.5.67 2.83 1.75 3.65A8.02 8.02 0 0 0 4 18c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4a8.02 8.02 0 0 0-5.75-7.35C15.33 8.83 16 7.5 16 6a4 4 0 0 0-4-4z" fill="hsl(var(--accent))" stroke="none" />
      <path d="M8 22h8" stroke="hsl(var(--primary))" />
      <path d="M12 2c-1 2-1 4 0 6" stroke="hsl(var(--background))" strokeWidth="1.5" />
      <path d="M12 8a2 2 0 0 0-1.05.35" stroke="hsl(var(--primary-foreground))" opacity="0.5" />
    </svg>
  );
}
