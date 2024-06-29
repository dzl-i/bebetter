"use client";

import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.set(".post", { y: 20, opacity: 0 });
      gsap.to(".post", {
        scrollTrigger: ".post",
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1,
      });
    },
    { scope: container }
  );
  const postArr = [
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
  ];
  return (
    <main className="p-8 bg-main min-h-screen isolate">
      <div className="fixed z-10">
        <Navbar />
      </div>
      <div className="mt-24 z-0" ref={container}>
        <div className="masonry-layout">
          {postArr.map((show, index) => (
            <div key={index}>
              <Post key={index} showImage={show ? true : false} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
