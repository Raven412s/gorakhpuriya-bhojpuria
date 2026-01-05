"use client";

import React, { useEffect, useState } from "react";

const DashboardPage = () => {
    const [data, setData] = useState<{ count: number; members: any[] }>({ count: 0, members: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const res = await fetch("/api/members");
                const result = await res.json();
                if (result.success) {
                    setData({ count: result.count, members: result.members });
                }
            } catch (error) {
                console.error("Error fetching members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border-2 border-green-100 shadow-sm p-6">
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Members</h2>
                    <p className="text-4xl font-bold mt-2 text-green-700">
                        {loading ? "..." : data.count}
                    </p>
                </div>
                {/* Aap yahan Total Donations ka card bhi add kar sakte hain */}
            </div>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Recent Donations */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-bold text-gray-800">Recent Donations</h2>
                    </div>
                    <div className="p-4">
                        {/* Sample List - Isse aap apni Donations API se map kar sakte hain */}
                        <ul className="divide-y divide-gray-100">
                            {[1, 2, 3].map((item) => (
                                <li key={item} className="py-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-900">Rahul Sharma</p>
                                        <p className="text-sm text-gray-500">rahul@example.com</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-green-600">₹500</p>
                                        <p className="text-xs text-gray-400">2 hours ago</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Side: Recent Joined Members */}
                <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-bold text-gray-800">New Members</h2>
                    </div>
                    <div className="p-4">
                        {loading ? (
                            <p className="text-sm text-gray-400">Loading members...</p>
                        ) : (
                            <ul className="space-y-4">
                                {data.members.slice(0, 5).map((member: any) => (
                                    <li key={member._id} className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                            {member.name?.charAt(0) || "M"}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{member.email}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;