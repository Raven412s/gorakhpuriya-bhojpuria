"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminLoginPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // hardcoded credentials (for simplicity)
  const ADMIN_ID = "admin";
  const ADMIN_PASSWORD = "123456";

  const handleLogin = () => {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      router.push("/dashboard");
    } else {
      setError("ID या Password गलत है");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 shadow-lg rounded-lg bg-white w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="mb-4">
          <Label>Admin ID</Label>
          <Input value={id} onChange={(e) => setId(e.target.value)} />
        </div>

        <div className="mb-4">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <Button className="w-full" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default AdminLoginPage;
