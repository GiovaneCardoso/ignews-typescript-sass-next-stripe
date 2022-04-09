import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from 'next-auth/providers/google'
import NextAuth from "next-auth/next";
import { query as q } from 'faunadb'

import { fauna } from '../../../services/fauna'

export default NextAuth({
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        authorization: {
            params: {
                scope: 'read:user'
            }
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code'
          }
        }
      }),
      
    ],
    callbacks: {
      async signIn({ user, email }) {
        const userEmail = email || user.email
        try {
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index("user_by_email"),
                    q.Casefold(userEmail)
                  )
                )
              ),
              q.Create(
                q.Collection('users'),
                { data : { userEmail }}
              ),
              q.Get(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(userEmail)
                )
              )
            )
          )
          return true
        } catch(e) {
          return false
        }

      }
    }
})