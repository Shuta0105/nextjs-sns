import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import prisma from "@/lib/prisma";
import PostList from "@/components/component/PostList";
import UserFollow from "@/components/component/UserFollow";
import { auth } from "@clerk/nextjs/server";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const profileUser = await prisma.user.findFirst({
    where: {
      name: username[0],
    },
    include: {
      posts: true,
      following: true,
      followers: true,
    },
  });

  const followingRecord = await prisma.follow.findFirst({
    where: {
      followerId: userId,
      followingId: profileUser?.id,
    },
  });

  const isFollowing = followingRecord ? true : false;
  const isOwnProfile = userId === profileUser?.id ? true : false;
  
  return (
    <div className="flex justify-around p-16">
      <div className="flex flex-col gap-8 w-2/3">
        <div className="flex items-center gap-12">
          <img src={profileUser?.image ?? ""} alt="" className="w-30 h-30" />
          <div className="flex flex-col gap-2">
            <span className="font-extrabold text-4xl">{profileUser?.name}</span>
            <span className="text-gray-500">{`@${profileUser?.name}`}</span>
          </div>
        </div>
        <div className="flex justify-start items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <span className="font-medium text-2xl">
              {profileUser?.posts.length}
            </span>
            <span className="text-gray-600">Posts</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-medium text-2xl">
              {profileUser?.followers.length}
            </span>
            <span className="text-gray-600">Followers</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="font-medium text-2xl">
              {profileUser?.following.length}
            </span>
            <span className="text-gray-600">Following</span>
          </div>
        </div>
        <PostList profileUserId={profileUser?.id!} />
      </div>

      <div className="flex flex-col gap-4">
        <UserFollow
          profileUserId={profileUser?.id!}
          isFollowing={isFollowing}
          isOwnProfile={isOwnProfile}
        />
        <div className="font-medium">Suggested</div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faUser} />
            <div className="flex flex-col">
              <span className="font-bold">Acme Inc</span>
              <span className="text-gray-500">@acmeinc</span>
            </div>
            <div className="ml-auto">+</div>
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faUser} />
            <div className="flex flex-col">
              <span className="font-bold">Acme Inc</span>
              <span className="text-gray-500">@acmeinc</span>
            </div>
            <div className="ml-auto">+</div>
          </div>
          <div className="flex items-center gap-4">
            <FontAwesomeIcon icon={faUser} />
            <div className="flex flex-col">
              <span className="font-bold">Acme Inc</span>
              <span className="text-gray-500">@acmeinc</span>
            </div>
            <div className="ml-auto">+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
