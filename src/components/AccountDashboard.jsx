"use client";

import { useState } from "react";

import { UserProfile } from "@clerk/nextjs";
import { Package, User as UserIcon, CreditCard, ExternalLink, MoveRight } from "lucide-react";
import Link from "next/link";

import AccountCard from "@/components/AccountCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Account Dashboard component
 *
 * Displays user information and provides navigation to profile, orders, and subscription management.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Object} props.user - User object containing email and name information.
 * @param {Array} props.orders - List of user orders with details.
 *
 * @returns {JSX.Element} Account dashboard UI with tabs for overview, profile, and orders.
 */
export default function AccountDashboard({ user = {}, orders = [] }) {
    const [activeTab, setActiveTab] = useState("overview");

    const userEmail = user?.email || "";
    const userName = user?.firstName || user?.username || "Nutrinana Customer";

    return (
        <div className="site-container">
            <section className="section-y:first-child">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-raisin mb-2 text-4xl font-bold">
                        Welcome back, {userName}!
                    </h1>
                    <p className="text-gray-600">{userEmail}</p>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="orders">Orders</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Dashboard Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Orders Card */}
                            <AccountCard
                                icon={<Package className="text-green h-6 w-6" />}
                                title="Orders"
                                description="View your order history and track deliveries"
                                actionText="View orders"
                                actionIcon={<MoveRight className="h-4 w-4" />}
                                onClick={() => setActiveTab("orders")}
                                iconBgColor="bg-green/10"
                            />

                            {/* Subscriptions Card */}
                            <AccountCard
                                icon={<CreditCard className="h-6 w-6 text-yellow-600" />}
                                title="Subscriptions"
                                description="Manage your granola subscriptions"
                                actionText="Manage subscriptions"
                                actionIcon={<ExternalLink className="h-4 w-4" />}
                                href={process.env.NEXT_PUBLIC_STRIPE_BILLING_PORTAL_URL || "#"}
                                iconBgColor="bg-yellow/20"
                            />

                            {/* Profile Card */}
                            <AccountCard
                                icon={<UserIcon className="h-6 w-6 text-blue-600" />}
                                title="Profile"
                                description="Update your personal information"
                                actionText="Edit profile"
                                actionIcon={<MoveRight className="h-4 w-4" />}
                                onClick={() => setActiveTab("profile")}
                                iconBgColor="bg-blue-100"
                            />
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-light-green/20 mt-6 rounded-xl p-6 md:p-8">
                            <h2 className="font-heading mb-4 text-2xl font-bold">Quick Actions</h2>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="green" asChild>
                                    <Link href="/activated-granola">Shop Granola</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link
                                        href="https://aftercare.getpimento.com/nutrinana"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Track Order
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/help">Get Help</Link>
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* UserProfile */}
                            <div className="lg:col-span-2">
                                <UserProfile
                                    routing="hash"
                                    appearance={{
                                        elements: {
                                            card: "shadow-none border-0",
                                            rootBox: "w-full",
                                        },
                                    }}
                                />
                            </div>

                            {/* Quick Actions Sidebar */}
                            <div className="space-y-6">
                                <div className="bg-light-green/20 rounded-xl p-6">
                                    <h3 className="font-heading mb-4 text-xl font-bold">
                                        Quick Actions
                                    </h3>
                                    <div className="flex flex-col gap-3">
                                        <Button variant="green" asChild className="w-full">
                                            <Link href="/activated-granola">Shop Granola</Link>
                                        </Button>
                                        <Button variant="outline" asChild className="w-full">
                                            <Link
                                                href="https://aftercare.getpimento.com/nutrinana"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Track Order
                                            </Link>
                                        </Button>
                                        <Button variant="outline" asChild className="w-full">
                                            <Link
                                                href={
                                                    process.env
                                                        .NEXT_PUBLIC_STRIPE_BILLING_PORTAL_URL ||
                                                    "#"
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Manage Subscriptions
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                {/* Help Card */}
                                <div className="rounded-xl border bg-white p-6">
                                    <h3 className="font-heading mb-2 text-lg font-bold">
                                        Need Help?
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-600">
                                        Have questions about your account or orders?
                                    </p>
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href="/help">Contact Support</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Orders Tab */}
                    <TabsContent value="orders">
                        {orders.length === 0 ? (
                            <div className="bg-light-green/20 rounded-xl py-12 text-center">
                                <Package className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <p className="mb-4 text-gray-600">No orders yet</p>
                                <Button variant="green" asChild>
                                    <Link href="/activated-granola">Shop Now</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order.reference}
                                        className="rounded-xl border bg-white p-6"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div>
                                                <p className="text-green text-sm font-bold uppercase">
                                                    Order {order.reference}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {order.date}
                                                </p>
                                            </div>
                                            <p className="font-bold">{order.total}</p>
                                        </div>

                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <p key={idx} className="text-sm text-gray-600">
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </section>
        </div>
    );
}
