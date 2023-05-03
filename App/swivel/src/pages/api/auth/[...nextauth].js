import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // google
import AzureADProvider from "next-auth/providers/azure-ad"; // microsoft

import User from "../../../models/user";
import bcrypt from "bcryptjs";
import dbConnect from "../../../config/dbConnect";

const { decryptRole } = require('../../../utils/crypto');


export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({

      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        dbConnect();

        const { email, password } = credentials;
        const user = await User.findOne({ email: email });

        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        return { id: user._id.toString(), email: user.email, role: decryptRole(user.encrypted_role) };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope: "openid email profile",
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
      profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
      
      profile: async (profile, tokens) => {        
        dbConnect();

        const user = await User.findOne({ email: profile.email });

        if (user) {
          return {
            id: user._id.toString(),
            name: user.nombre + ' ' + user.apellidos,
            email: user.email,
            role: decryptRole(user.tipo_usuario),
          };
        } 
        else {
          const newUser = await User.create({
            email: profile.email,
            nombres: profile.given_name,
            apellidos: profile.family_name,
            is_account_verified: profile.email_verified,
            account_provider: "google",
            tipo_usuario: "user",
          });
    
          return {
            id: newUser._id.toString(),
            name: newUser.nombre + ' ' + newUser.apellidos,
            email: newUser.email,
            role: decryptRole(newUser.tipo_usuario),
          };
        }
      },
    }),    

    /* AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,

      profile: async (profile, tokens) => {
        dbConnect();
        
        const user = await User.findOne({ email: profile.email });
        
        if (user) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: decryptRole(user.encrypted_role),
          };
        } 
        else {
          const newUser = await User.create({
            email: profile.email,
            nombres: profile.given_name,
            apellidos: profile.family_name,
            is_account_verified: profile.email_verified,
            account_provider: "azure-ad",
            tipo_usuario: "user",
          });
      
          return {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            role: decryptRole(newUser.encrypted_role),
          };
        }
      },
      
    }), */
  ],

  /* pages: {
    signIn: "../../auth/login",
  }, */

  secret: process.env.NEXT_AUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // You can store the user's role in the token
      }

      return token;
    },

    async session({ session, token }) {
      session.id = token.id;
      session.role = token.role;
      return session;
    },

  },
};

export default NextAuth(authOptions);
