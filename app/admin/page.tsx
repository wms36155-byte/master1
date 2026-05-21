import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import EquipmentTable from "@/components/admin/EquipmentTable";

export default function AdminPage() {
  return (
    <main className="flex">
      <AdminSidebar />

      <section className="flex-1 p-6 lg:p-10">
        <AdminHeader />

        <AdminStats />

        <EquipmentTable />
      </section>
    </main>
  );
}