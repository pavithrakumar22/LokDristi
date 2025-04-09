export interface User {
    id: string
    name: string
    email: string
    role: "admin" | "user"
  }
  
  export interface Post {
    id: string
    title: string
    content: string
    authorId: string
    authorName: string
    createdAt: string
    updatedAt: string
    upvotes: number
    downvotes: number
    commentCount: number
  }
  
  export interface Comment {
    id: string
    postId: string
    parentId?: string
    content: string
    authorId: string
    authorName: string
    createdAt: string
    upvotes: number
    downvotes: number
    replies?: Comment[]
  }
  
  export interface Vote {
    userId: string
    itemId: string
    itemType: "post" | "comment"
    voteType: "up" | "down"
  }
  