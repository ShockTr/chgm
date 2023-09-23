import NextAuth, {AuthOptions} from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb";

export const authOptions: AuthOptions = {
    providers: [
        DiscordProvider({
            // @ts-ignore
            clientId: process.env.DISCORD_CLIENT_ID,
            // @ts-ignore
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: "https://discord.com/api/oauth2/authorize?scope=identify",
            profile(profile) {
                if (profile.avatar === null) {
                    const defaultAvatarNumber = parseInt(profile.discriminator) % 5
                    profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
                } else {
                    const format = profile.avatar.startsWith("a_") ? "gif" : "png"
                    profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
                }
                return {
                    id: profile.id,
                    name: profile.username,
                    image: profile.image_url,
                    ...profile
                }
            }
        })
    ],
    // @ts-ignore
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: "CHGMAuth"
    }),
    theme: {
        colorScheme: "dark"
    }
}

export default NextAuth(authOptions)
