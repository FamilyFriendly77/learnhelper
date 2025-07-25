import { Session } from "next-auth";

export const UserQuery = async (session: Session | null) => {
  if (session) {
    const data = await fetch(`/api/auth/getUser/${session?.user?.email}`);
    return await data.json();
  }
  return null;
};
