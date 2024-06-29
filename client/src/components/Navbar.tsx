"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { gsap, TimelineLite } from "gsap";
import { Menu, Plus, TrendingUp, X } from "lucide-react";
import Link from "next/link";

const links = [
  {
    path: "/create",
    label: "Make a new Post",
  },
  {
    path: "/calorie",
    label: "Steps Calculator",
  },
  {
    path: "/register",
    label: "Register",
  },
  {
    path: "/login",
    label: "Login",
  },
  {
    path: "/user",
    label: "Profile",
  },
];

export default function Navbar() {
  const container = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const tl = useRef<TimelineLite | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".menu-link-item-holder", { y: 75 });
      tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: -0.75,
        });
    },
    { scope: container }
  );

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isOpen]);

  return (
    <nav className="isolate" ref={container}>
      {/* menu-bar */}
      <div className="fixed top-0 left-0 w-full p-8 z-1">
        <div className="flex justify-between items-center bg-white text-black px-6 py-4 rounded-2xl border border-black shadow-[2px_2px_0_0_rgba(0,_0,_0)]">
          <Link href="/" className="flex items-center gap-2 ">
            <Image src="logo.svg" alt="Logo" width={48} height={48} />
            <p className="font-bold text-xl">BeBetter</p>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2"
          >
            <Menu className="w-8 h-8" />
            <p>MENU</p>
          </button>
        </div>
      </div>

      <div className="menu-overlay">
        <div className="fixed top-0 left-0 w-full p-8 z-1">
          <div className="flex justify-between items-center px-6 py-4 ">
            <Link href="/" className="flex items-center gap-2">
              <Image src="logo.svg" alt="Logo" width={48} height={48} />
              <p className="font-bold text-xl text-main">BeBetter</p>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-main"
            >
              <X className="w-8 h-8" />
              <p>CLOSE</p>
            </button>
          </div>
        </div>

        <div className="menu-copy">
          <div className="md:space-y-6 space-y-8">
            {links.map((link, index) => (
              <div key={index} className="menu-link-item">
                <div
                  className="menu-link-item-holder relative"
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    className="text-main md:text-4xl text-2xl relative after:contents-[''] after:w-0 after:transition-all after:duration-200 hover:after:w-full after:h-1 after:absolute after:bottom-0 after:bg-main flex w-max items-center gap-8"
                    href={link.path}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <div className="flex-1 flex flex-col justify-end text-main">
              <p>Yum</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
