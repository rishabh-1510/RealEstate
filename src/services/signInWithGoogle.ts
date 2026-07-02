import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export const signInWithGoogle = async () => {
    try {
        await authClient.signIn.social({ provider: "google" })
    } catch (error) {
        console.log(error);
        toast.error("Google sign-in failed")
    }
}