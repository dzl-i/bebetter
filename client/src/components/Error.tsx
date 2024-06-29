import Link from "next/link";

export default function Error({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-2 h-full justify-center items-center">
      <p className="text-black text-lg font-bold">{message}</p>
      <Link
        className="form-button font-bold block px-4 py-2 bg-black text-white rounded-xl"
        href="/"
      >
        Back to Home
      </Link>
    </div>
  );
}
