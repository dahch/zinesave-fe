import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    scale?: "sm" | "md" | "lg" | "xl";
    className?: string;
    linkToHome?: boolean;
}

export default function Logo({ scale = "md", className = "", linkToHome = true }: LogoProps) {
    const sizeMap = {
        sm: { width: 32, height: 32, textSize: "text-lg" },
        md: { width: 42, height: 42, textSize: "text-xl md:text-2xl" },
        lg: { width: 48, height: 48, textSize: "text-3xl" },
        xl: { width: 64, height: 64, textSize: "text-5xl" },
    };

    const { width, height, textSize } = sizeMap[scale];

    const content = (
        <div className={`flex items-center gap-2 ${className}`}>
            <Image src="/icon.png" alt="ZineSave Logo" width={width} height={height} />
            <span className={`font-bold text-brand-navy ${textSize}`}>
                Zine<span className="text-brand-orange">Save</span>
            </span>
        </div>
    );

    if (linkToHome) {
        return <Link href="/">{content}</Link>;
    }

    return content;
}
