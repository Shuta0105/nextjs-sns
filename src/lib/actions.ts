"use server";

import prisma from "@/lib/prisma";
import { PostType, ReplyType } from "@/types/type";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type State = {
  error?: string | undefined;
  success: boolean;
};

export async function addPostAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        error: "ユーザーが存在しません。",
        success: false,
      };
    }

    const postText = formData.get("post");
    const postTextSchema = z
      .string()
      .min(1, "ポスト内容を入力してください。")
      .max(140, "140字以内で入力してください。");
    const validatePostText = postTextSchema.parse(postText);

    await prisma.post.create({
      data: {
        content: validatePostText,
        authorId: userId,
      },
    });
    revalidatePath("/");

    return {
      error: undefined,
      success: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: "ポスト内容を入力してください。",
        success: false,
      };
    } else if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      };
    } else {
      return {
        error: "予期せぬエラーが発生しました。",
        success: false,
      };
    }
  }
}

export async function addPostLikeAction(post: PostType) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return;
    }

    const existingLike = await prisma.postLike.findFirst({
      where: {
        userId: userId,
        postId: post.id,
      },
    });

    if (!existingLike) {
      await prisma.postLike.create({
        data: {
          userId: userId,
          postId: post.id,
        },
      });
      revalidatePath("/");
    } else {
      await prisma.postLike.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: post.id,
          },
        },
      });
      revalidatePath("/");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addReplyLikeAction(reply: ReplyType) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return;
    }

    const existingLike = await prisma.commentLike.findFirst({
      where: {
        userId: userId,
        commentId: reply.id,
      },
    });

    if (!existingLike) {
      await prisma.commentLike.create({
        data: {
          userId: userId,
          commentId: reply.id,
        },
      });
      revalidatePath("/");
    } else {
      await prisma.commentLike.delete({
        where: {
          userId_commentId: {
            userId: userId,
            commentId: reply.id,
          },
        },
      });
      revalidatePath("/");
    }
  } catch (error) {
    console.log(error);
  }
}