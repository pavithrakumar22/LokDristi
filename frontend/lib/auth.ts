import { NextAuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { validateUserCredentials } from "./data"

// Extend the User type to include the role property
declare module "next-auth" {
  interface User {
    id: string
    role?: "admin" | "user"
  }
  
  }
  
  // Extend the Session type to include the id property
  declare module "next-auth" {
    interface Session {
      user?: User
    }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        const user = await validateUserCredentials(
          credentials.email,
          credentials.password
        )
        
        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = token.id as string
          session.user.role = token.role as "admin" | "user"
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  }
}
