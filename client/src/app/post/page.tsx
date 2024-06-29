import Comment from "@/components/Comment";
import Image from "next/image";

export default function PostPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 top-32 static md:max-h-[calc(100vh_-_13rem)] bg-white overflow-y-scroll no-scrollbar md:sticky rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]">
        <div className="text-black space-y-4 w-full min-w-[320px] px-7 py-6">
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              src="/minecraft.png"
              alt="Something!"
              width={48}
              height={48}
              objectFit="cover"
            />
            <div>
              <p className="font-bold">Full name</p>
              <p>@username</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            auctor placerat urna eget semper. Sed laoreet justo varius ligula
            aliquet, sit amet iaculis felis molestie. Nam iaculis fermentum
            erat, volutpat placerat libero porttitor ac. Aenean mollis sagittis
            arcu eget tincidunt.
          </p>
          <Image
            alt="oop"
            src="/minecraft.png"
            width={320}
            height={180}
            objectFit="cover"
            className="w-full h-auto rounded-md"
          />
          <p className="text-sm opacity-50">19 Oct 2024</p>
          <div className="flex items-center gap-4">
            <button>
              <Image src="/reaction.svg" alt="React" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-4">
          <form
            className="flex gap-4 bg-white p-4 rounded-xl border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
            name="comment"
          >
            <Image
              src="/minecraft.png"
              alt="Profile picture"
              width={32}
              height={32}
              className="w-8 h-8 object-cover rounded-full"
            />
            <div className="space-y-2 w-full">
              <textarea
                name="comment"
                placeholder="What do you think of the post?"
                className="resize-none w-full px-4 py-2 rounded-lg border text-black border-black"
                autoFocus
              />
              <button
                className="bg-black py-2 px-6 rounded-xl ml-auto block form-button"
                type="submit"
              >
                Comment
              </button>
            </div>
          </form>
          {Array(10)
            .fill("")
            .map((_, index) => (
              <Comment key={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
