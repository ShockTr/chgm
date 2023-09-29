import {DefaultSession} from "@auth/core/types";

declare module "next-auth" {
    interface Session extends Omit<DefaultSession, "user"> {
        user?: {
            displayName?: string | null
            name?: string | null
            image?: string | null
            id?: string | null
        }
    }
}
