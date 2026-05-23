import AdminSidebar from "@/components/admin/AdminSidebar";

import BookingTable from "@/components/admin/booking/BookingTable";

export default function AdminBookingsPage() {
  return (
    <main className="min-h-screen flex bg-[#08140D] text-white">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <div className="mb-10">
          <h1 className="text-5xl font-black">
            Booking Management
          </h1>

          <p className="text-white/50 mt-3">
            Buyurtmalarni boshqarish
          </p>
        </div>

        <BookingTable />
      </div>
    </main>
  );
}