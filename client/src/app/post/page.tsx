import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

export default function Create() {
  return (
    <div className="relative h-full flex flex-col justify-center items-center gap-4 text-black">
      <div className="flex gap-4 items-center">
        <Image
          className="w-16"
          src="/yap.svg"
          alt="Yap"
          width={128}
          height={92}
        />
        <h1 className="text-3xl font-bold">Create a post</h1>
      </div>
      <form
        className="space-y-6 flex flex-col w-full max-w-[800px]"
        name="post"
      >
        <div className="space-y-2">
          <label htmlFor="post-text">What did you do today?</label>
          <textarea
            name="post-text"
            id="post-text"
            className="resize-none w-full px-4 py-2 rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
            placeholder="What did you do today?"
            required
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="post-text">How many steps did you do today?</label>
          <input
            name="post-number"
            id="post-number"
            className="w-full px-4 py-2 rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
            type="number"
            placeholder="Input number of steps"
            required
          />
        </div>
        <div className="space-y-2">
          <p>Include an image in your post? (Optional)</p>
          <label
            className="cursor-pointer border-black border-dashed border flex justify-center flex-col items-center py-8 rounded-xl"
            htmlFor="post-image"
          >
            <ImageIcon className="w-4 h-4" />
            <p>Insert an image</p>
            <input
              name="post-image"
              id="post-image"
              type="file"
              accept=".png.jpg.gif"
              className="hidden"
            />
          </label>
        </div>
        <button
          className="text-center w-full py-4 bg-black text-white form-button rounded-lg"
          type="submit"
        >
          CREATE POST
        </button>
      </form>
    </div>
  );
}
