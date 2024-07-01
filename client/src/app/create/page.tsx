import Error from "@/components/Error";
import CreatePage from "@/components/CreatePage";
import { cookies } from "next/headers";

export default function Create() {
  const cookie = cookies().get("token")?.value;

  if (!cookie) return <Error message="Please login to access this page" />;

  return <CreatePage />;
}
