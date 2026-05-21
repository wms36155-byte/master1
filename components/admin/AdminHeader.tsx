export default function AdminHeader() {
  return (
    <div className="flex items-center justify-between mb-10">
      <div>
        <span className="text-green-400">
          Admin panel
        </span>

        <h1 className="text-5xl font-black mt-2">
          Dashboard
        </h1>
      </div>

      <div className="bg-[#102E1C] border border-white/10 px-5 py-3 rounded-2xl">
        Admin
      </div>
    </div>
  );
}