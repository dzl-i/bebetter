import Image from "next/image";

export default function Comment() {
  return (
    <div className="post text-black space-y-4 w-full min-w-[320px] bg-white rounded-lg px-7 py-6 border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]">
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor
        placerat urna eget semper. Sed laoreet justo varius ligula aliquet, sit
        amet iaculis felis molestie. Nam iaculis fermentum erat, volutpat
        placerat libero porttitor ac. Aenean mollis sagittis arcu eget
        tincidunt.
      </p>
      <p className="text-sm opacity-50">19 Oct 2024</p>
      <div className="flex items-center gap-4">
        <button>
          <Image src="/reaction.svg" alt="React" width={32} height={32} />
        </button>
      </div>
    </div>
  );
}
