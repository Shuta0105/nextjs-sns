import { PostType } from "@/types/type";
import prisma from "./prisma";

export async function fetchPosts(userId: string, followingId?: string[]) {
  const followingIds = followingId ?? [];

  const posts: PostType[] = await prisma.post.findMany({
    where: {
      authorId: {
        in: [userId, ...followingIds],
      },
    },
    include: {
      author: true,
      likes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}
