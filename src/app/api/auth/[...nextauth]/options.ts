import { NextAuthOptions } from "next-auth"
import { prisma } from "../../../../../lib/prisma"
import { compare } from "bcrypt"
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"

export const authOptions:NextAuthOptions = {
    session: {
        strategy:"jwt"
    },
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        // https://next-auth.js.org/providers/credentials
            
        CredentialsProvider({
            name:'Sign in',
            credentials:{
                email:{
                    label:'Email',
                    type:'email',
                    placeholder:'hello@example.com'
                },
                password:{label: 'Password', type:'password'} 
            },
            async authorize(credentials) {


                if(!credentials?.email || !credentials.password){
                        return null
                }
                const user = await prisma.user.findUnique({
                    where: {
                         email: credentials.email
                    }
                })
                if(!user) {
                    return null
                }
                const isPasswordValid = await compare(
                    credentials.password,
                    user.password

                )
                if (!isPasswordValid) {
                    return null
                }
                return {
                    id:user.id + '',
                    email: user.email,
                    name:user.name,
                    randomKey: 'Hey Cool'
                }
            }
        })
    ],

    callbacks: {
        session:({session, token}) => {
            console.log ('Session Callback', {session, token})
            return {
                ...session,
                user: {
                    ...session.user,
                    id:token.id,
                    randomKey: token.randomKey
                }
            }
        },
        jwt: ({token, user}) => {
            console.log ('JWT Callbakc', {token, user})
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                }
            }
            return token
        }
    }
}