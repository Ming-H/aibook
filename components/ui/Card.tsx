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
      className={`rounded-2xl border-2 border-[var(--border-default)] bg-[var(--background-elevated)] backdrop-blur-sm p-6 shadow-lg ${hover ? "transition-all duration-300 hover:border-[var(--border-medium)] hover:shadow-xl" : ""
        } ${className}`}
    >
      {children}
    </div>
  );
}

