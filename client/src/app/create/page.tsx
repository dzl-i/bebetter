"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import Error from "@/components/Error";
import { FormEvent, useMemo, useState } from "react";
import { post } from "@/utils/request";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { getCookie } from "cookies-next";

export default function Create() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState(0);
  const [picture, setPicture] = useState({ fileName: "", fileStr: "" });
  const [loading, setLoading] = useState(false);

  const updateImage = (target: HTMLInputElement) => {
    if (target.files) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setPicture({ fileName: file.name, fileStr: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const readyToSubmit = useMemo(() => description, [description]);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await post("/posts/create", {
      description,
      steps,
      picture: picture.fileStr,
    });
    setLoading(false);
    if (!res.errorCode) {
      router.push("/user");
      return;
    }
    alert(res.errorMessage);
  };

  if (!getCookie("token"))
    return <Error message="Please login to access this page" />;
  return (
    <div className="relative h-full flex flex-col justify-center items-center gap-4 description-black">
      <div className="flex gap-4 items-center">
        <Image
          className="w-16"
          src="/yap.svg"
          alt="Yap"
          width={128}
          height={92}
        />
        <h1 className="description-3xl font-bold">Create a post</h1>
      </div>
      <form
        className="space-y-6 flex flex-col w-full max-w-[800px]"
        name="post"
        onSubmit={handleOnSubmit}
      >
        <div className="space-y-2">
          <label htmlFor="post-description">What did you do today?*</label>
          <textarea
            name="post-description"
            id="post-description"
            className="resize-none w-full px-4 py-2 rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
            placeholder="What did you do today?"
            required
            autoFocus
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="post-description">
            How many steps did you do today?*
          </label>
          <input
            name="post-number"
            id="post-number"
            className="w-full px-4 py-2 rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
            type="number"
            placeholder="Input number of steps"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <p>Include an picture in your post? (Optional)</p>
          <label
            className="cursor-pointer border-black border-dashed border flex justify-center flex-col items-center py-8 rounded-xl"
            htmlFor="post-picture"
          >
            <ImageIcon className="w-4 h-4" />
            {picture.fileName ? (
              <p className="truncate">File Uploaded: {picture.fileName}</p>
            ) : (
              <p>Insert an picture</p>
            )}
            <input
              name="post-picture"
              id="post-picture"
              type="file"
              accept="picture/png, picture/jpeg"
              className="hidden"
              onChange={(e) => updateImage(e.target)}
            />
          </label>
        </div>
        <button
          className="disabled:cursor-not-allowed disabled:bg-transparent disabled:text-black disabled:border disabled:border-black disabled:opacity-50 text-white description-center w-full py-4 bg-black description-white form-button rounded-lg"
          type="submit"
          disabled={!readyToSubmit}
        >
          {loading ? (
            <div className="invert flex justify-center items-center">
              <Loading width={24} height={24} />
            </div>
          ) : (
            "CREATE POST"
          )}
        </button>
      </form>
    </div>
  );
}
