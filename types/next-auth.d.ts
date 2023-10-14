import {DefaultSession} from "@auth/core/types";

declare module "next-auth" {
    interface Session extends Omit<DefaultSession, "user"> {
        user?: {
            displayName: string
            name: string
            image: string
            id: string
        }
    }
}
