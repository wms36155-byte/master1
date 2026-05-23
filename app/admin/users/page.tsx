"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Trash2,
  ShieldCheck,
  User,
  Mail,
} from "lucide-react";

import toast from "react-hot-toast";

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

  const [users, setUsers] =
    useState<UserType[]>([]);

  const [search, setSearch] =
    useState("");

  // LOAD USERS
  useEffect(() => {

    const storedUsers =
      localStorage.getItem(
        "users"
      );

    if (storedUsers) {

      setUsers(
        JSON.parse(storedUsers)
      );

      return;
    }

    // DEMO USERS
    const demoUsers: UserType[] = [
      {
        id: 1,

        fullName:
          "Admin User",

        email:
          "admin@gmail.com",

        role: "admin",

        status: "active",

        createdAt:
          "2026-05-23",
      },

      {
        id: 2,

        fullName:
          "John Doe",

        email:
          "john@gmail.com",

        role: "user",

        status: "active",

        createdAt:
          "2026-05-20",
      },

      {
        id: 3,

        fullName:
          "Alex Smith",

        email:
          "alex@gmail.com",

        role: "user",

        status: "blocked",

        createdAt:
          "2026-05-18",
      },
    ];

    localStorage.setItem(
      "users",
      JSON.stringify(
        demoUsers
      )
    );

    setUsers(demoUsers);

  }, []);

  // DELETE
  const handleDelete = (
    id: number
  ) => {

    const filtered =
      users.filter(
        (user) =>
          user.id !== id
      );

    setUsers(filtered);

    localStorage.setItem(
      "users",
      JSON.stringify(
        filtered
      )
    );

    toast.success(
      "User o‘chirildi"
    );
  };

  // BLOCK
  const toggleStatus = (
    id: number
  ) => {

    const updated =
      users.map((user) => {

        if (
          user.id === id
        ) {

          return {
            ...user,

            status:
              user.status ===
              "active"
                ? "blocked"
                : "active",
          };
        }

        return user;
      });

    setUsers(updated);

    localStorage.setItem(
      "users",
      JSON.stringify(
        updated
      )
    );

    toast.success(
      "Status yangilandi"
    );
  };

  // SEARCH
  const filteredUsers =
    users.filter((user) =>
      user.fullName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      user.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#06150f] to-[#0b1f14] text-white">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-black">
              👥 Users
            </h1>

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
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-green-500"
            />

          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-white/40">
              Total Users
            </p>

            <h2 className="text-4xl font-black mt-3">
              {users.length}
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-white/40">
              Active Users
            </p>

            <h2 className="text-4xl font-black mt-3 text-green-400">
              {
                users.filter(
                  (u) =>
                    u.status ===
                    "active"
                ).length
              }
            </h2>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-white/40">
              Blocked Users
            </p>

            <h2 className="text-4xl font-black mt-3 text-red-400">
              {
                users.filter(
                  (u) =>
                    u.status ===
                    "blocked"
                ).length
              }
            </h2>

          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-white/5 border-b border-white/10">

                <tr className="text-left text-white/50 text-sm">

                  <th className="px-6 py-5">
                    User
                  </th>

                  <th className="px-6 py-5">
                    Role
                  </th>

                  <th className="px-6 py-5">
                    Status
                  </th>

                  <th className="px-6 py-5">
                    Joined
                  </th>

                  <th className="px-6 py-5 text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map(
                  (user) => (

                    <tr
                      key={user.id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition"
                    >

                      {/* USER */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">

                            <User
                              size={22}
                              className="text-green-400"
                            />

                          </div>

                          <div>

                            <h3 className="font-bold">
                              {
                                user.fullName
                              }
                            </h3>

                            <p className="text-white/40 text-sm flex items-center gap-2 mt-1">

                              <Mail
                                size={14}
                              />

                              {
                                user.email
                              }

                            </p>

                          </div>

                        </div>

                      </td>

                      {/* ROLE */}
                      <td className="px-6 py-5">

                        <div
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${
                            user.role ===
                            "admin"
                              ? "bg-purple-500/15 text-purple-300"
                              : "bg-blue-500/15 text-blue-300"
                          }`}
                        >

                          <ShieldCheck
                            size={16}
                          />

                          {user.role}

                        </div>

                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5">

                        <button
                          onClick={() =>
                            toggleStatus(
                              user.id
                            )
                          }
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                            user.status ===
                            "active"
                              ? "bg-green-500/15 text-green-300 hover:bg-green-500/20"
                              : "bg-red-500/15 text-red-300 hover:bg-red-500/20"
                          }`}
                        >

                          {
                            user.status
                          }

                        </button>

                      </td>

                      {/* DATE */}
                      <td className="px-6 py-5 text-white/50">

                        {
                          user.createdAt
                        }

                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5">

                        <div className="flex justify-end">

                          <button
                            onClick={() =>
                              handleDelete(
                                user.id
                              )
                            }
                            className="w-12 h-12 rounded-2xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition"
                          >

                            <Trash2
                              size={18}
                              className="text-red-300"
                            />

                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}