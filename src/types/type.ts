import { Comment, CommentLike, Post, PostLike, User} from "@prisma/client";

export type PostType = {
  id: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  authorId: string;
  author: User;
  likes: PostLike[];
  comments: Comment[];
};

export type ReplyType = Comment & {
  post: Post;
  author: User;
  replies: Comment[];
  likes: CommentLike[];
  parent?:  ReplyType | Partial<ReplyType> | null;
};