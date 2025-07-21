import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import React from "react";

type ReplyFormForCommentProps = {
  replyId: string;
  postId: string;
};

const ReplyFormForComment = ({ replyId, postId }: ReplyFormForCommentProps) => {
  async function addReplyAction(formData: FormData) {
    "use server";
    try {
      const { userId } = await auth();
      if (!userId) {
        return;
      }
      const reply = formData.get("reply") as string;
      await prisma.comment.create({
        data: {
          content: reply,
          postId: postId,
          authorId: userId,
          parentId: replyId,
        },
      });
      revalidatePath("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form action={addReplyAction} className="space-y-2">
      <div>
        <input
          type="text"
          name="reply"
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
    </form>
  );
};

export default ReplyFormForComment;
