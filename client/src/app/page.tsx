"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Loading from "@/components/Loading";
import { get } from "@/utils/request";

export default function Home() {
  const container = useRef(null);
  const [loading, setLoading] = useState(true);
  useGSAP(
    () => {
      gsap.set(".post-card", { y: 20, opacity: 0 });
      gsap.to(".post-card", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1,
      });
    },
    { scope: container }
  );

  useEffect(() => {
    const getPosts = async () => {
      const res = await get("/posts/list-all");
      console.log(res);
      setLoading(false);
    };
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <div ref={container} className="masonry-layout">
          {/* {postArr.map((show, index) => (
            <div className="post-card" key={index}>
            <Post key={index} showImage={show ? true : false} />
            </div>
            ))} */}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
