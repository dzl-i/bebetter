"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import gsap, { TimelineLite } from "gsap";
import { post } from "@/utils/request";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const dummyData = {
  food: "grape",
  unitCalories: 33,
  activities: [
    {
      name: "Skiing, water skiing",
      calories_per_hour: 435,
      duration_minutes: 60,
    },
    {
      name: "Cross country snow skiing, slow",
      calories_per_hour: 508,
      duration_minutes: 60,
    },
    {
      name: "Cross country skiing, moderate",
      calories_per_hour: 581,
      duration_minutes: 60,
    },
  ],
};

export default function Calorie() {
  const container = useRef(null);
  const tl = useRef<TimelineLite | null>(null);
  const [state, setState] = useState(0);
  const [food, setFood] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dummyData);
  const router = useRouter();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to(`.state-${state - 1}`, {
          y: 20,
          opacity: 0,
          display: "none",
          duration: 1.25,
          ease: "power3.inOut",
        })
        .set(`.state-${state}`, {
          y: 20,
          opacity: 0,
        })
        .to(`.state-${state}`, {
          y: 0,
          opacity: 1,
          display: "flex",
          duration: 1.25,
          ease: "power3.inOut",
        });
    },
    { dependencies: [state], scope: container }
  );

  useGSAP(
    () => {
      gsap.to(".receipt", {
        y: 5,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: container }
  );

  const handleAnimationOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState((prev) => prev + 1);
  };

  const resetState = () => {
    router.refresh();
  };

  useEffect(() => {
    if (state >= 1) {
      tl.current?.play();
    }
    const fetchData = async () => {
      setLoading(true);
      const {
        food_name: name,
        item_calories: unitCalories,
        quantity: qty,
        total_calories: totalCalories,
      } = await post("/calculate/calorie", { food, quantity });
      const {
        first_activity: first,
        second_activity: second,
        third_activity: third,
      } = await post("/steps", { activity });
      setData({
        food: name,
        unitCalories,
        activities: [first, second, third],
      });
      setLoading(false);
    };
    if (state >= 2 && food && quantity && activity) {
      fetchData();
    }
  }, [state]);

  return (
    <div
      className="relative h-full flex flex-col justify-center items-center"
      ref={container}
    >
      <div className="state-0 flex flex-col gap-8 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8 z-10">
          <Image width={100} height={100} src="yum.svg" alt="Icon" />
          <div className="text-center text-black text-5xl font-bold">
            What did you eat today?
          </div>
          <form
            onSubmit={handleAnimationOnSubmit}
            name="calorie-form"
            id="calorie-form"
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="font-bold text-xl" htmlFor="calorie-form-food">
                I ate...
              </label>
              <input
                type="text"
                id="calorie-form-food"
                placeholder="Enter any food.."
                value={food}
                onChange={(e) => setFood(e.target.value)}
                className="bg-white px-6 py-4 max-w-[800px] rounded-2xl border border-black shadow-[2px_2px_0_rgb(0,_0,_0)] flex-grow text-black/50 text-2xl font-normal focus:outline-none w-full bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <label
                className="font-bold text-xl"
                htmlFor="calorie-form-quantity"
              >
                How many?
              </label>
              <input
                type="number"
                id="calorie-form-quantity"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-white px-6 py-4 max-w-[800px] rounded-2xl border border-black shadow-[2px_2px_0_rgb(0,_0,_0)] flex-grow text-black/50 text-2xl font-normal focus:outline-none w-full bg-transparent"
              />
            </div>
          </form>
        </div>
        <button
          form="calorie-form"
          disabled={!food && !quantity}
          className="form-button disabled:cursor-not-allowed transition-all flex items-center px-12 py-4 bg-black rounded-2xl opacity-90 z-10"
        >
          <span className="text-white text-2xl font-bold">Yum</span>
          <div className="w-8 h-8 ml-3 relative">
            <Image
              width={32}
              height={32}
              src="yum.svg"
              alt="Yum Icon"
              className="absolute inset-0 w-full h-full invert"
            />
          </div>
        </button>
      </div>
      <div className="state-1 hidden flex-col gap-8 justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-8 z-10">
          <Image width={100} height={100} src="yum.svg" alt="Icon" />
          <div className="text-center text-black text-5xl font-bold">
            What activity do you wanna do today?
          </div>
          <div className="px-6 py-4 w-full max-w-[800px] bg-stone-50 rounded-2xl border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]">
            <form
              onSubmit={handleAnimationOnSubmit}
              name="activity-form"
              id="activity-form"
            >
              <input
                type="text"
                placeholder="I want to do..."
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="flex-grow text-black/50 text-2xl font-normal focus:outline-none w-full bg-transparent"
              />
            </form>
          </div>
        </div>
        <button
          form="activity-form"
          disabled={!activity}
          className="form-button disabled:cursor-not-allowed transition-all flex items-center px-12 py-4 bg-black rounded-2xl opacity-90 z-10"
        >
          <span className="text-white text-2xl font-bold">Yeah</span>
          <div className="w-8 h-8 ml-3 relative">
            <Image
              width={32}
              height={32}
              src="yum.svg"
              alt="Yum Icon"
              className="absolute inset-0 w-full h-full invert"
            />
          </div>
        </button>
      </div>
      <div className="state-2 hidden flex-col justify-center items-stretch gap-4">
        <div className="flex gap-2">
          <h1 className="font-bold text-3xl">Your BeBetter Receipt!</h1>
          <Image alt="Yum" src="/yum.svg" width={32} height={32} />
        </div>
        <div className="receipt max-w-md space-y-4 bg-white px-4 py-6">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div>
                <h1 className="block text-lg font-bold uppercase text-center">
                  {data.food}
                </h1>
                <p className="text-center text-sm uppercase">
                  CSESOC X DEVSOC HACKATHON 2024
                </p>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <div className="flex gap-2">
                  <p className="text-xs">Date produced</p>
                  <p className="text-xs">{new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xs">Produced by</p>
                  <p className="text-xs">BeBetter</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-sm">Unit Calories</p>
                  <p className="text-sm">{data.unitCalories}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Quantity</p>
                  <p className="text-sm">{quantity}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">Total Calories</p>
                  <p className="text-sm">{quantity * data.unitCalories}</p>
                </div>
              </div>
              <hr />
              <div>
                <h1 className="block text-lg font-bold uppercase text-center">
                  Activities
                </h1>
                <p className="text-center text-sm uppercase">Burned Calories</p>
              </div>
              {data.activities.map((activity, index) => (
                <div className="space-y-2">
                  <div key={index} className="flex gap-2 justify-between">
                    <p className="text-sm truncate block">{activity.name}</p>
                    <p className="text-sm">{activity.calories_per_hour} / hr</p>
                  </div>
                  <p className="text-sm text-center">
                    Time required:{" "}
                    <b>
                      {(
                        (quantity * data.unitCalories) /
                        activity.calories_per_hour
                      ).toFixed(2)}{" "}
                      hour /{" "}
                      {(
                        ((quantity * data.unitCalories) /
                          activity.calories_per_hour) *
                        60
                      ).toFixed(2)}{" "}
                      mins
                    </b>
                  </p>
                  <hr />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
