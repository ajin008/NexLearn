import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "outline" | "secondary";
}

export default function Button({
  children,
  loading,
  variant = "primary",
  className = "",
  disabled,
  ...rest
}: Props) {
  const base =
    "px-5 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60 cursor-pointer";
  const variants = {
    primary: "bg-[#1c3141] text-white hover:bg-[#243460]",
    outline: "border border-[#1c3141] text-[#1c3141] hover:bg-gray-50",
    secondary: "bg-[#317a9c] text-white hover:bg-[#243460]",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
