export const UserQuery = async (session) => {
  if (session) {
    const data = await fetch(`/api/auth/getUser/${session?.user?.email}`);
    return await data.json();
  }
  return null;
};
