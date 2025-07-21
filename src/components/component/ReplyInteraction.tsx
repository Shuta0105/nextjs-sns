"use client";

import React, { useOptimistic } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { addReplyLikeAction } from "@/lib/actions";
import { ReplyType } from "@/types/type";
import { useAuth } from "@clerk/nextjs";

interface LikeState {
  likeCount: number;
  isLiked: boolean;
}

type ReplyInteractionProps = {
  reply: ReplyType;
};

const ReplyInteraction = ({ reply }: ReplyInteractionProps) => {
  const { userId } = useAuth();

  const [optimisticLike, addOptimisticLike] = useOptimistic<LikeState, void>(
    {
      likeCount: reply.likes.length,
      isLiked: userId
        ? reply.likes.some((like) => like.userId === userId)
        : false,
    },
    (state) => ({
      likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
      isLiked: !state.isLiked,
    })
  );

  const handleLike = async () => {
    try {
      addOptimisticLike();
      await addReplyLikeAction(reply);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action={handleLike} className="flex items-center gap-2">
      <button>
        <FontAwesomeIcon
          icon={faHeart}
          className={`${
            optimisticLike.isLiked ? "text-red-500" : "text-gray-400"
          }`}
        />
      </button>
      <span>{optimisticLike.likeCount}</span>
      <button className="space-x-2">
        <FontAwesomeIcon icon={faComment} />
        <span>{reply.replies.length}</span>
      </button>
      <FontAwesomeIcon icon={faShareNodes} className="ml-2" />
    </form>
  );
};

export default ReplyInteraction;
