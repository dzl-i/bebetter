import { CommentType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="post text-black space-y-4 w-full min-w-[320px] bg-white rounded-lg px-7 py-6 border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]">
      <Link
        href={`/user/${comment.user.id}`}
        className="flex items-center gap-4"
      >
        <img
          className="rounded-full object-cover"
          src={comment.user.profilePicture}
          alt={comment.user.name + "'s Profile Picture"}
          width={48}
          height={48}
        />
        <div>
          <p className="font-bold">{comment.user.name}</p>
          <p>{comment.user.username}</p>
        </div>
      </Link>
      <p>{comment.comment}</p>
      <p className="text-sm opacity-50">
        {new Date(comment.timeCreated).toLocaleDateString()}
      </p>
      <div className="flex items-center gap-4">
        <button>
          <Image src="/reaction.svg" alt="React" width={32} height={32} />
        </button>
      </div>
    </div>
  );
}
