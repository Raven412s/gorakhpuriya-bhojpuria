"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminOnlyLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        if (typeof window !== "undefined" && !localStorage.getItem("isAdmin")) {
            router.push("/login");
        }
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-green-50 shadow-lg flex flex-col">
                <div className="p-6 font-bold text-green-900 text-xl border-b border-green-200">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/dashboard/members"
                        className={`block p-2 rounded ${pathname.includes("members") ? "bg-green-200" : "hover:bg-green-100"
                            }`}
                    >
                        Members
                    </Link>
                    <Link
                        href="/dashboard/events"
                        className={`block p-2 rounded ${pathname.includes("events") ? "bg-green-200" : "hover:bg-green-100"
                            }`}
                    >
                        Events
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className={`block p-2 rounded ${pathname.includes("settings") ? "bg-green-200" : "hover:bg-green-100"
                            }`}
                    >
                        Settings
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default AdminOnlyLayout;
