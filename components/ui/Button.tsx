import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white hover:from-blue-500 hover:via-purple-500 hover:to-cyan-400 shadow-lg shadow-blue-500/30 focus:ring-blue-500",
    secondary:
      "bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 focus:ring-slate-500",
    outline:
      "bg-transparent text-slate-200 border-2 border-slate-600 hover:bg-slate-800 hover:border-slate-500 focus:ring-slate-500",
    ghost:
      "bg-transparent text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus:ring-slate-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

