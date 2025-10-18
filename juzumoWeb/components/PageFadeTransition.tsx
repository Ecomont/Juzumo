"use client";
import { useEffect, useRef, useState } from "react";

export default function PageFadeTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fade in on mount
    setVisible(true);
  }, []);

  return (
    <div
      ref={ref}
      className={`page-fade-transition${visible ? " page-fade-in" : " page-fade-out"}`}
      style={{ transition: "opacity 0.5s cubic-bezier(.4,0,.2,1)", opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  );
}
