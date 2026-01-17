/**
 * NextAuth.js 配置
 * 支持邮箱密码登录和 OAuth（Google 等）
 */

import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // 邮箱密码登录
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: '邮箱', type: 'email' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请输入邮箱和密码');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            subscription: true,
          },
        });

        if (!user || !user.password) {
          throw new Error('邮箱或密码错误');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('邮箱或密码错误');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          isAdmin: user.isAdmin,
        };
      },
    }),
    // 可以添加 Google、GitHub 等 OAuth 提供商
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;

        // 确保 isAdmin 始终是 boolean 类型
        // 优先使用数据库中的值，如果失败则使用 token 中的值，最后默认为 false
        let isAdmin = false;

        if (token.id) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { id: token.id as string },
              select: { isAdmin: true },
            });

            isAdmin = dbUser?.isAdmin ?? false;
          } catch (error) {
            console.error('[Auth] Error fetching user from DB:', error);
            isAdmin = token.isAdmin === true;
          }
        } else {
          isAdmin = token.isAdmin === true;
        }

        session.user.isAdmin = isAdmin;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
