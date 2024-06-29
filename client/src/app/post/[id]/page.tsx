import Comment from "@/components/Comment";
import Image from "next/image";
import { cookies } from "next/headers";
import { get } from "@/utils/request";
import Error from "@/components/Error";
import { CommentType, PostType } from "@/utils/types";
import CommentForm from "@/components/CommentForm";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { post } = await get(`/posts/details?postId=${params.id}`);

  if (!post) {
    return <Error message="Post not found" />;
  }

  console.log(post.comments);

  const cookie = cookies().get("token")?.value;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 top-32 static md:h-full md:max-h-[calc(100vh_-_13rem)] bg-white overflow-y-scroll no-scrollbar md:sticky rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]">
        <div className="text-black space-y-4 w-full min-w-[320px] px-7 py-6">
          <div className="flex items-center gap-4">
            <img
              className="rounded-full object-cover"
              src={post.author.profilePicture}
              alt={`${post.author.name}'s Profile Picture`}
              width={48}
              height={48}
            />
            <div>
              <p className="font-bold">{post.author.name}</p>
              <p>{post.author.username}</p>
            </div>
          </div>
          <p>{post.description}</p>
          <img
            alt={`${post.author.name} post image`}
            src={post.picture as string}
            width={320}
            height={180}
            className="w-full h-auto rounded-md object-cover"
          />
          <p className="text-sm opacity-50">
            {new Date(post.timeCreated).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-4">
            <button>
              <Image src="/reaction.svg" alt="React" width={32} height={32} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-4">
          {cookie ? (
            <CommentForm postId={post.id} />
          ) : (
            <p className="bg-white p-4 rounded-xl border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]">
              You have to login to comment
            </p>
          )}
          {post.comments.map((comment: CommentType, index: number) => (
            <Comment comment={comment} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
