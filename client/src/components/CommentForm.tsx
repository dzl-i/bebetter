"use client";

import { post } from "@/utils/request";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Loading from "./Loading";

export default function CommentForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await post("/posts/comment", { postId, comment });
    setLoading(false);
    if (!res.errorCode) {
      router.refresh();
      return;
    }
    alert(res.errorMessage);
  };

  return (
    <form
      className="flex gap-4 bg-white p-4 rounded-xl border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
      name="comment"
      onSubmit={handleOnSubmit}
    >
      <div className="space-y-2 w-full">
        <textarea
          name="comment"
          placeholder="What do you think of the post?"
          className="resize-none w-full px-4 py-2 rounded-lg border text-black border-black"
          autoFocus
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-black py-2 px-6 rounded-xl ml-auto block form-button text-white"
          type="submit"
        >
          {loading ? (
            <div className="invert flex items-center justify-center">
              <Loading width={24} height={24} />
            </div>
          ) : (
            "Comment"
          )}
        </button>
      </div>
    </form>
  );
}
