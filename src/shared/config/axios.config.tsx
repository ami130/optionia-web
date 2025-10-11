"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInitializer() {
  useEffect(() => {
    // Initialize only on client side
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });

    // Refresh AOS after page transitions (useful for Next.js)
    const refreshAOS = () => {
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    };

    window.addEventListener("load", refreshAOS);
    return () => window.removeEventListener("load", refreshAOS);
  }, []);

  return null;
}
