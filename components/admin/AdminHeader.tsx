
"use client";
import toast from "react-hot-toast";
import MobileSidebar from "./MobileSidebar";
import {
  useRouter,
} from "next/navigation";

import {
  useAdminStore,
} from "@/store/admin.store";

export default function AdminHeader() {
  const router = useRouter();

const logout = useAdminStore(
  (state) => state.logout
);

const handleLogout = () => {
  logout();

  toast.success("Logout qilindi");

  router.push("/admin/login");
};
  return (
    <div className="flex items-center gap-4">
  <MobileSidebar />

  <div>
    <span className="text-green-400">
      Admin panel
    </span>

    <h1 className="text-5xl font-black mt-2">
      Dashboard
    </h1>
  </div>
  <button
  onClick={handleLogout}
  className="bg-red-500/20 hover:bg-red-500/30 transition-all px-5 py-3 rounded-2xl"
>
  Logout
</button>
</div>
  );
}