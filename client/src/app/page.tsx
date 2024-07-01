"use client";

import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Loading from "@/components/Loading";
import { get } from "@/utils/request";
import Post from "@/components/Post";

export default function Home() {
  const container = useRef(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
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
    { dependencies: [posts], scope: container }
  );

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const { posts: fetchedPosts } = await get("/posts/list-all");
      console.log(fetchedPosts);
      setPosts(fetchedPosts);
      setLoading(false);
    };
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            ref={container}
            className="w-[calc(100vw_-_4rem)] masonry-layout"
          >
            {posts.map((post: any, index) => (
              <div className="post-card" key={index}>
                <Post key={index} post={post} />
              </div>
            ))}
          </div>
          <p className="text-center">No more posts to show</p>
        </>
      )}
    </>
  );
}
