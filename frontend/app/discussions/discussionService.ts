import axios from "axios";

export const createDiscussion = async (title: string, content: string) => {
  const res = await axios.post("/api/discussions", { title, content });
  return res.data;
};

export const getDiscussion = async (id: string) => {
  const res = await axios.get(`/api/discussions/${id}`);
  return res.data;
};

export const postComment = async (id: string, text: string) => {
  await axios.post(`/api/discussions/${id}/comment`, { text });
};

export const vote = async (id: string, type: "upvote" | "downvote") => {
  await axios.post(`/api/discussions/${id}/vote`, { type });
};
