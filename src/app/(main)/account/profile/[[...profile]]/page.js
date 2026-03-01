// Profile Page for Account Settings
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
    return (
        <div className="site-container">
            <section className="section-y:first-child">
                <div className="mx-auto max-w-4xl">
                    <h1 className="font-heading text-raisin mb-8 text-4xl font-bold">
                        Profile Settings
                    </h1>

                    <UserProfile
                        routing="path"
                        path="/account/profile"
                        appearance={{
                            elements: {
                                card: "shadow-none",
                                rootBox: "w-full",
                            },
                        }}
                    />
                </div>
            </section>
        </div>
    );
}
