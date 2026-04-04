import Image from "next/image";
import Button from "./Button";

interface Props {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: Props) {
  return (
    <nav
      className="w-full flex items-center justify-between px-6 py-3 shadow-sm bg-white"
      style={{ height: "60px" }}
    >
      {/* Left — spacer */}
      <div className="w-24 hidden md:block" />

      {/* Center — Logo */}
      <div className="flex items-center justify-center flex-1 md:flex-none">
        <Image
          src="/nexlearn-logo-4.png"
          alt="NexLearn"
          width={130}
          height={44}
          className="object-contain"
          // ← filter removed
        />
      </div>

      {/* Right — Logout */}
      <div className="w-24 flex justify-end">
        {onLogout && (
          <Button
            variant="secondary"
            onClick={onLogout}
            className="text-xs px-4 py-1.5"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}
