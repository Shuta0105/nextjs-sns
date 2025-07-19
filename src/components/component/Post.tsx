import React from "react";
import PostInteraction from "./PostInteraction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { PostType } from "@/types/type";
import Link from "next/link";

type PostProps = {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <React.Fragment>
      <div className="space-y-4 p-4 my-4">
        <div className="flex items-center gap-2">
          <Link href={`/profile/${post.author.name}`}><img src={post.author.image ?? ""} alt="" className="w-10 h-10" /></Link>
          <div className="flex flex-col">
            <div className="font-bold">{post.author.name}</div>
            <div className="text-sm text-gray-400">{post.author.name}</div>
          </div>
        </div>
        <div>{post.content}</div>
        <div className="flex items-center gap-2">
          <PostInteraction post={post} />
          <FontAwesomeIcon icon={faClock} className="ml-auto text-gray-500" />
          <span className="text-gray-500">
            {post.createdAt.toLocaleString()}
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="返信を書く..."
            className="border rounded-lg w-full outline-none py-1 px-2"
          />
        </div>
        <div className="flex justify-end items-center gap-2">
          <button className="border rounded px-2 py-1">キャンセル</button>
          <button className="bg-gray-400 rounded px-2 py-1 text-white">
            返信
          </button>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default Post;
