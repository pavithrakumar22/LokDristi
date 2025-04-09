import fs from "fs/promises"
import path from "path"
import { Post, Comment, User, Vote } from "./types"

const DATA_DIR = path.join(process.cwd(), "data")
const POSTS_FILE = path.join(DATA_DIR, "posts.json")
const COMMENTS_FILE = path.join(DATA_DIR, "comments.json")
const USERS_FILE = path.join(DATA_DIR, "users.json")
const VOTES_FILE = path.join(DATA_DIR, "votes.json")

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
  } catch (error) {
    console.error("Failed to create data directory:", error)
  }
}

// Initialize data files if they don't exist
async function initDataFiles() {
  await ensureDataDir()
  
  const files = [
    { path: POSTS_FILE, defaultContent: "[]" },
    { path: COMMENTS_FILE, defaultContent: "[]" },
    { path: USERS_FILE, defaultContent: JSON.stringify([
      {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        // In a real app, this would be hashed
        password: "password",
        role: "admin"
      },
      {
        id: "2",
        name: "Regular User",
        email: "user@example.com",
        // In a real app, this would be hashed
        password: "password",
        role: "user"
      }
    ]) },
    { path: VOTES_FILE, defaultContent: "[]" }
  ]
  
  for (const file of files) {
    try {
      await fs.access(file.path)
    } catch {
      await fs.writeFile(file.path, file.defaultContent)
    }
  }
}

// Initialize data files on module load
initDataFiles()

// Helper functions to read and write data
async function readData<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error(`Failed to read data from ${filePath}:`, error)
    return []
  }
}

