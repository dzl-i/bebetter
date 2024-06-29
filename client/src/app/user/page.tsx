"use client";

import BarChart from "@/components/BarChart";
import Error from "@/components/Error";

export default function User() {
  return (
    <>
      {document.cookie ? (
        <div className="text-black flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col space-y-4 top-32 static md:max-h-[calc(100vh_-_13rem)] overflow-y-scroll no-scrollbar md:sticky">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <img
                alt="Profile picture"
                src="/minecraft.png"
                width={128}
                height={128}
                className="w-48 h-48 object-cover rounded-full mx-auto"
              />
              <div className="text-center space-y-2">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold">DeezNuts_6969</h1>
                  <p className="w-full">
                    21 yo, I love ABGs and i like to run yeehaw deeznuts skibidi
                    pew pew pew
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold">Average</p>
                  <p className="px-4 py-2 bg-white rounded-2xl text-lg w-fit mx-auto">
                    69,000 steps a day
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col gap-4 flex-grow">
              <h2 className="text-xl font-bold">Recent steps</h2>
              <div className="flex-1">
                <BarChart
                  labels={["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"]}
                  datasets={[
                    {
                      label: "Number of steps",
                      data: [1000, 4000, 10000, 20000, 5000, 60000, 80000],
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
              {/* {postArr.map((show, index) => (
            <div key={index}>
              <Post key={index} showimg={show ? true : false} />
            </div>
          ))} */}
            </div>
          </div>
        </div>
      ) : (
        <Error message="Please login to access this page" />
      )}
    </>
  );
}
