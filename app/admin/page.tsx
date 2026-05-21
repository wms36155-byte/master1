import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import EquipmentTable from "@/components/admin/EquipmentTable";
import AdminProtected from "@/components/admin/AdminProtected";
import RevenueChart from "@/components/admin/RevenueChart";
export default function AdminPage() {
  return (
  <AdminProtected>
    <main className="flex">
      <AdminSidebar />

      <section className="flex-1 p-6 lg:p-10">
        <AdminHeader />

        <AdminStats />
<RevenueChart />
        <EquipmentTable />
      </section>
    </main>
  </AdminProtected>
);
}