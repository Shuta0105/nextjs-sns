import React from "react";
import { auth } from "@clerk/nextjs/server";
import type { PostType } from "@/types/type";
import Post from "./Post";
import { fetchPosts } from "@/lib/post";
import prisma from "@/lib/prisma";

type PostListProps = {
  profileUserId: string;
};

const PostList = async ({ profileUserId }: PostListProps) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const followings = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
    select: {
      followingId: true,
    },
  });

  const followingId = followings.map((following) => following.followingId);

  let posts;
  if (profileUserId) {
    posts = await fetchPosts(profileUserId);
  } else {
    posts = await fetchPosts(userId, followingId);
  }

  return (
    <>
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;
