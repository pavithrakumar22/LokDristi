"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import {
  createPostData,
  updatePostData,
  deletePostData,
  createCommentData,
  voteOnItemData,
} from "./data";

// Post actions
export async function createPost(formData: { title: string; content: string }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const post = await createPostData({
    title: formData.title,
    content: formData.content,
    authorId: session.user?.id || "Unknown",
    authorName: session.user?.name || "Unknown",
  });

  revalidatePath("/");
  revalidatePath("/admin");

  return post;
}

export async function updatePost(formData: {
  id: string;
  title: string;
  content: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const post = await updatePostData(formData.id, {
    title: formData.title,
    content: formData.content,
  });

  revalidatePath("/");
  revalidatePath(`/post/${formData.id}`);
  revalidatePath("/admin");

  return post;
}

export async function deletePost(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const postId = formData.get("postId") as string;

  if (!postId) {
    throw new Error("Post ID is required");
  }

  await deletePostData(postId);

  revalidatePath("/");
  revalidatePath("/admin");

  return { success: true };
}

// ✅ Comment actions (updated)
export async function createComment(formData: {
  postId: string;
  parentId?: string;
  content: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  await createCommentData({
    postId: formData.postId,
    parentId: formData.parentId,
    content: formData.content,
    authorId: session.user?.id || "Unknown",
    authorName: session.user?.name || "Unknown",
  });

  revalidatePath(`/post/${formData.postId}`);
}

// Vote actions
export async function voteOnItem(formData: {
  itemId: string;
  itemType: "post" | "comment";
  voteType: "up" | "down" | null;
  previousVote: "up" | "down" | null;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  await voteOnItemData({
    userId: session.user?.id || "Unknown",
    itemId: formData.itemId,
    itemType: formData.itemType,
    voteType: formData.voteType,
    previousVote: formData.previousVote,
  });

  if (formData.itemType === "post") {
    revalidatePath(`/post/${formData.itemId}`);
    revalidatePath("/");
  } else {
    revalidatePath("/post/[id]");
  }

  return { success: true };
}
