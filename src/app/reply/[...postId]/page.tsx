import CommentsForReplies from "@/components/component/CommentsForReplies";
import PostInteraction from "@/components/component/PostInteraction";
import ReplyForm from "@/components/component/ReplyForm";
import ReplyFormForComment from "@/components/component/ReplyFormForComment";
import ReplyInteraction from "@/components/component/ReplyInteraction";
import prisma from "@/lib/prisma";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const ReplyPage = async (props: { params: Promise<{ postId: string }> }) => {
  const resolvedParams = await props.params;
  const postId = resolvedParams.postId;

  const post = await prisma.post.findFirst({
    where: {
      id: postId[0],
    },
    include: {
      author: true,
      likes: true,
      comments: true,
    },
  });

  if (!post) {
    return null;
  }

  const replies = await prisma.comment.findMany({
    where: {
      postId: postId[0],
      parentId: null,
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
    <React.Fragment>
      <div className="space-y-4 p-4 my-4">
        <div className="flex items-center gap-2">
          <Link href={`/profile/${post.author.name}`}>
            <img src={post.author.image ?? ""} alt="" className="w-10 h-10" />
          </Link>
          <div className="flex flex-col">
            <div className="font-bold">{post.author.name}</div>
            <div className="text-sm text-gray-400">{post.author.name}</div>
          </div>
        </div>
        <Link href={`/reply/${post.id}`}>
          <div>{post.content}</div>
        </Link>
        <div className="flex items-center gap-2 mt-4">
          <PostInteraction post={post} />
          <FontAwesomeIcon icon={faClock} className="ml-auto text-gray-500" />
          <span className="text-gray-500">
            {post.createdAt.toLocaleString()}
          </span>
        </div>
        <ReplyForm postId={post.id} />
      </div>
      <hr />

      {replies &&
        replies.map((reply) => (
          <React.Fragment key={reply.id}>
            <div className="space-y-4 p-4 my-4 w-3/4 shadow-md m-4">
              <div className="flex items-center gap-2">
                <Link href={`/profile/${reply.author.name}`}>
                  <img
                    src={reply.author.image ?? ""}
                    alt=""
                    className="w-10 h-10"
                  />
                </Link>
                <div className="flex flex-col">
                  <div className="font-bold">{reply.author.name}</div>
                  <div className="text-sm text-gray-400">
                    {reply.author.name}
                  </div>
                </div>
              </div>
              <div>{reply.content}</div>
              <div className="flex items-center gap-2 mt-4">
                <ReplyInteraction reply={reply} />
                <FontAwesomeIcon
                  icon={faClock}
                  className="ml-auto text-gray-500"
                />
                <span className="text-gray-500">
                  {reply.createdAt.toLocaleString()}
                </span>
              </div>
              <ReplyFormForComment replyId={reply.id} postId={post.id} />

              <CommentsForReplies replyId={reply.id} postId={post.id} />
            </div>
            <hr className="w-3/4" />
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default ReplyPage;
