import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <SignIn
            localization={{
                signIn: {
                    start: {
                        title: "Welcome back",
                        subtitle: "Sign in to your Nutrinana account",
                    },
                },
            }}
        />
    );
}
