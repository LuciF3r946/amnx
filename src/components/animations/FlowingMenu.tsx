import React from "react";
import { gsap } from "gsap";

// Types
interface MenuItemProps {
    link: string;
    text: string;
    hoverText: string;
}

interface FlowingMenuProps {
    items: MenuItemProps[];
}

// Menu container
const FlowingMenu: React.FC<FlowingMenuProps> = ({ items }) => {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            {/* Desktop View - Keep exactly the same */}
            <div className="hidden md:contents">
                {items.map((item, idx) => (
                    <MenuItem key={`desktop-${idx}`} {...item} />
                ))}
            </div>

            {/* Mobile View - Optimized approach */}
            <div className="md:hidden flex flex-col space-y-4 h-full justify-center px-4">
                {items.map((item, idx) => (
                    <MobileMenuItem key={`mobile-${idx}`} {...item} />
                ))}
            </div>
        </div>
    );
};

// Desktop menu item (unchanged)
const MenuItem: React.FC<MenuItemProps> = ({ link, text, hoverText }) => {
    const frontRef = React.useRef<HTMLDivElement>(null);
    const backRef = React.useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (!frontRef.current || !backRef.current) return;
        gsap.to(frontRef.current, { y: "-100%", duration: 0.4, ease: "power3.out" });
        gsap.to(backRef.current, { y: "0%", duration: 0.4, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
        if (!frontRef.current || !backRef.current) return;
        gsap.to(frontRef.current, { y: "0%", duration: 0.4, ease: "power3.out" });
        gsap.to(backRef.current, { y: "100%", duration: 0.4, ease: "power3.out" });
    };

    return (
        <div className="relative overflow-hidden h-[140px] md:h-[150px] cursor-pointer">
            <a
                href={link}
                className="block w-full h-full relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Front */}
                <div
                    ref={frontRef}
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold text-2xl md:text-4xl"
                >
                    {text}
                </div>

                {/* Back */}
                <div
                    ref={backRef}
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-background text-foreground px-4 text-center border border-border translate-y-full"
                >
                    <span className="uppercase font-medium text-sm md:text-lg leading-tight text-muted-foreground">
                        {hoverText}
                    </span>
                </div>
            </a>
        </div>
    );
};

// Mobile-optimized menu item
const MobileMenuItem: React.FC<MenuItemProps> = ({ link, text, hoverText }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
    };

    const handleNavigate = () => {
        window.location.href = link;
    };

    return (
        <div className="mobile-menu-item">
            {/* Main button */}
            <button
                onClick={handleToggle}
                className="w-full bg-primary text-primary-foreground font-bold text-xl py-6 px-6 rounded-xl transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl mobile-flowing-menu-button"
            >
                <div className="flex items-center justify-between">
                    <span>{text}</span>
                    <svg
                        className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Expandable content */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-background border border-border rounded-xl p-4 shadow-md">
                    <p className="text-muted-foreground text-sm uppercase font-medium leading-relaxed mb-4 text-center">
                        {hoverText}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default FlowingMenu;
