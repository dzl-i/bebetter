import { PostType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function Post({ post }: { post: PostType }) {
  return (
    <div className="block text-black space-y-4 w-full min-w-[320px] bg-white rounded-lg px-7 py-6 border border-black shadow-[2px_2px_0_rgb(0,_0,_0)] transition-all duration-200 hover:shadow-[4px_4px_0_rgb(0,_0,_0)]">
      <Link
        href={`/user/${post.author.id}`}
        className="flex items-center gap-4"
      >
        <img
          className="rounded-full object-cover"
          src={post.author.profilePicture}
          alt={`${post.author.name} profile picture`}
          width={48}
          height={48}
        />
        <div>
          <p className="font-bold">{post.author.name}</p>
          <p>{post.author.username}</p>
        </div>
      </Link>
      <Link href={`/post/${post.id}`} className="block space-y-4">
        <p>{post.description}</p>
        {post.picture && (
          <img
            alt="Post img"
            src={post.picture}
            width={320}
            height={180}
            className="w-full h-auto rounded-md object-cover"
          />
        )}
        <p>Steps taken: {post.steps}</p>
        <p className="text-sm opacity-50">
          {new Date(post.timeCreated).toLocaleDateString()}
        </p>
      </Link>
      <div className="flex items-center gap-4">
        <button>
          <Image src="/reaction.svg" alt="React" width={32} height={32} />
        </button>
        <Link href={`/post/${post.id}`} className="block">
          <Image src="/comment.svg" alt="Comment" width={40} height={40} />
        </Link>
      </div>
    </div>
  );
}
