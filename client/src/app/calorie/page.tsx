import Image from "next/image";

export default function Calorie() {
  return (
    <div className="relative h-full flex flex-col justify-center items-center gap-16">
      <div className="flex flex-col justify-center items-center gap-8 z-10">
        <Image width={100} height={100} src="yum.svg" alt="Icon" />
        <div className="text-center text-black text-5xl font-bold">
          What did you eat today?
        </div>
        <div className="px-6 py-4 w-full max-w-[800px] bg-stone-50 rounded-2xl border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]">
          <form name="calorie-form" id="calorie-form">
            <input
              type="text"
              placeholder="I ate..."
              className="flex-grow text-black/50 text-2xl font-normal focus:outline-none w-full bg-transparent"
            />
          </form>
        </div>
      </div>
      <button
        form="calorie-form"
        className="form-button transition-all flex items-center px-12 py-4 bg-black rounded-2xl opacity-90 z-10"
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
  );
}
