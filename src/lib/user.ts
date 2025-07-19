import prisma from "./prisma";

export async function fetchUser(userId: string) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
}
