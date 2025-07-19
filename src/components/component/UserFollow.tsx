import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import React from "react";

type UserFollowProps = {
  profileUserId: string;
  isFollowing: boolean;
  isOwnProfile: boolean;
};

const UserFollow = ({
  profileUserId,
  isFollowing,
  isOwnProfile,
}: UserFollowProps) => {
  async function addFollowAction() {
    "use server";
    try {
      const { userId } = await auth();
      if (!userId) {
        return;
      }

      if (!isFollowing) {
        await prisma.follow.create({
          data: {
            followerId: userId,
            followingId: profileUserId,
          },
        });
        revalidatePath("/");
      } else {
        await prisma.follow.delete({
          where: {
            followerId_followingId: {
              followerId: userId,
              followingId: profileUserId,
            },
          },
        });
        revalidatePath("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getButtonContent = () => {
    if (isOwnProfile) {
      return "プロフィール編集";
    } else if (isFollowing) {
      return "フォロー中";
    } else {
      return "フォローする";
    }
  };

  const getButtonVariant = () => {
    if (isOwnProfile) {
      return "bg-dark";
    } else if (isFollowing) {
      return "bg-gray-400";
    } else {
      return "bg-black";
    }
  };

  return (
    <form action={addFollowAction}>
      <button
        className={`${getButtonVariant()} py-2 px-12 text-white w-80 rounded`}
        disabled={isOwnProfile}
      >
        {getButtonContent()}
      </button>
    </form>
  );
};

export default UserFollow;
