import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <SignUp
            localization={{
                signUp: {
                    start: {
                        title: "Create Account",
                        subtitle: "Join Nutrinana today",
                    },
                },
            }}
        />
    );
}
