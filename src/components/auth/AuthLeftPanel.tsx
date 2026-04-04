import Image from "next/image";

export default function AuthLeftPanel() {
  return (
    <div
      className="hidden md:flex flex-col px-10 pt-10 pb-8"
      style={{ width: "462px", height: "501px" }}
    >
      <div className="flex justify-center mb-10">
        <Image
          src="/nexlearn-logo-1.png"
          alt="NexLearn"
          width={180}
          height={60}
          className="object-contain"
          loading="eager"
          priority
        />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/nexlearn-logo-2.png"
          alt="NexLearn Illustration"
          width={320}
          height={320}
          className="object-contain"
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
