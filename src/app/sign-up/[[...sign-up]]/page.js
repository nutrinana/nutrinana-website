import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="site-container">
            <section className="section-y:first-child">
                <div className="flex min-h-[80vh] items-center justify-center py-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8 text-center">
                            <h1 className="font-heading text-raisin mb-2 text-4xl font-bold">
                                Create Account
                            </h1>
                            <p className="text-gray-600">
                                Join Nutrinana and start your wellness journey
                            </p>
                        </div>

                        <SignUp
                            routing="path"
                            path="/sign-up"
                            signInUrl="/sign-in"
                            appearance={{
                                elements: {
                                    card: "shadow-xl border border-gray-200",
                                    rootBox: "w-full",
                                },
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
