import Error from "@/components/Error";
import { cookies } from "next/headers";
import UserPage from "@/components/UserPage";

export default async function User() {
  const cookie = cookies().get("token")?.value;

  if (!cookie) return <Error message="Please login to access this page" />;

  return <UserPage />;
}
