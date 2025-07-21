import React from "react";
import PostInteraction from "./PostInteraction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { PostType } from "@/types/type";
import Link from "next/link";
import ReplyForm from "./ReplyForm";

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
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
        <Link href={`/reply/${post.id}`}><div>{post.content}</div></Link>
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
    </React.Fragment>
  );
};

export default Post;
