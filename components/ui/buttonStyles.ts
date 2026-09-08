export type ButtonVariant = "primary" | "secondary" | "ghost";

export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[15px] font-medium leading-none transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-deep/50 disabled:opacity-50 disabled:pointer-events-none";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brown text-offwhite shadow-[0_10px_28px_-10px_rgba(51,42,39,0.55)] hover:bg-[#241d1b]",
  secondary:
    "bg-offwhite text-brown border border-brown/15 hover:border-brown/35 hover:bg-white",
  ghost: "bg-transparent text-brown hover:bg-brown/[0.06]",
};
