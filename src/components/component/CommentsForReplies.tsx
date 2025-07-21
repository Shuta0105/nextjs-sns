import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import ReplyInteraction from "./ReplyInteraction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faClock } from "@fortawesome/free-solid-svg-icons";
import ReplyFormForComment from "./ReplyFormForComment";

type CommentsForRepliesProps = {
  replyId: string;
  postId: string;
};

const CommentsForReplies = async ({
  replyId,
  postId,
}: CommentsForRepliesProps) => {
  const commentsForReplies = await prisma.comment.findMany({
    where: {
      parentId: replyId,
    },
    include: {
      post: true,
      author: true,
      replies: true,
      likes: true,
      parent: {
        include: {
          post: true,
          author: true,
          likes: true,
          parent: true,
          replies: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="shadow">
      {commentsForReplies.map((comment) => (
        <React.Fragment key={comment.id}>
          <div className="space-y-4 p-4 my-4">
            <div className="flex items-center gap-2">
              <Link href={`/profile/${comment.author.name}`}>
                <img
                  src={comment.author.image ?? ""}
                  alt=""
                  className="w-10 h-10"
                />
              </Link>
              <div className="flex flex-col">
                <div className="font-bold">{comment.author.name}</div>
                <div className="text-sm text-gray-400">
                  {comment.author.name}
                </div>
              </div>
            </div>
            <div>{comment.content}</div>
            <div className="flex items-center gap-2 mt-4">
              <ReplyInteraction reply={comment} />
              <FontAwesomeIcon
                icon={faClock}
                className="ml-auto text-gray-500"
              />
              <span className="text-gray-500">
                {comment.createdAt.toLocaleString()}
              </span>
            </div>
            <ReplyFormForComment replyId={comment.id} postId={postId} />
            {/* <button>
              <FontAwesomeIcon icon={faCircleDown} />
            </button> */}
            <CommentsForReplies replyId={comment.id} postId={postId} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CommentsForReplies;
