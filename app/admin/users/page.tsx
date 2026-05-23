"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Search,
  User,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";

type UserType = {
  id: number;
  fullName: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  status: "active" | "blocked";
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [search, setSearch] = useState("");

  // LOAD USERS
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");

    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers) as UserType[]);
      } catch {
        setUsers([]);
      }
      return;
    }

    const demoUsers: UserType[] = [
      {
        id: 1,
        fullName: "Admin User",
        email: "admin@gmail.com",
        role: "admin",
        status: "active",
        createdAt: "2026-05-23",
      },
      {
        id: 2,
        fullName: "John Doe",
        email: "john@gmail.com",
        role: "user",
        status: "active",
        createdAt: "2026-05-20",
      },
      {
        id: 3,
        fullName: "Alex Smith",
        email: "alex@gmail.com",
        role: "user",
        status: "blocked",
        createdAt: "2026-05-18",
      },
    ];

    localStorage.setItem("users", JSON.stringify(demoUsers));
    setUsers(demoUsers);
  }, []);

  // DELETE (IDEAL)
  const handleDelete = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("User o‘chirildi");
  };

  // TOGGLE STATUS (IDEAL + SAFE)
  const toggleStatus = (id: number) => {
    const updatedUsers: UserType[] = users.map((user) =>
      user.id === id
        ? {
            ...user,
            status:
              user.status === "active" ? "blocked" : "active",
          }
        : user
    );

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("Status yangilandi");
  };

  // SEARCH (PERFORMANCE OPTIMIZED)
  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#06150f] to-[#0b1f14] text-white">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-5xl font-black">👥 Users</h1>
            <p className="text-white/40 mt-2">
              Foydalanuvchilarni boshqarish paneli
            </p>
          </div>

          {/* SEARCH */}
          <div className="relative w-full md:w-[350px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr className="text-left text-white/50 text-sm">
                <th className="px-6 py-5">User</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Joined</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-white/40"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-white/5 hover:bg-white/[0.03]"
                  >
                    {/* USER */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                          <User className="text-green-400" size={20} />
                        </div>

                        <div>
                          <p className="font-bold">
                            {user.fullName}
                          </p>
                          <p className="text-white/40 text-sm flex items-center gap-2">
                            <Mail size={14} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-xl text-sm font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-500/15 text-purple-300"
                            : "bg-blue-500/15 text-blue-300"
                        }`}
                      >
                        <ShieldCheck size={14} className="inline mr-1" />
                        {user.role}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-5">
                      <button
                        onClick={() => toggleStatus(user.id)}
                        className={`px-3 py-1 rounded-xl text-sm font-semibold transition ${
                          user.status === "active"
                            ? "bg-green-500/15 text-green-300 hover:bg-green-500/20"
                            : "bg-red-500/15 text-red-300 hover:bg-red-500/20"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>

                    {/* DATE */}
                    <td className="px-6 py-5 text-white/50">
                      {user.createdAt}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center"
                      >
                        <Trash2 size={18} className="text-red-300" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}