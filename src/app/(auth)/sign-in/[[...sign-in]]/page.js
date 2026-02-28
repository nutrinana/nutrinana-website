import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="site-container">
            <section className="section-y:first-child">
                <div className="flex min-h-[80vh] items-center justify-center py-12">
                    <div className="w-full max-w-md">
                        <div className="mb-8 text-center">
                            <h1 className="font-heading text-raisin mb-2 text-4xl font-bold">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600">Sign in to your Nutrinana account</p>
                        </div>

                        <SignIn
                            routing="path"
                            path="/sign-in"
                            signUpUrl="/sign-up"
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
