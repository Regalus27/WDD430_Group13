import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      console.log("Session")
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub, 
          email: token.email,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      
      const isOnPage = nextUrl.pathname;
      
      if (isOnPage.startsWith('/profile') || isOnPage.startsWith('/product') || isOnPage.startsWith('/cart')) {
        if (isLoggedIn) return true;
        console.log("Not authorized - Redirecting to login");
        return false;
      }
    },
  },
  providers : []
} satisfies NextAuthConfig;