async function writeData<T>(filePath: string, data: T[]): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Failed to write data to ${filePath}:`, error)
  }
}

// Posts
export async function getPosts(): Promise<Post[]> {
  const posts = await readData<Post>(POSTS_FILE)
  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getPostById(id: string): Promise<Post | null> {
  const posts = await readData<Post>(POSTS_FILE)
  return posts.find(post => post.id === id) || null
}

export async function createPostData(post: Omit<Post, "id" | "createdAt" | "updatedAt" | "upvotes" | "downvotes" | "commentCount">): Promise<Post> {
  const posts = await readData<Post>(POSTS_FILE)
  
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0,
    commentCount: 0
  }
  
  posts.push(newPost)
  await writeData(POSTS_FILE, posts)
  
  return newPost
}

export async function updatePostData(id: string, updates: Partial<Post>): Promise<Post | null> {
  const posts = await readData<Post>(POSTS_FILE)
  const index = posts.findIndex(post => post.id === id)
  
  if (index === -1) {
    return null
  }
  
  const updatedPost = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  posts[index] = updatedPost
  await writeData(POSTS_FILE, posts)
  
  return updatedPost
}

export async function deletePostData(id: string): Promise<boolean> {
  const posts = await readData<Post>(POSTS_FILE)
  const filteredPosts = posts.filter(post => post.id !== id)
  
  if (filteredPosts.length === posts.length) {
    return false
  }
  
  await writeData(POSTS_FILE, filteredPosts)
  
  // Also delete all comments for this post
  const comments = await readData<Comment>(COMMENTS_FILE)
  const filteredComments = comments.filter(comment => comment.postId !== id)
  await writeData(COMMENTS_FILE, filteredComments)
  
  // Delete all votes for this post
  const votes = await readData<Vote>(VOTES_FILE)
  const filteredVotes = votes.filter(vote => !(vote.itemType === "post" && vote.itemId === id))
  await writeData(VOTES_FILE, filteredVotes)
  
  return true
}

// Comments
export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const allComments = await readData<Comment>(COMMENTS_FILE)
  const postComments = allComments.filter(comment => comment.postId === postId)
  
  // Organize comments into a tree structure
  const commentMap = new Map<string, Comment>()
  const rootComments: Comment[] = []
  
  // First pass: create a map of all comments
  postComments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] })
  })
  
  // Second pass: organize into parent-child relationships
  postComments.forEach(comment => {
    const commentWithReplies = commentMap.get(comment.id)!
    
    if (comment.parentId && commentMap.has(comment.parentId)) {
      // This is a reply, add it to its parent
      const parent = commentMap.get(comment.parentId)!
      if (!parent.replies) {
        parent.replies = []
      }
      parent.replies.push(commentWithReplies)
    } else {
      // This is a root comment
      rootComments.push(commentWithReplies)
    }
  })
  
  // Sort comments by date (newest first)
  return rootComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createCommentData(comment: Omit<Comment, "id" | "createdAt" | "upvotes" | "downvotes">): Promise<Comment> {
  const comments = await readData<Comment>(COMMENTS_FILE)
  
  const newComment: Comment = {
    ...comment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    upvotes: 0,
    downvotes: 0
  }
  
  comments.push(newComment)
  await writeData(COMMENTS_FILE, comments)
  
  // Update comment count on the post
  const posts = await readData<Post>(POSTS_FILE)
  const postIndex = posts.findIndex(post => post.id === comment.postId)
  
  if (postIndex !== -1) {
    posts[postIndex].commentCount += 1
    await writeData(POSTS_FILE, posts)
  }
  
  return newComment
}

// Votes
export async function voteOnItemData(vote: {
  userId: string
  itemId: string
  itemType: "post" | "comment"
  voteType: "up" | "down" | null
  previousVote: "up" | "down" | null
}): Promise<boolean> {
  const votes = await readData<Vote>(VOTES_FILE)
  
  // Find existing vote
  const existingVoteIndex = votes.findIndex(
    v => v.userId === vote.userId && v.itemId === vote.itemId && v.itemType === vote.itemType
  )
  
  // Remove existing vote if found
  if (existingVoteIndex !== -1) {
    votes.splice(existingVoteIndex, 1)
  }
  
  // Add new vote if not null
  if (vote.voteType !== null) {
    votes.push({
      userId: vote.userId,
      itemId: vote.itemId,
      itemType: vote.itemType,
      voteType: vote.voteType
    })
  }
  
  await writeData(VOTES_FILE, votes)
  
  // Update vote counts on the item
  if (vote.itemType === "post") {
    const posts = await readData<Post>(POSTS_FILE)
    const postIndex = posts.findIndex(post => post.id === vote.itemId)
    
    if (postIndex !== -1) {
      // Remove previous vote effect
      if (vote.previousVote === "up") {
        posts[postIndex].upvotes -= 1
      } else if (vote.previousVote === "down") {
        posts[postIndex].downvotes -= 1
      }
      
      // Add new vote effect
      if (vote.voteType === "up") {
        posts[postIndex].upvotes += 1
      } else if (vote.voteType === "down") {
        posts[postIndex].downvotes += 1
      }
      
      await writeData(POSTS_FILE, posts)
    }
  } else if (vote.itemType === "comment") {
    const comments = await readData<Comment>(COMMENTS_FILE)
    const commentIndex = comments.findIndex(comment => comment.id === vote.itemId)
    
    if (commentIndex !== -1) {
      // Remove previous vote effect
      if (vote.previousVote === "up") {
        comments[commentIndex].upvotes -= 1
      } else if (vote.previousVote === "down") {
        comments[commentIndex].downvotes -= 1
      }
      
      // Add new vote effect
      if (vote.voteType === "up") {
        comments[commentIndex].upvotes += 1
      } else if (vote.voteType === "down") {
        comments[commentIndex].downvotes += 1
      }
      
      await writeData(COMMENTS_FILE, comments)
    }
  }
  
  return true
}

// Users
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readData<User & { password: string }>(USERS_FILE)
  const user = users.find(user => user.email === email)
  
  if (!user) {
    return null
  }
  
  // Don't return the password
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function validateUserCredentials(email: string, password: string): Promise<User | null> {
  const users = await readData<User & { password: string }>(USERS_FILE)
  const user = users.find(user => user.email === email && user.password === password)
  
  if (!user) {
    return null
  }
  
  // Don't return the password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}
