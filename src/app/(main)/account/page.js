// // Account Dashboard Page
// import { currentUser } from "@clerk/nextjs/server";
// import { Package, Settings, CreditCard, User as UserIcon, MoveRight } from "lucide-react";
// import Link from "next/link";
// import { redirect } from "next/navigation";

// import { Button } from "@/components/ui/button";

// export default async function AccountPage() {
//     const user = await currentUser();

//     if (!user) {
//         redirect("/sign-in");
//     }

//     const userEmail = user.emailAddresses[0]?.emailAddress;
//     const userName = user.firstName || user.username || "Nutrinana Customer";

//     const billingPortalUrl =
//         process.env.STRIPE_BILLING_PORTAL_URL ||
//         "https://billing.stripe.com/p/login/8x23cvbfRcZd2O01TCgIo00";

//     return (
//         <div className="site-container">
//             <section className="section-y:first-child">
//                 {/* Welcome Header */}
//                 <div className="mb-8">
//                     <h1 className="font-heading text-raisin mb-2 text-4xl font-bold">
//                         Welcome back, {userName}!
//                     </h1>
//                     <p className="text-gray-600">{userEmail}</p>
//                 </div>

//                 {/* Dashboard Grid */}
//                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                     {/* Orders Card */}
//                     <Link
//                         href="/account/orders"
//                         className="group hover:border-green rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
//                     >
//                         <div className="mb-4 flex items-start justify-between">
//                             <div className="bg-green/10 rounded-full p-3">
//                                 <Package className="text-green h-6 w-6" />
//                             </div>
//                         </div>
//                         <h3 className="font-heading mb-2 text-xl font-bold">Orders</h3>
//                         <p className="mb-4 text-sm text-gray-600">
//                             View your order history and track deliveries
//                         </p>
//                         <span className="text-green inline-flex items-center gap-1 text-sm font-medium group-hover:underline">
//                             View orders <MoveRight className="h-4 w-4" />
//                         </span>
//                     </Link>

//                     {/* Subscriptions Card */}
//                     <Link
//                         href={billingPortalUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="group hover:border-green rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
//                     >
//                         <div className="mb-4 flex items-start justify-between">
//                             <div className="bg-yellow/20 rounded-full p-3">
//                                 <CreditCard className="h-6 w-6 text-yellow-600" />
//                             </div>
//                         </div>
//                         <h3 className="font-heading mb-2 text-xl font-bold">Subscriptions</h3>
//                         <p className="mb-4 text-sm text-gray-600">
//                             Manage your granola subscriptions
//                         </p>
//                         <span className="text-green inline-flex items-center gap-1 text-sm font-medium group-hover:underline">
//                             Manage subscriptions <MoveRight className="h-4 w-4" />
//                         </span>
//                     </Link>

//                     {/* Profile Card */}
//                     <Link
//                         href="/account/profile"
//                         className="group hover:border-green rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
//                     >
//                         <div className="mb-4 flex items-start justify-between">
//                             <div className="rounded-full bg-blue-100 p-3">
//                                 <UserIcon className="h-6 w-6 text-blue-600" />
//                             </div>
//                         </div>
//                         <h3 className="font-heading mb-2 text-xl font-bold">Profile</h3>
//                         <p className="mb-4 text-sm text-gray-600">
//                             Update your personal information
//                         </p>
//                         <span className="text-green inline-flex items-center gap-1 text-sm font-medium group-hover:underline">
//                             Edit profile <MoveRight className="h-4 w-4" />
//                         </span>
//                     </Link>

//                     {/* Settings Card */}
//                     <Link
//                         href="/account/settings"
//                         className="group hover:border-green rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg"
//                     >
//                         <div className="mb-4 flex items-start justify-between">
//                             <div className="rounded-full bg-gray-100 p-3">
//                                 <Settings className="h-6 w-6 text-gray-600" />
//                             </div>
//                         </div>
//                         <h3 className="font-heading mb-2 text-xl font-bold">Settings</h3>
//                         <p className="mb-4 text-sm text-gray-600">
//                             Manage preferences and notifications
//                         </p>
//                         <span className="text-green inline-flex items-center gap-1 text-sm font-medium group-hover:underline">
//                             View settings <MoveRight className="h-4 w-4" />
//                         </span>
//                     </Link>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="bg-light-green/20 mt-12 rounded-xl p-6 md:p-8">
//                     <h2 className="font-heading mb-4 text-2xl font-bold">Quick Actions</h2>
//                     <div className="flex flex-wrap gap-3">
//                         <Button variant="green" asChild>
//                             <Link href="/activated-granola">Shop Granola</Link>
//                         </Button>
//                         <Button variant="outline" asChild>
//                             <Link href="/account/orders">Track Order</Link>
//                         </Button>
//                         <Button variant="outline" asChild>
//                             <Link href="/help">Get Help</Link>
//                         </Button>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import AccountDashboard from "@/components/AccountDashboard";
import { pool } from "@/lib/db/pool";
import { formatDate, formatMoneyFromMinor } from "@/lib/utils";

export default async function AccountPage() {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const email = user.emailAddresses[0]?.emailAddress;

    // Fetch orders from database
    let orders = [];
    try {
        const { rows } = await pool.query(
            `SELECT 
                order_reference,
                created_at,
                payload_json
             FROM stripe_fulfillments 
             WHERE payload_json->>'customerEmail' = $1 
             ORDER BY created_at DESC
             LIMIT 10`,
            [email]
        );

        orders = rows.map((row) => {
            const payload = JSON.parse(row.payload_json);

            return {
                reference: row.order_reference,
                date: formatDate(row.created_at, "dd/mm/yyyy"),
                total: formatMoneyFromMinor(payload.totals?.total || 0, "gbp"),
                items: payload.items?.map((item) => `${item.name} × ${item.qty || 1}`) || [],
            };
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        // Continue with empty orders array
    }

    // Serialize user data for client component
    const userData = {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        imageUrl: user.imageUrl,
    };

    return <AccountDashboard user={userData} orders={orders} />;
}
