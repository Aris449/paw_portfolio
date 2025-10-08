"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false); // force initial state to light
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force light theme on initial load
    document.documentElement.classList.remove("dark");
    setIsDark(false);
    localStorage.setItem("theme", "light");
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newDark = !isDark;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const targetBg = newDark ? "#1a1a1a" : "#ffffff";

    // Wave transition using View Transitions API
    document.startViewTransition(() => {
      if (newDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      setIsDark(newDark);
    });

    const style = document.createElement("style");
    style.textContent = `
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        pointer-events: none;
      }
      ::view-transition-old(root) { animation-name: fadeOld; }
      ::view-transition-new(root) {
        animation-name: revealNew;
        clip-path: circle(0% at ${x}px ${y}px);
        background: ${targetBg};
      }
      @keyframes fadeOld { to { opacity: 0; } }
      @keyframes revealNew { to { clip-path: circle(150% at ${x}px ${y}px); } }
    `;
    document.head.appendChild(style);

    // GSAP icon transition
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0, rotate: -90, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-[50px] h-[50px] flex-none"
    >
      <div ref={iconRef} className="absolute inset-0">
        <Image
          src={isDark ? "/moon.png" : "/sun.png"}
          alt="theme icon"
          width={50}
          height={50}
        />
      </div>
    </button>
  );
}
