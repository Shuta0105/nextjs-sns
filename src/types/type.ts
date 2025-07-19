import { PostLike, User } from "@prisma/client";

export type PostType = {
    id: string;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    authorId: string;
    author: User;
    likes: PostLike[];
}