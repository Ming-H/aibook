import { ReactNode, MouseEventHandler } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Card({ children, className = "", hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-sm p-6 shadow-xl shadow-black/20 ${hover ? "transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10" : ""
        } ${className}`}
    >
      {children}
    </div>
  );
}

