"use client";

import BarChart from "@/components/BarChart";
import Error from "@/components/Error";
import { get } from "@/utils/request";
import { PostType, ProfileInfoType } from "@/utils/types";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import PostNoUsername from "@/components/PostNoUsername";

export default function User() {
  const [data, setData] = useState<{
    profileInfo: ProfileInfoType;
    posts: PostType[];
  }>();

  useEffect(() => {
    const userId = localStorage.getItem("userId") as string;
    const getData = async () => {
      const { profileInfo } = await get(`/profile/info?userId=${userId}`);
      const { posts } = await get(`/profile/posts?userId=${userId}`);
      setData({ profileInfo, posts: posts.posts });
    };
    getData();
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          {data && (
            <div className="text-black flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col space-y-4 top-32 static md:max-h-[calc(100vh_-_13rem)] overflow-y-scroll no-scrollbar md:sticky">
                <div className="flex flex-wrap justify-center items-center gap-8">
                  <img
                    alt={`${data.profileInfo.name}'s Profile Picture`}
                    src={data.profileInfo.profilePicture}
                    width={128}
                    height={128}
                    className="w-48 h-48 object-cover rounded-full mx-auto"
                  />
                  <div className="text-center space-y-2">
                    <div className="space-y-1">
                      <h1 className="text-3xl font-bold">
                        {data.profileInfo.username}
                      </h1>
                      <p className="w-full">{data.profileInfo.description}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold">Average</p>
                      <p className="px-4 py-2 bg-white rounded-2xl text-lg w-fit mx-auto">
                        {data.profileInfo.averageSteps
                          ? data.profileInfo.averageSteps
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center flex flex-col gap-4 flex-grow">
                  <h2 className="text-xl font-bold">Recent steps</h2>
                  <div className="flex-1">
                    <BarChart
                      datasets={[
                        {
                          label: "Number of steps",
                          data: data.profileInfo.recentSteps,
                          backgroundColor: "#ffffff",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Recent archives</h2>
                <div className="masonry-layout">
                  {data.posts.map((post, index) => (
                    <PostNoUsername key={index} post={post} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Error message="Please login to access this page" />
      )}
    </>
  );
}
