"use client";

import React, { useOptimistic } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { addLikeAction } from "@/lib/actions";
import { PostType } from "@/types/type";
import { useAuth } from "@clerk/nextjs";

interface LikeState {
  likeCount: number;
  isLiked: boolean;
}

type PostInteractionProps = {
  post: PostType;
};

const PostInteraction = ({ post }: PostInteractionProps) => {
  const { userId } = useAuth();

  const [optimisticLike, addOptimisticLike] = useOptimistic<LikeState, void>(
    {
      likeCount: post.likes.length,
      isLiked: userId
        ? post.likes.some((like) => like.userId === userId)
        : false,
    },
    (state) => ({
      likeCount: state.isLiked
        ? state.likeCount - 1
        : state.likeCount + 1,
      isLiked: !state.isLiked,
    })
  );

  const handleLike = async () => {
    try {
      addOptimisticLike();
      await addLikeAction(post);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action={handleLike} className="flex items-center gap-2">
      <button>
        <FontAwesomeIcon icon={faHeart} className={`${optimisticLike.isLiked ? "text-red-500" : "text-gray-400"}`} />
      </button>
      <span>{optimisticLike.likeCount}</span>
      <FontAwesomeIcon icon={faComment} />
      <FontAwesomeIcon icon={faShareNodes} className="ml-2" />
    </form>
  );
};

export default PostInteraction;
