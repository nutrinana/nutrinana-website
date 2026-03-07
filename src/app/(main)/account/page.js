// Account Page
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

    let orders = [];
    try {
        const { rows } = await pool.query(
            `SELECT 
                order_reference,
                created_at,
                payload_json
             FROM stripe_fulfillments 
             WHERE payload_json->'customer'->>'email' = $1 
             ORDER BY created_at DESC
             LIMIT 10`,
            [email]
        );

        orders = rows.map((row) => {
            const payload = row.payload_json;

            return {
                reference: row.order_reference,
                date: formatDate(row.created_at, "dd/mm/yyyy"),
                total: formatMoneyFromMinor(payload.totals?.amountTotal || 0, "gbp"),
                items: payload.items?.map((item) => `${item.name} x ${item.quantity || 1}`) || [],
            };
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        orders = [];
    }

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
