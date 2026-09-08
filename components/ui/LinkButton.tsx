"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonBase, buttonVariants, type ButtonVariant } from "./buttonStyles";

interface LinkButtonProps {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({ href, variant = "primary", className, children }: LinkButtonProps) {
  return (
    <Link href={href} className="inline-block">
      <motion.span
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 420, damping: 22 }}
        className={cn(buttonBase, buttonVariants[variant], className)}
      >
        {children}
      </motion.span>
    </Link>
  );
}
