import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: {
        id: string;
        userId: string;
        expiresIn: number;
      };
      userId: string;
    };
  }

  interface User {
    accessToken: string;
    refreshToken: {
      id: string;
      userId: string;
      expiresIn: number;
    };
  }

  interface Session {
    accessToken: string;
    refreshTokenId: string;
    userId: string;
    error: any;
  }
}
