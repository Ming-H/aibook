import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// ... 其他导入

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 实现适当的验证逻辑
                // 例如，检查数据库中是否存在匹配的用户

                // 如果验证失败，返回null
                // 如果验证成功，返回用户对象

                // 示例:
                if (credentials.email === "user@example.com" && credentials.password === "password") {
                    return { id: "1", name: "User", email: "user@example.com" };
                }
                return null;
            }
        })
    ],
    // 确保有适当的回调配置
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // 添加其他需要的用户信息
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                // 添加其他需要的用户信息
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
        // 其他自定义页面
    },
    // 开发环境下，可能需要跳过HTTPS检查
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 