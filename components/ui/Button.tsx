import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "bg-green-500 hover:bg-green-600 transition-all duration-300",
        "text-white font-semibold",
        "px-5 py-3 rounded-xl",
        "shadow-lg shadow-green-500/20",
        "active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}